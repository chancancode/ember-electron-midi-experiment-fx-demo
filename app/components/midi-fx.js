import Ember from 'ember';
import { nameForKey } from '../utils/keys';
const midi = require('midi');

export default Ember.Component.extend({
  classNames: ['midi-fx'],

  input: null,
  output: null,

  init() {
    this._super();

    let { input, output } = this;

    if (!input) {
      input = this.input = new midi.input();
    }

    if (!output) {
      output = this.output = new midi.output();
    }

    input.on('message', (delta, [status, data1, data2]) => {
      let bubble = true;

      if (status === 0x80) {
        console.log(`Received NOTE OFF ${nameForKey(data1)}`);
        bubble = this.keyIsInRange(data1) && this.onNoteOff(data1, data2);
      } else if (status === 0x90) {
        console.log(`Received NOTE ON ${nameForKey(data1)}`);
        bubble = this.keyIsInRange(data1) && this.onNoteOn(data1, data2);
      } else if (status === 0xB0 && data1 === 0x7B) {
        console.log('Received ALL NOTES OFF');
        bubble = this.onAllNotesOff();
      }

      if (bubble !== false) {
        console.log(`Passing through [${status}, ${data1}, ${data2}]`);
        output.sendMessage([status, data1, data2]);
      }
    });
  },

  keyIsInRange(key) {
    return true;
  },

  onNoteOff(key, velocity) {
    return true;
  },

  onNoteOn(key, velocity) {
    return true;
  },

  onAllNotesOff() {
    return true;
  },

  sendNoteOff(key, velocity) {
    console.log(`Sending NOTE OFF ${nameForKey(key)}`);
    this.output.sendMessage([0x80, key, velocity]);
  },

  sendNoteOn(key, velocity) {
    console.log(`Sending NOTE ON ${nameForKey(key)}`);
    this.output.sendMessage([0x90, key, velocity]);
  },

  sendAllNotesOff() {
    console.log(`Sending ALL NOTES OFF`);
    this.output.sendMessage([0xB0, 0x7B, 0]);
  }
});
