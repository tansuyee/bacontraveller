import _ from 'lodash';
import { countryOptions } from './constant';

export function getCountryName(countryCode) {
  return _.find(countryOptions, {'key': countryCode})['text'];
}
