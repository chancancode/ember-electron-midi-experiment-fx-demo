import MidiFX from './midi-fx';
import integer from '../utils/integer';

export default MidiFX.extend({
  classNames: ['midi-layer'],

  lowKey: integer(0),
  highKey: integer(127),

  rangeDidChange: Ember.observer('lowKey', 'highKey', function() {
    this.sendAllNotesOff();
  }),

  keyIsInRange(key) {
    let lowKey = this.get('lowKey');
    let highKey = this.get('highKey');

    return key >= lowKey && key <= highKey;
  }
});

