// ============================================
// APP.JS - Lógica principal do portfólio
// ============================================

// Estado da aplicação
let projectsData = null;
let currentFilter = 'all';

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    loadProjects();
});

// ============================================
// GESTÃO DE TEMA (CLARO/ESCURO)
// ============================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Carregar preferência salva ou usar preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    }

    // Toggle entre temas
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
        const newTheme = currentTheme === 'theme-dark' ? 'theme-light' : 'theme-dark';
        
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add(newTheme);
        
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'theme-dark' ? '☀️' : '🌙';
    }
}

// ============================================
// NAVEGAÇÃO
// ============================================
function initNavigation() {
    // Destacar link ativo baseado na URL atual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop().split('#')[0] || 'index.html';
        if (linkPage === currentPage || (currentPage === '' && linkPage === '/')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// CARREGAMENTO DE PROJETOS
// ============================================
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error(`Erro ao carregar projetos: ${response.status}`);
        }
        
        projectsData = await response.json();
        
        // Renderizar baseado na página atual
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('index.html') || currentPage === '/' || currentPage === '') {
            renderFeaturedProject();
            renderLatestProjects();
        } else if (currentPage.includes('projetos.html')) {
            renderAllProjects();
            initFilters();
        } else if (currentPage.includes('projeto.html')) {
            renderProjectDetail();
        }
        
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        showError('Não foi possível carregar os projetos. Por favor, tente novamente mais tarde.');
    }
}

// ============================================
// RENDERIZAÇÃO - PROJETO EM DESTAQUE (Home)
// ============================================
function renderFeaturedProject() {
    const container = document.getElementById('featuredProject');
    if (!container || !projectsData) return;

    const featuredId = projectsData.featured;
    const project = projectsData.items.find(p => p.id === featuredId);
    
    if (!project) {
        container.innerHTML = '<p>Projeto em destaque não encontrado.</p>';
        return;
    }

    const partnershipHTML = project.parcerias && project.parcerias.length > 0
        ? `<div class="featured-partnerships">
             <strong>Parcerias:</strong> ${project.parcerias.join(', ')}
           </div>`
        : '';

    const tagsHTML = project.tags && project.tags.length > 0
        ? `<div class="featured-tags">
             ${project.tags.map(tag => `<span class="featured-tag">${escapeHtml(tag)}</span>`).join('')}
           </div>`
        : '';

    container.innerHTML = `
        <img src="${escapeHtml(project.imagens[0])}" alt="${escapeHtml(project.titulo)}" class="featured-image">
        <div class="featured-info">
            <h3>${escapeHtml(project.titulo)}</h3>
            <div class="featured-meta">
                <span>📅 ${escapeHtml(project.periodo || 'Período não especificado')}</span>
                ${project.parcerias ? `<span>🤝 ${escapeHtml(project.parcerias.join(', '))}</span>` : ''}
            </div>
            ${tagsHTML}
            <p class="featured-description">${escapeHtml(project.intro)}</p>
            <p class="featured-description">${escapeHtml(project.descricao)}</p>
            <a href="projeto.html?id=${escapeHtml(project.id)}" class="btn btn-primary">Ler mais</a>
        </div>
    `;
}

// ============================================
// RENDERIZAÇÃO - ÚLTIMOS PROJETOS (Home)
// ============================================
function renderLatestProjects() {
    const container = document.getElementById('latestProjects');
    if (!container || !projectsData) return;

    // Mostrar até 3 projetos (excluindo o em destaque)
    const featuredId = projectsData.featured;
    const projects = projectsData.items
        .filter(p => p.id !== featuredId)
        .slice(0, 3);

    if (projects.length === 0) {
        container.innerHTML = '<p>Nenhum projeto disponível.</p>';
        return;
    }

    container.innerHTML = projects.map(project => createProjectCard(project)).join('');
}

// ============================================
// RENDERIZAÇÃO - TODOS OS PROJETOS (projetos.html)
// ============================================
function renderAllProjects() {
    const container = document.getElementById('projectsGrid');
    if (!container || !projectsData) return;

    const projects = filterProjects(projectsData.items);
    
    if (projects.length === 0) {
        container.innerHTML = '';
        document.getElementById('noResults').style.display = 'block';
        return;
    }

    document.getElementById('noResults').style.display = 'none';
    container.innerHTML = projects.map(project => createProjectCard(project)).join('');
}

// ============================================
// CRIAÇÃO DE CARD DE PROJETO
// ============================================
function createProjectCard(project) {
    const tagsHTML = project.tecnologias && project.tecnologias.length > 0
        ? `<div class="project-card-tags">
             ${project.tecnologias.slice(0, 4).map(tech => 
                 `<span class="project-tag">${escapeHtml(tech)}</span>`
             ).join('')}
           </div>`
        : '';

    return `
        <article class="project-card">
            <img src="${escapeHtml(project.imagens[0])}" alt="${escapeHtml(project.titulo)}">
            <div class="project-card-content">
                <h3>${escapeHtml(project.titulo)}</h3>
                <p class="project-card-intro">${escapeHtml(project.intro)}</p>
                ${tagsHTML}
                <a href="projeto.html?id=${escapeHtml(project.id)}" class="btn btn-secondary">Detalhes</a>
            </div>
        </article>
    `;
}

// ============================================
// FILTROS DE TECNOLOGIA
// ============================================
function initFilters() {
    const container = document.getElementById('filterButtons');
    if (!container || !projectsData) return;

    // Coletar todas as tecnologias únicas
    const allTechs = new Set();
    projectsData.items.forEach(project => {
        if (project.tecnologias) {
            project.tecnologias.forEach(tech => allTechs.add(tech));
        }
    });

    // Criar botões de filtro
    const techButtons = Array.from(allTechs).sort().map(tech => 
        `<button class="filter-btn" data-filter="${escapeHtml(tech)}">${escapeHtml(tech)}</button>`
    ).join('');

    container.innerHTML = `
        <button class="filter-btn active" data-filter="all">Todos</button>
        ${techButtons}
    `;

    // Adicionar event listeners
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Atualizar estado ativo
            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Aplicar filtro
            currentFilter = e.target.dataset.filter;
            renderAllProjects();
        });
    });
}

function filterProjects(projects) {
    if (currentFilter === 'all') {
        return projects;
    }
    
    return projects.filter(project => 
        project.tecnologias && project.tecnologias.includes(currentFilter)
    );
}

// ============================================
// RENDERIZAÇÃO - DETALHE DO PROJETO (projeto.html)
// ============================================
function renderProjectDetail() {
    const container = document.getElementById('projectContent');
    const notFoundDiv = document.getElementById('notFound');
    
    if (!container || !projectsData) return;

    // Obter ID da query string
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        showNotFound();
        return;
    }

    const project = projectsData.items.find(p => p.id === projectId);
    
    if (!project) {
        showNotFound();
        return;
    }

    // Atualizar título da página
    document.title = `${project.titulo} - Seu Nome`;

    // Renderizar galeria de imagens
    const galleryHTML = project.imagens && project.imagens.length > 0
        ? `<div class="project-gallery">
             ${project.imagens.map(img => 
                 `<img src="${escapeHtml(img)}" alt="${escapeHtml(project.titulo)}">`
             ).join('')}
           </div>`
        : '';

    // Renderizar parcerias
    const partnershipsHTML = project.parcerias && project.parcerias.length > 0
        ? `<div class="project-partnerships">
             ${project.parcerias.map(partner => 
                 `<span class="partnership-badge">${escapeHtml(partner)}</span>`
             ).join('')}
           </div>`
        : '';

    // Renderizar tecnologias
    const techHTML = project.tecnologias && project.tecnologias.length > 0
        ? `<div class="project-tech-list">
             ${project.tecnologias.map(tech => 
                 `<span class="tech-badge">${escapeHtml(tech)}</span>`
             ).join('')}
           </div>`
        : '';

    // Renderizar tags
    const tagsHTML = project.tags && project.tags.length > 0
        ? `<div class="project-tech-list">
             ${project.tags.map(tag => 
                 `<span class="tech-badge">${escapeHtml(tag)}</span>`
             ).join('')}
           </div>`
        : '';

    container.innerHTML = `
        <div class="project-header">
            <h1 class="project-title">${escapeHtml(project.titulo)}</h1>
            <div class="project-meta">
                ${project.periodo ? `<div class="project-meta-item">📅 ${escapeHtml(project.periodo)}</div>` : ''}
                ${project.status ? `<div class="project-meta-item">📊 ${escapeHtml(project.status)}</div>` : ''}
            </div>
            ${partnershipsHTML}
            ${tagsHTML}
        </div>

        ${galleryHTML}

        <div class="project-section">
            <h3>Resumo</h3>
            <p>${escapeHtml(project.descricao)}</p>
        </div>

        <div class="project-section">
            <h3>Objetivos</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Desenvolver uma solução robusta e escalável que atenda às necessidades do mercado.</p>
        </div>

        <div class="project-section">
            <h3>Papel e Contribuições</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Responsável pela arquitetura do sistema, desenvolvimento do backend e integração com APIs externas. Colaboração com equipe multidisciplinar.</p>
        </div>

        <div class="project-section">
            <h3>Tecnologias Usadas</h3>
            ${techHTML}
        </div>

        <div class="project-section">
            <h3>Resultados e Aprendizados</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. O projeto foi concluído com sucesso, resultando em aprendizados significativos em arquitetura de sistemas, trabalho em equipe e gestão de projetos complexos.</p>
        </div>

        <div class="project-actions">
            ${project.relatorio_pdf ? 
                `<a href="${escapeHtml(project.relatorio_pdf)}" class="btn btn-primary" download>📄 Baixar Relatório (PDF)</a>` 
                : ''}
            <a href="projetos.html" class="btn btn-secondary">← Voltar para Projetos</a>
        </div>
    `;

    // Esconder a div de "não encontrado"
    if (notFoundDiv) {
        notFoundDiv.style.display = 'none';
    }
}

function showNotFound() {
    const container = document.getElementById('projectContent');
    const notFoundDiv = document.getElementById('notFound');
    
    if (container) {
        container.style.display = 'none';
    }
    
    if (notFoundDiv) {
        notFoundDiv.style.display = 'block';
    }
}

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(message) {
    const errorHTML = `
        <div class="error-message" style="
            padding: 2rem;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 8px;
            color: #721c24;
            text-align: center;
        ">
            <p>${escapeHtml(message)}</p>
        </div>
    `;
    
    // Tentar encontrar containers e exibir erro
    const containers = [
        document.getElementById('featuredProject'),
        document.getElementById('latestProjects'),
        document.getElementById('projectsGrid'),
        document.getElementById('projectContent')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = errorHTML;
        }
    });
}

// ============================================
// EXPORTAR FUNÇÕES (se necessário para testes)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        escapeHtml,
        filterProjects
    };
}
