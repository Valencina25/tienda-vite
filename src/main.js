// CONFIGURACIÓN
const config = {
    currency: '€',
    shippingFreeLimit: 50,
    taxRate: 0.21
};

// PRODUCTOS
const products = [
    {
        id: 1,
        name: "MacBook Pro M2",
        description: "Laptop profesional con chip M2",
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
        description: "Smartphone premium",
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
        description: "Sudadera de algodón orgánico",
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
        description: "Zapatillas deportivas",
        price: 89.99,
        category: "sports",
        image: "/tienda-vite/images/zapatillas.jpg",
        stock: 30,
        rating: 4.7,
        tags: ["nuevo"]
    }
];

// ESTADO GLOBAL
let cart = [];
let currentView = 'grid';
let currentCategory = 'all';

// INICIALIZAR
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEvents();
    updateCartCount();
});

function setupEvents() {
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    
    document.querySelectorAll('.category-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            document.querySelectorAll('.category-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            renderProducts();
        });
    });
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

function renderProducts() {
    var grid = document.getElementById('productsGrid');
    var filtered = products;
    
    if (currentCategory !== 'all') {
        filtered = products.filter(function(p) {
            return p.category === currentCategory;
        });
    }
    
    var html = '';
    filtered.forEach(function(p) {
        html += '<div class="product-card">';
        html += '<img src="' + p.image + '" style="width:100%;height:200px;object-fit:cover;">';
        html += '<div style="padding:20px;">';
        html += '<h3>' + p.name + '</h3>';
        html += '<p>' + p.price + ' €</p>';
        html += '<button onclick="addToCart(' + p.id + ')">Añadir</button>';
        html += '</div></div>';
    });
    
    grid.innerHTML = html;
    document.getElementById('productCount').textContent = filtered.length + ' productos';
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
    
    updateCartUI();
    alert(product.name + ' añadido al carrito');
};

function updateCartUI() {
    var totalItems = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);
    document.getElementById('cartCount').textContent = totalItems;
    
    var cartItems = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Carrito vacío</p>';
        return;
    }
    
    var html = '';
    cart.forEach(function(item) {
        html += '<div style="padding:10px;border-bottom:1px solid #ccc;">';
        html += '<p>' + item.name + ' x' + item.quantity + '</p>';
        html += '</div>';
    });
    cartItems.innerHTML = html;
    
    var subtotal = cart.reduce(function(sum, item) { return sum + (item.price * item.quantity); }, 0);
    document.getElementById('cartSubtotal').textContent = subtotal.toFixed(2) + ' €';
    document.getElementById('cartTotal').textContent = subtotal.toFixed(2) + ' €';
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}
