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
    { id: 'mini-gallery', path: '/images/mini/mini', count: 124 },
    { id: 'green-birthday-gallery', path: '/images/silver/silver-HB', count: 8 },
    { id: 'green-day-gallery', path: '/images/silver/green-day/green-day', count: 46 },
    { id: 'nezhnost-gallery', path: '/images/nezhnost/nezhnost', count: 17, numbers: [1,3,5,7,9,11,13,15,17] },
    { id: 'edinorog-gallery', path: '/images/edinorog/edinorog', count: 15 },
    { id: 'superheroes-gallery', path: '/images/supergeroi/supergeroi', count: 21 },
    { id: 'korobka-surpris-gallery', path: '/images/korobka-surpris/korobka-surpris-1', count: 17 },
    { id: 'malyshka-gallery', path: '/images/nezhnost/zayka', count: 15 },
    { id: 'malysh-gallery', path: '/images/first/1boy', count: 7 },
    { id: 'kot-dlya-kota-gallery', path: '/images/cat/black kat', count: 10 },
    { id: 'yagodny-miks-gallery', path: '/images/fruckti/arbuz', count: 9 },
    { id: 'muz-instrument-gallery', path: '/images/instrument/instrument', count: 3 },
    { id: 'aist-gallery', path: '/images/aist/aist', count: 10 },
    { id: 'hearts-gallery', path: '/images/heart/heart', count: 23 },
    { id: 'minecraft-gallery', path: '/images/main/main', count: 10 },
    { id: 'pikachu-gallery', path: '/images/pikachu/pikachu', count: 12 },
    { id: 'mimosa-march-gallery', path: '/images/march/March', count: 21 },
    { id: 'vypusk-karas-gallery', path: '/images/karas/karas-vipusk/karas-vipusk', count: 18 },
    { id: 'powder-white-gallery', path: '/images/fazenda/powder and white/powder and white', count: 22 },
    { id: 'green-room-gallery', path: '/images/green-room/green_wall', count: 17, extension: 'JPG' },
    { id: 'pine-river-gender-gallery', path: '/images/pine-river/gender/pine-river-gender', count: 6 },
    { id: 'pine-river-nature-gallery', path: '/images/pine-river/nature/nature', count: 30 },
    { id: 'sochnaya-fuksiya-gallery', path: '/images/fushe/fushe', count: 5 },
    { id: 'cocktail-party-gallery', path: '/images/party/party', count: 6 },
    { id: 'drakosha-gallery', path: '/images/dracon/dracon', count: 5 },
    { id: 'sochnoe-godovasie-gallery', path: '/images/one year/one year', count: 13 },
    { id: 'better-together-gallery', path: '/images/lodochnaya/vmeste/vmeste', count: 46 },
    { id: 'avtor-gallery', path: '/images/avtor/kazino/kazino', count: 30 },
    { id: 'candles-green-gallery', path: '/images/shoko_rocket/candels/candles', count: 62 }
];

function openGallery(index, galleryArray) { currentGallery = galleryArray; currentIndex = index; document.getElementById('modalImage').src = currentGallery[currentIndex]; document.getElementById('imageCounter').textContent = `${currentIndex+1}/${currentGallery.length}`; document.getElementById('photoModal').style.display = 'block'; document.body.style.overflow = 'hidden'; }
function changeImage(d) { currentIndex += d; if (currentIndex < 0) currentIndex = currentGallery.length-1; else if (currentIndex >= currentGallery.length) currentIndex = 0; document.getElementById('modalImage').src = currentGallery[currentIndex]; document.getElementById('imageCounter').textContent = `${currentIndex+1}/${currentGallery.length}`; }
function closeModal() { document.getElementById('photoModal').style.display = 'none'; document.body.style.overflow = ''; }
function showPageFromHash() { const hash = window.location.hash.substring(1) || 'home'; const page = document.getElementById('page-' + hash); if(page) { document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); page.classList.add('active'); } }
function saveScrollPosition() { const currentPage = document.querySelector('.page.active')?.id; if(currentPage) sessionStorage.setItem(`${currentPage}_scroll`, window.scrollY); }
function restoreScrollPosition(pageId) { const savedPos = sessionStorage.getItem(`${pageId}_scroll`); if(savedPos) setTimeout(() => window.scrollTo(0, parseInt(savedPos)), 50); }
function showPage(pageId) { const currentPage = document.querySelector('.page.active')?.id; if(currentPage) sessionStorage.setItem(`${currentPage}_scroll`, window.scrollY); document.querySelectorAll('.page').forEach(page => page.classList.remove('active')); const page = document.getElementById('page-' + pageId); if(page) { page.classList.add('active'); window.location.hash = pageId; } closeMenu(); restoreScrollPosition(pageId); updateMobileActions(); }
function toggleMenu() { document.getElementById('sidenav').classList.toggle('open'); document.getElementById('overlay').classList.toggle('show'); document.querySelectorAll('.mobile-menu-button').forEach(button => button.setAttribute('aria-expanded', document.getElementById('sidenav').classList.contains('open'))); }
function closeMenu() { document.getElementById('sidenav').classList.remove('open'); document.getElementById('overlay').classList.remove('show'); document.querySelectorAll('.mobile-menu-button').forEach(button => button.setAttribute('aria-expanded', 'false')); }
function scrollToContactForm() { const form = document.getElementById('contact-form'); if(form) form.scrollIntoView({ behavior: 'smooth', block: 'start' }); closeMenu(); }
function openContactForm() { if(!document.getElementById('page-home')?.classList.contains('active')) { showPage('home'); } setTimeout(scrollToContactForm, 50); }
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

window.addEventListener('hashchange', function() { showPageFromHash(); updateMobileActions(); });
window.addEventListener('scroll', updateMobileActions, { passive: true });
window.addEventListener('load', function() { showPageFromHash(); if(typeof generateGalleries === 'function') generateGalleries(); updateMobileActions(); });
