import MidiFX from './midi-fx';

export default MidiFX.extend({
  classNames: ['midi-panic'],

  actions: {
    panic: function() {
      this.sendAllNotesOff();
    }
  }
});

