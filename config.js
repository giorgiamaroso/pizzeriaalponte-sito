/* ═══════════════════════════════════════════════════════════════════════
   MENU DROPDOWN - Gestione apertura/chiusura menu a tendina
   ═══════════════════════════════════════════════════════════════════════ */

document.querySelectorAll('.menu-item > a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const menuItem = this.parentElement;
        
        document.querySelectorAll('.menu-item').forEach(item => {
            if (item !== menuItem) {
                item.classList.remove('active');
            }
        });
        
        menuItem.classList.toggle('active');
    });
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu-item')) {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
    }
});

/* Slider rimosso - sostituito con marquee gallery CSS puro */

/* ═══════════════════════════════════════════════════════════════════════
   MODALE - Gestione popup di conferma
   ═══════════════════════════════════════════════════════════════════════ */

function closeModal(modal) {
    modal.classList.add('closing');
    
    setTimeout(() => {
        modal.classList.remove('show');
        modal.classList.remove('closing');
        document.getElementById('contactForm').reset();
    }, 300);
}

/* ═══════════════════════════════════════════════════════════════════════
   FORM CONTATTI - Gestione invio form e modale di conferma
   ═══════════════════════════════════════════════════════════════════════ */

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const modal = document.getElementById('thankYouModal');
    modal.classList.add('show');
    
    const formData = new FormData(this);
    
    fetch('https://formsubmit.co/pizzeriatrattoria.alponte@gmail.com', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        setTimeout(() => {
            closeModal(modal);
        }, 2000);
    })
    .catch(error => {
        console.error('Errore durante l\'invio del form:', error);
        closeModal(modal);
    });
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('thankYouModal');
    if (event.target === modal) {
        closeModal(modal);
    }
});

const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

/* ═══════════════════════════════════════════════════════════════════════
   MAPPA INTERATTIVA CON LEAFLET + STADIA MAPS (stile pulito e moderno)
   ═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
    // Coordinate del ristorante (Via Braglio, 83, Colceresa VI)
    const restaurantLat = 45.721079;
    const restaurantLng = 11.609528;

    // Inizializza la mappa centrata sul ristorante
    const map = L.map('map', {
        center: [restaurantLat, restaurantLng],
        zoom: 15,
        scrollWheelZoom: false,
        zoomControl: true
    });

    // Tile layer Stadia Maps - Alidade Smooth (cartografico, pulito, poco rumore visivo)
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 20
    }).addTo(map);

    // Icona personalizzata nei colori del sito
    const pizzeriaIcon = L.divIcon({
        className: '',
        html: `<div style="
            background-color: #dd3534;
            width: 36px;
            height: 36px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid #ffffff;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -38]
    });

    // Marker ristorante con popup
    const marker = L.marker([restaurantLat, restaurantLng], { icon: pizzeriaIcon }).addTo(map);
    marker.bindPopup(`
        <div style="font-family: 'DM Sans', sans-serif; padding: 6px 4px; min-width: 180px;">
            <strong style="color: #dd3534; font-size: 15px;">🍕 Pizzeria Trattoria al Ponte</strong><br>
            <span style="color: #555; font-size: 13px;">Via Braglio, 83 — Colceresa (VI)</span>
        </div>
    `, { offset: [0, -5] }).openPopup();

    // Icona parcheggio (blu, quadrata)
    const parkingIcon = L.divIcon({
        className: '',
        html: `<div style="
            background-color: #276aa4;
            width: 30px;
            height: 30px;
            border-radius: 6px;
            border: 3px solid #ffffff;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 15px;
            font-family: sans-serif;
        ">P</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -18]
    });

    // Parcheggi con coordinate reali
    const parcheggi = [
        {
            lat: 45.7209,
            lng: 11.60966,
            nome: 'Parcheggio Magazzini Da Leone',
            desc: 'Via Braglio, 46 — di fronte al ristorante'
        },
        {
            lat: 45.7186549,
            lng: 11.6081537,
            nome: 'Parcheggio Pubblico',
            desc: 'Piazza del Mercato — ~300m dal ristorante'
        },
        {
            lat: 45.7186948,
            lng: 11.6074738,
            nome: 'Area parcheggio libero',
            desc: 'Via Roma — ~100m dal ristorante'
        }
    ];

    parcheggi.forEach(p => {
        const m = L.marker([p.lat, p.lng], { icon: parkingIcon }).addTo(map);
        m.bindPopup(`
            <div style="font-family: 'DM Sans', sans-serif; padding: 6px 4px; min-width: 180px;">
                <strong style="color: #276aa4; font-size: 15px;">🅿️ ${p.nome}</strong><br>
                <span style="color: #555; font-size: 13px;">${p.desc}</span>
            </div>
        `);
    });
});
