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

    
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation(); 
        alert('Producto agregado al carrito');
      });
    });