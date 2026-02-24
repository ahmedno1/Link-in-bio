import '../styles/tailwind.css';
import { config } from '../config.js';
import { initAnimations } from './animations.js';

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    setupTheme(config.theme);
    renderApp(config);
    initAnimations(config);
});

function setupTheme(theme) {
    const root = document.documentElement;

    // Set CSS Variables from Config
    Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });

    root.style.setProperty('--card-radius', `${theme.card.radius}px`);
    root.style.setProperty('--button-radius', `${theme.button.radius}px`);

    if (theme.mode === 'light') {
        document.body.classList.remove('text-gray-200');
        document.body.classList.add('text-gray-800');
    }
}

function renderApp(c) {
    const appEl = document.getElementById('app');

    // Create Main Card
    const cardVariant = c.theme.card.variant === 'glass' ? 'glass-card' : 'solid-card';
    const borderClass = c.theme.card.border ? 'border border-opacity-10' : '';

    // Build Links HTML
    let linksHtml = c.links.map(link => {
        const isMailto = link.url.startsWith('mailto:');
        let copyBtn = '';

        if (isMailto) {
            copyBtn = `
        <button data-email="${link.url.replace('mailto:', '')}" class="copy-btn absolute right-2 inset-y-2 flex items-center justify-center w-10 text-xl hover:text-[var(--color-primary)] transition-colors focus-ring rounded-lg z-10" aria-label="Copy Email">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </button>
      `;
        }

        const btnVariant = c.theme.button.variant === 'glass' ? 'glass-button' : c.theme.button.variant === 'solid' ? 'solid-button' : 'outline-button';
        const glowClass = c.theme.button.glow ? 'glow-effect' : '';

        return `
      <div class="relative w-full link-item opacity-0">
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
           class="${btnVariant} ${glowClass} btn-hover-fx relative w-full min-h-[52px] flex items-center justify-center px-4 py-3 mb-4 rounded-[var(--button-radius)] text-lg font-medium transition-all duration-300 focus-ring overflow-hidden group">
          
          <span class="mr-3 opacity-80 group-hover:opacity-100 transition-opacity">
            ${getIcon(link.icon)}
          </span>
          <span>${link.label}</span>
        </a>
        ${copyBtn}
      </div>
    `;
    }).join('');

    appEl.innerHTML = `
    <div class="w-full max-w-[520px] mx-auto ${cardVariant} ${borderClass} rounded-[var(--card-radius)] p-8 shadow-2xl relative z-10 profile-card opacity-0">
      
      <!-- Profile Image -->
      <div class="flex flex-col items-center mb-8">
        <div class="avatar-container opacity-0 relative mb-4">
          <img src="${c.profile.avatarUrl}" alt="${c.profile.name}" class="w-28 h-28 rounded-full object-cover border-4 border-[var(--color-primary)] shadow-lg" />
        </div>
        
        <h1 class="text-3xl font-bold tracking-tight text-center mb-1 text-layer opacity-0">${c.profile.name}</h1>
        <h2 class="text-lg font-medium text-[var(--color-secondary)] text-center mb-3 text-layer opacity-0">${c.profile.tagline}</h2>
        <div class="flex items-center text-sm text-[var(--color-muted)] mb-4 text-layer opacity-0">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          ${c.profile.location}
        </div>
        <p class="text-center text-[var(--color-text)] max-w-sm mx-auto text-layer opacity-0">${c.profile.bio}</p>
      </div>

      <!-- Links List -->
      <div class="w-full flex flex-col items-center links-container">
        ${linksHtml}
      </div>

    </div>
    
    <footer class="mt-8 text-center text-sm text-[var(--color-muted)] opacity-0 footer-layer">
      Made with <span class="text-red-500 animate-pulse">❤️</span> by ${c.profile.name} &copy; ${new Date().getFullYear()}
    </footer>
  `;

    // Attach Copy Handlers
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = btn.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                setTimeout(() => { btn.innerHTML = originalHtml; }, 2000);
            });
        });
    });
}

function getIcon(name) {
    // Simple icon mapping (Lucide-like SVGs)
    const icons = {
        github: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
        linkedin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
        twitter: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>',
        mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
        briefcase: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
        file: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>'
    };
    return icons[name] || icons.file;
}
