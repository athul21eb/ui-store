import fs from 'fs-extra';
import path from 'path';

export interface ProjectInfo {
  isReactProject: boolean;
  isNextProject: boolean;
  hasTypeScript: boolean;
  packageJson: any;
  projectRoot: string;
}

export async function detectProject(cwd: string = process.cwd()): Promise<ProjectInfo> {
  const packageJsonPath = path.join(cwd, 'package.json');

  // Check if package.json exists
  if (!await fs.pathExists(packageJsonPath)) {
    throw new Error('No package.json found. Are you in a React/Next.js project?');
  }

  const packageJson = await fs.readJson(packageJsonPath);
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  // Detect project type
  const isReactProject = 'react' in dependencies;
  const isNextProject = 'next' in dependencies;
  const hasTypeScript = await fs.pathExists(path.join(cwd, 'tsconfig.json'));

  if (!isReactProject && !isNextProject) {
    throw new Error('This is not a React or Next.js project!');
  }

  return {
    isReactProject,
    isNextProject,
    hasTypeScript,
    packageJson,
    projectRoot: cwd,
  };
}

export function getComponentsPath(projectInfo: ProjectInfo): string {
  // Next.js App Router: src/components or app/components
  // Next.js Pages Router: components
  // React: src/components

  const { projectRoot, isNextProject } = projectInfo;

  // Check common paths
  const possiblePaths = [
    path.join(projectRoot, 'src', 'components'),
    path.join(projectRoot, 'components'),
    path.join(projectRoot, 'app', 'components'),
  ];

  // Return first existing path, or default
  for (const p of possiblePaths) {
    if (fs.pathExistsSync(p)) {
      return p;
    }
  }

  // Default: create src/components
  return path.join(projectRoot, 'src', 'components');
}