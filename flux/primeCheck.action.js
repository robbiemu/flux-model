(function () {
  const dispatcher = new Dispatcher();

  const PrimeCheckKey = Symbol.for('App.Action.PrimeCheck')

  window[PrimeCheckKey] = {
    key: PrimeCheckKey,
    checkPrime: function () {
      dispatcher.enact(this, {
        actionType: 'checkPrime',
        data: undefined
      })
    }
  }
  
})()