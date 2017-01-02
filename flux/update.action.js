(function () {
  const dispatcher = new Dispatcher();

  const UpdateKey = Symbol.for('App.Action.Update')

  window[UpdateKey] = {
    key: UpdateKey,
    increment: function (item) {
      dispatcher.enact(this, {
        actionType: 'increment',
        data: item
      })
    },
    decrement: function (item) {
      dispatcher.enact(this, {
        actionType: 'decrement',
        data: item
      })
    }
  }
  
})()