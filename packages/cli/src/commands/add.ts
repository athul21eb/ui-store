import { Command } from "commander";
import inquirer from "inquirer";
import ora from "ora";
import { detectProject, getComponentsPath } from "../utils/projectDetector";
import { logger } from "../utils/logger";
import { copyAllVariants, ensureDependencies } from "../utils/fileManager";
import fs from "fs-extra";
import path from "path";

// Registry metadata (in production, this would be imported from registry package)
const SECTIONS_REGISTRY = {
  hero: {
    name: 'hero',
    variants: ['centered', 'split', 'fullwidth'],
    description: 'Hero sections for landing pages',
    dependencies: [],
  },
  about: {
    name: 'about',
    variants: ['textHeavy', 'imageFocused', 'values'],
    description: 'About sections',
    dependencies: [],
  },
  contact: {
    name: 'contact',
    variants: ['simple', 'withInfo', 'cta'],
    description: 'Contact sections with forms',
    dependencies: [],
  },
  booking: {
    name: 'booking',
    variants: ['minimal', 'dateFocused', 'withInfo'],
    description: 'Booking and reservation sections',
    dependencies: [],
  },
  footer: {
    name: 'footer',
    variants: ['minimal', 'multiColumn', 'newsletter'],
    description: 'Footer sections',
    dependencies: [],
  },
};

export const addCommand = new Command("add")
  .argument("[section]", 'Section to add (hero, contact, etc.) or "all"')
  .description("Add a UI section to your project")
  .action(async (sectionArg?: string) => {
    try {
      logger.section("Adding UI Section");

      // Detect project
      const projectInfo = await detectProject();
      const componentsPath = getComponentsPath(projectInfo);

      // Load config
      const configPath = path.join(
        projectInfo.projectRoot,
        "ui-store.config.json",
      );
      let config: any = {};

      if (await fs.pathExists(configPath)) {
        config = await fs.readJson(configPath);
      } else {
        logger.error(
          'Config file not found. Please run "npx ui-store init" first.',
        );
        logger.info(
          "This will set up your project and create the necessary configuration.\n",
        );
        process.exit(1);
      }

      // Handle "add all"
      if (sectionArg === "all") {
        await addAllSections(
          componentsPath,
          projectInfo.hasTypeScript,
          config,
          configPath,
        );
        return;
      }

      // If no section specified, prompt user
      let sectionName = sectionArg;

      if (!sectionName) {
        const answers = await inquirer.prompt([
          {
            type: "list",
            name: "section",
            message: "Which section would you like to add?",
            choices: Object.values(SECTIONS_REGISTRY).map((s) => ({
              name: `${s.name} - ${s.description}`,
              value: s.name,
            })),
          },
        ]);
        sectionName = answers.section;
      }

      // Validate section exists
      const section =
        SECTIONS_REGISTRY[sectionName as keyof typeof SECTIONS_REGISTRY];
      if (!section) {
        logger.error(`Section "${sectionName}" not found.`);
        logger.info(
          `Available sections: ${Object.keys(SECTIONS_REGISTRY).join(", ")}`,
        );
        process.exit(1);
      }

      // Ask if user wants all variants first
      const wantAllAnswers = await inquirer.prompt([
        {
          type: "confirm",
          name: "wantAll",
          message: `Install all ${section.variants.length} variants?`,
          default: false,
        },
      ]);

      let selectedVariants: string[];

      if (wantAllAnswers.wantAll) {
        selectedVariants = section.variants;
      } else {
        // Ask which variants to install
        const variantAnswers = await inquirer.prompt([
          {
            type: "checkbox",
            name: "variants",
            message: `Select variants for ${sectionName}:`,
            choices: section.variants.map((v) => ({
              name: v,
              value: v,
              checked: false,
            })),
            validate: (input) => {
              return input.length > 0 || "Select at least one variant";
            },
          },
        ]);
        selectedVariants = variantAnswers.variants;
      }

      // Install components
      const spinner = ora("Installing components...").start();

      try {
        const copiedFiles = await copyAllVariants(
          sectionName!,
          selectedVariants,
          componentsPath,
          projectInfo.hasTypeScript,
        );

        spinner.succeed("Components installed successfully!");

        // Update config
        if (!config.installedSections) {
          config.installedSections = [];
        }

        const existingSection = config.installedSections.find(
          (s: any) => s.name === sectionName,
        );
        if (existingSection) {
          existingSection.variants = [
            ...new Set([...existingSection.variants, ...selectedVariants]),
          ];
        } else {
          config.installedSections.push({
            name: sectionName,
            variants: selectedVariants,
          });
        }

        await fs.writeJson(configPath, config, { spaces: 2 });

        // Check dependencies
        if (section.dependencies.length > 0) {
          await ensureDependencies(
            projectInfo.projectRoot,
            section.dependencies,
          );
        }

        // Show usage example
        logger.section("Usage Example");
        const exampleVariant = selectedVariants[0];
        const componentName = `${capitalize(sectionName!)}${capitalize(exampleVariant)}`;

        logger.info(`Import and use in your pages:\n`);
        console.log(
          `  import { ${componentName} } from '@/components/${sectionName!}';\n`,
        );
        console.log(
          `  <${componentName} ${getExampleProps(sectionName!, exampleVariant)} />`,
        );
      } catch (error) {
        spinner.fail("Installation failed");
        throw error;
      }
    } catch (error) {
      logger.error(error instanceof Error ? error.message : "Unknown error");
      process.exit(1);
    }
  });

//// add all sections
async function addAllSections(
  componentsPath: string,
  hasTypeScript: boolean,
  config: any,
  configPath: string,
): Promise<void> {
  const spinner = ora("Installing all sections...").start();

  try {
    const allCopiedFiles: string[] = [];

    for (const [sectionName, section] of Object.entries(SECTIONS_REGISTRY)) {
      const files = await copyAllVariants(
        sectionName,
        section.variants,
        componentsPath,
        hasTypeScript,
      );
      allCopiedFiles.push(...files);
    }

    spinner.succeed(
      `Installed ${Object.keys(SECTIONS_REGISTRY).length} sections!`,
    );

    // Update config
    config.installedSections = Object.entries(SECTIONS_REGISTRY).map(
      ([name, section]) => ({
        name,
        variants: section.variants,
      }),
    );

    await fs.writeJson(configPath, config, { spaces: 2 });

    logger.success(`Total files created: ${allCopiedFiles.length}`);
  } catch (error) {
    spinner.fail("Installation failed");
    throw error;
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getExampleProps(section: string, variant: string): string {
  // Return example props for each section
  const examples: Record<string, string> = {
    hero: 'heading="Welcome" subheading="Get started today"',
    contact: 'title="Contact Us"',
    footer: "",
    booking: 'title="Reserve a Table"',
    about: 'title="About Us"',
  };

  return examples[section] || "";
}
