#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';

const program = new Command();

// CLI metadata
program
  .name('ui-store')
  .description('CLI tool to install UI sections into React/Next.js projects')
  .version('1.0.0');

// ASCII art banner (only show when not using --help)
if (!process.argv.includes('--help') && !process.argv.includes('-h')) {
  const banner = `
${chalk.cyan('╔════════════════════════════════════╗')}
${chalk.cyan('║')}       ${chalk.bold.white('UI Store CLI')}              ${chalk.cyan('║')}
${chalk.cyan('╚════════════════════════════════════╝')}
`;
  console.log(banner);
}

// Register commands
program.addCommand(initCommand);
program.addCommand(addCommand);

// Custom help with examples
program.addHelpText('after', `

${chalk.bold('Examples:')}
  ${chalk.gray('$')} ui-store init                 ${chalk.dim('Initialize in your project')}
  ${chalk.gray('$')} ui-store add                  ${chalk.dim('Interactive section selection')}
  ${chalk.gray('$')} ui-store add hero             ${chalk.dim('Add hero section')}
  ${chalk.gray('$')} ui-store add contact          ${chalk.dim('Add contact section')}
  ${chalk.gray('$')} ui-store add all              ${chalk.dim('Add all sections')}

${chalk.bold('Available Sections:')}
  ${chalk.cyan('hero')}     - Hero sections for landing pages
  ${chalk.cyan('about')}    - About sections
  ${chalk.cyan('contact')}  - Contact sections with forms
  ${chalk.cyan('booking')}  - Booking/reservation sections
  ${chalk.cyan('footer')}   - Footer sections

${chalk.dim('Need help? Visit: https://github.com/athul21eb')}
`);

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}