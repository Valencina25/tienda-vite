const PRODUCTS_STORAGE_KEY = 'adminProducts';
const ORDERS_STORAGE_KEY = 'shopOrders';
const ADMIN_PASSWORD_KEY = 'adminPassword';
const DEFAULT_PASSWORD = 'admin123';

function getStoredPassword() {
    const stored = localStorage.getItem(ADMIN_PASSWORD_KEY);
    return stored || DEFAULT_PASSWORD;
}

function checkLogin() {
    const loginOverlay = document.getElementById('loginOverlay');
    const adminContent = document.getElementById('adminContent');
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';

    if (isLoggedIn) {
        loginOverlay.classList.add('hidden');
        adminContent.classList.remove('hidden');
    } else {
        loginOverlay.classList.remove('hidden');
        adminContent.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loginOverlay = document.getElementById('loginOverlay');
    const loginForm = document.getElementById('loginForm');
    const adminPasswordInput = document.getElementById('adminPassword');
    const loginError = document.getElementById('loginError');
    const adminContent = document.getElementById('adminContent');

    checkLogin();

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputPassword = adminPasswordInput.value;
            const correctPassword = getStoredPassword();

            if (inputPassword === correctPassword) {
                loginOverlay.classList.add('hidden');
                adminContent.classList.remove('hidden');
                sessionStorage.setItem('adminLoggedIn', 'true');
                showNotification('Bienvenido al panel de administración', 'success');
            } else {
                loginError.classList.add('show');
                adminPasswordInput.value = '';
                setTimeout(() => loginError.classList.remove('show'), 3000);
            }
        });
    }

    function loadProducts() {
        try {
            const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error('Error loading products from localStorage:', e);
            localStorage.removeItem(PRODUCTS_STORAGE_KEY);
        }

        return [
            {
                id: 1,
                name: "MacBook Pro M2",
                description: "Laptop profesional con chip M2, 16GB RAM, 512GB SSD",
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
                description: "Smartphone premium con cámara de 48MP y Dynamic Island",
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
                description: "Sudadera de algodón orgánico, diseño oversize",
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
                description: "Zapatillas deportivas con tecnología de amortiguación",
                price: 89.99,
                category: "sports",
                image: "/images/zapatillas.jpg",
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
                image: "/images/auriculares.jpg",
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
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
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
                image: "/images/libro.jpg",
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
                image: "/images/lampara.jpg",
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
                image: "/images/bicicleta.jpg",
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
                image: "/images/camara.jpg",
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
                image: "/images/setcocina.jpg",
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
                image: "/images/jeans.jpg",
                stock: 50,
                rating: 4.4,
                tags: []
            }
        ];
    }

    function saveProducts(products) {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    }

    const productForm = document.getElementById('productForm');
    const productIdInput = document.getElementById('productId');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productOldPriceInput = document.getElementById('productOldPrice');
    const productCategoryInput = document.getElementById('productCategory');
    const productStockInput = document.getElementById('productStock');
    const productRatingInput = document.getElementById('productRating');
    const productDescriptionInput = document.getElementById('productDescription');
    const productImageInput = document.getElementById('productImage');
    const tagsCheckboxes = document.querySelectorAll('.tags-checkboxes input[type="checkbox"]');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const productsAdminGrid = document.getElementById('productsAdminGrid');

    let isEditing = false;
    let currentProductId = null;
    let products = loadProducts();
    let orders = loadOrders();

    renderProducts();
    renderOrders();

    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const tags = Array.from(tagsCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            const productData = {
                name: productNameInput.value,
                description: productDescriptionInput.value,
                price: parseFloat(productPriceInput.value),
                oldPrice: productOldPriceInput.value ? parseFloat(productOldPriceInput.value) : null,
                category: productCategoryInput.value,
                image: productImageInput.value,
                stock: parseInt(productStockInput.value),
                rating: parseFloat(productRatingInput.value),
                tags
            };

            if (isEditing) {
                const index = products.findIndex(p => p.id === currentProductId);
                if (index !== -1) {
                    products[index] = { ...products[index], ...productData };
                    showNotification('Producto actualizado con éxito', 'success');
                }
                resetForm();
            } else {
                const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                products.push({ id: newId, ...productData });
                showNotification('Producto añadido con éxito', 'success');
            }

            saveProducts(products);
            renderProducts();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', resetForm);
    }

    function renderProducts() {
        if (!productsAdminGrid) return;

        if (products.length === 0) {
            productsAdminGrid.innerHTML = `
                <div class="empty-products">
                    <i class="fas fa-box-open"></i>
                    <h3>No hay productos aún</h3>
                    <p>Añade tu primer producto usando el formulario de arriba</p>
                </div>
            `;
            return;
        }

        productsAdminGrid.innerHTML = products.map(product => `
            <div class="admin-product-card" data-id="${product.id}">
                <div class="admin-product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/600x400/cccccc/969696?text=Producto'">
                </div>
                <div class="admin-product-info">
                    <h3>${product.name}</h3>
                    <div class="price">€${product.price.toFixed(2)} ${product.oldPrice ? `<span style="text-decoration:line-through;color:#999;font-size:0.9rem;">€${product.oldPrice.toFixed(2)}</span>` : ''}</div>
                    <div class="stock">Stock: ${product.stock} | Rating: ${product.rating}</div>
                    <div class="admin-product-actions">
                        <button class="edit-btn" onclick="window.editProduct(${product.id})">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="delete-btn" onclick="window.deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    window.editProduct = function(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;

        isEditing = true;
        currentProductId = id;

        productNameInput.value = product.name;
        productPriceInput.value = product.price;
        productOldPriceInput.value = product.oldPrice || '';
        productCategoryInput.value = product.category;
        productStockInput.value = product.stock;
        productRatingInput.value = product.rating;
        productDescriptionInput.value = product.description;
        productImageInput.value = product.image;

        tagsCheckboxes.forEach(cb => cb.checked = product.tags.includes(cb.value));

        submitBtn.innerHTML = '<i class="fas fa-save"></i> Actualizar Producto';
        cancelBtn.style.display = 'inline-flex';
        document.querySelector('.add-product-section').scrollIntoView({ behavior: 'smooth' });
    };

    window.deleteProduct = function(id) {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            products = products.filter(p => p.id !== id);
            saveProducts(products);
            renderProducts();
            showNotification('Producto eliminado con éxito', 'info');
        }
    };

    function resetForm() {
        if (productForm) productForm.reset();
        tagsCheckboxes.forEach(cb => cb.checked = false);
        isEditing = false;
        currentProductId = null;
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Guardar Producto';
        cancelBtn.style.display = 'none';
    }

    function showNotification(message, type = 'info') {
        const icons = { success: 'fas fa-check-circle', error: 'fas fa-exclamation-circle', info: 'fas fa-info-circle' };
        const colors = { success: '#27AE60', error: '#E74C3C', info: '#3498DB' };

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed; top: 90px; right: 20px; background: white; padding: 15px 20px;
            border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-left: 5px solid ${colors[type]};
            display: flex; align-items: center; gap: 10px; z-index: 3000;
            transform: translateX(400px); opacity: 0; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        notification.innerHTML = `<i class="${icons[type]}"></i><span>${message}</span>`;
        document.body.appendChild(notification);

        setTimeout(() => { notification.style.transform = 'translateX(0)'; notification.style.opacity = '1'; }, 10);
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)'; notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    function loadOrders() {
        try {
            const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error('Error loading orders:', e);
            localStorage.removeItem(ORDERS_STORAGE_KEY);
        }
        return [];
    }

    function saveOrders() {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    }

    function renderOrders() {
        const ordersList = document.getElementById('ordersList');
        if (!ordersList) return;

        if (orders.length === 0) {
            ordersList.innerHTML = `
                <div class="empty-orders">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>No hay pedidos aún</h3>
                    <p>Los pedidos de los clientes aparecerán aquí</p>
                </div>
            `;
            return;
        }

        ordersList.innerHTML = orders.map(order => {
            const orderDate = new Date(order.date).toLocaleString('es-ES');
            const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            return `
                <div class="order-card" data-id="${order.id}">
                    <div class="order-header">
                        <div>
                            <span class="order-id">Pedido #${order.id}</span>
                            <span class="order-date">${orderDate}</span>
                        </div>
                        <span class="order-status ${order.status}">${order.status}</span>
                    </div>

                    <div class="order-customer">
                        <h4><i class="fas fa-user"></i> Datos del Cliente</h4>
                        <p><strong>Nombre:</strong> ${order.customer.name}</p>
                        <p><strong>Email:</strong> ${order.customer.email}</p>
                        <p><strong>Teléfono:</strong> ${order.customer.phone}</p>
                        <p><strong>Dirección:</strong> ${order.customer.address}</p>
                    </div>

                    <div class="order-items">
                        <h4>Productos:</h4>
                        ${order.items.map(item => `
                            <div class="order-item">
                                <span class="order-item-name">${item.name} x${item.quantity}</span>
                                <span class="order-item-details">€${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="order-total">
                        Total: €${total.toFixed(2)}
                    </div>

                    <div class="order-actions">
                        ${order.status === 'pendiente' ? `
                            <button class="status-btn btn-complete" onclick="window.completeOrder(${order.id})">
                                <i class="fas fa-check"></i> Marcar Completado
                            </button>
                        ` : ''}
                        <button class="status-btn btn-delete-order" onclick="window.deleteOrder(${order.id})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    window.completeOrder = function(id) {
        const order = orders.find(o => o.id === id);
        if (order) {
            order.status = 'completado';
            saveOrders();
            renderOrders();
            showNotification(`Pedido #${id} marcado como completado`, 'success');
        }
    };

    window.deleteOrder = function(id) {
        if (confirm('¿Estás seguro de eliminar este pedido?')) {
            orders = orders.filter(o => o.id !== id);
            saveOrders();
            renderOrders();
            showNotification('Pedido eliminado con éxito', 'info');
        }
    };

    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const changePasswordOverlay = document.getElementById('changePasswordOverlay');
    const changePasswordForm = document.getElementById('changePasswordForm');
    const closePasswordBtn = document.getElementById('closePassword');
    const cancelPasswordBtn = document.getElementById('cancelPassword');
    const passwordError = document.getElementById('passwordError');

    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            changePasswordOverlay.classList.remove('hidden');
        });
    }

    if (closePasswordBtn) {
        closePasswordBtn.addEventListener('click', () => {
            changePasswordOverlay.classList.add('hidden');
            if (changePasswordForm) changePasswordForm.reset();
            if (passwordError) passwordError.textContent = '';
        });
    }

    if (cancelPasswordBtn) {
        cancelPasswordBtn.addEventListener('click', () => {
            changePasswordOverlay.classList.add('hidden');
            if (changePasswordForm) changePasswordForm.reset();
            if (passwordError) passwordError.textContent = '';
        });
    }

    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const current = document.getElementById('currentPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmPassword').value;

            const storedPassword = getStoredPassword();

            if (current !== storedPassword) {
                passwordError.textContent = 'La contraseña actual es incorrecta';
                return;
            }

            if (newPass !== confirmPass) {
                passwordError.textContent = 'Las contraseñas no coinciden';
                return;
            }

            if (newPass.length < 4) {
                passwordError.textContent = 'La contraseña debe tener al menos 4 caracteres';
                return;
            }

            localStorage.setItem(ADMIN_PASSWORD_KEY, newPass);
            sessionStorage.setItem('adminLoggedIn', 'true');
            changePasswordOverlay.classList.add('hidden');
            changePasswordForm.reset();
            passwordError.textContent = '';
            showNotification('Contraseña cambiada con éxito', 'success');
        });
    }
});
