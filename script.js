// Sample Product Data
const products = [
    {
        id: 1,
        name: "Classic Leather Watch",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Minimalist design with genuine leather strap.",
        category: "Accessories"
    },
    {
        id: 2,
        name: "Signature Aviator Sunglasses",
        price: 89.50,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "UV400 protection with gold-plated frames.",
        category: "Accessories"
    },
    {
        id: 3,
        name: "Premium Oxford Shoes",
        price: 199.00,
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Handcrafted from Italian calf leather.",
        category: "Footwear"
    },
    {
        id: 4,
        name: "Minimalist Backpack",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Water-resistant canvas with leather accents.",
        category: "Fashion"
    },
    {
        id: 5,
        name: "Wireless Headphones",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "High-fidelity audio with 30-hour battery life.",
        category: "Electronics"
    },
    {
        id: 6,
        name: "Smart Fitness Tracker",
        price: 129.50,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Track your health metrics in style.",
        category: "Electronics"
    },
    {
        id: 7,
        name: "Elegant Gold Necklace",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "18k gold plated necklace with a delicate pendant.",
        category: "Accessories"
    },
    {
        id: 8,
        name: "Casual Denim Jacket",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Classic vintage wash denim jacket for everyday style.",
        category: "Fashion"
    },
    {
        id: 9,
        name: "Luxury Silk Scarf",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "100% silk scarf with a vibrant floral print.",
        category: "Fashion"
    },
    {
        id: 10,
        name: "Performance Running Sneakers",
        price: 110.00,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Lightweight and breathable for maximum comfort.",
        category: "Footwear"
    },
    {
        id: 11,
        name: "Classic Leather Loafers",
        price: 135.00,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Timeless design perfect for formal or casual wear.",
        category: "Footwear"
    },
    {
        id: 12,
        name: "Portable Bluetooth Speaker",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Compact speaker with powerful 360-degree sound.",
        category: "Electronics"
    }
];

// State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartCount = document.querySelector('.cart-count');
const cartOverlay = document.querySelector('.cart-overlay');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const searchInput = document.getElementById('search-input');
const searchBtn = document.querySelector('.search-btn');

// Initialize
function init() {
    renderProducts(products); // Pass all products initially
    updateCartCount();
    setupSearch();
    setupMobileMenu();
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Toggle icon between bars and times
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Filter Products
function filterProducts(category) {
    // Update active class on sidebar
    const items = document.querySelectorAll('.category-sidebar li');
    items.forEach(item => {
        item.classList.remove('active');
        if (item.innerText === category || (category === 'all' && item.innerText === 'All Products')) {
            item.classList.add('active');
        }
    });

    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Setup Search
function setupSearch() {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        renderProducts(filteredProducts);
    });
}


// Render Products
function renderProducts(productsToRender) {
    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: #64748b;">No products found.</p>';
        return;
    }

    productGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Add to cart array
        cart.push(product);
        updateCartCount();
        renderCartItems();

        // Open cart to show the added item
        if (!cartSidebar.classList.contains('active')) {
            toggleCart();
        }
    }
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCartItems();
}

// Toggle Cart Visibility
function toggleCart() {
    cartOverlay.classList.toggle('active');
    cartSidebar.classList.toggle('active');
}

// Update Cart Count
function updateCartCount() {
    cartCount.innerText = cart.length;
}

// Render Cart Items
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        cartTotalElement.innerText = '$0.00';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    cartTotalElement.innerText = '$' + total.toFixed(2);
}

// Start
init();
