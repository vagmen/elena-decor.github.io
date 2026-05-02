document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        alert('📸 Фотографии защищены авторским правом. Для использования свяжитесь с Еленой.');
        return false;
    }
});

if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
let currentGallery = [], currentIndex = 0;
const GALLERIES = [
    { id: 'mini-gallery', path: 'images/mini/mini', count: 124 },
    { id: 'green-birthday-gallery', path: 'images/silver/silver-HB', count: 8 },
    { id: 'green-day-gallery', path: 'images/silver/green-day/green-day', count: 46 },
    { id: 'nezhnost-gallery', path: 'images/nezhnost/nezhnost', count: 17, numbers: [1,3,5,7,9,11,13,15,17] },
    { id: 'edinorog-gallery', path: 'images/edinorog/edinorog', count: 15 },
    { id: 'superheroes-gallery', path: 'images/supergeroi/supergeroi', count: 21 },
    { id: 'korobka-surpris-gallery', path: 'images/korobka-surpris/korobka-surpris-1', count: 17 },
    { id: 'malyshka-gallery', path: 'images/nezhnost/zayka', count: 15 },
    { id: 'malysh-gallery', path: 'images/first/1boy', count: 7 },
    { id: 'kot-dlya-kota-gallery', path: 'images/cat/black kat', count: 10 },
    { id: 'yagodny-miks-gallery', path: 'images/fruckti/arbuz', count: 9 },
    { id: 'muz-instrument-gallery', path: 'images/instrument/instrument', count: 3 },
    { id: 'aist-gallery', path: 'images/aist/aist', count: 10 },
    { id: 'hearts-gallery', path: 'images/heart/heart', count: 23 },
    { id: 'minecraft-gallery', path: 'images/main/main', count: 10 },
    { id: 'pikachu-gallery', path: 'images/pikachu/pikachu', count: 12 },
    { id: 'mimosa-march-gallery', path: 'images/march/March', count: 21 },
    { id: 'vypusk-karas-gallery', path: 'images/karas/karas-vipusk/karas-vipusk', count: 18 },
    { id: 'powder-white-gallery', path: 'images/fazenda/powder and white/powder and white', count: 22 },
    { id: 'green-room-gallery', path: 'images/green-room/green_wall', count: 17, extension: 'JPG' },
    { id: 'pine-river-gender-gallery', path: 'images/pine-river/gender/pine-river-gender', count: 6 },
    { id: 'pine-river-nature-gallery', path: 'images/pine-river/nature/nature', count: 30 },
    { id: 'sochnaya-fuksiya-gallery', path: 'images/fushe/fushe', count: 5 },
    { id: 'cocktail-party-gallery', path: 'images/party/party', count: 6 },
    { id: 'drakosha-gallery', path: 'images/dracon/dracon', count: 5 },
    { id: 'sochnoe-godovasie-gallery', path: 'images/one year/one year', count: 13 },
    { id: 'better-together-gallery', path: 'images/lodochnaya/vmeste/vmeste', count: 46 },
    { id: 'avtor-gallery', path: 'images/avtor/kazino/kazino', count: 30 },
    { id: 'candles-green-gallery', path: 'images/shoko_rocket/candels/candles', count: 62 }
];

function openGallery(index, galleryArray) { currentGallery = galleryArray; currentIndex = index; document.getElementById('modalImage').src = currentGallery[currentIndex]; document.getElementById('imageCounter').textContent = `${currentIndex+1}/${currentGallery.length}`; document.getElementById('photoModal').style.display = 'block'; document.body.style.overflow = 'hidden'; }
function changeImage(d) { currentIndex += d; if (currentIndex < 0) currentIndex = currentGallery.length-1; else if (currentIndex >= currentGallery.length) currentIndex = 0; document.getElementById('modalImage').src = currentGallery[currentIndex]; document.getElementById('imageCounter').textContent = `${currentIndex+1}/${currentGallery.length}`; }
function closeModal() { document.getElementById('photoModal').style.display = 'none'; document.body.style.overflow = ''; }
function normalizeBase(base) { return base.endsWith('/') ? base : `${base}/`; }
function buildSiteHeader(base) {
    return `
    <header class="site-header">
        <button class="site-logo" onclick="location.href='${base}'">Елена Нестерова</button>
        <nav class="site-nav" aria-label="Основное меню">
            <button onclick="location.href='${base}'">Главная</button>
            <button onclick="location.href='${base}decor/'">Декор</button>
            <button onclick="location.href='${base}photozones/'">Фотозоны</button>
            <button onclick="location.href='${base}balloons/'">Шары</button>
            <button onclick="location.href='${base}brides/'">Невесты</button>
            <button onclick="location.href='${base}about/'">О Елене</button>
            <button onclick="location.href='${base}contacts/'">Контакты</button>
        </nav>
        <button class="site-cta" onclick="location.href='${base}contacts/#form'">Связаться</button>
    </header>
    <div class="mobile-action-bar">
        <button class="mobile-cta" onclick="location.href='${base}contacts/#form'">Связаться</button>
        <button class="mobile-menu-button" onclick="toggleMenu()" aria-expanded="false" aria-label="Открыть меню"><span class="menu-icon">☰</span></button>
    </div>
    <div class="overlay" id="overlay" onclick="closeMenu()"></div>
    <div class="sidenav" id="sidenav">
        <h3>Меню</h3>
        <ul>
            <li><button onclick="location.href='${base}'; closeMenu()">Главная</button></li>
            <li><button onclick="location.href='${base}decor/'; closeMenu()">Декор</button></li>
            <li><button onclick="location.href='${base}photozones/'; closeMenu()">Фотозоны</button></li>
            <li><button onclick="location.href='${base}balloons/'; closeMenu()">Шары</button></li>
            <li><button onclick="location.href='${base}brides/'; closeMenu()">Невесты</button></li>
            <li><button onclick="location.href='${base}about/'; closeMenu()">О Елене</button></li>
            <li><button onclick="location.href='${base}contacts/'; closeMenu()">Контакты</button></li>
        </ul>
    </div>`;
}
function buildSiteFooter(base) {
    return `
        <footer class="site-footer">
            <div>
                <h2>Елена Нестерова</h2>
                <p>Декор праздников, свадеб, фотозон и шаров в Обнинске, Калуге, Наро-Фоминске, Москве и ближайших городах.</p>
            </div>
            <nav class="site-footer-nav" aria-label="Разделы сайта">
                <button onclick="location.href='${base}decor/'">Декор</button>
                <button onclick="location.href='${base}photozones/'">Фотозоны</button>
                <button onclick="location.href='${base}balloons/'">Шары</button>
                <button onclick="location.href='${base}about/'">О Елене</button>
            </nav>
            <div class="site-footer-links">
                <a href="tel:+79036367999">+7 903 636-79-99</a>
                <a href="https://t.me/elena_luce_solare" target="_blank" rel="noopener">Telegram</a>
                <button onclick="location.href='${base}contacts/'">Адреса и карты</button>
            </div>
        </footer>`;
}
function renderSiteShell() {
    document.querySelectorAll('[data-site-chrome]').forEach(host => {
        const base = normalizeBase(host.getAttribute('data-base') || './');
        document.body.dataset.siteBase = base;
        host.outerHTML = buildSiteHeader(base);
    });

    document.querySelectorAll('[data-site-footer]').forEach(host => {
        const base = normalizeBase(host.getAttribute('data-base') || './');
        document.body.dataset.siteBase = base;
        host.outerHTML = buildSiteFooter(base);
    });
}
function toggleMenu() { document.getElementById('sidenav').classList.toggle('open'); document.getElementById('overlay').classList.toggle('show'); document.querySelectorAll('.mobile-menu-button').forEach(button => button.setAttribute('aria-expanded', document.getElementById('sidenav').classList.contains('open'))); }
function closeMenu() { document.getElementById('sidenav').classList.remove('open'); document.getElementById('overlay').classList.remove('show'); document.querySelectorAll('.mobile-menu-button').forEach(button => button.setAttribute('aria-expanded', 'false')); }
function openContactForm() {
    const base = document.body.dataset.siteBase || './';
    location.href = `${base}contacts/#form`;
}
function updateMobileActions() { const isHome = document.getElementById('page-home')?.classList.contains('active'); document.body.classList.toggle('show-mobile-actions', !isHome || window.scrollY > 520); }
function generateGalleries() { GALLERIES.forEach(gallery => { const container = document.getElementById(gallery.id); if(!container) return; container.innerHTML = ''; const numbers = gallery.numbers || Array.from({length: gallery.count}, (_,i) => i+1); const ext = gallery.extension || 'jpg'; const galleryImages = []; numbers.forEach(num => { const imgSrc = `${gallery.path} (${num}).${ext}`; galleryImages.push(imgSrc); const col = document.createElement('div'); col.className = 'column'; const img = document.createElement('img'); img.dataset.src = imgSrc; img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'; img.loading = 'lazy'; img.decoding = 'async'; img.alt = `Фото ${num}`; img.onclick = (function(idx, imgs) { return function() { openGallery(idx, imgs); }; })(num-1, galleryImages); col.appendChild(img); container.appendChild(col); }); }); }

// УНИВЕРСАЛЬНАЯ ЛЕНИВАЯ ЗАГРУЗКА
(function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.dataset.src;
                if (src && !img.classList.contains('loaded')) {
                    const temp = new Image();
                    temp.onload = () => { img.src = src; img.classList.add('loaded'); img.classList.remove('lazy-image'); };
                    temp.src = src;
                }
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '250px', threshold: 0.01 });

    function process(node) {
        if(!node) return;
        const imgs = node.querySelectorAll('img:not([data-lazy-processed])');
        imgs.forEach(img => {
            if(img.src && !img.dataset.src && !img.src.includes('data:image')) {
                img.dataset.src = img.src;
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                img.classList.add('lazy-image');
                img.setAttribute('data-lazy-processed', 'true');
                observer.observe(img);
            } else if(img.dataset.src && !img.classList.contains('loaded') && !img.hasAttribute('data-lazy-processed')) {
                img.classList.add('lazy-image');
                img.setAttribute('data-lazy-processed', 'true');
                observer.observe(img);
            }
        });
    }
    function scanAll() { document.querySelectorAll('.row.masonry, .project-card, .about-photo, [id$="-gallery"]').forEach(el => process(el)); document.querySelectorAll('img').forEach(img => { if(!img.hasAttribute('data-lazy-processed')) process(img.parentElement || document.body); }); }
    const origShow = window.showPage;
    if(origShow) window.showPage = function(id) { origShow(id); setTimeout(scanAll, 150); };
    const origGen = window.generateGalleries;
    if(origGen) window.generateGalleries = function() { origGen(); scanAll(); };
    document.addEventListener('DOMContentLoaded', () => { generateGalleries(); scanAll(); });
    new MutationObserver(() => scanAll()).observe(document.body, { childList: true, subtree: true });
})();

window.addEventListener('scroll', updateMobileActions, { passive: true });
window.addEventListener('load', function() { renderSiteShell(); if(typeof generateGalleries === 'function') generateGalleries(); updateMobileActions(); });
