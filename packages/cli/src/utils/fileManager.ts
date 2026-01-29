import fs from "fs-extra";
import path from "path";
import { logger } from "./logger";

export interface CopyOptions {
  source: string;
  destination: string;
  overwrite?: boolean;
}
export async function copyComponentFiles(
  sectionName: string,
  variantName: string,
  targetPath: string,
  hasTypeScript: boolean,
): Promise<string[]> {
  const copiedFiles: string[] = [];

  // Path to registry package (relative to CLI package when built)
  // When built: cli/dist/utils → need to go up to packages/registry
  const registryPath = path.resolve(
    __dirname,
    "../../../registry/src/sections",
    sectionName,
  );

  // Check if registry section exists
  if (!(await fs.pathExists(registryPath))) {
    throw new Error(
      `Section "${sectionName}" not found in registry at: ${registryPath}`,
    );
  }

  // Create target section directory
  const sectionDir = path.join(targetPath, sectionName);
  await fs.ensureDir(sectionDir);

  // Component filename for this specific variant
  const componentName = `${capitalize(sectionName)}${capitalize(variantName)}`;
  const variantFileName = `${componentName}.tsx`;

  // === COPY ONLY THE SELECTED VARIANT COMPONENT ===
  const variantSource = path.join(registryPath, variantFileName);
  const variantDest = path.join(
    sectionDir,
    hasTypeScript ? variantFileName : variantFileName.replace(".tsx", ".jsx"),
  );

  if (await fs.pathExists(variantSource)) {
    let content = await fs.readFile(variantSource, "utf-8");

    // If target is JavaScript, strip TypeScript types
    if (!hasTypeScript) {
      content = stripTypeScript(content);
    }

    await fs.writeFile(variantDest, content);
    copiedFiles.push(path.relative(process.cwd(), variantDest));
    logger.success(`Copied: ${path.relative(process.cwd(), variantDest)}`);
  } else {
    throw new Error(`Component file not found: ${variantSource}`);
  }

  // Copy types file ONCE (only if it doesn't exist already)
  if (hasTypeScript) {
    const typesSource = path.join(registryPath, "types.ts");
    const typesDest = path.join(sectionDir, "types.ts");

    if (
      (await fs.pathExists(typesSource)) &&
      !(await fs.pathExists(typesDest))
    ) {
      await fs.copy(typesSource, typesDest);
      copiedFiles.push(path.relative(process.cwd(), typesDest));
      logger.success(`Copied: ${path.relative(process.cwd(), typesDest)}`);
    }
  }

  return copiedFiles;
}








/**
 * Copy shared types from registry to target project
 * This creates the src/types directory that section types import from
 */
async function copySharedTypes(
  targetPath: string,
  hasTypeScript: boolean,
): Promise<string[]> {
  const copiedFiles: string[] = [];

  if (!hasTypeScript) {
    // Skip for JavaScript projects
    return copiedFiles;
  }

  // Path to shared types in registry
  const sharedTypesSource = path.resolve(
    __dirname,
    "../../../registry/src/types",
  );

  // Target path for shared types (go up one level from components to src, then into types)
  const targetTypesDir = path.resolve(targetPath, "../types");

  // Check if shared types already exist in target project
  const targetTypesFile = path.join(targetTypesDir, "index.ts");

  if (await fs.pathExists(targetTypesFile)) {
    // Already exists, skip copying
    return copiedFiles;
  }

  // Ensure the types directory exists
  await fs.ensureDir(targetTypesDir);

  // Copy the index.ts file from registry shared types
  const sourceIndexFile = path.join(sharedTypesSource, "index.ts");

  if (await fs.pathExists(sourceIndexFile)) {
    await fs.copy(sourceIndexFile, targetTypesFile);
    copiedFiles.push(path.relative(process.cwd(), targetTypesFile));
    logger.success(`Copied: ${path.relative(process.cwd(), targetTypesFile)}`);
  } else {
    logger.warning("Shared types not found in registry");
  }

  return copiedFiles;
}









export async function copyAllVariants(
  sectionName: string,
  variants: string[],
  targetPath: string,
  hasTypeScript: boolean,
): Promise<string[]> {
  const allCopiedFiles: string[] = [];
  const sectionDir = path.join(targetPath, sectionName);

  // Copy shared types FIRST (they're imported by section-specific types)
  const sharedTypeFiles = await copySharedTypes(targetPath, hasTypeScript);
  allCopiedFiles.push(...sharedTypeFiles);

  // Copy each variant component
  for (const variant of variants) {
    const files = await copyComponentFiles(
      sectionName,
      variant,
      targetPath,
      hasTypeScript,
    );
    allCopiedFiles.push(...files);
  }

  // Rebuild index file from scratch with only the selected variants
  await rebuildIndexFile(sectionDir, sectionName, variants, hasTypeScript);

  return allCopiedFiles;
}







async function rebuildIndexFile(
  sectionDir: string,
  sectionName: string,
  variants: string[],
  hasTypeScript: boolean,
): Promise<void> {
  const fileExtension = hasTypeScript ? "tsx" : "jsx";
  const indexPath = path.join(sectionDir, `index.${fileExtension}`);

  let content = "";

  // Add types export if TypeScript
  if (hasTypeScript) {
    content = `export * from './types';\n`;
  }

  // Add export for each variant
  for (const variant of variants) {
    const componentName = `${capitalize(sectionName)}${capitalize(variant)}`;
    content += `export { ${componentName} } from './${componentName}';\n`;
  }

  await fs.writeFile(indexPath, content);
  logger.success(`Updated: ${path.relative(process.cwd(), indexPath)}`);
}





function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}








function stripTypeScript(content: string): string {
  // Basic TypeScript stripping (for production, use a proper parser)
  return content
    .replace(/: React\.FC<\w+>/g, "")
    .replace(/interface \w+ \{[^}]+\}/gs, "")
    .replace(/: \w+(\[\])?/g, "")
    .replace(/import.*from ['"].*types['"];?\n/g, "")
    .replace(/<\w+>/g, "") // Remove generic types
    .replace(/\.tsx/g, ".jsx");
}









export async function ensureDependencies(
  projectRoot: string,
  dependencies: string[],
): Promise<void> {
  if (dependencies.length === 0) return;

  const packageJsonPath = path.join(projectRoot, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);

  const missingDeps: string[] = [];
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  for (const dep of dependencies) {
    if (!allDeps[dep]) {
      missingDeps.push(dep);
    }
  }

  if (missingDeps.length > 0) {
    logger.warning(`Missing dependencies: ${missingDeps.join(", ")}`);
    logger.info(`Run: npm install ${missingDeps.join(" ")}`);
  }
}
