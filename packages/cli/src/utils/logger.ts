import chalk from 'chalk';

export const logger = {
  info: (message: string) => {
    console.log(chalk.blue('ℹ'), message);
  },

  success: (message: string) => {
    console.log(chalk.green('✔'), message);
  },

  error: (message: string) => {
    console.log(chalk.red('✖'), message);
  },

  warning: (message: string) => {
    console.log(chalk.yellow('⚠'), message);
  },

  section: (title: string) => {
    console.log('\n' + chalk.bold.cyan(title));
    console.log(chalk.cyan('─'.repeat(title.length)));
  },
};