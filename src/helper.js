import _ from 'lodash';
import { countryOptions } from './constant';

export function getCountryName(countryCode) {
  let found = _.find(countryOptions, {'key': countryCode});
  return found ? found.text : countryCode;
}
