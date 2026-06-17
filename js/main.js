/* ============================================
   JACK CRANN - AUTHOR WEBSITE
   Main JavaScript File
   ============================================ */

$(document).ready(function() {

    // ============================================
    // LENIS SMOOTH SCROLL
    // ============================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ============================================
    // PRELOADER
    // ============================================
    const preloaderTl = gsap.timeline();

    preloaderTl
        .to('.preloader-text span', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out'
        })
        .to('.preloader-line::after', {
            width: '100%',
            duration: 1.5,
            ease: 'power2.inOut'
        }, '-=0.3')
        .to('.preloader', {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
            delay: 0.5
        })
        .set('.preloader', { display: 'none' })
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-description', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.7')
        .from('.hero-cta', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.book-showcase', {
            x: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        }, '-=1');

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            lenis.scrollTo(target[0], {
                offset: -80,
                duration: 1.5
            });
        }
    });

    // ============================================
    // GSAP SCROLL TRIGGER ANIMATIONS
    // ============================================
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Reveal left
    const revealLeftElements = document.querySelectorAll('.reveal-left');
    revealLeftElements.forEach((el) => {
        gsap.fromTo(el,
            { x: -60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Reveal right
    const revealRightElements = document.querySelectorAll('.reveal-right');
    revealRightElements.forEach((el) => {
        gsap.fromTo(el,
            { x: 60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Reveal scale
    const revealScaleElements = document.querySelectorAll('.reveal-scale');
    revealScaleElements.forEach((el) => {
        gsap.fromTo(el,
            { scale: 0.9, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 8%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.to(img, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: img.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // ============================================
    // BOOK 3D TILT EFFECT
    // ============================================
    const bookShowcase = document.querySelector('.book-showcase');
    if (bookShowcase) {
        const bookImage = bookShowcase.querySelector('.book-image');

        bookShowcase.addEventListener('mousemove', (e) => {
            const rect = bookShowcase.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(bookImage, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        bookShowcase.addEventListener('mouseleave', () => {
            gsap.to(bookImage, {
                rotateX: 5,
                rotateY: -5,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'));

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });

    // ============================================
    // SWIPER SLIDER
    // ============================================
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            }
        }
    });

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursor = document.querySelector('.custom-cursor');
    if (cursor && window.innerWidth > 991) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        });

        const hoverElements = document.querySelectorAll('a, button, .service-card, .book-showcase, .video-card');
        hoverElements.forEach((el) => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // ============================================
    // MAGNETIC BUTTON EFFECT
    // ============================================
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // ============================================
    // NAVBAR LINK ACTIVE STATE
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('.nav-link').each(function() {
        if ($(this).attr('href') === currentPage) {
            $(this).addClass('active');
        }
    });

    // ============================================
    // FORM VALIDATION
    // ============================================
    if ($('#contactForm').length) {
        $('#contactForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                subject: {
                    required: true
                },
                message: {
                    required: true,
                    minlength: 10
                }
            },
            messages: {
                name: {
                    required: 'Please enter your name',
                    minlength: 'Name must be at least 2 characters'
                },
                email: {
                    required: 'Please enter your email',
                    email: 'Please enter a valid email address'
                },
                subject: {
                    required: 'Please select a subject'
                },
                message: {
                    required: 'Please enter your message',
                    minlength: 'Message must be at least 10 characters'
                }
            },
            errorElement: 'span',
            errorClass: 'text-danger small mt-1 d-block',
            submitHandler: function(form) {
                // Show success message
                gsap.to(form, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: function() {
                        $(form).html(`
                            <div class="text-center py-5">
                                <div class="mb-4">
                                    <i class="fas fa-check-circle text-gold" style="font-size: 4rem;"></i>
                                </div>
                                <h3 class="font-heading mb-3" style="color: var(--color-primary);">Thank You!</h3>
                                <p class="text-muted">Your message has been sent successfully. Jack will get back to you soon.</p>
                            </div>
                        `);
                        gsap.fromTo(form, 
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.5 }
                        );
                    }
                });
                return false;
            }
        });
    }

    // ============================================
    // BOOKING FORM VALIDATION
    // ============================================
    if ($('#bookingForm').length) {
        $('#bookingForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                },
                service: {
                    required: true
                },
                date: {
                    required: true
                }
            },
            errorElement: 'span',
            errorClass: 'text-danger small mt-1 d-block',
            submitHandler: function(form) {
                gsap.to(form, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: function() {
                        $(form).html(`
                            <div class="text-center py-5">
                                <div class="mb-4">
                                    <i class="fas fa-calendar-check text-gold" style="font-size: 4rem;"></i>
                                </div>
                                <h3 class="font-heading mb-3" style="color: var(--color-primary);">Booking Requested!</h3>
                                <p class="text-muted">We'll confirm your appointment shortly. Check your email for details.</p>
                            </div>
                        `);
                        gsap.fromTo(form,
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.5 }
                        );
                    }
                });
                return false;
            }
        });
    }

    // ============================================
    // ANIMATED SECTION LABELS
    // ============================================
    gsap.utils.toArray('.section-label').forEach((label) => {
        gsap.from(label, {
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: label,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // ============================================
    // STAGGER ANIMATIONS FOR GRID ITEMS
    // ============================================
    gsap.utils.toArray('.stagger-grid').forEach((grid) => {
        const items = grid.children;
        gsap.from(items, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: grid,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // ============================================
    // IMAGE REVEAL ANIMATION
    // ============================================
    gsap.utils.toArray('.img-reveal').forEach((img) => {
        gsap.from(img, {
            clipPath: 'inset(100% 0 0 0)',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
                trigger: img,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // ============================================
    // LINE DRAW ANIMATION
    // ============================================
    gsap.utils.toArray('.line-draw').forEach((line) => {
        gsap.from(line, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1,
            ease: 'power3.inOut',
            scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // ============================================
    // TEXT SCRAMBLE EFFECT FOR HERO
    // ============================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !document.querySelector('.preloader')) {
        const originalText = heroTitle.innerHTML;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let iteration = 0;

        const scrambleInterval = setInterval(() => {
            heroTitle.innerHTML = originalText
                .split('')
                .map((char, index) => {
                    if (char === '<') return char;
                    if (char === '>') return char;
                    if (char === '/') return char;
                    if (char === ' ') return ' ';
                    if (index < iteration) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iteration >= originalText.length) {
                clearInterval(scrambleInterval);
                heroTitle.innerHTML = originalText;
            }

            iteration += 1/3;
        }, 30);
    }

    // ============================================
    // FLOATING SHAPES ANIMATION
    // ============================================
    gsap.utils.toArray('.floating-shape').forEach((shape, i) => {
        gsap.to(shape, {
            y: 'random(-30, 30)',
            x: 'random(-20, 20)',
            rotation: 'random(-10, 10)',
            duration: 'random(3, 5)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.5
        });
    });

    // ============================================
    // HOVER LIFT EFFECT
    // ============================================
    gsap.utils.toArray('.hover-lift').forEach((el) => {
        el.addEventListener('mouseenter', () => {
            gsap.to(el, {
                y: -10,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // ============================================
    // WORD HIGHLIGHT ON SCROLL
    // ============================================
    gsap.utils.toArray('.highlight-word').forEach((word) => {
        gsap.to(word, {
            color: '#d4a843',
            duration: 0.5,
            scrollTrigger: {
                trigger: word,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // ============================================
    // VIDEO MODAL
    // ============================================
    $('.video-card').on('click', function() {
        const videoUrl = $(this).data('video');
        if (videoUrl) {
            // Create modal
            const modal = $(`
                <div class="modal fade" id="videoModal" tabindex="-1">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content bg-dark">
                            <div class="modal-header border-0">
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body p-0">
                                <div class="ratio ratio-16x9">
                                    <iframe src="${videoUrl}" allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            $('body').append(modal);
            modal.modal('show');
            modal.on('hidden.bs.modal', function() {
                $(this).remove();
            });
        }
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = $('<button class="back-to-top"><i class="fas fa-arrow-up"></i></button>');
    $('body').append(backToTop);

    backToTop.css({
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'var(--color-gold)',
        color: 'var(--color-primary-dark)',
        border: 'none',
        cursor: 'pointer',
        zIndex: '999',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem'
    });

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 500) {
            backToTop.css({
                opacity: '1',
                visibility: 'visible'
            });
        } else {
            backToTop.css({
                opacity: '0',
                visibility: 'hidden'
            });
        }
    });

    backToTop.on('click', function() {
        lenis.scrollTo(0, { duration: 1.5 });
    });

    // ============================================
    // ACCORDION ANIMATION ENHANCEMENT
    // ============================================
    $('.accordion-button').on('click', function() {
        const icon = $(this).find('.accordion-icon');
        if ($(this).hasClass('collapsed')) {
            gsap.to(icon, { rotation: 0, duration: 0.3 });
        } else {
            gsap.to(icon, { rotation: 180, duration: 0.3 });
        }
    });

    // ============================================
    // PARTICLE EFFECT (Subtle background)
    // ============================================
    function createParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 25;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 168, 67, ${p.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    createParticles();

    // ============================================
    // SCROLL VELOCITY TILT
    // ============================================
    let lastScrollY = 0;
    let ticking = false;

    $(window).on('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const velocity = currentScrollY - lastScrollY;
                const tilt = Math.min(Math.max(velocity * 0.05, -2), 2);

                gsap.to('.hero-content', {
                    skewY: tilt,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    });

    // ============================================
    // INTERSECTION OBSERVER FOR LAZY LOAD
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));

    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%c Jack Crann - The Affection Connection ', 
        'background: #1a2e1a; color: #d4a843; font-size: 20px; font-weight: bold; padding: 10px 20px;');
    console.log('%c Website crafted with passion for dogs and their humans ', 
        'color: #1a2e1a; font-size: 14px;');

}); // End document ready
