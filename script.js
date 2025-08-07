// Función para scroll suave
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 120,
            behavior: 'smooth'
        });
    }
}

// Función para obtener las estrellas del repositorio
async function fetchGitHubStars() {
    try {
        const response = await fetch('https://api.github.com/repos/IamBritex/FNF-Genesis-Engine');
        if (response.ok) {
            const data = await response.json();
            const starsCount = data.stargazers_count;
            const starsElement = document.getElementById('stars-count');
            if (starsElement) {
                starsElement.textContent = starsCount;
            }
        } else {
            console.log('No se pudieron obtener las estrellas del repositorio');
        }
    } catch (error) {
        console.log('Error al obtener las estrellas:', error);
    }
}

// Función para obtener seguidores de GitHub
async function fetchGitHubFollowers() {
    try {
        const response = await fetch('https://api.github.com/users/IamBritex');
        if (response.ok) {
            const data = await response.json();
            const followersCount = data.followers;
            const followersElement = document.getElementById('github-followers');
            if (followersElement) {
                followersElement.textContent = formatNumber(followersCount);
            }
        } else {
            document.getElementById('github-followers').textContent = 'N/A';
        }
    } catch (error) {
        document.getElementById('github-followers').textContent = 'N/A';
        console.log('Error al obtener seguidores de GitHub:', error);
    }
}

// Función para obtener información de Discord
async function fetchDiscordMembers() {
    try {
        // Para Discord necesitarías un bot token, por ahora usamos un valor fijo
        // La API de Discord requiere autenticación con bot token
        document.getElementById('discord-members').textContent = '250+';
    } catch (error) {
        document.getElementById('discord-members').textContent = 'N/A';
        console.log('Error al obtener miembros de Discord:', error);
    }
}

// Función para obtener datos de YouTube (requiere API key)
async function fetchYouTubeSubscribers() {
    try {
        // YouTube Data API v3 requiere API key
        // Por ahora usamos un valor estimado
        document.getElementById('youtube-subscribers').textContent = '3K';
    } catch (error) {
        document.getElementById('youtube-subscribers').textContent = 'N/A';
        console.log('Error al obtener suscriptores de YouTube:', error);
    }
}

// Función para obtener datos de TikTok
async function fetchTikTokFollowers() {
    try {
        // TikTok no tiene API pública para obtener seguidores
        // Por ahora usamos un valor estimado
        document.getElementById('tiktok-followers').textContent = '4.2k';
    } catch (error) {
        document.getElementById('tiktok-followers').textContent = 'N/A';
        console.log('Error al obtener seguidores de TikTok:', error);
    }
}

// Función para obtener datos de Instagram
async function fetchInstagramFollowers() {
    try {
        // Instagram Basic Display API requiere token de acceso
        // Por ahora usamos un valor estimado
        document.getElementById('instagram-followers').textContent = '0';
    } catch (error) {
        document.getElementById('instagram-followers').textContent = 'N/A';
        console.log('Error al obtener seguidores de Instagram:', error);
    }
}

// Función para formatear números
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

document.addEventListener('DOMContentLoaded', function() {
    // Obtener estrellas del repositorio al cargar la página
    fetchGitHubStars();
    
    // Obtener seguidores de todas las plataformas
    fetchGitHubFollowers();
    fetchDiscordMembers();
    fetchYouTubeSubscribers();
    fetchTikTokFollowers();
    fetchInstagramFollowers();
    
    // Efecto blur en header al hacer scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Efecto de aparición al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Animación inicial para elementos visibles
    setTimeout(() => {
        const initialVisible = document.querySelectorAll('.fade-in');
        initialVisible.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }, 100);
});