import Ember from 'ember';
import MidiFX from './midi-fx';

export default MidiFX.extend({
  classNames: ['midi-auto-hold'],

  lastKey: null,

  onNoteOff() {
    return false;
  },

  onNoteOn(key, velocity) {
    let lastKey = this.get('lastKey');

    if (lastKey === key) {
      this.sendNoteOff(key, velocity);
      this.set('lastKey', null);
      return false;
    }

    if (lastKey !== null) {
      this.sendNoteOff(lastKey, velocity);
    }

    this.set('lastKey', key);
  },

  onAllNotesOff() {
    this.set('lastKey', null);
  }
});

