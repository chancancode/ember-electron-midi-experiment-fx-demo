import Ember from 'ember';
import { nameForKey } from '../utils/keys';

export default Ember.Helper.helper(function(params) {
  return nameForKey(params[0]);
});
