(function () {
  const StoreKey = Symbol.for('App.Store');

  const LeftViewKey = Symbol.for('App.View.Left')
  const RightViewKey = Symbol.for('App.View.Right')

  const dispatcher = new Dispatcher();
  
  window[StoreKey] = {
    left: 0,
    right: 0,
    isDisplayedTotalPrime: function() {
      return this.checkComposition(window[LeftViewKey].left
        + window[RightViewKey].right)
    },
    checkComposition: function (value) {  
      if (!this.checkComposition.answers)
        this.checkComposition.answers = {}
      if (this.checkComposition.answers[value] != null) 
        return this.checkComposition.answers[value]

      let prime = value != 1
      if (value === 0)
        prime = false  
      for (var i = 2; i < value; i++) {
        if (value % i == 0) {
          prime = false
          break
        }
      }
      return this.checkComposition.answers[value] = prime
    }
  }

  dispatcher.register(function (payload) {
    if (payload.action.actionType === 'checkPrime')
      window[Symbol.for('App.View.Left')].isPrime =
        window[StoreKey].isDisplayedTotalPrime()
  }) 

})()