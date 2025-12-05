//   < !--JavaScript for interactive features-- >
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function isMobile() {
    return window.innerWidth <= 992;
}

hamburger.addEventListener('click', function () {
    if (isMobile()) {
        sidebar.classList.toggle('mobile-open');
        sidebarOverlay.classList.toggle('active');
    } else {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    }
});

sidebarOverlay.addEventListener('click', function () {
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.classList.remove('active');
});

window.addEventListener('resize', function () {
    if (!isMobile()) {
        sidebar.classList.remove('mobile-open');
        sidebarOverlay.classList.remove('active');
    }
});

// Active Menu Toggle
const allMenuLinks = document.querySelectorAll('.sidebar-menu a');

allMenuLinks.forEach(link => {
    link.addEventListener('click', function () {

        // Remove active class from all links
        allMenuLinks.forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        if (!this.closest('li')?.id.includes('logout')) {
            this.classList.add('active');
        }

        // Close sidebar on mobile after selection
        if (isMobile()) {
            sidebar.classList.remove('mobile-open');
            sidebarOverlay.classList.remove('active');
        }
    });
});


const menuItems = document.querySelectorAll('.sidebar-menu li');

menuItems.forEach(item => {
    const tooltip = item.querySelector('.menu-tooltip');
    const link = item.querySelector('a');

    if (tooltip && link) {
        link.addEventListener('mouseenter', function (e) {
            if (sidebar.classList.contains('collapsed') && !isMobile()) {
                const rect = link.getBoundingClientRect();
                tooltip.style.left = (rect.right + 10) + 'px';
                tooltip.style.top = (rect.top + rect.height / 2) + 'px';
                tooltip.style.transform = 'translateY(-50%)';
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            }
        });

        link.addEventListener('mouseleave', function () {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    }
});

// Language Dropdown
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    const profileDropdown = document.getElementById('profileDropdown');

    profileDropdown.classList.remove('open');
    dropdown.classList.toggle('open');
}

function selectLanguage(code, name) {
    document.getElementById('currentFlag').src = `https://flagcdn.com/w40/${code}.png`;
    document.getElementById('currentLang').textContent = name;
    document.getElementById('languageDropdown').classList.remove('open');
}

// Profile Dropdown
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    const languageDropdown = document.getElementById('languageDropdown');

    languageDropdown.classList.remove('open');
    dropdown.classList.toggle('open');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function (e) {
    const languageDropdown = document.getElementById('languageDropdown');
    const profileDropdown = document.getElementById('profileDropdown');

    if (!languageDropdown.contains(e.target)) {
        languageDropdown.classList.remove('open');
    }

    if (!profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove('open');
    }
});