const _products = [
  {
    'id': 1,
    'nombre': 'Playstation',
    'imagen': 'https://cl.buscafs.com/www.levelup.com/public/uploads/images/650503_446x230.jpg',
    'precio': 100000,
    'descripcion': 'Playstation 5, con 2 controles',
    'stock': 4
  },
  {
    'id': 2,
    'nombre': 'Impresora Laser HP LP2394',
    'imagen': 'https://www.tecnodigitalinsumos.com.ar/116-large_social/impresora-hp-laserjet-pro-m203dw-wifi.jpg',
    'precio': 25000,
    'descripcion': 'La mejor calidad de impresion con este producto',
    'stock': 5
  },
  {
    'id': 3,
    'nombre': 'Campera Peter Quill',
    'imagen': 'https://images-na.ssl-images-amazon.com/images/I/91ARuci152L._AC_UL1500_.jpg',
    'precio': 15000,
    'descripcion': 'Campera de Star Lord, Guardianes de la Galaxia',
    'stock': 2
  }
]



export default {
  getProducts (cb) {
    setTimeout(() => cb(_products), 100)
  },
  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
    // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.webdriver)
        ? cb()
        : errorCb()
    }, 100)
  }
}
