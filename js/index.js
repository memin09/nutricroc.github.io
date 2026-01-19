// Variables globales para el carrito
let cartItems = [];
let isLoggedIn = false;
const cartBtn = document.getElementById('cartBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartCountTitle = document.getElementById('cartCountTitle');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartSummary = document.getElementById('cartSummary');
const summaryProductCount = document.getElementById('summaryProductCount');
const summarySubtotal = document.getElementById('summarySubtotal');
const summaryEnvio = document.getElementById('summaryEnvio');
const summaryTotalAmount = document.getElementById('summaryTotalAmount');
const notification = document.getElementById('notification');

// Elemento para notificación de stock insuficiente
const stockNotification = document.getElementById('stockNotification');

// NUEVO: Notificación de correo enviado
const emailSentNotification = document.getElementById('emailSentNotification');

// NUEVO: Notificación de cantidad actualizada
const quantityUpdatedNotification = document.getElementById('quantityUpdatedNotification');

const editScreen = document.getElementById('editScreen');
const editBack = document.getElementById('editBack');
const editProductImages = document.getElementById('editProductImages');
const editProductName = document.getElementById('editProductName');
const editProductPrice = document.getElementById('editProductPrice');
const editQuantityInput = document.getElementById('editQuantityInput');
const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
const increaseQuantityBtn = document.getElementById('increaseQuantity');
const saveEditBtn = document.getElementById('saveEditBtn');

// Elementos del checkout 
const checkoutBtn = document.getElementById('checkoutBtn');

// Elementos de autenticación MEJORADOS
const userBtn = document.getElementById('userBtn');
const userDropdown = document.getElementById('userDropdown');
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');
const accountLink = document.getElementById('accountLink');

const authOverlay = document.getElementById('authOverlay');
const authSidebar = document.getElementById('authSidebar');
const closeAuth = document.getElementById('closeAuth');
const authTitle = document.getElementById('authTitle');
const authImage = document.getElementById('authImage');
const authForm = document.getElementById('authForm');
const nameField = document.getElementById('nameField');
const confirmPasswordField = document.getElementById('confirmPasswordField');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authSwitchText = document.getElementById('authSwitchText');
const authSwitchLink = document.getElementById('authSwitchLink');

// NUEVO: Elementos para recuperación de contraseña
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const recoveryScreen = document.getElementById('recoveryScreen');
const recoveryBack = document.getElementById('recoveryBack');
const recoveryForm = document.getElementById('recoveryForm');
const sendRecoveryBtn = document.getElementById('sendRecoveryBtn');

// Elementos del menú móvil (solo navegación, sin botones de usuario/carrito)
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const closeMobileNav = document.getElementById('closeMobileNav');

let isLoginMode = true;
let editingProductIndex = -1;

// Clave única para almacenar el carrito en localStorage
const CART_STORAGE_KEY = 'nutricroc_shared_cart';

// ===== FUNCIONES DE NOTIFICACIONES MEJORADAS =====
function showNotification(message = 'El producto se agregó de manera exitosa') {
  notification.querySelector('.notification-text').textContent = message;
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

function showStockNotification() {
  stockNotification.classList.add('show');
  setTimeout(() => {
    stockNotification.classList.remove('show');
  }, 3000);
}

// NUEVA FUNCIÓN: Mostrar notificación de correo enviado
function showEmailSentNotification() {
  emailSentNotification.classList.add('show');
  setTimeout(() => {
    emailSentNotification.classList.remove('show');
  }, 3000);
}

// NUEVA FUNCIÓN: Mostrar notificación de cantidad actualizada
function showQuantityUpdatedNotification() {
  quantityUpdatedNotification.classList.add('show');
  setTimeout(() => {
    quantityUpdatedNotification.classList.remove('show');
  }, 3000);
}

// ===== FUNCIONES DEL MENÚ MÓVIL =====
function openMobileNav() {
  mobileNav.classList.add('open');
  mobileNavOverlay.style.display = 'block';
  setTimeout(() => {
    mobileNavOverlay.classList.add('active');
  }, 10);
  document.body.style.overflow = 'hidden';
}

function closeMobileNavFunc() {
  mobileNav.classList.remove('open');
  mobileNavOverlay.classList.remove('active');
  setTimeout(() => {
    mobileNavOverlay.style.display = 'none';
  }, 300);
  document.body.style.overflow = 'auto';
}

function updateMobileCartCount() {
  updateCartCount();
}

// ===== FUNCIONES DEL CARRITO =====
function loadCartFromStorage() {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (savedCart) {
    try {
      cartItems = JSON.parse(savedCart);
    } catch (e) {
      console.error('Error al cargar el carrito:', e);
      cartItems = [];
    }
  }
}

function saveCartToStorage() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
}

function updateCartCount() {
  let totalQuantity = 0;
  cartItems.forEach(item => {
    totalQuantity += item.quantity;
  });
  
  cartCount.textContent = totalQuantity;
  cartCountTitle.textContent = `(${totalQuantity})`;
}

function calculateCartTotals() {
  let subtotal = 0;
  cartItems.forEach(item => {
    subtotal += parseFloat(item.price) * item.quantity;
  });
  
  const envio = 0;
  const total = subtotal + envio;
  
  return {
    subtotal: subtotal.toFixed(2),
    envio: envio.toFixed(2),
    total: total.toFixed(2)
  };
}

function updateCartTotal() {
  const totals = calculateCartTotals();
  
  summaryProductCount.textContent = cartItems.length;
  summarySubtotal.textContent = `$${totals.subtotal}`;
  summaryEnvio.textContent = 'Gratis';
  summaryTotalAmount.textContent = `$${totals.total}`;
}

function toggleCartSummary() {
  if (cartItems.length > 0) {
    cartSummary.classList.add('visible');
  } else {
    cartSummary.classList.remove('visible');
  }
}

function renderCartItems() {
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-image"></div>
        <p class="cart-empty-text">Aún no cuentas con productos</p>
        <button class="discover-btn" onclick="window.location.href='productos.html'">Descubrir</button>
      </div>
    `;
  } else {
    let itemsHTML = '';
    cartItems.forEach((item, index) => {
      const subtotal = (parseFloat(item.price) * item.quantity).toFixed(2);
      itemsHTML += `
        <div class="cart-item" id="cart-item-${index}">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <div class="cart-item-info">
              <div class="cart-item-price">$${subtotal}</div>
              <div class="cart-item-actions">
                <button class="cart-item-action edit-item" data-index="${index}">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="cart-item-action remove-item" data-index="${index}">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-quantity">
              <span class="quantity-display">${item.quantity} × $${item.price}</span>
            </div>
          </div>
        </div>
      `;
    });
    cartItemsContainer.innerHTML = itemsHTML;
    
    document.querySelectorAll('.edit-item').forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const index = this.getAttribute('data-index');
        showEditScreen(index);
      });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const index = this.getAttribute('data-index');
        showDeleteSpinner(index);
      });
    });
  }
}

function updateCartUI() {
  updateCartCount();
  updateCartTotal();
  renderCartItems();
  toggleCartSummary();
}

function showEditScreen(index) {
  editingProductIndex = index;
  const product = cartItems[index];
  
  editProductName.textContent = product.name;
  editProductPrice.textContent = `$${product.price}`;
  editQuantityInput.value = product.quantity;
  
  editProductImages.innerHTML = '';
  for (let i = 0; i < 2; i++) {
    const imageDiv = document.createElement('div');
    imageDiv.className = 'edit-product-image';
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    imageDiv.appendChild(img);
    editProductImages.appendChild(imageDiv);
  }
  
  editScreen.style.display = 'flex';
  setTimeout(() => {
    editScreen.classList.add('active');
  }, 10);
}

function hideEditScreen() {
  editScreen.classList.add('slide-out');
  setTimeout(() => {
    editScreen.classList.remove('active');
    editScreen.classList.remove('slide-out');
    editScreen.style.display = 'none';
    editingProductIndex = -1;
  }, 500);
}

// NUEVA FUNCIÓN: Mostrar spinner dentro del ítem específico
function showDeleteSpinner(index) {
  const cartItem = document.getElementById(`cart-item-${index}`);
  if (!cartItem) return;
  
  const spinnerHTML = `
    <div class="cart-item-spinner">
      <div class="spinner"></div>
      <p>Eliminando producto...</p>
    </div>
  `;
  cartItem.insertAdjacentHTML('beforeend', spinnerHTML);
  
  setTimeout(() => {
    const spinner = cartItem.querySelector('.cart-item-spinner');
    if (spinner) spinner.remove();
    showDeleteConfirmation(index);
  }, 1500);
}

// NUEVA FUNCIÓN: Mostrar confirmación dentro del ítem específico
function showDeleteConfirmation(index) {
  const cartItem = document.getElementById(`cart-item-${index}`);
  if (!cartItem) return;
  
  const confirmationHTML = `
    <div class="cart-item-confirmation">
      <div class="cart-item-confirmation-image">
        <i class="fas fa-check"></i>
      </div>
      <p class="cart-item-confirmation-text">Producto eliminado de manera exitosa</p>
    </div>
  `;
  cartItem.insertAdjacentHTML('beforeend', confirmationHTML);
  
  setTimeout(() => {
    const confirmation = cartItem.querySelector('.cart-item-confirmation');
    if (confirmation) confirmation.remove();
    removeFromCart(index);
  }, 1500);
}

function addToCart(product) {
  const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += 1;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }
  
  updateCartUI();
  saveCartToStorage();
  showNotification('Producto agregado al carrito');
}

function removeFromCart(index) {
  if (index >= 0 && index < cartItems.length) {
    cartItems.splice(index, 1);
    updateCartUI();
    saveCartToStorage();
  }
}

function updateProductQuantity(index, newQuantity) {
  if (newQuantity < 1) newQuantity = 1;
  
  if (newQuantity > 30) {
    showStockNotification();
    editQuantityInput.value = cartItems[index].quantity;
    return false;
  }
  
  if (index >= 0 && index < cartItems.length) {
    cartItems[index].quantity = newQuantity;
    updateCartUI();
    saveCartToStorage();
    showQuantityUpdatedNotification();
    return true;
  }
  return false;
}

function clearCart() {
  cartItems = [];
  updateCartUI();
  saveCartToStorage();
}

// ===== FUNCIONALIDAD DEL CARRITO =====
cartBtn.addEventListener('click', () => {
  cartOverlay.style.display = 'block';
  cartSidebar.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeCartFunc() {
  cartOverlay.style.display = 'none';
  cartSidebar.classList.remove('open');
  document.body.style.overflow = 'auto';
}

closeCart.addEventListener('click', closeCartFunc);
cartOverlay.addEventListener('click', closeCartFunc);

checkoutBtn.addEventListener('click', () => {
  if (cartItems.length === 0) {
    alert('Tu carrito está vacío. Agrega productos antes de comprar.');
    return;
  }
  
  alert(`¡Compra realizada! Total: $${calculateCartTotals().total}\n\nEsta es una funcionalidad de demostración. En una implementación real, aquí se procesaría el pago.`);
  
  clearCart();
  closeCartFunc();
});

// ===== FUNCIONALIDAD DEL USUARIO =====
userBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  userDropdown.classList.toggle('show');
});

document.addEventListener('click', () => {
  userDropdown.classList.remove('show');
});

loginLink.addEventListener('click', (e) => {
  e.preventDefault();
  userDropdown.classList.remove('show');
  openAuthModal(true);
});

registerLink.addEventListener('click', (e) => {
  e.preventDefault();
  userDropdown.classList.remove('show');
  openAuthModal(false);
});

accountLink.addEventListener('click', (e) => {
  e.preventDefault();
  userDropdown.classList.remove('show');
  alert('Redirigiendo a Mi Cuenta');
});

// ===== FUNCIONALIDAD DE AUTENTICACIÓN MEJORADA =====
function openAuthModal(login) {
  isLoginMode = login;
  
  if (isLoginMode) {
    authTitle.textContent = 'Iniciar Sesión';
    authSubmitBtn.textContent = 'Iniciar Sesión';
    authSwitchText.textContent = '¿No tienes una cuenta? ';
    authSwitchLink.textContent = 'Regístrate';
    nameField.style.display = 'none';
    confirmPasswordField.style.display = 'none';
    authImage.src = 'img/loginnutricroc.png';
    forgotPasswordLink.style.display = 'block';
  } else {
    authTitle.textContent = 'Registrarse';
    authSubmitBtn.textContent = 'Registrarse';
    authSwitchText.textContent = '¿Ya tienes una cuenta? ';
    authSwitchLink.textContent = 'Inicia Sesión';
    nameField.style.display = 'flex';
    confirmPasswordField.style.display = 'flex';
    authImage.src = 'img/regristrarnutricroc.png';
    forgotPasswordLink.style.display = 'none';
  }
  
  authOverlay.style.display = 'block';
  authSidebar.classList.add('open');
  document.body.style.overflow = 'hidden';
  hideRecoveryScreen();
}

function closeAuthFunc() {
  authOverlay.style.display = 'none';
  authSidebar.classList.remove('open');
  document.body.style.overflow = 'auto';
  authForm.reset();
  hideRecoveryScreen();
}

closeAuth.addEventListener('click', closeAuthFunc);
authOverlay.addEventListener('click', closeAuthFunc);

authSwitchLink.addEventListener('click', (e) => {
  e.preventDefault();
  openAuthModal(!isLoginMode);
});

// NUEVO: Enlace "Olvidaste tu contraseña"
forgotPasswordLink.addEventListener('click', (e) => {
  e.preventDefault();
  showRecoveryScreen();
});

// NUEVO: Botón para volver desde recuperación
recoveryBack.addEventListener('click', () => {
  hideRecoveryScreen();
});

// NUEVO: Envío de formulario de recuperación
recoveryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('recoveryEmail').value;
  const confirmEmail = document.getElementById('confirmRecoveryEmail').value;
  
  if (email !== confirmEmail) {
    alert('Los correos electrónicos no coinciden');
    return;
  }
  
  if (!email) {
    alert('Por favor ingresa un correo electrónico válido');
    return;
  }
  
  sendRecoveryEmail(email);
});

// NUEVO: Mostrar pantalla de recuperación
function showRecoveryScreen() {
  recoveryScreen.classList.add('active');
  recoveryForm.reset();
}

// NUEVO: Ocultar pantalla de recuperación
function hideRecoveryScreen() {
  recoveryScreen.classList.remove('active');
}

// NUEVO: Enviar correo de recuperación
function sendRecoveryEmail(email) {
  console.log('Enviando correo de recuperación a:', email);
  showEmailSentNotification();
  setTimeout(() => {
    hideRecoveryScreen();
  }, 1000);
}

authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (isLoginMode) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
      isLoggedIn = true;
      updateUserInterface();
      closeAuthFunc();
      showNotification('¡Inicio de sesión exitoso!');
    }
  } else {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (name && email && password) {
      isLoggedIn = true;
      updateUserInterface();
      closeAuthFunc();
      showNotification('¡Registro exitoso!');
    }
  }
});

function updateUserInterface() {
  if (isLoggedIn) {
    loginLink.style.display = 'none';
    registerLink.style.display = 'none';
    accountLink.style.display = 'block';
  } else {
    loginLink.style.display = 'block';
    registerLink.style.display = 'block';
    accountLink.style.display = 'none';
  }
}

// ===== FUNCIONALIDAD DEL MENÚ MÓVIL =====
mobileMenuBtn.addEventListener('click', openMobileNav);
closeMobileNav.addEventListener('click', closeMobileNavFunc);
mobileNavOverlay.addEventListener('click', closeMobileNavFunc);

// ===== SCROLL TO TOP =====
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

// ===== SLIDER DE IMÁGENES =====
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

// ===== FUNCIONALIDAD DE EDICIÓN DEL CARRITO =====
editBack.addEventListener('click', hideEditScreen);

decreaseQuantityBtn.addEventListener('click', () => {
  let currentValue = parseInt(editQuantityInput.value);
  if (currentValue > 1) {
    editQuantityInput.value = currentValue - 1;
  }
});

increaseQuantityBtn.addEventListener('click', () => {
  let currentValue = parseInt(editQuantityInput.value);
  editQuantityInput.value = currentValue + 1;
});

saveEditBtn.addEventListener('click', () => {
  const newQuantity = parseInt(editQuantityInput.value);
  
  if (newQuantity > 30) {
    showStockNotification();
    return;
  }
  
  if (updateProductQuantity(editingProductIndex, newQuantity)) {
    hideEditScreen();
  }
});

// ===== INICIALIZACIÓN =====
function init() {
  loadCartFromStorage();
  updateCartUI();
  updateUserInterface();
}

// Hacer funciones disponibles globalmente
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateProductQuantity = updateProductQuantity;
window.clearCart = clearCart;
window.getCartItems = () => cartItems;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}