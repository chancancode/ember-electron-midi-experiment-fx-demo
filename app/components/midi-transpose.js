import Ember from 'ember';
import MidiFX from './midi-fx';
import integer from '../utils/integer';

export default MidiFX.extend({
  classNames: ['midi-transpose'],

  value: integer(0),

  valueDidChange: Ember.observer('value', function() {
    this.sendAllNotesOff();
  }),

  onNoteOn(key, velocity) {
    this.sendNoteOn(key + this.get('value'), velocity);
    return false;
  },

  onNoteOff(key, velocity) {
    this.sendNoteOff(key + this.get('value'), velocity);
    return false;
  }
});

