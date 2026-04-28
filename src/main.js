// ============================================
// TIENDA ONLINE MEJORADA
// ============================================

// CONFIGURACIÓN
const config = {
    currency: '€',
    shippingFreeLimit: 50,
    taxRate: 0.21
};

// CLAVES
const ORDERS_STORAGE_KEY = 'shopOrders';
const PRODUCTS_KEY = 'adminProducts';

// PRODUCTOS POR DEFECTO
const defaultProducts = [
    {
        id: 1,
        name: "MacBook Pro M2",
        description: "Laptop profesional con chip M2, 16GB RAM, 512GB SSD",
        price: 1499.99,
        oldPrice: 1699.99,
        category: "electronics",
        image: "/tienda-vite/images/macbook.jpg",
        stock: 12,
        rating: 4.8,
        tags: ["nuevo", "oferta"]
    },
    {
        id: 2,
        name: "iPhone 14 Pro",
        description: "Smartphone premium con cámara de 48MP y Dynamic Island",
        price: 999.99,
        category: "electronics",
        image: "/tienda-vite/images/iphone.jpg",
        stock: 25,
        rating: 4.9,
        tags: ["popular"]
    },
    {
        id: 3,
        name: "Sudadera Premium",
        description: "Sudadera de algodón orgánico, diseño oversize",
        price: 49.99,
        oldPrice: 69.99,
        category: "clothing",
        image: "/tienda-vite/images/sudadera.jpg",
        stock: 45,
        rating: 4.6,
        tags: ["oferta"]
    },
    {
        id: 4,
        name: "Zapatillas Running",
        description: "Zapatillas deportivas con tecnología de amortiguación",
        price: 89.99,
        category: "sports",
        image: "/tienda-vite/images/zapatillas.jpg",
        stock: 30,
        rating: 4.7,
        tags: ["nuevo"]
    },
    {
        id: 5,
        name: "Auriculares Noise Cancel",
        description: "Cancelación de ruido activa, 30h de batería",
        price: 199.99,
        oldPrice: 249.99,
        category: "electronics",
        image: "/tienda-vite/images/auriculares.jpg",
        stock: 18,
        rating: 4.8,
        tags: ["oferta", "popular"]
    },
    {
        id: 6,
        name: "Reloj Inteligente",
        description: "Monitor de actividad, GPS y resistencia al agua",
        price: 299.99,
        category: "electronics",
        image: "/tienda-vite/images/reloj.jpg",
        stock: 22,
        rating: 4.5,
        tags: ["nuevo"]
    },
    {
        id: 7,
        name: "Libro de Cocina",
        description: "Recetas gourmet con fotografías profesionales",
        price: 34.99,
        category: "books",
        image: "/tienda-vite/images/libro.jpg",
        stock: 60,
        rating: 4.4,
        tags: []
    },
    {
        id: 8,
        name: "Lámpara de Mesa",
        description: "Diseño moderno, luz LED ajustable, control táctil",
        price: 45.99,
        oldPrice: 59.99,
        category: "home",
        image: "/tienda-vite/images/lampara.jpg",
        stock: 28,
        rating: 4.3,
        tags: ["oferta"]
    },
    {
        id: 9,
        name: "Bicicleta Mountain",
        description: "Bicicleta todo terreno, 21 velocidades, suspensión",
        price: 599.99,
        category: "sports",
        image: "/tienda-vite/images/bicicleta.jpg",
        stock: 8,
        rating: 4.9,
        tags: ["popular"]
    },
    {
        id: 10,
        name: "Cámara Profesional",
        description: "Cámara mirrorless 24MP, grabación 4K, kit de lentes",
        price: 1299.99,
        category: "electronics",
        image: "/tienda-vite/images/camara.jpg",
        stock: 15,
        rating: 4.8,
        tags: ["nuevo"]
    },
    {
        id: 11,
        name: "Set de Cocina",
        description: "12 piezas de acero inoxidable, antiadherente",
        price: 129.99,
        oldPrice: 159.99,
        category: "home",
        image: "/tienda-vite/images/setcocina.jpg",
        stock: 35,
        rating: 4.6,
        tags: ["oferta"]
    },
    {
        id: 12,
        name: "Jeans Slim Fit",
        description: "Jeans de denim elástico, corte moderno",
        price: 39.99,
        category: "clothing",
        image: "/tienda-vite/images/jeans.jpg",
        stock: 50,
        rating: 4.4,
        tags: []
    }
];

// CARGAR PRODUCTOS
let products = loadProducts();

function loadProducts() {
    try {
        const stored = localStorage.getItem(PRODUCTS_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.error('Error loading products:', e);
    }
    return defaultProducts;
}

// ESTADO GLOBAL
let cart = JSON.parse(localStorage.getItem('shopPremiumCart')) || [];
let currentView = 'grid';
let currentCategory = 'all';
let currentSort = 'default';

// INICIALIZAR
document.addEventListener('DOMContentLoaded', () => {
    initStore();
    updateCartUI();
});

function initStore() {
    renderProducts();
    setupEventListeners();
    updateProductCount();
}

function setupEventListeners() {
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    document.getElementById('cartOverlay').addEventListener('click', toggleCart);
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.category-btn').classList.add('active');
            currentCategory = e.target.closest('.category-btn').dataset.category;
            renderProducts();
        });
    });
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.view-btn').classList.add('active');
            currentView = e.target.closest('.view-btn').dataset.view;
            renderProducts();
        });
    });
    
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });
    
    document.getElementById('searchBtn').addEventListener('click', searchProducts);
    document.getElementById('searchInput').addEventListener('input', searchProducts);
    document.getElementById('checkoutBtn').addEventListener('click', processCheckout);
    document.getElementById('closeCheckout').addEventListener('click', closeCheckoutModal);
    document.getElementById('checkoutOverlay').addEventListener('click', closeCheckoutModal);
    document.getElementById('cancelCheckout').addEventListener('click', closeCheckoutModal);
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

function searchProducts() {
    renderProducts();
}

function getCategoryName(category) {
    const names = {
        'electronics': 'Electrónica',
        'clothing': 'Ropa',
        'home': 'Hogar',
        'books': 'Libros',
        'sports': 'Deportes'
    };
    return names[category] || category;
}

function updateProductCount() {
    const filtered = filterProducts();
    document.getElementById('productCount').textContent = `${filtered.length} productos`;
}

function renderProducts() {
    let filteredProducts = filterProducts();
    filteredProducts = sortProducts(filteredProducts);
    
    if (currentView === 'grid') {
        renderGridView(filteredProducts);
        document.getElementById('productsGrid').style.display = 'grid';
        document.getElementById('productsList').style.display = 'none';
    } else {
        renderListView(filteredProducts);
        document.getElementById('productsGrid').style.display = 'none';
        document.getElementById('productsList').style.display = 'flex';
    }
    
    updateProductCount();
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let filtered = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);
    
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    return filtered;
}

function sortProducts(productList) {
    switch(currentSort) {
        case 'price-asc':
            return [...productList].sort((a, b) => a.price - b.price);
        case 'price-desc':
            return [...productList].sort((a, b) => b.price - a.price);
        case 'name-asc':
            return [...productList].sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return [...productList].sort((a, b) => b.name.localeCompare(a.name));
        default:
            return productList;
    }
}

function renderGridView(productsToRender) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-id="${product.id}">
            ${product.tags.includes('oferta') ? '<span class="product-badge">🔥 Oferta</span>' : ''}
            ${product.tags.includes('nuevo') ? '<span class="product-badge" style="background:var(--accent);top:45px;">✨ Nuevo</span>' : ''}
            
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/600x400/cccccc/969696?text=Producto'">
                <div class="quick-actions">
                    <button class="action-btn" onclick="showProductDetail(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="addToWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                
                <div class="product-footer">
                    <div>
                        ${product.oldPrice ? `
                            <div class="product-price">
                                <span class="old-price">${config.currency}${product.oldPrice}</span>
                                ${config.currency}${product.price.toFixed(2)}
                            </div>
                        ` : `
                            <div class="product-price">
                                ${config.currency}${product.price.toFixed(2)}
                            </div>
                        `}
                        <div style="font-size:0.9rem;color:var(--gray);margin-top:5px;">
                            <i class="fas fa-star" style="color:var(--warning);"></i> 
                            ${product.rating} | ${product.stock} en stock
                        </div>
                    </div>
                    
                    <button class="add-to-cart" onclick="addToCart(${product.id})" 
                            ${product.stock === 0 ? 'disabled' : ''}>
                        ${product.stock === 0 ? 
                            '<i class="fas fa-times"></i> Agotado' : 
                            '<i class="fas fa-cart-plus"></i> Añadir'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderListView(productsToRender) {
    const list = document.getElementById('productsList');
    list.innerHTML = productsToRender.map(product => `
        <div class="product-list-item" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/600x400/cccccc/969696?text=Producto'">
            </div>
            
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                
                <div style="margin-top:15px;display:flex;align-items:center;gap:20px;">
                    <div style="font-size:0.9rem;color:var(--gray);">
                        <i class="fas fa-star" style="color:var(--warning);"></i> ${product.rating}
                    </div>
                    <div style="font-size:0.9rem;color:var(--gray);">
                        <i class="fas fa-box"></i> ${product.stock} disponibles
                    </div>
                </div>
            </div>
            
            <div style="text-align:right;">
                ${product.oldPrice ? `
                    <div style="color:var(--gray);text-decoration:line-through;font-size:0.9rem;">
                        ${config.currency}${product.oldPrice}
                    </div>
                ` : ''}
                <div class="product-price" style="margin:10px 0 15px 0;">
                    ${config.currency}${product.price.toFixed(2)}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})"
                        ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock === 0 ? 
                        '<i class="fas fa-times"></i> Agotado' : 
                        '<i class="fas fa-cart-plus"></i> Añadir'}
                </button>
            </div>
        </div>
    `).join('');
}

window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (product.stock <= 0) {
        showNotification('Producto agotado', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            showNotification(`Solo quedan ${product.stock} unidades`, 'error');
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showNotification(`${product.name} añadido al carrito`, 'success');
    
    const btn = document.querySelector(`.add-to-cart[onclick="addToCart(${productId})"]`);
    if (btn) {
        btn.classList.add('added');
        btn.innerHTML = '<i class="fas fa-check"></i> Añadido';
        setTimeout(() => {
            btn.classList.remove('added');
            btn.innerHTML = '<i class="fas fa-cart-plus"></i> Añadir';
        }, 2000);
    }
};

window.updateQuantity = function(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (product && newQuantity > product.stock) {
        showNotification(`Solo quedan ${product.stock} unidades`, 'error');
        return;
    }
    
    item.quantity = newQuantity;
    saveCart();
    updateCartUI();
};

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showNotification('Producto eliminado del carrito', 'info');
};

function saveCart() {
    localStorage.setItem('shopPremiumCart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
    
    const cartItems = document.getElementById('cartItems');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= config.shippingFreeLimit ? 0 : 9.99;
    const tax = subtotal * config.taxRate;
    const total = subtotal + shipping + tax;
    
    document.getElementById('cartSubtotal').textContent = `${config.currency}${subtotal.toFixed(2)}`;
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'Gratis' : `${config.currency}${shipping.toFixed(2)}`;
    document.getElementById('cartTax').textContent = `${config.currency}${tax.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `${config.currency}${total.toFixed(2)}`;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega productos para comenzar</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">
                    ${config.currency}${item.price.toFixed(2)}
                </div>
                
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span style="font-weight:bold;">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
            
            <div style="text-align:right;">
                <div style="font-weight:bold;font-size:1.1rem;">
                    ${config.currency}${(item.price * item.quantity).toFixed(2)}
                </div>
                <div style="font-size:0.9rem;color:var(--gray);margin-top:5px;">
                    ${item.stock - item.quantity} disponibles
                </div>
            </div>
        </div>
    `).join('');
}

// CHECKOUT
function processCheckout() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    openCheckoutModal();
}

function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    const overlay = document.getElementById('checkoutOverlay');
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateOrderSummary();
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    const overlay = document.getElementById('checkoutOverlay');
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function updateOrderSummary() {
    const summary = document.getElementById('orderSummary');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= config.shippingFreeLimit ? 0 : 9.99;
    const tax = subtotal * config.taxRate;
    const total = subtotal + shipping + tax;

    summary.innerHTML = cart.map(item => `
        <div class="order-summary-item">
            <span>${item.name} x${item.quantity}</span>
            <span>${config.currency}${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('') + `
        <div class="order-summary-item">
            <span>Subtotal</span>
            <span>${config.currency}${subtotal.toFixed(2)}</span>
        </div>
        <div class="order-summary-item">
            <span>Envío</span>
            <span>${shipping === 0 ? 'Gratis' : config.currency + shipping.toFixed(2)}</span>
        </div>
        <div class="order-summary-item">
            <span>IVA (21%)</span>
            <span>${config.currency}${tax.toFixed(2)}</span>
        </div>
        <div class="order-summary-item">
            <span>Total</span>
            <span>${config.currency}${total.toFixed(2)}</span>
        </div>
    `;
}

function saveOrder(orderData) {
    const orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    const orderId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    const order = {
        id: orderId,
        date: new Date().toISOString(),
        customer: orderData,
        items: [...cart],
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'pendiente'
    };
    orders.push(order);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return order;
}

window.handleCheckoutSubmit = function(e) {
    e.preventDefault();
    
    const customerData = {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value
    };
    
    const order = saveOrder(customerData);
    showNotification(`¡Pedido #${order.id} realizado con éxito!`, 'success');
    
    cart = [];
    saveCart();
    updateCartUI();
    closeCheckoutModal();
    toggleCart();
    
    document.getElementById('checkoutForm').reset();
};

// NOTIFICACIONES
window.showNotification = function(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

window.showProductDetail = function(productId) {
    const product = products.find(p => p.id === productId);
    showNotification(`Detalles de: ${product.name}`, 'info');
};

window.addToWishlist = function(productId) {
    const product = products.find(p => p.id === productId);
    showNotification(`${product.name} añadido a favoritos`, 'success');
};
