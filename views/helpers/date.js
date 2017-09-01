import moment from 'moment';

function date(date) {
  const momentDate = moment(date);
  return momentDate.format('MM/DD/YYYY @ HH:mm zz');
}

export default date;