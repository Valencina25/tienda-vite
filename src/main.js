// CONFIGURACIÓN
var config = {
    currency: '€',
    shippingFreeLimit: 50,
    shippingCost: 5.99,
    taxRate: 0.21
};

// PRODUCTOS
var products = [
    {
        id: 1,
        name: "MacBook Pro M2",
        description: "Laptop profesional con chip M2",
        price: 1499.99,
        oldPrice: 1699.99,
        category: "electronics",
        image: "/images/macbook.jpg",
        stock: 12,
        rating: 4.8,
        tags: ["nuevo", "oferta"]
    },
    {
        id: 2,
        name: "iPhone 14 Pro",
        description: "Smartphone premium",
        price: 999.99,
        category: "electronics",
        image: "/images/iphone.jpg",
        stock: 25,
        rating: 4.9,
        tags: ["popular"]
    },
    {
        id: 3,
        name: "Sudadera Premium",
        description: "Sudadera de algodón orgánico",
        price: 49.99,
        oldPrice: 69.99,
        category: "clothing",
        image: "/images/sudadera.jpg",
        stock: 45,
        rating: 4.6,
        tags: ["oferta"]
    },
    {
        id: 4,
        name: "Zapatillas Running",
        description: "Zapatillas deportivas",
        price: 89.99,
        category: "sports",
        image: "/images/zapatillas.jpg",
        stock: 30,
        rating: 4.7,
        tags: ["nuevo"]
    }
];

// ESTADO GLOBAL
var cart = [];
var currentView = 'grid';
var currentCategory = 'all';
var currentSort = 'default';
var searchTerm = '';

// INICIALIZAR
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    renderProducts();
    setupEvents();
    updateCartCount();
    updateCartUI();
});

function setupEvents() {
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    document.getElementById('cartOverlay').addEventListener('click', toggleCart);

    document.querySelectorAll('.category-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            document.querySelectorAll('.category-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
            currentCategory = e.currentTarget.dataset.category;
            renderProducts();
        });
    });

    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchTerm = e.target.value.toLowerCase();
            renderProducts();
        });
    }

    var sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            currentSort = e.target.value;
            renderProducts();
        });
    }

    document.querySelectorAll('.view-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            document.querySelectorAll('.view-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
            currentView = e.currentTarget.dataset.view;
            renderProducts();
        });
    });

    var checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckout);
    }

    var closeCheckout = document.getElementById('closeCheckout');
    if (closeCheckout) {
        closeCheckout.addEventListener('click', function() {
            document.getElementById('checkoutModal').classList.remove('active');
            document.getElementById('checkoutOverlay').classList.remove('active');
        });
    }

    var cancelCheckout = document.getElementById('cancelCheckout');
    if (cancelCheckout) {
        cancelCheckout.addEventListener('click', function() {
            document.getElementById('checkoutModal').classList.remove('active');
            document.getElementById('checkoutOverlay').classList.remove('active');
        });
    }

    var checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', submitCheckout);
    }

    var checkoutOverlay = document.getElementById('checkoutOverlay');
    if (checkoutOverlay) {
        checkoutOverlay.addEventListener('click', function() {
            document.getElementById('checkoutModal').classList.remove('active');
            checkoutOverlay.classList.remove('active');
        });
    }
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

function openCheckout() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    renderOrderSummary();
    document.getElementById('checkoutModal').classList.add('active');
    document.getElementById('checkoutOverlay').classList.add('active');
}

function renderOrderSummary() {
    var orderSummary = document.getElementById('orderSummary');
    if (!orderSummary) return;

    var subtotal = cart.reduce(function(sum, item) { return sum + (item.price * item.quantity); }, 0);
    var tax = subtotal * config.taxRate;
    var total = subtotal + tax;

    var html = '';
    cart.forEach(function(item) {
        html += '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;">';
        html += '<span>' + item.name + ' x' + item.quantity + '</span>';
        html += '<span>€' + (item.price * item.quantity).toFixed(2) + '</span>';
        html += '</div>';
    });
    html += '<div style="margin-top:12px;"><strong>Subtotal: €' + subtotal.toFixed(2) + '</strong></div>';
    html += '<div><strong>IVA (21%): €' + tax.toFixed(2) + '</strong></div>';
    html += '<div><strong>Total: €' + total.toFixed(2) + '</strong></div>';
    orderSummary.innerHTML = html;
}

function submitCheckout(e) {
    e.preventDefault();

    var customer = {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value
    };

    var order = {
        id: Date.now(),
        date: new Date().toISOString(),
        customer: customer,
        items: cart.map(function(item) {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            };
        }),
        status: 'pendiente'
    };

    var orders = [];
    try {
        var stored = localStorage.getItem('shopOrders');
        if (stored) orders = JSON.parse(stored);
    } catch(err) {}

    orders.push(order);
    localStorage.setItem('shopOrders', JSON.stringify(orders));

    cart = [];
    saveCartToStorage();
    updateCartUI();
    updateCartCount();
    document.getElementById('checkoutModal').classList.remove('active');
    document.getElementById('checkoutOverlay').classList.remove('active');
    alert('¡Pedido realizado con éxito! ID: ' + order.id);
}

function getFilteredProducts() {
    var filtered = products.slice();

    if (currentCategory !== 'all') {
        filtered = filtered.filter(function(p) {
            return p.category === currentCategory;
        });
    }

    if (searchTerm) {
        filtered = filtered.filter(function(p) {
            return p.name.toLowerCase().includes(searchTerm) ||
                   p.description.toLowerCase().includes(searchTerm);
        });
    }

    switch(currentSort) {
        case 'price-asc':
            filtered.sort(function(a, b) { return a.price - b.price; });
            break;
        case 'price-desc':
            filtered.sort(function(a, b) { return b.price - a.price; });
            break;
        case 'name-asc':
            filtered.sort(function(a, b) { return a.name.localeCompare(b.name); });
            break;
        case 'name-desc':
            filtered.sort(function(a, b) { return b.name.localeCompare(a.name); });
            break;
    }

    return filtered;
}

function renderProducts() {
    var grid = document.getElementById('productsGrid');
    var list = document.getElementById('productsList');
    var filtered = getFilteredProducts();

    if (!grid) return;

    var html = '';
    filtered.forEach(function(p) {
        html += '<div class="product-card">';
        html += '<img src="' + p.image + '" style="width:100%;height:200px;object-fit:cover;" onerror="this.src=\'https://via.placeholder.com/300x200/cccccc/969696?text=Producto\'">';
        html += '<div style="padding:20px;">';
        html += '<h3>' + p.name + '</h3>';
        html += '<p>' + p.price.toFixed(2) + ' ' + config.currency + '</p>';
        html += '<button onclick="addToCart(' + p.id + ')">Añadir</button>';
        html += '</div></div>';
    });

    grid.innerHTML = html;
    if (list) list.innerHTML = html;

    grid.style.display = currentView === 'grid' ? 'grid' : 'none';
    if (list) list.style.display = currentView === 'list' ? 'block' : 'none';

    var productCount = document.getElementById('productCount');
    if (productCount) {
        productCount.textContent = filtered.length + ' productos';
    }
}

window.addToCart = function(id) {
    var product = products.find(function(p) { return p.id === id; });
    if (!product) return;

    var existingItem = cart.find(function(item) { return item.id === id; });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartUI();
    updateCartCount();
    showNotification(product.name + ' añadido al carrito');
};

window.removeFromCart = function(id) {
    cart = cart.filter(function(item) { return item.id !== id; });
    saveCartToStorage();
    updateCartUI();
    updateCartCount();
};

window.updateCartItemQuantity = function(id, delta) {
    var item = cart.find(function(item) { return item.id === id; });
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        window.removeFromCart(id);
        return;
    }

    saveCartToStorage();
    updateCartUI();
    updateCartCount();
};

function updateCartUI() {
    var cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Carrito vacío</p>';
        document.getElementById('cartSubtotal').textContent = '€0.00';
        document.getElementById('cartShipping').textContent = 'Gratis';
        document.getElementById('cartTax').textContent = '€0.00';
        document.getElementById('cartTotal').textContent = '€0.00';
        return;
    }

    var subtotal = cart.reduce(function(sum, item) { return sum + (item.price * item.quantity); }, 0);
    var shipping = subtotal >= config.shippingFreeLimit ? 0 : config.shippingCost;
    var tax = subtotal * config.taxRate;
    var total = subtotal + shipping + tax;

    var html = '';
    cart.forEach(function(item) {
        html += '<div style="padding:10px;border-bottom:1px solid #ccc;display:flex;justify-content:space-between;align-items:center;">';
        html += '<div>';
        html += '<p style="margin:0;font-weight:bold;">' + item.name + '</p>';
        html += '<p style="margin:0;font-size:0.9em;">€' + item.price.toFixed(2) + ' x ' + item.quantity + '</p>';
        html += '</div>';
        html += '<div style="display:flex;gap:8px;align-items:center;">';
        html += '<button onclick="updateCartItemQuantity(' + item.id + ', -1)" style="padding:2px 8px;">-</button>';
        html += '<span>' + item.quantity + '</span>';
        html += '<button onclick="updateCartItemQuantity(' + item.id + ', 1)" style="padding:2px 8px;">+</button>';
        html += '<button onclick="removeFromCart(' + item.id + ')" style="padding:2px 8px;color:red;"><i class="fas fa-trash"></i></button>';
        html += '</div>';
        html += '</div>';
    });
    cartItems.innerHTML = html;

    document.getElementById('cartSubtotal').textContent = subtotal.toFixed(2) + ' €';
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'Gratis' : '€' + shipping.toFixed(2);
    document.getElementById('cartTax').textContent = '€' + tax.toFixed(2);
    document.getElementById('cartTotal').textContent = total.toFixed(2) + ' €';
}

function updateCartCount() {
    var totalItems = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);
    var cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function saveCartToStorage() {
    localStorage.setItem('shopCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    try {
        var stored = localStorage.getItem('shopCart');
        if (stored) {
            cart = JSON.parse(stored);
        }
    } catch(err) {}
}

function showNotification(message) {
    var notification = document.createElement('div');
    notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#27AE60;color:white;padding:12px 24px;border-radius:8px;z-index:9999;';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(function() { notification.remove(); }, 2000);
}

// Exportar funciones al scope global para uso en onclick
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartItemQuantity = updateCartItemQuantity;
