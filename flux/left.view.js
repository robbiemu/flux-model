/* requires ./docready */

'use strict';

docReady(function () {
  const dispatcher = new Dispatcher();
  const LeftViewKey = Symbol.for('App.View.Left')

  window[LeftViewKey] = new Vue({
    el: '#left',
    data: {
      left: 0,
      isPrime: false
    },
    watch: {
      left: function (value) {
        window[Symbol.for('App.Action.PrimeCheck')].checkPrime()
        // this is safe because we are conforming to the architecture of all changes
        // originating in actions. So this action is 'gauranteed' to chain from an update

        // on the other hand, we arguably should not watch the central store's "left" value,
        // as we want this action to as tightly couple to the user's final view as possible.
      }
    },
    methods: {
      increment(event) {
        window[Symbol.for('App.Action.Update')].increment('left')
      },
      decrement(event) {
        window[Symbol.for('App.Action.Update')].decrement('left')
      }
    }
  })

  dispatcher.register(function (payload) {
    if (payload.action.actionType === 'increment'
      && payload.action.data === 'left') {
      window[LeftViewKey].left = ++window[Symbol.for('App.Store')].left
    }
  })  

  dispatcher.register(function (payload) {
    if (payload.action.actionType === 'decrement'
      && payload.action.data === 'left') {  
      window[LeftViewKey].left = --window[Symbol.for('App.Store')].left
    }
    // note that I can still trap other actionTypes and react to them
  })   

});