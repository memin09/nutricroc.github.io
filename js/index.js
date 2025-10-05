 const scrollToTopBtn = document.getElementById('scrollToTop');
    const heroSection = document.querySelector('.hero-section');
    window.addEventListener('scroll', function() {
      const heroSectionBottom = heroSection.getBoundingClientRect().bottom;
      
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
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slider-image');
    const totalSlides = slides.length;

    function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % totalSlides;
      slides[currentSlide].classList.add('active');
    }
    setTimeout(() => {
      setInterval(nextSlide, 3000);
    }, 2000); 
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation(); 
        alert('Producto agregado al carrito');
      });
    });