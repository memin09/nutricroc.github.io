const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = 'flex';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

function changeImage(imgElement) {
  document.getElementById("currentImage").src = imgElement.src;
}

function loadProductData() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  const products = {
    '1': {
      name: 'Panquecitos de Chocolate',
      price: '$30.00',
      description: 'Suaves, esponjosos y con un sabor irresistible, nuestros panquecitos de chocolate están hechos con cacao de la mejor calidad, logrando un equilibrio perfecto entre dulzura y textura.',
      image: 'img/panquecitodechocolate.jpg'
    },
    '2': {
      name: 'Pastel de Cumpleaños',
      price: '$84.00',
      description: 'Pastel decorado especialmente para celebraciones, con crema y decoraciones personalizadas.',
      image: 'img/pastelVainilla.jpg'
    },
    '3': {
      name: 'Ensalada Refrescante de Uvas, Feta/Mozzarella y Nueces',
      price: '$15.00',
      description: 'Nuestra paleta en forma de corazón cubierta de delicioso chocolate rosa es el detalle perfecto para consentir y disfrutar.',
      image: 'img/carte1.jpeg'
    },
    '4': {
      name: 'Pastel Frutal',
      price: '$95.00',
      description: 'Pastel fresco con frutas de temporada y crema batida ligera.',
      image: 'img/PastelVainilla.jpg'
    },
    '5': {
      name: 'Helado de chicle',
      price: '$45.00',
      description: 'Selección variada de macarrones en presentación de regalo.',
      image: 'img/heladochicle.jpg'
    },
    '6': {
      name: 'Helado de maple',
      price: '$20.00',
      description: 'Mezcla de dulces coloridos perfectos para cualquier celebración.',
      image: 'img/heladodemaple.jpg'
    },
    '7': {
      name: 'Helado de limon',
      price: '$110.00',
      description: 'Pastel premium de chocolate belga con cobertura de ganache.',
      image: 'img/heladolimos.jpg'
    },
    '8': {
      name: 'Paleta Caramelo',
      price: '$18.00',
      description: 'Macarrones en tamaño mini, ideales para degustar diferentes sabores.',
      image: 'img/paleta.jpg'
    },
    '9': {
      name: 'Bombones Decorados',
      price: '$12.00',
      description: 'Galletas artesanales decoradas a mano con diseños únicos.',
      image: 'img/bombones.jpg'
    },
    '10': {
      name: 'Donas Especiales',
      price: '$22.00',
      description: 'Cupcakes esponjosos con decoraciones creativas y sabores variados.',
      image: 'img/donas.png'
    },
    '11': {
      name: 'Helado de chocolate',
      price: '$65.00',
      description: 'Tarta de queso cremosa con base de galleta y frutos rojos.',
      image: 'img/heladochocolate'
    },
    '12': {
      name: 'Panquecitos Especiales',
      price: '$28.00',
      description: 'Brownies intensos de chocolate con nueces y chips de chocolate.',
      image: 'img/panquecitosespeciales.jpg'
    }
  };

  if (productId && products[productId]) {
    const product = products[productId];
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('currentImage').src = product.image;
    document.getElementById('pageTitle').textContent = `${product.name} - Nutricroc`;

    document.querySelectorAll('.thumbnails img').forEach(img => {
      img.src = product.image;
    });
  }
}

document.addEventListener('DOMContentLoaded', loadProductData);
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    e.stopPropagation(); 
    alert('Producto agregado al carrito');
  });
});