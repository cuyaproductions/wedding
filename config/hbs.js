import path from 'path';
import stringKebab from '../views/helpers/stringKebab';

function configHbs(hbs, app) {
  hbs.registerPartials(path.resolve(__dirname, '../views/partials'));
  hbs.localsAsTemplateData(app);

  hbs.registerHelper('stringKebab', stringKebab);
}

export default configHbs;