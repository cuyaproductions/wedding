import path from 'path';

function configHbs(hbs, app) {
  hbs.registerPartials(path.resolve(__dirname, '../views/partials'));
  hbs.localsAsTemplateData(app);
}

export default configHbs;