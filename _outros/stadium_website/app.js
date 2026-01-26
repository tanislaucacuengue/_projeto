// Global State
let appState = {
    currentUser: null,
    events: [],
    gallery: [],
    userTickets: [],
    currentSection: 'home'
};

// Load data on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupEventListeners();
    loadUserFromStorage();
    renderEvents();
    renderGallery();
});

// Load data from JSON
async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar dados');
        }
        const data = await response.json();
        appState.events = data.events || [];
        appState.gallery = data.gallery || [];
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Use mock data if fetch fails
        loadMockData();
    }
}

// Mock data fallback
function loadMockData() {
    appState.events = [
        {
            id: 1,
            title: "Clássico do Futebol",
            date: "2025-02-15",
            time: "20:00",
            location: "Estádio Principal",
            category: "futebol",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop",
            description: "Grande clássico entre os maiores times da região.",
            capacity: 50000,
            available: 12000,
            price: 50
        },
        {
            id: 2,
            title: "Show de Música ao Vivo",
            date: "2025-02-20",
            time: "21:00",
            location: "Arena de Eventos",
            category: "musica",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=300&fit=crop",
            description: "Apresentação de artistas internacionais.",
            capacity: 8000,
            available: 2500,
            price: 120
        }
    ];

    appState.gallery = [
        {
            id: 1,
            title: "Estádio Iluminado",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
            category: "estadio"
        },
        {
            id: 2,
            title: "Público Animado",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
            category: "publico"
        }
    ];
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.dataset.section) {
                e.preventDefault();
                navigateTo(link.dataset.section);
            }
        });
    });

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Auth button
    document.getElementById('navAuthBtn').addEventListener('click', (e) => {
        e.preventDefault();
        if (appState.currentUser) {
            openProfileModal();
        } else {
            openAuthModal();
        }
    });

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('active');
        });
    });

    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Event filters
    document.getElementById('searchInput').addEventListener('input', filterEvents);
    document.getElementById('categoryFilter').addEventListener('change', filterEvents);
}

// Navigation
function navigateTo(section) {
    // Update active section
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === section) {
            link.classList.add('active');
        }
    });

    appState.currentSection = section;
    window.scrollTo(0, 0);
}

// Render events
function renderEvents() {
    const grid = document.getElementById('eventsGrid');
    
    if (appState.events.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📭</div><p>Nenhum evento disponível</p></div>';
        return;
    }

    grid.innerHTML = appState.events.map(event => `
        <div class="event-card" onclick="openEventDetail(${event.id})">
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <span class="event-category">${event.category}</span>
                <h3>${event.title}</h3>
                <p class="event-date">📅 ${formatDate(event.date)} às ${event.time}</p>
                <p class="event-location">📍 ${event.location}</p>
                <p class="event-price">R$ ${event.price.toFixed(2)}</p>
                <p class="event-availability">${event.available} ingressos disponíveis</p>
                <button class="btn btn-primary">Ver Detalhes</button>
            </div>
        </div>
    `).join('');
}

// Render gallery
function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    
    grid.innerHTML = appState.gallery.map(item => `
        <div class="gallery-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-overlay">
                <h3>${item.title}</h3>
            </div>
        </div>
    `).join('');
}

// Filter events
function filterEvents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    const filtered = appState.events.filter(event => {
        const matchSearch = event.title.toLowerCase().includes(searchTerm) ||
                          event.location.toLowerCase().includes(searchTerm) ||
                          event.description.toLowerCase().includes(searchTerm);
        const matchCategory = !category || event.category === category;
        return matchSearch && matchCategory;
    });

    const grid = document.getElementById('eventsGrid');
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔍</div><p>Nenhum evento encontrado</p></div>';
        return;
    }

    grid.innerHTML = filtered.map(event => `
        <div class="event-card" onclick="openEventDetail(${event.id})">
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <span class="event-category">${event.category}</span>
                <h3>${event.title}</h3>
                <p class="event-date">📅 ${formatDate(event.date)} às ${event.time}</p>
                <p class="event-location">📍 ${event.location}</p>
                <p class="event-price">R$ ${event.price.toFixed(2)}</p>
                <p class="event-availability">${event.available} ingressos disponíveis</p>
                <button class="btn btn-primary">Ver Detalhes</button>
            </div>
        </div>
    `).join('');
}

// Auth Modal
function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

function toggleAuthForm(e) {
    e.preventDefault();
    document.getElementById('loginForm').classList.toggle('active');
    document.getElementById('registerForm').classList.toggle('active');
}

function handleLogin(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    if (email && password) {
        appState.currentUser = {
            id: Date.now(),
            email: email,
            name: email.split('@')[0],
            tickets: []
        };
        saveUserToStorage();
        updateAuthUI();
        document.getElementById('authModal').classList.remove('active');
        e.target.reset();
        showNotification('Login realizado com sucesso!');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = e.target.querySelectorAll('input[type="password"]')[1].value;

    if (password !== confirmPassword) {
        showNotification('As senhas não coincidem!', 'error');
        return;
    }

    if (name && email && password) {
        appState.currentUser = {
            id: Date.now(),
            name: name,
            email: email,
            tickets: []
        };
        saveUserToStorage();
        updateAuthUI();
        document.getElementById('authModal').classList.remove('active');
        e.target.reset();
        showNotification('Cadastro realizado com sucesso!');
    }
}

function updateAuthUI() {
    const authBtn = document.getElementById('navAuthBtn');
    if (appState.currentUser) {
        authBtn.textContent = `👤 ${appState.currentUser.name}`;
    } else {
        authBtn.textContent = 'Login';
    }
}

// Profile Modal
function openProfileModal() {
    const modal = document.getElementById('profileModal');
    const content = document.getElementById('profileContent');

    if (!appState.currentUser) {
        openAuthModal();
        return;
    }

    const ticketsHTML = appState.currentUser.tickets.length > 0
        ? appState.currentUser.tickets.map(ticket => `
            <div class="ticket-item">
                <p><strong>${ticket.eventTitle}</strong></p>
                <p>Data: ${formatDate(ticket.date)} às ${ticket.time}</p>
                <p>Local: ${ticket.location}</p>
                <p>Ingresso #${ticket.id}</p>
            </div>
        `).join('')
        : '<p style="color: var(--color-gray);">Você ainda não possui ingressos.</p>';

    content.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar">${appState.currentUser.name.charAt(0).toUpperCase()}</div>
            <div class="profile-info">
                <h3>${appState.currentUser.name}</h3>
                <p>${appState.currentUser.email}</p>
            </div>
        </div>
        <div class="profile-tickets">
            <h4>Meus Ingressos</h4>
            ${ticketsHTML}
        </div>
        <button class="btn logout-btn" onclick="logout()">Sair</button>
    `;

    modal.classList.add('active');
}

function logout() {
    appState.currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    document.getElementById('profileModal').classList.remove('active');
    showNotification('Você foi desconectado!');
}

// Event Detail Modal
function openEventDetail(eventId) {
    if (!appState.currentUser) {
        showNotification('Faça login para comprar ingressos!', 'warning');
        openAuthModal();
        return;
    }

    const event = appState.events.find(e => e.id === eventId);
    if (!event) return;

    const modal = document.getElementById('eventDetailModal');
    const content = document.getElementById('eventDetailContent');

    content.innerHTML = `
        <div class="event-detail">
            <div class="event-detail-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="event-detail-content">
                <h2>${event.title}</h2>
                <div class="event-detail-info">
                    <p><strong>📅 Data:</strong> ${formatDate(event.date)}</p>
                    <p><strong>🕐 Horário:</strong> ${event.time}</p>
                    <p><strong>📍 Local:</strong> ${event.location}</p>
                    <p><strong>🏟️ Capacidade:</strong> ${event.capacity.toLocaleString()} pessoas</p>
                    <p><strong>🎫 Disponíveis:</strong> ${event.available} ingressos</p>
                </div>
                <div class="event-detail-description">
                    <p>${event.description}</p>
                </div>
                <div class="event-detail-price">R$ ${event.price.toFixed(2)}</div>
                <button class="btn btn-primary" onclick="buyTicket(${event.id})">Comprar Ingresso</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function buyTicket(eventId) {
    const event = appState.events.find(e => e.id === eventId);
    if (!event) return;

    if (event.available <= 0) {
        showNotification('Ingressos esgotados!', 'error');
        return;
    }

    const ticket = {
        id: Date.now(),
        eventId: event.id,
        eventTitle: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        price: event.price,
        purchaseDate: new Date().toLocaleDateString('pt-BR')
    };

    appState.currentUser.tickets.push(ticket);
    event.available--;

    saveUserToStorage();
    document.getElementById('eventDetailModal').classList.remove('active');
    showNotification(`Ingresso comprado com sucesso! Seu número de ingresso é #${ticket.id}`);
}

// Storage functions
function saveUserToStorage() {
    localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
}

function loadUserFromStorage() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        appState.currentUser = JSON.parse(user);
        updateAuthUI();
    }
}

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background-color: ${type === 'error' ? '#c70a06' : type === 'warning' ? '#fff06f' : '#4CAF50'};
        color: ${type === 'warning' ? '#000' : '#fff'};
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


