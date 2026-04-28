(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();const s={currency:"€",shippingFreeLimit:50,taxRate:.21},v="shopOrders",I=[{id:1,name:"MacBook Pro M2",description:"Laptop profesional con chip M2, 16GB RAM, 512GB SSD",price:1499.99,oldPrice:1699.99,category:"electronics",image:"/images/macbook.jpg",stock:12,rating:4.8,tags:["nuevo","oferta"]},{id:2,name:"iPhone 14 Pro",description:"Smartphone premium con cámara de 48MP y Dynamic Island",price:999.99,category:"electronics",image:"/images/iphone.jpg",stock:25,rating:4.9,tags:["popular"]},{id:3,name:"Sudadera Premium",description:"Sudadera de algodón orgánico, diseño oversize",price:49.99,oldPrice:69.99,category:"clothing",image:"/images/sudadera.jpg",stock:45,rating:4.6,tags:["oferta"]},{id:4,name:"Zapatillas Running",description:"Zapatillas deportivas con tecnología de amortiguación",price:89.99,category:"sports",image:"/images/zapatillas.jpg",stock:30,rating:4.7,tags:["nuevo"]},{id:5,name:"Auriculares Noise Cancel",description:"Cancelación de ruido activa, 30h de batería",price:199.99,oldPrice:249.99,category:"electronics",image:"/images/auriculares.jpg",stock:18,rating:4.8,tags:["oferta","popular"]},{id:6,name:"Reloj Inteligente",description:"Monitor de actividad, GPS y resistencia al agua",price:299.99,category:"electronics",image:"/images/reloj.jpg",stock:22,rating:4.5,tags:["nuevo"]},{id:7,name:"Libro de Cocina",description:"Recetas gourmet con fotografías profesionales",price:34.99,category:"books",image:"/images/libro.jpg",stock:60,rating:4.4,tags:[]},{id:8,name:"Lámpara de Mesa",description:"Diseño moderno, luz LED ajustable, control táctil",price:45.99,oldPrice:59.99,category:"home",image:"/images/lampara.jpg",stock:28,rating:4.3,tags:["oferta"]},{id:9,name:"Bicicleta Mountain",description:"Bicicleta todo terreno, 21 velocidades, suspensión",price:599.99,category:"sports",image:"/images/bicicleta.jpg",stock:8,rating:4.9,tags:["popular"]},{id:10,name:"Cámara Profesional",description:"Cámara mirrorless 24MP, grabación 4K, kit de lentes",price:1299.99,category:"electronics",image:"/images/camara.jpg",stock:15,rating:4.8,tags:["nuevo"]},{id:11,name:"Set de Cocina",description:"12 piezas de acero inoxidable, antiadherente",price:129.99,oldPrice:159.99,category:"home",image:"/images/setcocina.jpg",stock:35,rating:4.6,tags:["oferta"]},{id:12,name:"Jeans Slim Fit",description:"Jeans de denim elástico, corte moderno",price:39.99,category:"clothing",image:"/images/jeans.jpg",stock:50,rating:4.4,tags:[]}];let d=w();function w(){try{const i=localStorage.getItem("adminProducts");if(i){const t=JSON.parse(i);if(Array.isArray(t)&&t.length>0)return t}}catch(i){console.error("Error loading products from storage:",i)}return I}let r=JSON.parse(localStorage.getItem("shopPremiumCart"))||[],$="grid",y="all",E="default";document.addEventListener("DOMContentLoaded",()=>{x(),u()});function x(){l(),B(),k()}function B(){document.getElementById("cartBtn").addEventListener("click",g),document.getElementById("closeCart").addEventListener("click",g),document.getElementById("cartOverlay").addEventListener("click",g),document.querySelectorAll(".category-btn").forEach(i=>{i.addEventListener("click",t=>{document.querySelectorAll(".category-btn").forEach(e=>e.classList.remove("active")),t.target.closest(".category-btn").classList.add("active"),y=t.target.closest(".category-btn").dataset.category,l()})}),document.querySelectorAll(".view-btn").forEach(i=>{i.addEventListener("click",t=>{document.querySelectorAll(".view-btn").forEach(e=>e.classList.remove("active")),t.target.closest(".view-btn").classList.add("active"),$=t.target.closest(".view-btn").dataset.view,l()})}),document.getElementById("sortSelect").addEventListener("change",i=>{E=i.target.value,l()}),document.getElementById("searchBtn").addEventListener("click",h),document.getElementById("searchInput").addEventListener("input",h),document.getElementById("checkoutBtn").addEventListener("click",q),document.getElementById("closeCheckout").addEventListener("click",p),document.getElementById("checkoutOverlay").addEventListener("click",p),document.getElementById("cancelCheckout").addEventListener("click",p),document.getElementById("checkoutForm").addEventListener("submit",handleCheckoutSubmit)}function g(){const i=document.getElementById("cartSidebar"),t=document.getElementById("cartOverlay");i.classList.toggle("active"),t.classList.toggle("active"),document.body.style.overflow=i.classList.contains("active")?"hidden":""}function h(){l()}function b(i){return{electronics:"Electrónica",clothing:"Ropa",home:"Hogar",books:"Libros",sports:"Deportes"}[i]||i}function k(){const i=L();document.getElementById("productCount").textContent=`${i.length} productos`}function l(){let i=L();i=C(i),$==="grid"?(S(i),document.getElementById("productsGrid").style.display="grid",document.getElementById("productsList").style.display="none"):(P(i),document.getElementById("productsGrid").style.display="none",document.getElementById("productsList").style.display="flex"),k()}function L(){const i=document.getElementById("searchInput").value.toLowerCase();let t=y==="all"?d:d.filter(e=>e.category===y);return i&&(t=t.filter(e=>e.name.toLowerCase().includes(i)||e.description.toLowerCase().includes(i))),t}function C(i){switch(E){case"price-asc":return[...i].sort((t,e)=>t.price-e.price);case"price-desc":return[...i].sort((t,e)=>e.price-t.price);case"name-asc":return[...i].sort((t,e)=>t.name.localeCompare(e.name));case"name-desc":return[...i].sort((t,e)=>e.name.localeCompare(t.name));default:return i}}function S(i){const t=document.getElementById("productsGrid");t.innerHTML=i.map(e=>`
        <div class="product-card" data-id="${e.id}">
            ${e.tags.includes("oferta")?'<span class="product-badge">🔥 Oferta</span>':""}
            ${e.tags.includes("nuevo")?'<span class="product-badge" style="background:var(--accent);">✨ Nuevo</span>':""}
            
            <div class="product-image">
                <img src="${e.image}" alt="${e.name}" 
                     onerror="this.src='https://via.placeholder.com/600x400/cccccc/969696?text=Producto'">
                <div class="quick-actions">
                    <button class="action-btn" onclick="showProductDetail(${e.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="addToWishlist(${e.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            
            <div class="product-info">
                <div class="product-category">${b(e.category)}</div>
                <h3 class="product-title">${e.name}</h3>
                <p class="product-description">${e.description}</p>
                
                <div class="product-footer">
                    <div>
                        ${e.oldPrice?`
                            <div class="product-price">
                                <span class="old-price">${s.currency}${e.oldPrice}</span>
                                ${s.currency}${e.price.toFixed(2)}
                            </div>
                        `:`
                            <div class="product-price">
                                ${s.currency}${e.price.toFixed(2)}
                            </div>
                        `}
                        <div style="font-size:0.9rem;color:var(--gray);margin-top:5px;">
                            <i class="fas fa-star" style="color:var(--warning);"></i> 
                            ${e.rating} | ${e.stock} en stock
                        </div>
                    </div>
                    
                    <button class="add-to-cart" onclick="addToCart(${e.id})" 
                            ${e.stock===0?"disabled":""}>
                        ${e.stock===0?'<i class="fas fa-times"></i> Agotado':'<i class="fas fa-cart-plus"></i> Añadir'}
                    </button>
                </div>
            </div>
        </div>
    `).join("")}function P(i){const t=document.getElementById("productsList");t.innerHTML=i.map(e=>`
        <div class="product-list-item" data-id="${e.id}">
            <div class="product-image">
                <img src="${e.image}" alt="${e.name}" 
                     onerror="this.src='https://via.placeholder.com/600x400/cccccc/969696?text=Producto'">
            </div>
            
            <div class="product-info">
                <div class="product-category">${b(e.category)}</div>
                <h3 class="product-title">${e.name}</h3>
                <p class="product-description">${e.description}</p>
                
                <div style="margin-top:15px;display:flex;align-items:center;gap:20px;">
                    <div style="font-size:0.9rem;color:var(--gray);">
                        <i class="fas fa-star" style="color:var(--warning);"></i> ${e.rating}
                    </div>
                    <div style="font-size:0.9rem;color:var(--gray);">
                        <i class="fas fa-box"></i> ${e.stock} disponibles
                    </div>
                </div>
            </div>
            
            <div style="text-align:right;">
                ${e.oldPrice?`
                    <div style="color:var(--gray);text-decoration:line-through;font-size:0.9rem;">
                        ${s.currency}${e.oldPrice}
                    </div>
                `:""}
                <div class="product-price" style="margin:10px 0 15px 0;">
                    ${s.currency}${e.price.toFixed(2)}
                </div>
                <button class="add-to-cart" onclick="addToCart(${e.id})"
                        ${e.stock===0?"disabled":""}>
                    ${e.stock===0?'<i class="fas fa-times"></i> Agotado':'<i class="fas fa-cart-plus"></i> Añadir'}
                </button>
            </div>
        </div>
    `).join("")}window.addToCart=function(i){const t=d.find(a=>a.id===i);if(!t)return;if(t.stock<=0){showNotification("Producto agotado","error");return}const e=r.find(a=>a.id===i);if(e){if(e.quantity>=t.stock){showNotification(`Solo quedan ${t.stock} unidades`,"error");return}e.quantity+=1}else r.push({...t,quantity:1});f(),u(),showNotification(`${t.name} añadido al carrito`,"success");const o=document.querySelector(`.add-to-cart[onclick="addToCart(${i})"]`);o&&(o.classList.add("added"),o.innerHTML='<i class="fas fa-check"></i> Añadido',setTimeout(()=>{o.classList.remove("added"),o.innerHTML='<i class="fas fa-cart-plus"></i> Añadir'},2e3))};window.updateQuantity=function(i,t){const e=r.find(n=>n.id===i);if(!e)return;const o=e.quantity+t;if(o<1){removeFromCart(i);return}const a=d.find(n=>n.id===i);if(a&&o>a.stock){showNotification(`Solo quedan ${a.stock} unidades`,"error");return}e.quantity=o,f(),u()};window.removeFromCart=function(i){r=r.filter(t=>t.id!==i),f(),u(),showNotification("Producto eliminado del carrito","info")};function f(){localStorage.setItem("shopPremiumCart",JSON.stringify(r))}function u(){const i=r.reduce((c,m)=>c+m.quantity,0);document.getElementById("cartCount").textContent=i;const t=document.getElementById("cartItems"),e=r.reduce((c,m)=>c+m.price*m.quantity,0),o=e>=s.shippingFreeLimit?0:9.99,a=e*s.taxRate,n=e+o+a;if(document.getElementById("cartSubtotal").textContent=`${s.currency}${e.toFixed(2)}`,document.getElementById("cartShipping").textContent=o===0?"Gratis":`${s.currency}${o.toFixed(2)}`,document.getElementById("cartTax").textContent=`${s.currency}${a.toFixed(2)}`,document.getElementById("cartTotal").textContent=`${s.currency}${n.toFixed(2)}`,r.length===0){t.innerHTML=`
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega productos para comenzar</p>
            </div>
        `;return}t.innerHTML=r.map(c=>`
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${c.image}" alt="${c.name}">
            </div>
            
            <div class="cart-item-info">
                <h4>${c.name}</h4>
                <div class="cart-item-price">
                    ${s.currency}${c.price.toFixed(2)}
                </div>
                
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${c.id}, -1)">-</button>
                        <span style="font-weight:bold;">${c.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${c.id}, 1)">+</button>
                    </div>
                    
                    <button class="remove-item" onclick="removeFromCart(${c.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
            
            <div style="text-align:right;">
                <div style="font-weight:bold;font-size:1.1rem;">
                    ${s.currency}${(c.price*c.quantity).toFixed(2)}
                </div>
                <div style="font-size:0.9rem;color:var(--gray);margin-top:5px;">
                    ${c.stock-c.quantity} disponibles
                </div>
            </div>
        </div>
    `).join("")}window.showNotification=function(i,t="info"){const e=document.getElementById("notificationContainer"),o=document.createElement("div");o.className=`notification ${t}`;const a={success:"fas fa-check-circle",error:"fas fa-exclamation-circle",info:"fas fa-info-circle",warning:"fas fa-exclamation-triangle"};o.innerHTML=`
        <i class="${a[t]||a.info}"></i>
        <span>${i}</span>
    `,e.appendChild(o),setTimeout(()=>o.classList.add("show"),10),setTimeout(()=>{o.classList.remove("show"),setTimeout(()=>o.remove(),300)},3e3)};window.showProductDetail=function(i){const t=d.find(e=>e.id===i);showNotification(`Detalles de: ${t.name}`,"info")};window.addToWishlist=function(i){const t=d.find(e=>e.id===i);showNotification(`${t.name} añadido a favoritos`,"success")};function q(){if(r.length===0){showNotification("El carrito está vacío","error");return}F()}function F(){const i=document.getElementById("checkoutModal"),t=document.getElementById("checkoutOverlay");i.classList.add("active"),t.classList.add("active"),document.body.style.overflow="hidden",M()}function p(){const i=document.getElementById("checkoutModal"),t=document.getElementById("checkoutOverlay");i.classList.remove("active"),t.classList.remove("active"),document.body.style.overflow=""}function M(){const i=document.getElementById("orderSummary"),t=r.reduce((n,c)=>n+c.price*c.quantity,0),e=t>=s.shippingFreeLimit?0:9.99,o=t*s.taxRate,a=t+e+o;i.innerHTML=r.map(n=>`
        <div class="order-summary-item">
            <span>${n.name} x${n.quantity}</span>
            <span>${s.currency}${(n.price*n.quantity).toFixed(2)}</span>
        </div>
    `).join("")+`
        <div class="order-summary-item">
            <span>Subtotal</span>
            <span>${s.currency}${t.toFixed(2)}</span>
        </div>
        <div class="order-summary-item">
            <span>Envío</span>
            <span>${e===0?"Gratis":s.currency+e.toFixed(2)}</span>
        </div>
        <div class="order-summary-item">
            <span>IVA (21%)</span>
            <span>${s.currency}${o.toFixed(2)}</span>
        </div>
        <div class="order-summary-item">
            <span>Total</span>
            <span>${s.currency}${a.toFixed(2)}</span>
        </div>
    `}function O(i){const t=JSON.parse(localStorage.getItem(v)||"[]"),o={id:t.length>0?Math.max(...t.map(a=>a.id))+1:1,date:new Date().toISOString(),customer:i,items:[...r],subtotal:r.reduce((a,n)=>a+n.price*n.quantity,0),status:"pendiente"};return t.push(o),localStorage.setItem(v,JSON.stringify(t)),o}window.handleCheckoutSubmit=function(i){i.preventDefault();const t={name:document.getElementById("customerName").value,email:document.getElementById("customerEmail").value,phone:document.getElementById("customerPhone").value,address:document.getElementById("customerAddress").value},e=O(t);showNotification(`¡Pedido #${e.id} realizado con éxito!`,"success"),r=[],f(),u(),p(),g(),document.getElementById("checkoutForm").reset()};
