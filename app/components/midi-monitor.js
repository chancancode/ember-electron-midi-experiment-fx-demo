import MidiFX from './midi-fx';
import { nameForKey, isBlackKey } from '../utils/keys';

export default MidiFX.extend({
  classNames: ['midi-monitor'],

  keys: null,

  init() {
    this._super();

    let keys = [];

    for (let i=0; i<128; i++) {
      let note = i%12
      let octave = Math.floor(i/12);

      keys.push(Ember.Object.create({
        id: i,
        name: nameForKey(i),
        isBlackKey: isBlackKey(i),
        isOn: false
      }));
    }

    this.set('keys', keys);
  },

  onNoteOn(key, velocity) {
    this.get('keys').objectAt(key).set('isOn', true);
  },

  onNoteOff(key, velocity) {
    this.get('keys').objectAt(key).set('isOn', false);
  },

  onAllNotesOff() {
    this.get('keys').setEach('isOn', false);
  }
});

