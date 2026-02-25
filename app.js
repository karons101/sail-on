document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Queries ---
    const landingPage = document.getElementById('landing-page');
    const demoSection = document.querySelector('.demo-section');
    const ctaGetStartedBtn = document.getElementById('cta-get-started');
    const mainAppView = document.getElementById('mainAppView');
    const authModal = document.getElementById('authModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const anonymousSignInBtn = document.getElementById('anonymousSignInBtn');

    const publicFeedTab = document.getElementById('publicFeedTab');
    const profileTab = document.getElementById('profileTab');
    const chatTab = document.getElementById('chatTab');

    const publicFeedView = document.getElementById('publicFeedView');
    const profileView = document.getElementById('profileView');
    const chatView = document.getElementById('chatView');

    const avatarInput = document.getElementById('avatarInput');
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');

    const mediaUploadInput = document.getElementById('mediaUploadInput');
    const uploadBtn = document.getElementById('uploadBtn');

    const userMediaGrid = document.getElementById('user-media-grid');
    const uploadPreview = document.getElementById('uploadPreview');
    const userAvatar = document.getElementById('user-avatar');

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    const appLogo = document.querySelector('.app-logo');
    const globalSearch = document.querySelector('.global-search');

    // ================= VIDEO BACKGROUND PLAYLIST =================
    const videoSources = [
        'assets/beauty_nature.mp4',
        'assets/nature.mp4',
        'assets/music_video.mp4'
    ];

    const videoElements = [];
    let currentIndex = 0;

    if (demoSection) {
        videoSources.forEach((src, i) => {
            const video = document.createElement('video');
            video.src = src;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = "auto";

            Object.assign(video.style, {
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'translate(-50%, -50%)',
                opacity: i === 0 ? '1' : '0',
                transition: 'opacity 1.5s ease',
                filter: 'brightness(1.15)',
                zIndex: 0
            });

            demoSection.appendChild(video);
            videoElements.push(video);
        });

        function fadeNextVideo() {
            const current = videoElements[currentIndex];
            const nextIndex = (currentIndex + 1) % videoElements.length;
            const next = videoElements[nextIndex];

            next.style.opacity = '1';
            current.style.opacity = '0';
            currentIndex = nextIndex;
        }

        setInterval(fadeNextVideo, 8000);
    }

    // ================= MODAL =================
    const showModal = () => authModal.classList.remove('hidden');
    const hideModal = () => authModal.classList.add('hidden');

    const switchAuthTab = (tab) => {
        if (tab === 'login') {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
        } else {
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
        }
    };

    const showMainApp = () => {
        landingPage.classList.add('hidden');
        mainAppView.classList.remove('hidden');
        hideModal();
        window.scrollTo(0, 0);
    };

    // ================= EVENTS =================
    ctaGetStartedBtn?.addEventListener('click', showModal);
    closeModalBtn?.addEventListener('click', hideModal);
    loginTab?.addEventListener('click', () => switchAuthTab('login'));
    signupTab?.addEventListener('click', () => switchAuthTab('signup'));

    loginForm?.addEventListener('submit', e => {
        e.preventDefault();
        showMainApp();
    });

    signupForm?.addEventListener('submit', e => {
        e.preventDefault();
        showMainApp();
    });

    anonymousSignInBtn?.addEventListener('click', showMainApp);

    // ================= SIDE MENU =================
    const toggleMenu = () => {
        sideMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        hamburgerBtn.classList.toggle('open');
    };

    hamburgerBtn?.addEventListener('click', toggleMenu);
    menuOverlay?.addEventListener('click', toggleMenu);

    document.querySelectorAll('#sideMenu button').forEach(btn => {
        btn.addEventListener('click', toggleMenu);
    });

    // ================= TABS =================
    const switchMainTab = (viewId) => {
        [publicFeedView, profileView, chatView].forEach(v => v.classList.add('hidden'));
        document.getElementById(viewId)?.classList.remove('hidden');

        [publicFeedTab, profileTab, chatTab].forEach(t => t.classList.remove('active'));

        if (viewId === 'publicFeedView') publicFeedTab.classList.add('active');
        if (viewId === 'profileView') profileTab.classList.add('active');
        if (viewId === 'chatView') chatTab.classList.add('active');
    };

    publicFeedTab?.addEventListener('click', () => switchMainTab('publicFeedView'));
    profileTab?.addEventListener('click', () => switchMainTab('profileView'));
    chatTab?.addEventListener('click', () => switchMainTab('chatView'));

    switchMainTab('publicFeedView');

    // ================= LOGO CLICK = HOME =================
    appLogo?.addEventListener('click', () => {
        mainAppView.classList.add('hidden');
        landingPage.classList.remove('hidden');
        window.scrollTo(0, 0);
    });

    // ================= AVATAR UPLOAD =================
    changeAvatarBtn?.addEventListener('click', () => avatarInput.click());

    avatarInput?.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        userAvatar.src = url;
        uploadPreview.src = url;
        uploadPreview.style.display = 'block';
    });

    // ================= MEDIA UPLOAD =================
    uploadBtn?.addEventListener('click', () => mediaUploadInput.click());

    mediaUploadInput?.addEventListener('change', e => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        files.forEach(file => {
            const url = URL.createObjectURL(file);

            const card = document.createElement('div');
            card.className = 'content-card';

            let media;

            if (file.type.startsWith('image')) {
                media = document.createElement('img');
                media.src = url;
            } else if (file.type.startsWith('video')) {
                media = document.createElement('video');
                media.src = url;
                media.controls = true;
            } else {
                media = document.createElement('audio');
                media.src = url;
                media.controls = true;
            }

            media.style.width = '100%';
            media.style.borderRadius = '10px';
            card.appendChild(media);
            userMediaGrid.prepend(card);
        });

        mediaUploadInput.value = '';
    });

    // ================= GLOBAL SEARCH (MVP READY) =================
    globalSearch?.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const query = globalSearch.value.trim();
            if (!query) return;

            alert(`Search coming soon: "${query}"`);
        }
    });

});