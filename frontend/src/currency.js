export const currency = {
  methods: {
    getCurrency (value){
      var prec = value.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP'
      })
      return prec
    }
  }
}
