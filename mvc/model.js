const ModelSingletonKey = Symbol.for('App.Model')

class Model {
  constructor() {
    let globalSymbols = Object.getOwnPropertySymbols(window)
    let isInstantiated = (globalSymbols.indexOf(ModelSingletonKey) > -1)

    if(!isInstantiated){
      window[ModelSingletonKey] = {
        private: {
          data: { left: 0, right: 0,  },
        },
        isPrime: {},
        instance: this
      }
    }

    return window[ModelSingletonKey].instance;
  }
  updateLeft(context,how) {
    switch (how) {
      case 'increment':
        this.increment(context, 'left')  
        break
      case 'decrement':
        this.decrement(context, 'left')  
        break
    }
    context['isPrime'] = this.isPrime(this.sumData())
  }
  updateRight(context,how) {
    switch (how) {
      case 'increment':
        this.increment(context, 'right')  
        break
      case 'decrement':
        this.decrement(context, 'right')  
        break
    }
    context['isPrime'] = this.isPrime(this.sumData())
  }
  increment(context, what) {
    context[what] = ++window[ModelSingletonKey].private.data[what]
  }
  decrement(context, what) {
    context[what] = --window[ModelSingletonKey].private.data[what]
  }

  isPrime(value) {  
    if (!window[ModelSingletonKey].isPrime.answers)
      window[ModelSingletonKey].isPrime.answers = {}
    if (window[ModelSingletonKey].isPrime.answers[value] != null) {
      return window[ModelSingletonKey].isPrime.answers[value]
    }
    var prime = value != 1; // 1 can never be prime
    for (var i = 2; i < value; i++) {
      if (value % i == 0) {
        prime = false
        break
      }
    }
    return window[ModelSingletonKey].isPrime.answers[value] = prime
  }

  sumData() {
    return Object.keys(window[ModelSingletonKey].private.data)
      .reduce((p, c) => p + window[ModelSingletonKey].private.data[c], 0)
  }
}
Object.freeze(Model)