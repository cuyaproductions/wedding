import path from 'path';
import dateHelper from '../views/helpers/date';
function configHbs(hbs, app) {
  hbs.registerPartials(path.resolve(__dirname, '../views/partials'));
  hbs.registerHelper('dateHelper', dateHelper);
  hbs.localsAsTemplateData(app);
}

export default configHbs;