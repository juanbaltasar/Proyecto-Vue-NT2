const _products = [
  {
    'id': 1,
    'nombre': 'Sony Playstation 5 Digital Edition',
    'imagen': 'https://cl.buscafs.com/www.levelup.com/public/uploads/images/650503_446x230.jpg',
    'precio': 100000,
    'descripcion': 'Playstation 5, con 2 controles. Requiere conexión a Internet.',
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
    'nombre': 'Campera Peter Quill - Marvel Inc',
    'imagen': 'https://celebsclothes.com/wp-content/uploads/2019/07/star-lord-new-style-jacket.jpg',
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
