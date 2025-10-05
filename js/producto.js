const scrollToTopBtn = document.getElementById('scrollToTop');
    const headerImage = document.querySelector('.header-image');

    window.addEventListener('scroll', function() {
      const headerImageBottom = headerImage.getBoundingClientRect().bottom;
      
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
          name: 'Macarrones Auténticos',
          price: '$25.00',
          description: 'Deliciosos macarrones franceses con relleno cremoso y sabor auténtico.',
          image: 'img/nutriblanco.jpeg'
        },
        '2': {
          name: 'Pastel de Cumpleaños',
          price: '$84.00',
          description: 'Pastel decorado especialmente para celebraciones, con crema y decoraciones personalizadas.',
          image: 'img/nutriblanco.jpeg'
        },
        '3': {
          name: 'Paleta de Caramelo',
          price: '$15.00',
          description: 'Paletas de caramelo artesanales con diversos sabores y colores vibrantes.',
          image: 'img/nutriblanco.jpeg'
        },
        '4': {
          name: 'Pastel Frutal',
          price: '$95.00',
          description: 'Pastel fresco con frutas de temporada y crema batida ligera.',
          image: 'img/nutriblanco.jpeg'
        },
        '5': {
          name: 'Caja de Macarrones',
          price: '$45.00',
          description: 'Selección variada de macarrones en presentación de regalo.',
          image: 'img/nutriblanco.jpeg'
        },
        '6': {
          name: 'Dulces de Fiesta',
          price: '$20.00',
          description: 'Mezcla de dulces coloridos perfectos para cualquier celebración.',
          image: 'img/nutriblanco.jpeg'
        },
        '7': {
          name: 'Pastel de Chocolate',
          price: '$110.00',
          description: 'Pastel premium de chocolate belga con cobertura de ganache.',
          image: 'img/nutriblanco.jpeg'
        },
        '8': {
          name: 'Mini Macarrones',
          price: '$18.00',
          description: 'Macarrones en tamaño mini, ideales para degustar diferentes sabores.',
          image: 'img/nutriblanco.jpeg'
        },
        '9': {
          name: 'Galletas Decoradas',
          price: '$12.00',
          description: 'Galletas artesanales decoradas a mano con diseños únicos.',
          image: 'img/nutriblanco.jpeg'
        },
        '10': {
          name: 'Cupcakes Especiales',
          price: '$22.00',
          description: 'Cupcakes esponjosos con decoraciones creativas y sabores variados.',
          image: 'img/nutriblanco.jpeg'
        },
        '11': {
          name: 'Tarta de Queso',
          price: '$65.00',
          description: 'Tarta de queso cremosa con base de galleta y frutos rojos.',
          image: 'img/nutriblanco.jpeg'
        },
        '12': {
          name: 'Brownies Premium',
          price: '$28.00',
          description: 'Brownies intensos de chocolate con nueces y chips de chocolate.',
          image: 'img/nutriblanco.jpeg'
        }
      };

      if (productId && products[productId]) {
        const product = products[productId];
        document.getElementById('productTitle').textContent = product.name;
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