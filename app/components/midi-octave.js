import Ember from 'ember';
import MidiFX from './midi-fx';

export default MidiFX.extend({
  classNames: ['midi-octave'],

  low: false,
  high: false,

  modeDidChange: Ember.observer('low', 'high', function() {
    this.sendAllNotesOff();
  }),

  onNoteOff(key, velocity) {
    if (this.get('low')) {
      this.sendNoteOff(key - 12, velocity);
    }

    if (this.get('high')) {
      this.sendNoteOff(key + 12, velocity);
    }
  },

  onNoteOn(key, velocity) {
    if (this.get('low')) {
      this.sendNoteOn(key - 12, velocity);
    }

    if (this.get('high')) {
      this.sendNoteOn(key + 12, velocity);
    }
  }
});

