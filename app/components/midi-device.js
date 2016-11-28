import Ember from 'ember';
import { connect } from '../utils/devices';
const midi = require('midi');

export default Ember.Component.extend({
  tagName: '',

  name: null,
  port: null,

  input: null,
  output: null,

  init() {
    this._super();

    let name = this.get('name');
    let port = this.get('port');

    if (name === null && port === null) {
      throw new Error('Must supply either a name or a port number');
    }

    let input = this.input = new midi.input();
    connect(input, name || port);

    let output = this.output = new midi.output();
    connect(output, name || port);
  },

  willDestroy() {
    this.input.closePort();
    this.output.closePort();
  }
});
