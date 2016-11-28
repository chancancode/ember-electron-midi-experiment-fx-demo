import Ember from 'ember';
import { connect } from '../utils/devices';
const midi = require('midi');

export default Ember.Component.extend({
  tagName: '',

  name: null,

  input: null,
  output: null,

  init() {
    this._super();

    let name = this.get('name');

    console.log(`Creating virtual port ${name}...`);

    let output = this.output = new midi.output();
    output.openVirtualPort(name);

    let input = this.input = new midi.input();
    connect(input, name);
  },

  willDestroy() {
    this.input.closePort();
    this.output.closePort();
  }
});
