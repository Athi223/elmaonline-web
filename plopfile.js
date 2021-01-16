/* eslint-disable no-undef */
module.exports = function (plop) {
  plop.addHelper('lowercase', word => {
    return word.toLowerCase();
  });
  // screen generator
  plop.setGenerator('page', {
    description: 'add new page to app',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Type page name in CamelCase',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{name}}/index.js',
        templateFile: 'templates/page.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{name}}/store.js',
        templateFile: 'templates/store.hbs',
      },
    ],
  });
  // component generator
  plop.setGenerator('feature', {
    description: 'add new feature to app',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Type feature name in CamelCase',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/features/{{name}}.js',
        templateFile: 'templates/feature.hbs',
      },
    ],
  });
  // style component generator
  plop.setGenerator('component', {
    description: 'add new component to app',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Type component name in CamelCase',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}.js',
        templateFile: 'templates/component.hbs',
      },
    ],
  });
  // style generator
  plop.setGenerator('style', {
    description: 'add new styled component to app',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Type file name in CamelCase',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}.js',
        templateFile: 'templates/style.hbs',
      },
    ],
  });
};
