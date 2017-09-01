import path from 'path';
import date from '../views/helpers/date';
function configHbs(hbs, app) {
  hbs.registerPartials(path.resolve(__dirname, '../views/partials'));
  hbs.registerHelper('date', date);
  hbs.localsAsTemplateData(app);
}

export default configHbs;