import { animate, stagger, spring } from 'motion';

export function initAnimations(config) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Background Animations
    if (!prefersReducedMotion) {
        if (config.theme.background.type === 'gradient') {
            document.body.classList.add('bg-animated');
        }

        // Parallax mousemove on large screens
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20; // 20px max shift
                const y = (e.clientY / window.innerHeight - 0.5) * 20;

                const card = document.querySelector('.profile-card');
                if (card) {
                    card.style.transform = `translate(${x}px, ${y}px)`;
                }
            });
        }
    }

    // Initial Content Staggered Entrance
    const sequence = [];

    if (!prefersReducedMotion) {
        // Card Entrance
        animate(
            '.profile-card',
            { opacity: [0, 1], y: [40, 0] },
            { duration: 0.8 * config.theme.background.speed, easing: spring() }
        );

        // Avatar
        animate(
            '.avatar-container',
            { opacity: [0, 1], scale: [0.8, 1] },
            { duration: 0.5, delay: 0.2, easing: spring() }
        );

        // Text Layers
        animate(
            '.text-layer',
            { opacity: [0, 1], y: [20, 0] },
            { delay: stagger(0.1, { startDelay: 0.4 }), duration: 0.5 }
        );

        // Links
        animate(
            '.link-item',
            { opacity: [0, 1], x: [-20, 0] },
            { delay: stagger(0.1, { startDelay: 0.7 }), duration: 0.5, easing: spring() }
        );

        // Footer
        animate(
            '.footer-layer',
            { opacity: [0, 1] },
            { duration: 1, delay: 1.5 }
        );
    } else {
        // Fallback for reduced motion
        document.querySelector('.profile-card').style.opacity = 1;
        document.querySelector('.avatar-container').style.opacity = 1;
        document.querySelectorAll('.text-layer').forEach(el => el.style.opacity = 1);
        document.querySelectorAll('.link-item').forEach(el => el.style.opacity = 1);
        document.querySelector('.footer-layer').style.opacity = 1;
    }

    setupButtonInteractions(prefersReducedMotion);
}

function setupButtonInteractions(prefersReducedMotion) {
    if (prefersReducedMotion) return;

    const buttons = document.querySelectorAll('.link-item a');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            animate(btn, { y: -6, scale: 1.02 }, { easing: spring({ stiffness: 300, damping: 20 }) });
        });

        btn.addEventListener('mouseleave', () => {
            animate(btn, { y: 0, scale: 1 }, { easing: spring({ stiffness: 300, damping: 20 }) });
        });

        btn.addEventListener('mousedown', () => {
            animate(btn, { scale: 0.95 }, { duration: 0.1 });
        });

        btn.addEventListener('mouseup', () => {
            animate(btn, { scale: 1.02 }, { duration: 0.1 });
        });
    });
}
