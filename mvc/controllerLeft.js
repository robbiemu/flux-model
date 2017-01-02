/* requires ./docready */
'use strict';

docReady(function () {
  let model = new Model()
    
  const LeftKey = Symbol.for('App.Controller.Left')

  window[LeftKey] = new Vue({
    el: '#left',
    data: {
      left: 0,
      isPrime: false
    },
    watch: {
      isPrime: function (boolean) {
        console.log('[left] isPrime: ' + boolean)
        window[this.RightKey].isPrime=boolean
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
  window[LeftKey].RightKey = Symbol.for('App.Controller.Right')

})