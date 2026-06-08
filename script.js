document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Mobile Navigation Menu
       ========================================================================== */
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

    function toggleMobileMenu() {
        mobileNavToggle.classList.toggle('active');
        mobileNavOverlay.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    }

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', toggleMobileMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavOverlay.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    /* ==========================================================================
       Header Scrolled Class / Shadow
       ========================================================================== */
    const header = document.querySelector('.header');
    
    function handleScrollHeader() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScrollHeader);
    handleScrollHeader(); // Trigger initially in case of reload mid-page

    /* ==========================================================================
       Scroll Spy (Active Section Navbar Link)
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    function scrollSpy() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);

    /* ==========================================================================
       Interactive Phone Screen State Controller
       ========================================================================== */
    const featureItems = document.querySelectorAll('.feature-item');
    const mockupBtns = document.querySelectorAll('.mockup-btn');
    const screenViews = document.querySelectorAll('.screen-view');

    function switchPhoneScreen(screenId) {
        // Deactivate all
        featureItems.forEach(item => item.classList.remove('active'));
        mockupBtns.forEach(btn => btn.classList.remove('active'));
        screenViews.forEach(view => view.classList.remove('active'));

        // Activate matching elements
        const activeFeature = document.querySelector(`.feature-item[data-screen="${screenId}"]`);
        const activeBtn = document.querySelector(`.mockup-btn[data-screen="${screenId}"]`);
        const activeView = document.getElementById(`screen-${screenId}`);

        if (activeFeature) activeFeature.classList.add('active');
        if (activeBtn) activeBtn.classList.add('active');
        if (activeView) activeView.classList.add('active');
    }

    // Toggle by side cards
    featureItems.forEach(item => {
        item.addEventListener('click', () => {
            const screen = item.getAttribute('data-screen');
            switchPhoneScreen(screen);
        });
    });

    // Toggle by top tabs above phone mockup
    mockupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const screen = btn.getAttribute('data-screen');
            switchPhoneScreen(screen);
        });
    });

    // Interactive screen interactions - let user claim quest
    const claimBtn = document.querySelector('.claim-btn');
    if (claimBtn) {
        claimBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            claimBtn.textContent = 'Claimed!';
            claimBtn.style.background = 'var(--color-cyan)';
            claimBtn.style.boxShadow = '0 2px 6px rgba(6, 182, 212, 0.4)';
            claimBtn.style.animation = 'none';
            claimBtn.disabled = true;
            
            // Gold coin effect or count increment
            const goldValSpan = document.querySelector('.gold-val');
            if (goldValSpan) {
                let currentGold = parseInt(goldValSpan.textContent);
                let targetGold = currentGold + 100;
                
                // Count up gold count
                let count = currentGold;
                const interval = setInterval(() => {
                    count += 5;
                    goldValSpan.textContent = `${count} Gold`;
                    if (count >= targetGold) {
                        clearInterval(interval);
                    }
                }, 40);
            }
        });
    }

    /* ==========================================================================
       Ambient Background Glowing Movement
       ========================================================================== */
    const glow1 = document.getElementById('glow-1');
    const glow2 = document.getElementById('glow-2');
    const glow3 = document.getElementById('glow-3');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Parallax-like movement offsets based on client screen size
        const dx = (mouseX - window.innerWidth / 2) * 0.03;
        const dy = (mouseY - window.innerHeight / 2) * 0.03;
        
        if (glow1) glow1.style.transform = `translate(${dx}px, ${dy}px)`;
        if (glow2) glow2.style.transform = `translate(${-dx}px, ${-dy}px)`;
        if (glow3) glow3.style.transform = `translate(${dx * 0.5}px, ${-dy * 0.5}px)`;
    });

    /* ==========================================================================
       Stats Counter Animation
       ========================================================================== */
    const statsRow = document.querySelector('.stats-row');
    let countersAnimated = false;

    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }

    function animateCounters() {
        const integers = document.querySelectorAll('.stat-number');
        const decimals = document.querySelectorAll('.stat-number-decimal');

        // Animate Whole Numbers
        integers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1500; // ms
            const start = 0;
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing formula (out-cubic)
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeProgress * (target - start) + start);
                
                counter.textContent = formatNumber(current);

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = formatNumber(target);
                }
            }
            requestAnimationFrame(updateCount);
        });

        // Animate Decimal Numbers
        decimals.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 1500;
            const start = 0.0;
            const startTime = performance.now();

            function updateDecimalCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const current = (easeProgress * (target - start) + start).toFixed(1);
                
                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateDecimalCount);
                } else {
                    counter.textContent = target.toFixed(1);
                }
            }
            requestAnimationFrame(updateDecimalCount);
        });
    }

    /* ==========================================================================
       Scroll Reveal Intersection Observer
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it is the stats row, run stats counting animation
                if (entry.target === statsRow && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
    if (statsRow) revealObserver.observe(statsRow);

    /* ==========================================================================
       Contact Form Validation & Submission
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const toast = document.getElementById('successToast');
    const toastClose = document.getElementById('toastClose');

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    function checkInput(input) {
        const formGroup = input.parentElement;
        let isValid = true;

        if (input.required && (!input.value || input.value.trim() === "")) {
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
        }

        if (!isValid) {
            formGroup.classList.add('has-error');
        } else {
            formGroup.classList.remove('has-error');
        }

        return isValid;
    }

    if (contactForm) {
        // Field focus listeners to clean error classes on edit
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const formGroup = input.parentElement;
                if (formGroup.classList.contains('has-error')) {
                    checkInput(input);
                }
            });
            input.addEventListener('blur', () => {
                checkInput(input);
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate all fields
            let isFormValid = true;
            inputs.forEach(input => {
                if (!checkInput(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Begin Loading State
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                inputs.forEach(i => i.disabled = true);

                // Simulate API Request Latency (1.8s)
                setTimeout(() => {
                    // Reset Button & Inputs
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    inputs.forEach(i => {
                        i.disabled = false;
                        i.value = '';
                    });
                    
                    // Reset select control specifically to visual placeholder
                    const select = contactForm.querySelector('select');
                    if (select) select.selectedIndex = 0;

                    // Show success Toast Notification
                    if (toast) {
                        toast.classList.add('show');
                        
                        // Auto-hide toast after 5 seconds
                        setTimeout(() => {
                            toast.classList.remove('show');
                        }, 5000);
                    }
                }, 1800);
            }
        });
    }

    if (toastClose && toast) {
        toastClose.addEventListener('click', () => {
            toast.classList.remove('show');
        });
    }

});
