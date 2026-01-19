// ===== VARIABLES GLOBALES ACTUALIZADAS =====
let cartItems = [];
let allProducts = [];
let filteredProducts = [];
const CART_STORAGE_KEY = 'nutricroc_shared_cart';
const COMPRA_COMPLETADA_KEY = 'compra_completada';
let isLoggedIn = false;
let isLoginMode = true;
let currentCheckoutStep = 'cart';
let editingProductIndex = -1;
let currentMinPrice = 0;
let currentMaxPrice = 150;
let currentTag = 'all';
let currentSearch = '';
let currentCheckoutFullStep = 1;
let selectedPaymentMethod = null;
let reenviarAttempts = 0;
const MAX_REENVIAR_ATTEMPTS = 3;
let reenviarBtnDisabled = false;
let reenviarTimeout = null;

// Elementos del DOM - TODOS LOS NUEVOS
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
const mobileCartCount = document.getElementById('mobileCartCount');
const widgetCartCount = document.getElementById('widgetCartCount');
const widgetCartEmpty = document.getElementById('widgetCartEmpty');
const notification = document.getElementById('notification');
const stockNotification = document.getElementById('stockNotification');
const paymentErrorNotification = document.getElementById('paymentErrorNotification');
const reenvioNotification = document.getElementById('reenvioNotification');
const emailSentNotification = document.getElementById('emailSentNotification');

// Nuevos elementos del checkout completo
const checkoutFullscreen = document.getElementById('checkoutFullscreen');
const closeCheckoutFull = document.getElementById('closeCheckoutFull');
const checkoutProductsList = document.getElementById('checkoutProductsList');
const checkoutProductCount = document.getElementById('checkoutProductCount');
const checkoutSubtotal = document.getElementById('checkoutSubtotal');
const checkoutEnvio = document.getElementById('checkoutEnvio');
const checkoutTotalAmount = document.getElementById('checkoutTotalAmount');
const progressBar = document.getElementById('progressBar');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const stepContent1 = document.getElementById('stepContent1');
const stepContent2 = document.getElementById('stepContent2');
const stepContent3 = document.getElementById('stepContent3');
const stepSpinner = document.getElementById('stepSpinner');
const fullDeliveryForm = document.getElementById('fullDeliveryForm');
const fullBuilding = document.getElementById('fullBuilding');
const fullClassroom = document.getElementById('fullClassroom');
const backToCartBtnFull = document.getElementById('backToCartBtnFull');
const continueToPaymentFullBtn = document.getElementById('continueToPaymentFullBtn');
const fullPaymentOptions = document.querySelectorAll('.payment-option');
const fullCardFields = document.getElementById('fullCardFields');
const fullCardNumber = document.getElementById('fullCardNumber');
const fullCardHolder = document.getElementById('fullCardHolder');
const fullExpiryDate = document.getElementById('fullExpiryDate');
const fullCvv = document.getElementById('fullCvv');
const backToDeliveryBtn = document.getElementById('backToDeliveryBtn');
const processPaymentBtn = document.getElementById('processPaymentBtn');
const confirmationDate = document.getElementById('confirmationDate');
const confirmationMethod = document.getElementById('confirmationMethod');
const confirmationOrder = document.getElementById('confirmationOrder');
const confirmationSubtotal = document.getElementById('confirmationSubtotal');
const confirmationEnvio = document.getElementById('confirmationEnvio');
const confirmationTotal = document.getElementById('confirmationTotal');
const finishCheckoutBtn = document.getElementById('finishCheckoutBtn');
const confettiSuccess = document.getElementById('confettiSuccess');
const reenviarCorreoBtnFull = document.getElementById('reenviarCorreoBtnFull');

// Elementos de edición
const editScreen = document.getElementById('editScreen');
const editBack = document.getElementById('editBack');
const editProductImages = document.getElementById('editProductImages');
const editProductName = document.getElementById('editProductName');
const editProductPrice = document.getElementById('editProductPrice');
const editQuantityInput = document.getElementById('editQuantityInput');
const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
const increaseQuantityBtn = document.getElementById('increaseQuantity');
const saveEditBtn = document.getElementById('saveEditBtn');

// Elementos del checkout antiguo
const checkoutBtn = document.getElementById('checkoutBtn');
const deliveryScreen = document.getElementById('deliveryScreen');
const deliveryBack = document.getElementById('deliveryBack');
const deliveryForm = document.getElementById('deliveryForm');
const buildingSelect = document.getElementById('building');
const classroomSelect = document.getElementById('classroom');
const continueToPaymentBtn = document.getElementById('continueToPaymentBtn');
const paymentScreen = document.getElementById('paymentScreen');
const paymentBack = document.getElementById('paymentBack');
const paymentOptions = document.querySelectorAll('.payment-option');
const cardRadio = document.getElementById('cardRadio');
const paypalRadio = document.getElementById('paypalRadio');
const cashRadio = document.getElementById('cashRadio');
const cardFields = document.getElementById('cardFields');
const cardNumberInput = document.getElementById('cardNumber');
const cardHolderInput = document.getElementById('cardHolder');
const expiryDateInput = document.getElementById('expiryDate');
const cvvInput = document.getElementById('cvv');
const completePurchaseBtn = document.getElementById('completePurchaseBtn');
const paymentSpinner = document.getElementById('paymentSpinner');
const confirmationScreen = document.getElementById('confirmationScreen');
const confettiContainer = document.getElementById('confettiContainer');
const keepShoppingBtn = document.getElementById('keepShoppingBtn');

// Elementos de correo
const reenviarCorreoBtn = document.getElementById('reenviarCorreoBtn');
const cambiarCorreoBtn = document.getElementById('cambiarCorreoBtn');
const cambiarCorreoModal = document.getElementById('cambiarCorreoModal');
const closeCambiarCorreo = document.getElementById('closeCambiarCorreo');
const cambiarCorreoForm = document.getElementById('cambiarCorreoForm');
const correoRenviadoNotification = document.getElementById('correoRenviadoNotification');

// NUEVOS: Elementos de autenticación
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
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const recoveryScreen = document.getElementById('recoveryScreen');
const recoveryBack = document.getElementById('recoveryBack');
const recoveryForm = document.getElementById('recoveryForm');
const recoveryEmail = document.getElementById('recoveryEmail');
const confirmRecoveryEmail = document.getElementById('confirmRecoveryEmail');
const sendRecoveryBtn = document.getElementById('sendRecoveryBtn');

// NUEVOS: Elementos del menú móvil
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const closeMobileNav = document.getElementById('closeMobileNav');
const productsMobileToggle = document.getElementById('productsMobileToggle');
const productsMobileMenu = document.getElementById('productsMobileMenu');
const mobileUserBtn = document.getElementById('mobileUserBtn');
const mobileCartBtn = document.getElementById('mobileCartBtn');

// Elementos de filtrado y búsqueda
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const sortSelect = document.getElementById('sortSelect');
const minPriceRange = document.getElementById('minPriceRange');
const maxPriceRange = document.getElementById('maxPriceRange');
const minPriceDisplay = document.getElementById('minPrice');
const maxPriceDisplay = document.getElementById('maxPrice');
const applyPriceFilterBtn = document.getElementById('applyPriceFilterBtn');
const tags = document.querySelectorAll('.tag');
const productCount = document.getElementById('productCount');
const productsGrid = document.getElementById('productsGrid');
const noProductsContainer = document.getElementById('noProductsContainer');

// Datos de los edificios y salones
const buildingClassrooms = {
  'A': Array.from({length: 11}, (_, i) => `Salón ${i + 1}`),
  'B': Array.from({length: 11}, (_, i) => `Salón ${i + 1}`),
  'C': Array.from({length: 11}, (_, i) => `Salón ${i + 1}`),
  'D': Array.from({length: 7}, (_, i) => `Salón ${i + 1}`),
  'X': Array.from({length: 7}, (_, i) => `Salón ${i + 1}`)
};

// Datos de productos
const productData = [
  {
    id: 1,
    name: "Ensalada Refrescante de Uvas, Feta/Mozzarella y Nueces",
    price: 25.00,
    oldPrice: 29.00,
    image: "img/Carte1.jpeg",
    category: "Ensalada",
    tags: ["Ensalada", "oferta"],
    popularity: 8,
    rating: 4.5,
    isNew: false
  },
  {
    id: 2,
    name: "Tostada de Salmón, Aguacate y Huevo con Semillas",
    price: 84.00,
    oldPrice: null,
    image: "img/Espe3.jpeg",
    category: "Ensalada",
    tags: ["Ensalada"],
    popularity: 9,
    rating: 4.8,
    isNew: true
  },
  {
    id: 3,
    name: "Tostada de Aguacate y Queso Halloumi a la Parrilla",
    price: 15.00,
    oldPrice: null,
    image: "img/Carte7.jpeg",
    category: "Tostada",
    tags: ["Tostada"],
    popularity: 7,
    rating: 4.3,
    isNew: false
  },
  {
    id: 4,
    name: "Torre de Yogur, Avena y Bayas",
    price: 95.00,
    oldPrice: null,
    image: "img/postreE1.jpeg",
    category: "Yogur",
    tags: ["Yogur"],
    popularity: 6,
    rating: 4.6,
    isNew: true
  },
  {
    id: 5,
    name: "Ensalada de Otoño con Manzana, Nueces y Queso de Cabra",
    price: 45.00,
    oldPrice: null,
    image: "img/postreE3.jpeg",
    category: "Ensalada",
    tags: ["Ensalada"],
    popularity: 7,
    rating: 4.4,
    isNew: false
  },
  {
    id: 6,
    name: "Tostada Caprese de Tomates Cherry y Queso",
    price: 20.00,
    oldPrice: null,
    image: "img/postreE6.jpeg",
    category: "Tostada",
    tags: ["Tostada"],
    popularity: 8,
    rating: 4.7,
    isNew: false
  },
  {
    id: 7,
    name: "Bandeja de Frutas Frescas y Antioxidantes",
    price: 110.00,
    oldPrice: null,
    image: "img/postreC1.jpeg",
    category: "Frutas",
    tags: ["Frutas","Antioxidantes"],
    popularity: 5,
    rating: 4.2,
    isNew: true
  },
  {
    id: 8,
    name: "Pudín de Chía Verde y Kiwi con Topping de Semillas",
    price: 18.00,
    oldPrice: null,
    image: "img/postreC6.jpeg",
    category: "Pudín",
    tags: ["Pudín","Semillas"],
    popularity: 9,
    rating: 4.9,
    isNew: false
  },
  {
    id: 9,
    name: "Parfait de Chía/Avena de Matcha",
    price: 12.00,
    oldPrice: null,
    image: "img/postreE2.jpeg",
    category: "Parfait",
    tags: ["Parfait","Avena"],
    popularity: 8,
    rating: 4.5,
    isNew: false
  },
  {
    id: 10,
    name: "Ensalada de Pasta de Trigo Integral con Vegetales Frescos",
    price: 22.00,
    oldPrice: null,
    image: "img/productos1.jpeg",
    category: "Ensalada",
    tags: ["Ensalada","Pasta","Vegetales"],
    popularity: 7,
    rating: 4.3,
    isNew: true
  },
  {
    id: 11,
    name: "Tarta de Higo con Base de Miel y Frutos Secos",
    price: 65.00,
    oldPrice: null,
    image: "img/principal3.jpeg",
    category: "Tarta",
    tags: ["Tarta","Frutos Secos"],
    popularity: 9,
    rating: 4.8,
    isNew: false
  },
  {
    id: 12,
    name: "Envolturas de Lechuga de Ensalada de Pollo y Manzana",
    price: 28.00,
    oldPrice: null,
    image: "img/Carte4.jpeg",
    category: "Envolturas",
    tags: ["Envolturas","Ensalada"],
    popularity: 6,
    rating: 4.4,
    isNew: true
  }
];

// ===== NUEVAS FUNCIONES DE NOTIFICACIÓN =====
function showStockNotification() {
  stockNotification.classList.add('show');
  setTimeout(() => {
    stockNotification.classList.remove('show');
  }, 3000);
}

function showPaymentErrorNotification() {
  paymentErrorNotification.classList.add('show');
  setTimeout(() => {
    paymentErrorNotification.classList.remove('show');
  }, 5000);
}

function showReenvioNotification() {
  reenvioNotification.classList.add('show');
  setTimeout(() => {
    reenvioNotification.classList.remove('show');
  }, 3000);
}

function showEmailSentNotification() {
  emailSentNotification.classList.add('show');
  setTimeout(() => {
    emailSentNotification.classList.remove('show');
  }, 3000);
}

// ===== FUNCIONES DEL CARRITO =====
function setupStorageListener() {
  window.addEventListener('storage', function(event) {
    if (event.key === CART_STORAGE_KEY) {
      console.log('Carrito actualizado desde otra pestaña');
      loadCartFromStorage();
      updateCartUI();
    }
  });
}

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
  const event = new StorageEvent('storage', {
    key: CART_STORAGE_KEY,
    newValue: JSON.stringify(cartItems)
  });
  window.dispatchEvent(event);
}

function showNotification(message = 'El producto se agregó de manera exitosa') {
  notification.querySelector('.notification-text').textContent = message;
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

function updateCartCount() {
  let totalQuantity = 0;
  cartItems.forEach(item => {
    totalQuantity += item.quantity;
  });
  
  cartCount.textContent = totalQuantity;
  mobileCartCount.textContent = totalQuantity;
  widgetCartCount.textContent = totalQuantity;
  
  // Mostrar solo el número
  cartCountTitle.textContent = `(${totalQuantity})`;
  
  if (cartItems.length === 0) {
    widgetCartEmpty.style.display = 'block';
    widgetCartCount.style.display = 'none';
  } else {
    widgetCartEmpty.style.display = 'none';
    widgetCartCount.style.display = 'block';
  }
}

function calculateCartTotals() {
  let subtotal = 0;
  cartItems.forEach(item => {
    subtotal += parseFloat(item.price) * item.quantity;
  });
  
  const envio = 0; // Envío gratis
  const total = subtotal + envio;
  
  return {
    subtotal: subtotal.toFixed(2),
    envio: envio.toFixed(2),
    total: total.toFixed(2)
  };
}

function updateCartTotal() {
  const totals = calculateCartTotals();
  
  // Actualizar todos los totales
  summaryProductCount.textContent = cartItems.length;
  checkoutProductCount.textContent = cartItems.length;
  
  summarySubtotal.textContent = `$${totals.subtotal}`;
  summaryEnvio.textContent = 'Gratis';
  summaryTotalAmount.textContent = `$${totals.total}`;
  
  checkoutSubtotal.textContent = `$${totals.subtotal}`;
  checkoutEnvio.textContent = 'Gratis';
  checkoutTotalAmount.textContent = `$${totals.total}`;
  
  confirmationSubtotal.textContent = `$${totals.subtotal}`;
  confirmationEnvio.textContent = 'Gratis';
  confirmationTotal.textContent = `$${totals.total}`;
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
        <div class="cart-item">
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

// NUEVA FUNCIÓN: Renderizar productos en el checkout
function renderCheckoutProducts() {
  if (cartItems.length === 0) {
    checkoutProductsList.innerHTML = '<p class="cart-empty-text">No hay productos en el carrito</p>';
    return;
  }
  
  let itemsHTML = '';
  cartItems.forEach((item, index) => {
    const subtotal = (parseFloat(item.price) * item.quantity).toFixed(2);
    itemsHTML += `
      <div class="checkout-product-item">
        <div class="checkout-product-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="checkout-product-details">
          <div class="checkout-product-name">${item.name}</div>
          <div class="checkout-product-quantity">${item.quantity} × $${item.price}</div>
          <div class="checkout-product-price">$${subtotal}</div>
        </div>
      </div>
    `;
  });
  checkoutProductsList.innerHTML = itemsHTML;
}

function updateCartUI() {
  updateCartCount();
  updateCartTotal();
  renderCartItems();
  renderCheckoutProducts();
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

function showDeleteSpinner(index) {
  const spinnerHTML = `
    <div class="delete-spinner">
      <div class="spinner"></div>
      <p>Eliminando producto...</p>
    </div>
  `;
  cartItemsContainer.insertAdjacentHTML('beforeend', spinnerHTML);
  
  setTimeout(() => {
    document.querySelector('.delete-spinner').remove();
    showDeleteConfirmation(index);
  }, 3000);
}

function showDeleteConfirmation(index) {
  const confirmationHTML = `
    <div class="delete-confirmation">
      <div class="confirmation-image">
        <i class="fas fa-check"></i>
      </div>
      <p class="confirmation-text">Producto eliminado de manera exitosa</p>
    </div>
  `;
  cartItemsContainer.insertAdjacentHTML('beforeend', confirmationHTML);
  
  setTimeout(() => {
    document.querySelector('.delete-confirmation').remove();
    removeFromCart(index);
  }, 2000);
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

// MODIFICADA: Función para actualizar cantidad con validación de stock
function updateProductQuantity(index, newQuantity) {
  if (newQuantity < 1) newQuantity = 1;
  
  // NUEVA VALIDACIÓN: Verificar si la cantidad es mayor a 30
  if (newQuantity > 30) {
    showStockNotification();
    editQuantityInput.value = cartItems[index].quantity;
    return false;
  }
  
  if (index >= 0 && index < cartItems.length) {
    cartItems[index].quantity = newQuantity;
    updateCartUI();
    saveCartToStorage();
    return true;
  }
  return false;
}

function clearCart() {
  cartItems = [];
  updateCartUI();
  saveCartToStorage();
  localStorage.removeItem(COMPRA_COMPLETADA_KEY);
}

// ===== NUEVAS FUNCIONES DEL CHECKOUT COMPLETO =====
function showCheckoutFullscreen() {
  if (cartItems.length === 0) {
    alert('Tu carrito está vacío. Agrega productos antes de comprar.');
    return;
  }
  
  checkoutFullscreen.classList.add('active');
  document.body.style.overflow = 'hidden';
  showCheckoutFullStep(1);
  renderCheckoutProducts();
  resetReenviarBtn();
}

function closeCheckoutFullscreen() {
  if (currentCheckoutFullStep === 3) {
    clearCart();
  }
  
  checkoutFullscreen.classList.remove('active');
  document.body.style.overflow = 'auto';
  resetCheckoutFullForms();
}

function showCheckoutFullStep(step) {
  currentCheckoutFullStep = step;
  
  stepContent1.classList.remove('active');
  stepContent2.classList.remove('active');
  stepContent3.classList.remove('active');
  
  step1.classList.remove('active', 'completed');
  step2.classList.remove('active', 'completed');
  step3.classList.remove('active', 'completed');
  
  stepSpinner.classList.add('active');
  
  setTimeout(() => {
    stepSpinner.classList.remove('active');
    
    if (step === 1) {
      stepContent1.classList.add('active');
      step1.classList.add('active');
    } else if (step === 2) {
      stepContent2.classList.add('active');
      step1.classList.add('completed');
      step2.classList.add('active');
    } else if (step === 3) {
      stepContent3.classList.add('active');
      step1.classList.add('completed');
      step2.classList.add('completed');
      step3.classList.add('active');
      
      generateConfirmationInfo();
      createConfettiSuccess();
      localStorage.setItem(COMPRA_COMPLETADA_KEY, 'true');
    }
  }, 2000);
}

function resetCheckoutFullForms() {
  fullDeliveryForm.reset();
  fullClassroom.disabled = true;
  fullClassroom.innerHTML = '<option value="">Selecciona un salón</option>';
  
  fullPaymentOptions.forEach(option => option.classList.remove('selected'));
  selectedPaymentMethod = null;
  fullCardFields.classList.remove('show');
  fullCardNumber.value = '';
  fullCardHolder.value = '';
  fullExpiryDate.value = '';
  fullCvv.value = '';
  
  currentCheckoutFullStep = 1;
}

function updateFullClassroomOptions() {
  const building = fullBuilding.value;
  fullClassroom.innerHTML = '<option value="">Selecciona un salón</option>';
  
  if (building && buildingClassrooms[building]) {
    buildingClassrooms[building].forEach(classroom => {
      const option = document.createElement('option');
      option.value = classroom;
      option.textContent = classroom;
      fullClassroom.appendChild(option);
    });
    fullClassroom.disabled = false;
  } else {
    fullClassroom.disabled = true;
  }
}

function validateFullDeliveryForm() {
  const building = fullBuilding.value;
  const classroom = fullClassroom.value;
  const recipientName = document.getElementById('fullRecipientName').value;
  const recipientPhone = document.getElementById('fullRecipientPhone').value;
  const recipientEmail = document.getElementById('fullRecipientEmail').value;
  
  return building && classroom && recipientName.trim() && recipientPhone.trim() && recipientEmail.trim();
}

function validateFullPaymentForm() {
  if (!selectedPaymentMethod) {
    return false;
  }
  
  if (selectedPaymentMethod === 'card') {
    const cardNumber = fullCardNumber.value.replace(/\s/g, '');
    const cardHolder = fullCardHolder.value.trim();
    const expiryDate = fullExpiryDate.value;
    const cvv = fullCvv.value;
    
    const cardNumberValid = /^\d{16}$/.test(cardNumber);
    const cardHolderValid = cardHolder.length >= 3;
    const expiryDateValid = /^\d{2}\/\d{2}$/.test(expiryDate);
    const cvvValid = /^\d{3,4}$/.test(cvv);
    
    return cardNumberValid && cardHolderValid && expiryDateValid && cvvValid;
  }
  
  return true;
}

function generateConfirmationInfo() {
  const now = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  confirmationDate.textContent = now.toLocaleDateString('es-ES', options);
  confirmationMethod.textContent = getPaymentMethodName(selectedPaymentMethod);
  const orderNumber = 'NUTR-' + now.getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
  confirmationOrder.textContent = orderNumber;
  
  const totals = calculateCartTotals();
  confirmationSubtotal.textContent = `$${totals.subtotal}`;
  confirmationEnvio.textContent = 'Gratis';
  confirmationTotal.textContent = `$${totals.total}`;
}

function getPaymentMethodName(method) {
  switch(method) {
    case 'paypal': return 'PayPal';
    case 'card': return 'Tarjeta de crédito/débito';
    case 'cash': return 'Efectivo';
    default: return 'No seleccionado';
  }
}

function createConfettiSuccess() {
  confettiSuccess.innerHTML = '';
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.backgroundColor = i % 4 === 0 ? '#295732' : 
                                    i % 4 === 1 ? '#1e3d24' : 
                                    i % 4 === 2 ? '#704214' : '#76DCD8';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    confetti.style.animationDelay = Math.random() * 5 + 's';
    confettiSuccess.appendChild(confetti);
  }
}

function createConfetti() {
  confettiContainer.innerHTML = '';
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.backgroundColor = i % 4 === 0 ? '#295732' : 
                                    i % 4 === 1 ? '#1e3d24' : 
                                    i % 4 === 2 ? '#704214' : '#76DCD8';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    confetti.style.animationDelay = Math.random() * 5 + 's';
    confettiContainer.appendChild(confetti);
  }
}

// ===== FUNCIONES PARA CORREO =====
function showCorreoRenviadoNotification() {
  correoRenviadoNotification.classList.add('show');
  setTimeout(() => {
    correoRenviadoNotification.classList.remove('show');
  }, 2000);
}

function openCambiarCorreoModal() {
  cambiarCorreoModal.classList.add('active');
  cambiarCorreoForm.reset();
}

function closeCambiarCorreoModal() {
  cambiarCorreoModal.classList.remove('active');
}

function consumirEndpointReenviarCorreo() {
  fetch('http://localhost:8080/correo/envio/compra', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    return response.json();
  })
  .then(data => {
    console.log('Correo reenviado exitosamente:', data);
    showReenvioNotification();
  })
  .catch(error => {
    console.error('Error al reenviar correo:', error);
    showReenvioNotification();
  });
}

function consumirEndpointRegistro(nombreCompleto) {
  const endpoint = `http://localhost:8080/correo/envio/${encodeURIComponent(nombreCompleto)}`;
  
  fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    return response.json();
  })
  .then(data => {
    console.log('Correo de registro enviado exitosamente:', data);
  })
  .catch(error => {
    console.error('Error al enviar correo de registro:', error);
  });
}

function consumirEndpointComprar() {
  fetch('http://localhost:8080/correo/envio/compra', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    return response.json();
  })
  .then(data => {
    console.log('Correo de compra enviado exitosamente:', data);
  })
  .catch(error => {
    console.error('Error al enviar correo de compra:', error);
  });
}

// ===== NUEVAS FUNCIONES PARA RECUPERACIÓN DE CONTRASEÑA =====
function showRecoveryScreen() {
  recoveryScreen.classList.add('active');
  recoveryForm.reset();
}

function hideRecoveryScreen() {
  recoveryScreen.classList.remove('active');
}

function sendRecoveryEmail(email) {
  console.log('Enviando correo de recuperación a:', email);
  showEmailSentNotification();
  setTimeout(() => {
    hideRecoveryScreen();
  }, 1000);
}

// ===== FUNCIONES PARA CONTROLAR EL BOTÓN DE REENVIAR CORREO =====
function resetReenviarBtn() {
  reenviarAttempts = 0;
  reenviarBtnDisabled = false;
  if (reenviarTimeout) {
    clearTimeout(reenviarTimeout);
    reenviarTimeout = null;
  }
  
  const btn = document.getElementById('reenviarCorreoBtnFull');
  if (btn) {
    btn.disabled = false;
    btn.textContent = 'Reenviar correo';
  }
}

function disableReenviarBtnTemporalmente() {
  const btn = document.getElementById('reenviarCorreoBtnFull');
  if (!btn) return;
  
  btn.disabled = true;
  btn.textContent = 'Espere 60 segundos';
  
  reenviarTimeout = setTimeout(() => {
    if (reenviarAttempts < MAX_REENVIAR_ATTEMPTS) {
      btn.disabled = false;
      btn.textContent = 'Reenviar correo';
      reenviarBtnDisabled = false;
    }
  }, 60000);
}

function handleReenviarCorreo() {
  if (reenviarBtnDisabled || reenviarAttempts >= MAX_REENVIAR_ATTEMPTS) {
    return;
  }
  
  reenviarAttempts++;
  reenviarBtnDisabled = true;
  
  showReenvioNotification();
  consumirEndpointReenviarCorreo();
  
  if (reenviarAttempts >= MAX_REENVIAR_ATTEMPTS) {
    const btn = document.getElementById('reenviarCorreoBtnFull');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Límite alcanzado';
    }
  } else {
    disableReenviarBtnTemporalmente();
  }
}

// ===== FUNCIONES DE FILTRADO Y ORDENAMIENTO =====
function renderProducts() {
  productsGrid.innerHTML = '';
  noProductsContainer.classList.remove('show');
  
  if (filteredProducts.length === 0) {
    noProductsContainer.classList.add('show');
    productCount.textContent = `Mostrando 0 resultados`;
    return;
  }
  
  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.onclick = () => window.location.href = `producto.html?id=${product.id}`;
    
    let saleBadge = '';
    if (product.oldPrice) {
      saleBadge = '<span class="sale-badge">Oferta!</span>';
    }
    
    productCard.innerHTML = `
      ${saleBadge}
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}">
        <button class="add-to-cart-btn" 
                data-id="${product.id}" 
                data-name="${product.name}" 
                data-price="${product.price.toFixed(2)}" 
                data-image="${product.image}">
          +AGREGAR
        </button>
      </div>
      <div class="product-title">${product.name}</div>
      <div class="price">
        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
        $${product.price.toFixed(2)}
      </div>
    `;
    
    productsGrid.appendChild(productCard);
  });
  
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const product = {
        id: this.getAttribute('data-id'),
        name: this.getAttribute('data-name'),
        price: this.getAttribute('data-price'),
        image: this.getAttribute('data-image')
      };
      addToCart(product);
    });
  });
  
  productCount.textContent = `Mostrando ${filteredProducts.length} resultado${filteredProducts.length !== 1 ? 's' : ''}`;
}

function filterProducts() {
  filteredProducts = allProducts.filter(product => {
    if (product.price < currentMinPrice || product.price > currentMaxPrice) {
      return false;
    }
    
    if (currentTag !== 'all' && !product.tags.includes(currentTag)) {
      return false;
    }
    
    if (currentSearch && !product.name.toLowerCase().includes(currentSearch.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  sortProducts();
  renderProducts();
}

function sortProducts() {
  switch(sortSelect.value) {
    case 'popularity':
      filteredProducts.sort((a, b) => b.popularity - a.popularity);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'recent':
      filteredProducts.sort((a, b) => b.isNew - a.isNew);
      break;
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'default':
    default:
      filteredProducts.sort((a, b) => a.id - b.id);
      break;
  }
}

function updatePriceDisplay() {
  minPriceDisplay.textContent = currentMinPrice;
  maxPriceDisplay.textContent = currentMaxPrice;
  minPriceRange.value = currentMinPrice;
  maxPriceRange.value = currentMaxPrice;
}

function resetFilters() {
  currentMinPrice = 0;
  currentMaxPrice = 150;
  currentTag = 'all';
  currentSearch = '';
  searchInput.value = '';
  sortSelect.value = 'default';
  
  tags.forEach(tag => tag.classList.remove('active'));
  document.querySelector('.tag[data-tag="all"]').classList.add('active');
  
  updatePriceDisplay();
  filterProducts();
  
  showNotification('Filtros limpiados correctamente');
}

// ===== FUNCIONES DE AUTENTICACIÓN =====
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
  } else {
    authTitle.textContent = 'Registrarse';
    authSubmitBtn.textContent = 'Registrarse';
    authSwitchText.textContent = '¿Ya tienes una cuenta? ';
    authSwitchLink.textContent = 'Inicia Sesión';
    nameField.style.display = 'flex';
    confirmPasswordField.style.display = 'flex';
    authImage.src = 'img/regristrarnutricroc.png';
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
function toggleMobileNav() {
  mobileNav.classList.toggle('open');
  mobileNavOverlay.classList.toggle('active');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : 'auto';
}

function closeMobileNavFunc() {
  mobileNav.classList.remove('open');
  mobileNavOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ===== FUNCIONES AUXILIARES DEL CHECKOUT ANTIGUO =====
function updateClassroomOptions() {
  const building = buildingSelect.value;
  classroomSelect.innerHTML = '<option value="">Selecciona un salón</option>';
  
  if (building && buildingClassrooms[building]) {
    buildingClassrooms[building].forEach(classroom => {
      const option = document.createElement('option');
      option.value = classroom;
      option.textContent = classroom;
      classroomSelect.appendChild(option);
    });
    classroomSelect.disabled = false;
  } else {
    classroomSelect.disabled = true;
  }
}

function validateDeliveryForm() {
  const building = buildingSelect.value;
  const classroom = classroomSelect.value;
  const recipientName = document.getElementById('recipientName').value;
  const recipientPhone = document.getElementById('recipientPhone').value;
  
  return building && classroom && recipientName.trim() && recipientPhone.trim();
}

function validatePaymentForm() {
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  
  if (!paymentMethod) {
    return false;
  }
  
  if (paymentMethod.value === 'card') {
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    const cardHolder = cardHolderInput.value.trim();
    const expiryDate = expiryDateInput.value;
    const cvv = cvvInput.value;
    
    const cardNumberValid = /^\d{16}$/.test(cardNumber);
    const cardHolderValid = cardHolder.length >= 3;
    const expiryDateValid = /^\d{2}\/\d{2}$/.test(expiryDate);
    const cvvValid = /^\d{3,4}$/.test(cvv);
    
    return cardNumberValid && cardHolderValid && expiryDateValid && cvvValid;
  }
  
  return true;
}

function showCheckoutStep(step) {
  currentCheckoutStep = step;
  
  editScreen.style.display = 'none';
  editScreen.classList.remove('active');
  deliveryScreen.style.display = 'none';
  deliveryScreen.classList.remove('active');
  paymentScreen.style.display = 'none';
  paymentScreen.classList.remove('active');
  confirmationScreen.style.display = 'none';
  confirmationScreen.classList.remove('active');
  
  paymentSpinner.classList.remove('active');
  cambiarCorreoModal.classList.remove('active');
  
  switch(step) {
    case 'cart':
      toggleCartSummary();
      break;
    case 'delivery':
      deliveryScreen.style.display = 'flex';
      setTimeout(() => {
        deliveryScreen.classList.add('active');
      }, 10);
      break;
    case 'payment':
      paymentScreen.style.display = 'flex';
      setTimeout(() => {
        paymentScreen.classList.add('active');
      }, 10);
      break;
    case 'confirmation':
      confirmationScreen.style.display = 'flex';
      setTimeout(() => {
        confirmationScreen.classList.add('active');
      }, 10);
      createConfetti();
      break;
  }
}

function resetCheckoutForms() {
  deliveryForm.reset();
  classroomSelect.disabled = true;
  classroomSelect.innerHTML = '<option value="">Selecciona un salón</option>';
  
  paypalRadio.checked = false;
  cardRadio.checked = false;
  cashRadio.checked = false;
  cardFields.classList.remove('show');
  paymentOptions.forEach(option => option.classList.remove('selected'));
  cardNumberInput.value = '';
  cardHolderInput.value = '';
  expiryDateInput.value = '';
  cvvInput.value = '';
  completePurchaseBtn.disabled = true;
}

// ===== EVENT LISTENERS PRINCIPALES =====

// Carrito
cartBtn.addEventListener('click', () => {
  cartOverlay.style.display = 'block';
  cartSidebar.classList.add('open');
  document.body.style.overflow = 'hidden';
  // MODIFICADO: No llamar a showCheckoutStep para evitar que se muestre el banner
  // Solo mostrar el carrito normal
});

mobileCartBtn.addEventListener('click', () => {
  closeMobileNavFunc();
  cartOverlay.style.display = 'block';
  cartSidebar.classList.add('open');
  // MODIFICADO: No llamar a showCheckoutStep para evitar que se muestre el banner
  // Solo mostrar el carrito normal
});

function closeCartFunc() {
  cartOverlay.style.display = 'none';
  cartSidebar.classList.remove('open');
  document.body.style.overflow = 'auto';
  // MODIFICADO: Eliminado el showCheckoutStep('cart') para que no se muestre el banner
  resetCheckoutForms();
  confettiContainer.innerHTML = '';
}

closeCart.addEventListener('click', closeCartFunc);
cartOverlay.addEventListener('click', closeCartFunc);

// NUEVO: Botón de comprar abre el checkout completo
checkoutBtn.addEventListener('click', () => {
  closeCartFunc();
  setTimeout(() => {
    showCheckoutFullscreen();
  }, 300);
});

// NUEVO: Funcionalidad del checkout completo
closeCheckoutFull.addEventListener('click', closeCheckoutFullscreen);
fullBuilding.addEventListener('change', updateFullClassroomOptions);

backToCartBtnFull.addEventListener('click', () => {
  closeCheckoutFullscreen();
  setTimeout(() => {
    cartOverlay.style.display = 'block';
    cartSidebar.classList.add('open');
  }, 300);
});

continueToPaymentFullBtn.addEventListener('click', () => {
  if (validateFullDeliveryForm()) {
    showCheckoutFullStep(2);
  } else {
    alert('Por favor completa todos los campos requeridos de la información de entrega.');
  }
});

fullPaymentOptions.forEach(option => {
  option.addEventListener('click', () => {
    fullPaymentOptions.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    
    const radio = option.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
    }
    
    selectedPaymentMethod = option.dataset.method;
    if (selectedPaymentMethod === 'card') {
      fullCardFields.classList.add('show');
      setTimeout(() => {
        fullCardFields.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      fullCardFields.classList.remove('show');
    }
  });
});

fullCardNumber.addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  e.target.value = value.substring(0, 19);
});

fullExpiryDate.addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  e.target.value = value.substring(0, 5);
});

fullCvv.addEventListener('input', function(e) {
  e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
});

backToDeliveryBtn.addEventListener('click', () => {
  showCheckoutFullStep(1);
});

processPaymentBtn.addEventListener('click', () => {
  if (!selectedPaymentMethod) {
    alert('Por favor selecciona un método de pago.');
    return;
  }
  
  if (selectedPaymentMethod === 'card' && !validateFullPaymentForm()) {
    alert('Por favor completa correctamente los datos de pago.');
    return;
  }
  
  if (selectedPaymentMethod === 'card') {
    const cardNumber = fullCardNumber.value.replace(/\s/g, '');
    if (cardNumber === '4242424242424242') {
      showPaymentErrorNotification();
      return;
    }
  }
  
  if (selectedPaymentMethod === 'paypal') {
    window.open('https://www.paypal.com', '_blank');
  }
  
  consumirEndpointComprar();
  showCheckoutFullStep(3);
});

finishCheckoutBtn.addEventListener('click', () => {
  clearCart();
  closeCheckoutFullscreen();
});

// Funcionalidad del botón de reenviar correo en el checkout 
document.addEventListener('DOMContentLoaded', function() {
  const reenviarBtn = document.getElementById('reenviarCorreoBtnFull');
  if (reenviarBtn) {
    reenviarBtn.addEventListener('click', handleReenviarCorreo);
  }
});

// Funcionalidad del checkout antiguo
deliveryBack.addEventListener('click', () => {
  showCheckoutStep('cart');
  resetCheckoutForms();
});

buildingSelect.addEventListener('change', updateClassroomOptions);

continueToPaymentBtn.addEventListener('click', () => {
  if (validateDeliveryForm()) {
    showCheckoutStep('payment');
  } else {
    alert('Por favor completa todos los campos requeridos de la información de entrega.');
  }
});

paymentBack.addEventListener('click', () => {
  showCheckoutStep('delivery');
});

paymentOptions.forEach(option => {
  option.addEventListener('click', () => {
    paymentOptions.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    
    const method = option.dataset.method;
    if (method === 'card') {
      cardRadio.checked = true;
      cardFields.classList.add('show');
      setTimeout(() => {
        cardFields.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    } else if (method === 'paypal') {
      paypalRadio.checked = true;
      cardFields.classList.remove('show');
      completePurchaseBtn.disabled = false;
    } else if (method === 'cash') {
      cashRadio.checked = true;
      cardFields.classList.remove('show');
      completePurchaseBtn.disabled = false;
    }
    
    if (method !== 'paypal') {
      completePurchaseBtn.disabled = !validatePaymentForm();
    }
  });
});

cardNumberInput.addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  e.target.value = value.substring(0, 19);
});

expiryDateInput.addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  e.target.value = value.substring(0, 5);
});

cvvInput.addEventListener('input', function(e) {
  e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
});

[cardNumberInput, cardHolderInput, expiryDateInput, cvvInput].forEach(input => {
  input.addEventListener('input', () => {
    if (cardRadio.checked) {
      completePurchaseBtn.disabled = !validatePaymentForm();
    }
  });
});

completePurchaseBtn.addEventListener('click', () => {
  if (!validatePaymentForm()) {
    alert('Por favor completa correctamente los datos de pago.');
    return;
  }
  
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  
  if (paymentMethod.value === 'paypal') {
    window.open('https://www.paypal.com', '_blank');
    return;
  }
  
  if (paymentMethod.value === 'card') {
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    
    if (cardNumber === '4242424242424242') {
      paymentSpinner.classList.add('active');
      
      setTimeout(() => {
        paymentSpinner.classList.remove('active');
        showPaymentErrorNotification();
        return;
      }, 2000);
    } else {
      paymentSpinner.classList.add('active');
      consumirEndpointComprar();
      
      setTimeout(() => {
        paymentSpinner.classList.remove('active');
        showCheckoutStep('confirmation');
      }, 3000);
    }
  } else if (paymentMethod.value === 'cash') {
    paymentSpinner.classList.add('active');
    consumirEndpointComprar();
    
    setTimeout(() => {
      paymentSpinner.classList.remove('active');
      showCheckoutStep('confirmation');
    }, 3000);
  }
});

reenviarCorreoBtn.addEventListener('click', () => {
  consumirEndpointReenviarCorreo();
});

cambiarCorreoBtn.addEventListener('click', () => {
  openCambiarCorreoModal();
});

closeCambiarCorreo.addEventListener('click', closeCambiarCorreoModal);

cambiarCorreoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nuevoCorreo = document.getElementById('nuevoCorreo').value;
  const confirmarCorreo = document.getElementById('confirmarCorreo').value;
  
  if (nuevoCorreo !== confirmarCorreo) {
    alert('Los correos no coinciden');
    return;
  }
  
  if (nuevoCorreo) {
    console.log('Correo actualizado a:', nuevoCorreo);
    alert('Correo actualizado exitosamente');
    closeCambiarCorreoModal();
  }
});

cambiarCorreoModal.addEventListener('click', (e) => {
  if (e.target === cambiarCorreoModal) {
    closeCambiarCorreoModal();
  }
});

keepShoppingBtn.addEventListener('click', () => {
  closeCartFunc();
  resetCheckoutForms();
});

// Funcionalidad del usuario
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

// Funcionalidad del menú móvil
mobileMenuBtn.addEventListener('click', toggleMobileNav);
closeMobileNav.addEventListener('click', closeMobileNavFunc);
mobileNavOverlay.addEventListener('click', closeMobileNavFunc);

productsMobileToggle.addEventListener('click', () => {
  productsMobileToggle.classList.toggle('active');
  productsMobileMenu.classList.toggle('show');
});

mobileUserBtn.addEventListener('click', (e) => {
  e.preventDefault();
  closeMobileNavFunc();
  openAuthModal(true);
});

// Funcionalidad de autenticación
closeAuth.addEventListener('click', closeAuthFunc);
authOverlay.addEventListener('click', closeAuthFunc);

authSwitchLink.addEventListener('click', (e) => {
  e.preventDefault();
  openAuthModal(!isLoginMode);
});

forgotPasswordLink.addEventListener('click', (e) => {
  e.preventDefault();
  showRecoveryScreen();
});

recoveryBack.addEventListener('click', () => {
  hideRecoveryScreen();
});

recoveryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = recoveryEmail.value;
  const confirmEmail = confirmRecoveryEmail.value;
  
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
      consumirEndpointRegistro(name);
    }
  }
});

// Filtrado y búsqueda
searchButton.addEventListener('click', () => {
  currentSearch = searchInput.value.trim();
  filterProducts();
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    currentSearch = searchInput.value.trim();
    filterProducts();
  }
});

minPriceRange.addEventListener('input', () => {
  let minValue = parseInt(minPriceRange.value);
  let maxValue = parseInt(maxPriceRange.value);
  
  if (minValue > maxValue) {
    minValue = maxValue;
    minPriceRange.value = minValue;
  }
  
  currentMinPrice = minValue;
  updatePriceDisplay();
});

maxPriceRange.addEventListener('input', () => {
  let minValue = parseInt(minPriceRange.value);
  let maxValue = parseInt(maxPriceRange.value);
  
  if (maxValue < minValue) {
    maxValue = minValue;
    maxPriceRange.value = maxValue;
  }
  
  currentMaxPrice = maxValue;
  updatePriceDisplay();
});

applyPriceFilterBtn.addEventListener('click', () => {
  filterProducts();
});

tags.forEach(tag => {
  tag.addEventListener('click', (e) => {
    e.preventDefault();
    
    tags.forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
    
    currentTag = tag.getAttribute('data-tag');
    filterProducts();
  });
});

// Scroll to top
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

// Funcionalidad de edición del carrito
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

document.addEventListener('click', (e) => {
  if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    closeMobileNavFunc();
  }
});

// ===== INICIALIZACIÓN =====
function init() {
  allProducts = [...productData];
  filteredProducts = [...allProducts];
  
  loadCartFromStorage();
  updateCartUI();
  setupStorageListener();
  updateUserInterface();
  
  renderProducts();
  updatePriceDisplay();
  updateClassroomOptions();
  updateFullClassroomOptions();
  
  // MODIFICADO: No mostrar ningún paso del checkout al inicio
  // Solo inicializar el carrito normal
  
  const compraCompletada = localStorage.getItem(COMPRA_COMPLETADA_KEY);
  if (compraCompletada === 'true') {
    clearCart();
  }
}

// Funciones globales
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateProductQuantity = updateProductQuantity;
window.clearCart = clearCart;
window.getCartItems = () => cartItems;
window.resetFilters = resetFilters;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}