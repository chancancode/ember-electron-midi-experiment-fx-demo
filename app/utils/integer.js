import Ember from 'ember';

export default function(defaultValue = 0) {
  return Ember.computed({
    get(key) {
      let cache = this.get(`_${key}`);
      return cache === undefined ? defaultValue : cache;
    },

    set(key, value) {
      let parsed = parseInt(value, 10);

      if (Number.isNaN(parsed)) {
        parsed = defaultValue;
      }

      this.set(`_${key}`, parsed);

      return parsed;
    }
  })
}
