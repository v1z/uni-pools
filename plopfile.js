const path = require('path');

const templatesDir = path.resolve(`${__dirname}/plop-templates`);
const rootDir = process.cwd();
const componentsDir = `${rootDir}/src/components`;

module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create new component with all required inner structure',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name is?',
      },
      {
        type: 'confirm',
        name: 'connected',
        default: false,
        message: 'Should it be connected to redux store (NO by default) ?',
      },
    ],
    actions: data => {
      const actions = [];

      actions.push(
        {
          type: 'add',
          path: `${componentsDir}/{{pascalCase name}}/index.ts`,
          templateFile: `${templatesDir}/index.ts`,
          data: { name: 'name' },
        },
        {
          type: 'add',
          path: `${componentsDir}/{{pascalCase name}}/{{pascalCase name}}.css`,
          templateFile: `${templatesDir}/style.css`,
        },
        {
          type: 'add',
          path: `${componentsDir}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
          templateFile: `${templatesDir}${data.connected ? '/redux' : ''}/component.hbs`,
          data: { name: 'name' },
        }
      );

      return actions;
    },
  });
};
