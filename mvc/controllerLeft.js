/* requires ./docready */
'use strict';

docReady(function () {
  let model = new Model()
    
  const LeftKey = Symbol.for('App.Controller.Left')
  const RightKey = Symbol.for('App.Controller.Right')

  window[LeftKey] = new Vue({
    el: '#left',
    data: {
      left: 0,
      isPrime: false
    },
    watch: {
      isPrime: function (boolean) {
        console.log('[left] isPrime: ' + boolean)
        window[RightKey].isPrime=boolean
      }
    },
    methods: {
      increment: function (event) {
        model.updateLeft(this, 'increment')
      },
      decrement: function (event) {
        model.updateLeft(this, 'decrement')
      }
    }
  })

})