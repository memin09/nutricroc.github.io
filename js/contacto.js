document.addEventListener('DOMContentLoaded', function() {
  // Variables globales para el carrito
  let cartItems = [];
  let isLoggedIn = false;
  
  // Elementos del carrito
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
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  // Elementos del usuario
  const userBtn = document.getElementById('userBtn');
  const userDropdown = document.getElementById('userDropdown');
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const accountLink = document.getElementById('accountLink');
  
  // Elementos de autenticación
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
  
  // NUEVOS: Elementos para notificaciones
  const stockNotification = document.getElementById('stockNotification');
  const paymentErrorNotification = document.getElementById('paymentErrorNotification');
  const emailSentNotification = document.getElementById('emailSentNotification');
  const reenvioNotification = document.getElementById('reenvioNotification');
  
  // Elementos del checkout
  const editScreen = document.getElementById('editScreen');
  const editBack = document.getElementById('editBack');
  const editProductImages = document.getElementById('editProductImages');
  const editProductName = document.getElementById('editProductName');
  const editProductPrice = document.getElementById('editProductPrice');
  const editQuantityInput = document.getElementById('editQuantityInput');
  const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
  const increaseQuantityBtn = document.getElementById('increaseQuantity');
  const saveEditBtn = document.getElementById('saveEditBtn');
  
  // Elementos del checkout (pantallas)
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
  const reenviarCorreoBtn = document.getElementById('reenviarCorreoBtn');
  const cambiarCorreoBtn = document.getElementById('cambiarCorreoBtn');
  
  // Elementos del modal de cambiar correo
  const cambiarCorreoModal = document.getElementById('cambiarCorreoModal');
  const closeCambiarCorreo = document.getElementById('closeCambiarCorreo');
  const cambiarCorreoForm = document.getElementById('cambiarCorreoForm');
  const correoRenviadoNotification = document.getElementById('correoRenviadoNotification');
  
  // NUEVOS elementos para recuperación de contraseña
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const recoveryScreen = document.getElementById('recoveryScreen');
  const recoveryBack = document.getElementById('recoveryBack');
  const recoveryForm = document.getElementById('recoveryForm');
  const recoveryEmail = document.getElementById('recoveryEmail');
  const confirmRecoveryEmail = document.getElementById('confirmRecoveryEmail');
  const sendRecoveryBtn = document.getElementById('sendRecoveryBtn');
  
  // Variables de estado
  let isLoginMode = true;
  let currentCheckoutStep = 'cart';
  let editingProductIndex = -1;
  
  // IMPORTANTE: Misma clave de almacenamiento que el segundo código
  const CART_STORAGE_KEY = 'nutricroc_shared_cart';
  const COMPRA_COMPLETADA_KEY = 'compra_completada';
  
  // Datos de los edificios y salones
  const buildingClassrooms = {
    'A': Array.from({length: 11}, (_, i) => `Salón ${i + 1}`),
    'B': Array.from({length: 11}, (_, i) => `Salón ${i + 1}`),
    'C': Array.from({length: 11}, (_, i) => `Salón ${i + 1}`),
    'D': Array.from({length: 7}, (_, i) => `Salón ${i + 1}`),
    'X': Array.from({length: 7}, (_, i) => `Salón ${i + 1}`)
  };
  
  // ===== NUEVA FUNCIÓN: Escuchar cambios en el localStorage desde otras pestañas =====
  function setupStorageListener() {
    window.addEventListener('storage', function(event) {
      console.log('Evento storage detectado:', event.key);
      if (event.key === CART_STORAGE_KEY) {
        console.log('Carrito actualizado desde otra pestaña. Nuevo valor:', event.newValue);
        loadCartFromStorage();
        updateCartUI();
      }
    });
  }
  
  // También escuchar cambios en la misma pestaña
  function setupCartUpdateListener() {
    // Crear un evento personalizado para detectar cambios en el carrito
    window.addEventListener('cartUpdated', function() {
      console.log('Carrito actualizado en la misma pestaña');
      updateCartUI();
    });
  }
  
  // NUEVA FUNCIÓN: Mostrar notificación de stock insuficiente
  function showStockNotification() {
    stockNotification.classList.add('show');
    setTimeout(() => {
      stockNotification.classList.remove('show');
    }, 3000);
  }
  
  // NUEVA FUNCIÓN: Mostrar notificación de error en pago
  function showPaymentErrorNotification() {
    paymentErrorNotification.classList.add('show');
    setTimeout(() => {
      paymentErrorNotification.classList.remove('show');
    }, 5000);
  }
  
  // NUEVA FUNCIÓN: Mostrar notificación de correo enviado
  function showEmailSentNotification() {
    emailSentNotification.classList.add('show');
    setTimeout(() => {
      emailSentNotification.classList.remove('show');
    }, 3000);
  }
  
  // NUEVA FUNCIÓN: Mostrar notificación de reenvío de correo
  function showReenvioNotification() {
    reenvioNotification.classList.add('show');
    setTimeout(() => {
      reenvioNotification.classList.remove('show');
    }, 3000);
  }
  
  // Función para mostrar notificación
  function showNotification(message = 'El producto se agregó de manera exitosa') {
    notification.querySelector('.notification-text').textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
  
  // ===== FUNCIONES DEL CARRITO =====
  function loadCartFromStorage() {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    console.log('Cargando carrito desde localStorage:', savedCart);
    if (savedCart) {
      try {
        cartItems = JSON.parse(savedCart);
        console.log('Carrito cargado exitosamente:', cartItems);
      } catch (e) {
        console.error('Error al cargar el carrito:', e);
        cartItems = [];
      }
    } else {
      console.log('No hay carrito guardado en localStorage');
      cartItems = [];
    }
  }
  
  function saveCartToStorage() {
    console.log('Guardando carrito en localStorage:', cartItems);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    
    // IMPORTANTE: Disparar evento storage para sincronizar entre pestañas
    // Necesitamos simular el evento storage ya que no se dispara automáticamente en la misma pestaña
    try {
      const event = new Event('storage');
      event.key = CART_STORAGE_KEY;
      event.newValue = JSON.stringify(cartItems);
      window.dispatchEvent(event);
    } catch (e) {
      console.log('Usando método alternativo para evento storage');
      // Método alternativo para navegadores más antiguos
      if (typeof(StorageEvent) !== 'undefined') {
        const event = new StorageEvent('storage', {
          key: CART_STORAGE_KEY,
          newValue: JSON.stringify(cartItems),
          oldValue: localStorage.getItem(CART_STORAGE_KEY),
          url: window.location.href,
          storageArea: localStorage
        });
        window.dispatchEvent(event);
      }
    }
    
    // También disparar evento personalizado para actualizar UI en la misma pestaña
    const cartUpdatedEvent = new Event('cartUpdated');
    window.dispatchEvent(cartUpdatedEvent);
  }
  
  function updateCartCount() {
    let totalQuantity = 0;
    cartItems.forEach(item => {
      totalQuantity += item.quantity;
    });
    
    cartCount.textContent = totalQuantity;
    cartCountTitle.textContent = `(${totalQuantity})`;
    console.log('Contador del carrito actualizado:', totalQuantity);
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
    
    summaryProductCount.textContent = cartItems.length;
    summarySubtotal.textContent = `$${totals.subtotal}`;
    summaryEnvio.textContent = 'Gratis';
    summaryTotalAmount.textContent = `$${totals.total}`;
  }
  
  function toggleCartSummary() {
    if (cartItems.length > 0) {
      cartSummary.classList.add('visible');
      console.log('Mostrando resumen del carrito');
    } else {
      cartSummary.classList.remove('visible');
      console.log('Ocultando resumen del carrito');
    }
  }
  
  function renderCartItems() {
    console.log('Renderizando items del carrito:', cartItems);
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-image"></div>
          <p class="cart-empty-text">Aún no cuentas con productos</p>
          <button class="discover-btn" onclick="window.location.href='productos.html'">Descubrir</button>
        </div>
      `;
      console.log('Carrito vacío - mostrando mensaje');
    } else {
      let itemsHTML = '';
      cartItems.forEach((item, index) => {
        const subtotal = (parseFloat(item.price) * item.quantity).toFixed(2);
        itemsHTML += `
          <div class="cart-item">
            <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}" onerror="this.src='img/default-product.jpg'">
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
      console.log('Items del carrito renderizados');
      
      // Agregar event listeners para editar productos
      document.querySelectorAll('.edit-item').forEach(button => {
        button.addEventListener('click', function(e) {
          e.stopPropagation();
          const index = this.getAttribute('data-index');
          showEditScreen(index);
        });
      });
      
      // Agregar event listeners para eliminar productos
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
    console.log('Actualizando UI del carrito');
    updateCartCount();
    updateCartTotal();
    renderCartItems();
    toggleCartSummary();
  }
  
  // NUEVA FUNCIÓN: Mostrar pantalla de edición
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
      img.onerror = function() {
        this.src = 'img/default-product.jpg';
      };
      imageDiv.appendChild(img);
      editProductImages.appendChild(imageDiv);
    }
    
    editScreen.style.display = 'flex';
    setTimeout(() => {
      editScreen.classList.add('active');
    }, 10);
  }
  
  // NUEVA FUNCIÓN: Ocultar pantalla de edición
  function hideEditScreen() {
    editScreen.classList.add('slide-out');
    setTimeout(() => {
      editScreen.classList.remove('active');
      editScreen.classList.remove('slide-out');
      editScreen.style.display = 'none';
      editingProductIndex = -1;
    }, 500);
  }
  
  // NUEVA FUNCIÓN: Mostrar spinner de eliminación
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
  
  // NUEVA FUNCIÓN: Mostrar confirmación de eliminación
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
  
  // FUNCIÓN IMPORTANTE: Agregar producto al carrito
  function addToCart(product) {
    console.log('Agregando producto al carrito:', product);
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
      console.log('Producto existente, incrementando cantidad');
    } else {
      product.quantity = 1;
      cartItems.push(product);
      console.log('Nuevo producto agregado');
    }
    
    updateCartUI();
    saveCartToStorage();
    showNotification('Producto agregado al carrito');
  }
  
  function removeFromCart(index) {
    if (index >= 0 && index < cartItems.length) {
      console.log('Eliminando producto del carrito, índice:', index);
      cartItems.splice(index, 1);
      updateCartUI();
      saveCartToStorage();
    }
  }
  
  // NUEVA FUNCIÓN: Actualizar cantidad con validación de stock
  function updateProductQuantity(index, newQuantity) {
    if (newQuantity < 1) newQuantity = 1;
    
    // Validación: Verificar si la cantidad es mayor a 30
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
    console.log('Limpiando carrito');
    cartItems = [];
    updateCartUI();
    saveCartToStorage();
    // Limpiar también la bandera de compra completada
    localStorage.removeItem(COMPRA_COMPLETADA_KEY);
  }
  
  // ===== FUNCIONALIDAD DEL CARRITO =====
  cartBtn.addEventListener('click', () => {
    console.log('Abriendo carrito');
    // Forzar actualización del carrito antes de abrir
    loadCartFromStorage();
    updateCartUI();
    
    cartOverlay.style.display = 'block';
    cartSidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
    showCheckoutStep('cart');
  });
  
  function closeCartFunc() {
    console.log('Cerrando carrito');
    cartOverlay.style.display = 'none';
    cartSidebar.classList.remove('open');
    document.body.style.overflow = 'auto';
    showCheckoutStep('cart');
    resetCheckoutForms();
    confettiContainer.innerHTML = '';
  }
  
  closeCart.addEventListener('click', closeCartFunc);
  cartOverlay.addEventListener('click', closeCartFunc);
  
  // Botón de comprar (checkout)
  checkoutBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de comprar.');
      return;
    }
    showCheckoutStep('delivery');
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
  
  // ===== FUNCIONALIDAD DE AUTENTICACIÓN =====
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
    
    // Asegurarse de que la pantalla de recuperación esté oculta
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
    
    // Enviar correo de recuperación
    sendRecoveryEmail(email);
  });
  
  function showRecoveryScreen() {
    recoveryScreen.classList.add('active');
    recoveryForm.reset();
  }
  
  function hideRecoveryScreen() {
    recoveryScreen.classList.remove('active');
  }
  
  function sendRecoveryEmail(email) {
    console.log('Enviando correo de recuperación a:', email);
    
    // Aquí iría la lógica para enviar el correo de recuperación
    // Por ahora, simulamos el envío
    
    // Mostrar notificación de éxito
    showEmailSentNotification();
    
    // Volver a la pantalla de login después de un momento
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
        alert('¡Inicio de sesión exitoso!');
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
        alert('¡Registro exitoso!');
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
  
  // ===== FUNCIONALIDAD DEL CHECKOUT =====
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
  
  // Crear efecto de confeti
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
  
  // Funcionalidad del botón de reenviar correo
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
  
  // Funcionalidad del modal de cambiar correo
  function openCambiarCorreoModal() {
    cambiarCorreoModal.classList.add('active');
    cambiarCorreoForm.reset();
  }
  
  function closeCambiarCorreoModal() {
    cambiarCorreoModal.classList.remove('active');
  }
  
  function showCorreoRenviadoNotification() {
    correoRenviadoNotification.classList.add('show');
    setTimeout(() => {
      correoRenviadoNotification.classList.remove('show');
    }, 2000);
  }
  
  // ===== EVENT LISTENERS DEL CHECKOUT =====
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
  
  // Completar compra con validación de tarjeta específica
  completePurchaseBtn.addEventListener('click', () => {
    if (!validatePaymentForm()) {
      alert('Por favor completa correctamente los datos de pago.');
      return;
    }
    
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    
    // Si el método es PayPal, abrir nueva pestaña
    if (paymentMethod.value === 'paypal') {
      window.open('https://www.paypal.com', '_blank');
      return;
    }
    
    // Si es tarjeta, verificar si es la tarjeta específica que debe generar error
    if (paymentMethod.value === 'card') {
      const cardNumber = cardNumberInput.value.replace(/\s/g, '');
      
      // Verificar si es la tarjeta específica que debe generar error
      if (cardNumber === '4242424242424242') {
        // Mostrar spinner
        paymentSpinner.classList.add('active');
        
        // Simular procesamiento por 2 segundos
        setTimeout(() => {
          // Ocultar spinner
          paymentSpinner.classList.remove('active');
          
          // Mostrar notificación de error
          showPaymentErrorNotification();
          
          // No continuar a la pantalla de confirmación
          return;
        }, 2000);
      } else {
        // Para otras tarjetas, continuar normalmente
        paymentSpinner.classList.add('active');
        
        setTimeout(() => {
          paymentSpinner.classList.remove('active');
          showCheckoutStep('confirmation');
        }, 3000);
      }
    } else if (paymentMethod.value === 'cash') {
      // Para pago en efectivo
      paymentSpinner.classList.add('active');
      
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
      showCorreoRenviadoNotification();
      closeCambiarCorreoModal();
    }
  });
  
  cambiarCorreoModal.addEventListener('click', (e) => {
    if (e.target === cambiarCorreoModal) {
      closeCambiarCorreoModal();
    }
  });
  
  keepShoppingBtn.addEventListener('click', () => {
    clearCart();
    closeCartFunc();
    resetCheckoutForms();
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
  
  // Guardar cambios con validación de stock
  saveEditBtn.addEventListener('click', () => {
    const newQuantity = parseInt(editQuantityInput.value);
    
    if (updateProductQuantity(editingProductIndex, newQuantity)) {
      hideEditScreen();
    }
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
  
  // Función para agregar productos de ejemplo (para testing)
  window.addSampleProduct = function() {
    const sampleProduct = {
      id: Date.now(),
      name: 'Helado de Vainilla',
      price: '12.50',
      image: 'img/postreC1.jpeg',
      quantity: 1
    };
    addToCart(sampleProduct);
  };
  
  // ===== INICIALIZACIÓN =====
  function init() {
    console.log('Inicializando carrito...');
    loadCartFromStorage();
    updateCartUI();
    updateUserInterface();
    updateClassroomOptions();
    
    // IMPORTANTE: Configurar listeners
    setupStorageListener();
    setupCartUpdateListener();
    
    // Verificar si hay una compra completada que limpiar
    const compraCompletada = localStorage.getItem(COMPRA_COMPLETADA_KEY);
    if (compraCompletada === 'true') {
      console.log('Compra completada detectada, limpiando carrito');
      clearCart();
    }
    
    console.log('Inicialización completada. Productos en carrito:', cartItems.length);
    
    // Datos de ejemplo para testing
    console.log('Para agregar un producto de ejemplo, usa: addSampleProduct()');
    
    // DEBUG: Verificar localStorage
    console.log('DEBUG - Contenido de localStorage:', {
      cart: localStorage.getItem(CART_STORAGE_KEY),
      compra: localStorage.getItem(COMPRA_COMPLETADA_KEY)
    });
  }
  
  // Hacer funciones disponibles globalmente
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateProductQuantity = updateProductQuantity;
  window.clearCart = clearCart;
  window.getCartItems = () => cartItems;
  
  // Función para forzar actualización del carrito
  window.refreshCart = function() {
    console.log('Forzando actualización del carrito...');
    loadCartFromStorage();
    updateCartUI();
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
});