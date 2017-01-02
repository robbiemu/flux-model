/* requires ./docready */

'use strict';

docReady(function () {
  let model = new Model()
  
  const RightKey = Symbol.for('App.Controller.Right')
  const LeftKey = Symbol.for('App.Controller.Left')
  
  window[RightKey] = new Vue({
    el: '#right',
    data: {
      right: 0,
      isPrime: false
    },
    watch: {
      isPrime: function (boolean) {
        console.log('[right] isPrime: ' + boolean)
        window[LeftKey].isPrime = boolean
      }
    },
    methods: {
      increment: function (event) {
        model.updateRight(this, 'increment')
      },
      decrement: function (event) {
        model.updateRight(this, 'decrement')
      }
    },
  })
  
})
