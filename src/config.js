// ============================================
// CONFIGURATION
// Edit everything here to customize your Link-in-Bio
// ============================================

export const config = {
    // --- THEME ---
    theme: {
        mode: "dark", // "dark" or "light"
        colors: {
            bg1: "#0a0a0a",        // First gradient color
            bg2: "#1c1917",        // Second gradient color
            primary: "#6366f1",    // Brand primary (Indicates major UI elements)
            secondary: "#ec4899",  // Brand secondary
            accent: "#8b5cf6",     // Accents
            text: "#f8fafc",       // Primary text color
            muted: "#94a3b8"       // Muted/secondary text color
        },
        card: {
            variant: "glass",      // "glass" or "solid"
            radius: 20,            // Border radius in px
            border: true           // Enable thin borders around card?
        },
        button: {
            radius: 12,            // Button border radius in px
            variant: "glass",      // "glass", "solid", or "outline"
            glow: true             // Add subtle shadow glow on hover
        },
        background: {
            type: "gradient",      // "gradient" or "particles"
            speed: 1.0,            // Animation speed
            intensity: 0.5         // Overlay opacity
        }
    },

    // --- PROFILE ---
    profile: {
        name: "Ahmed Yousef Almouqaid",
        tagline: "Software developer",
        avatarUrl: "public/img/1000099137.png",
        location: "Palstine , Gaza",
        bio: "I am a software developer with experience in web development. I am passionate about building fast, beautiful, and accessible web experiences."
    },

    // --- LINKS ---
    links: [
        { label: "My CV", url: "https://ahmedno1.github.io/My-CV/", icon: "briefcase", style: "primary" },
        { label: "GitHub", url: "https://github.com/ahmedno1", icon: "github", style: "secondary" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/ahmed-almoqid-5aa105286/", icon: "linkedin", style: "primary" },
        { label: "Email Me", url: "mailto:ahmaeduora@gmail.com", icon: "mail", style: "primary" }
    ]
};
