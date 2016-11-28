import Ember from 'ember';
import MidiFX from './midi-fx';

export default MidiFX.extend({
  classNames: ['midi-auto-pedal'],

  notesCount: 0,
  pedalIsOn: false,

  onNoteOff(key, velocity) {
    if (this.decrementProperty('notesCount') === 0) {
      this.set('pedalIsOn', false);
      this.output.sendMessage([0xB0, 0x40, 0]);
    }
  },

  onNoteOn(key, velocity) {
    this.incrementProperty('notesCount');
    this.set('pedalIsOn', true);
    this.output.sendMessage([0xB0, 0x40, 0x7F]);
  }
});

