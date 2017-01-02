docReady(function () {

  const app = new Vue({
    el: '#app',
    data: {
      left: 0,
      right: 0
    },
    computed: {
      isPrime: function () {
        let value = this.left + this.right
        if (!this.Primes)
          this.Primes = {}
        if (this.Primes[value] != null)
          return this.Primes[value]

        var prime = value != 1; // 1 can never be prime
        if (value === 0)
          prime = false  
        for (var i = 2; i < value; i++) {
          if (value % i == 0) {
            prime = false
            break
          }
        }
        return this.Primes[value] = prime
      }
    }
  })

  
});