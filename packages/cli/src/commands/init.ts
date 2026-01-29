import { Command } from "commander";
import { detectProject } from "../utils/projectDetector";
import { logger } from "../utils/logger";
import fs from "fs-extra";
import path from "path";

export const initCommand = new Command("init")
  .description("Initialize Components Registry in your project")
  .action(async () => {
    try {
      logger.section("Initializing Components Registry");

      // Detect project
      const projectInfo = await detectProject();

      logger.success(
        `Project detected: ${projectInfo.isNextProject ? "Next.js" : "React"}`,
      );
      logger.success(`TypeScript: ${projectInfo.hasTypeScript ? "Yes" : "No"}`);

      // Create components directory if it doesn't exist
      const componentsPath = path.join(
        projectInfo.projectRoot,
        "src",
        "components",
      );
      await fs.ensureDir(componentsPath);
      logger.success(
        `Components directory ready: ${path.relative(process.cwd(), componentsPath)}`,
      );

      // Create config file
      const configPath = path.join(
        projectInfo.projectRoot,
        "ui-store.config.json",
      );
      const config = {
        componentsPath: "src/components",
        typescript: projectInfo.hasTypeScript,
        installedSections: [],
      };

      await fs.writeJson(configPath, config, { spaces: 2 });
      logger.success(`Created config file: ui-store.config.json`);

      // Check for required dependencies
      logger.section("Checking Dependencies");

      const requiredDeps = ["react"];
      const recommendedDeps = ["tailwindcss"];

      const allDeps = {
        ...projectInfo.packageJson.dependencies,
        ...projectInfo.packageJson.devDependencies,
      };

      let missingRequired: string[] = [];
      let missingRecommended: string[] = [];

      for (const dep of requiredDeps) {
        if (!allDeps[dep]) {
          missingRequired.push(dep);
        } else {
          logger.success(`${dep} found`);
        }
      }

      for (const dep of recommendedDeps) {
        if (!allDeps[dep]) {
          missingRecommended.push(dep);
        } else {
          logger.success(`${dep} found`);
        }
      }

      if (missingRequired.length > 0) {
        logger.error(
          `Missing required dependencies: ${missingRequired.join(", ")}`,
        );
        logger.info(`Run: npm install ${missingRequired.join(" ")}`);
      }

      if (missingRecommended.length > 0) {
        logger.warning(
          `Recommended dependencies not found: ${missingRecommended.join(", ")}`,
        );
        logger.info(
          `Components use Tailwind CSS. Install with: npm install -D tailwindcss postcss autoprefixer`,
        );
      }

      logger.section("Setup Complete!");
      logger.info("You can now add sections using:");
      logger.info("  npx ui-store add hero");
      logger.info("  npx ui-store add contact");
      logger.info("  npx ui-store add all");
    } catch (error) {
      logger.error(error instanceof Error ? error.message : "Unknown error");
      process.exit(1);
    }
  });
