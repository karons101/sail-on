// --- All logic inside ONE DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM queries (ALL TOGETHER AT THE TOP) ---
    const landingPage = document.getElementById('landing-page');
    const backgroundVideo = document.getElementById('backgroundVideo');
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

    // --- Video Playlist Logic ---
    const videoPlaylist = [
        'assets/beauty_nature.mp4',
        'assets/nature.mp4',
        'assets/music_video.mp4'
    ];
    let currentVideoIndex = 0;
    
    function playNextVideo() {
        if (backgroundVideo && videoPlaylist.length > 0) {
            backgroundVideo.src = videoPlaylist[currentVideoIndex];
            backgroundVideo.load();
            backgroundVideo.play().catch(e => {
                console.error("Video autoplay failed:", e);
            });
        }
    }
    
    if (backgroundVideo) {
        backgroundVideo.addEventListener('ended', () => {
            currentVideoIndex++;
            if (currentVideoIndex >= videoPlaylist.length) {
                currentVideoIndex = 0;
            }
            playNextVideo();
        });
        
        // Start the playlist when the page loads
        playNextVideo();
    }

    // --- Modal Logic ---
    const showModal = () => {
        authModal.classList.remove('hidden');
    };
    
    const hideModal = () => {
        authModal.classList.add('hidden');
    };

    // --- Tab Switching Logic for Auth Modal ---
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

    // --- Function to transition from landing to main app view ---
    const showMainApp = () => {
        landingPage.classList.add('hidden');
        mainAppView.classList.remove('hidden');
        if (backgroundVideo) {
            backgroundVideo.pause();
        }
        hideModal(); // Hide the modal after a successful action
        console.log("Welcome to YellowSail!");
    };
    
    // --- Event Listeners ---
    if (ctaGetStartedBtn) {
        ctaGetStartedBtn.addEventListener('click', showModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideModal);
    }
    
    if (loginTab) loginTab.addEventListener('click', () => switchAuthTab('login'));
    if (signupTab) signupTab.addEventListener('click', () => switchAuthTab('signup'));

    // The 'Remember Me' and 'Forgot Password' links don't need JavaScript for now,
    // as they will be implemented when we add Firebase Authentication.
    
    // Temporary logic for auth buttons without Firebase
    if (loginForm) loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showMainApp();
        console.log("Login form submitted (No Firebase).");
    });

    if (signupForm) signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showMainApp();
        console.log("Signup form submitted (No Firebase).");
    });
    
    if (anonymousSignInBtn) anonymousSignInBtn.addEventListener('click', () => {
        showMainApp();
        console.log("Signed in anonymously (No Firebase).");
    });

    // --- Main App Tab Switching Logic ---
    function switchMainTab(viewId) {
        const tabs = {
            'publicFeedView': publicFeedTab,
            'profileView': profileTab,
            'chatView': chatTab
        };
    
        const views = [publicFeedView, profileView, chatView];
        views.forEach(view => {
            view.classList.add('hidden');
        });
    
        document.getElementById(viewId).classList.remove('hidden');
    
        for (const id in tabs) {
            if (tabs[id]) {
                tabs[id].classList.remove('active');
            }
        }
        
        if (tabs[viewId]) {
            tabs[viewId].classList.add('active');
        }
    }
    
    if (publicFeedTab) publicFeedTab.addEventListener('click', () => switchMainTab('publicFeedView'));
    if (profileTab) profileTab.addEventListener('click', () => switchMainTab('profileView'));
    if (chatTab) chatTab.addEventListener('click', () => switchMainTab('chatView'));
    
    // Initial tab setup
    switchMainTab('publicFeedView');
});