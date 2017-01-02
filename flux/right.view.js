/* requires ./docready */

'use strict';

docReady(function () {
  const dispatcher = new Dispatcher();
  const RightViewKey = Symbol.for('App.View.Right')

  window[RightViewKey] = new Vue({
    el: '#right',
    data: {
      right: 0
    },
    watch: {
      right: function (value) {
        window[Symbol.for('App.Action.PrimeCheck')].checkPrime()
      }
    },
    methods: {
      increment(event) {
        window[Symbol.for('App.Action.Update')].increment('right')
      },
      decrement(event) {
        window[Symbol.for('App.Action.Update')].decrement('right')
      }
    }
  })

  dispatcher.register(function (payload) {
    if (payload.action.actionType === 'increment'
      && payload.action.data === 'right') {  
      window[RightViewKey].right = ++window[Symbol.for('App.Store')].right
    }
  })  

  dispatcher.register(function (payload) {
    if (payload.action.actionType === 'decrement'
      && payload.action.data === 'right') {  
      window[RightViewKey].right = --window[Symbol.for('App.Store')].right
    }
  })   

});