export const currency = {
  methods: {
    getCurrency (value){
      var prec = value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      return prec
    }
  }
}
