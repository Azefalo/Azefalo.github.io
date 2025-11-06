# Portfólio - GitHub Pages

Site estático de portfólio profissional desenvolvido com HTML, CSS e JavaScript puro (sem frameworks ou build steps).

🌐 **Demo:** [https://azefalo.github.io](https://azefalo.github.io)

## 📋 Sobre o Projeto

Este é um portfólio completo para apresentar projetos do último ano da faculdade, incluindo:
- Página inicial com seção hero, sobre mim, experiências e projeto em destaque
- Listagem completa de projetos com filtros por tecnologia
- Páginas individuais de projeto com galerias, descrições detalhadas e download de relatórios
- Tema claro/escuro automático e manual
- Design responsivo (mobile-first)
- Acessibilidade (WCAG)
- SEO otimizado

## 🚀 Como Publicar no GitHub Pages

1. **Faça commit e push das suas alterações:**
   ```bash
   git add .
   git commit -m "Atualizar portfólio"
   git push origin main
   ```

2. **Ative o GitHub Pages:**
   - Acesse: **Settings → Pages**
   - Em **Source**, selecione: **Deploy from a branch**
   - Escolha a branch **main** e a pasta **/ (root)**
   - Clique em **Save**

3. **Aguarde alguns minutos** e seu site estará disponível em:
   `https://[seu-usuario].github.io`

## ✏️ Como Personalizar

### 1. Editar Informações Pessoais

Substitua os placeholders marcados com `<!-- EDITAR: ... -->` nos arquivos HTML:

#### **index.html**
- Nome e função no hero section
- Descrição "Sobre Mim"
- Experiências profissionais
- Tecnologias conhecidas
- Links de contato (email, LinkedIn, GitHub)
- Direitos autorais no rodapé

#### **projetos.html** e **projeto.html**
- Nome no logo da navegação
- Direitos autorais no rodapé

### 2. Adicionar/Editar Projetos

Edite o arquivo **`data/projects.json`**:

```json
{
  "featured": "id-do-projeto-em-destaque",
  "items": [
    {
      "id": "slug-do-projeto",
      "titulo": "Nome do Projeto",
      "parcerias": ["Empresa 1", "Empresa 2"],
      "periodo": "2024-2025",
      "status": "Em desenvolvimento",
      "intro": "Resumo curto (2-3 linhas)",
      "descricao": "Descrição completa do projeto",
      "tecnologias": ["Tech1", "Tech2"],
      "imagens": ["assets/img/projeto1.jpg"],
      "relatorio_pdf": "reports/projeto1.pdf",
      "tags": ["Tag1", "Tag2"]
    }
  ]
}
```

### 3. Substituir Imagens

Substitua os arquivos em **`assets/img/`** pelas suas imagens reais:
- Formatos recomendados: JPG, PNG, WebP
- Tamanho recomendado: máximo 1200px de largura
- Otimize as imagens antes de fazer upload (use TinyPNG, Squoosh, etc.)

Imagens usadas:
- `profile.jpg` - Foto de perfil (meta tags Open Graph)
- `keyless.jpg`, `keyless-app.jpg`, etc. - Screenshots dos projetos

### 4. Substituir Relatórios PDF

Substitua os arquivos em **`reports/`** pelos seus PDFs reais:
- Nome do arquivo deve corresponder ao definido em `projects.json`
- Mantenha tamanho razoável (máximo 10MB recomendado)

### 5. Personalizar Cores e Estilos

Edite as variáveis CSS em **`assets/css/main.css`** (linhas 1-30):

```css
:root {
    --color-primary: #0d6efd;        /* Cor primária */
    --color-bg: #ffffff;             /* Fundo claro */
    --color-text: #212529;           /* Texto claro */
    /* ... outras variáveis ... */
}
```

## 📁 Estrutura de Pastas

```
.
├─ index.html                 # Página inicial
├─ projetos.html             # Listagem de projetos
├─ projeto.html              # Detalhe de projeto (dinâmico)
├─ assets/
│  ├─ css/main.css          # Estilos globais
│  ├─ js/app.js             # JavaScript principal
│  └─ img/                  # Imagens do site
├─ data/
│  └─ projects.json         # Dados dos projetos
├─ reports/                  # PDFs dos relatórios
├─ favicon.ico              # Ícone do site
├─ sitemap.xml              # Mapa do site (SEO)
├─ robots.txt               # Instruções para bots
├─ .nojekyll                # Desativa processamento Jekyll
├─ LICENSE                  # Licença MIT
└─ README.md                # Este arquivo
```

## 🎨 Recursos

### Tema Claro/Escuro
- Respeita preferência do sistema operacional
- Toggle manual no canto superior
- Preferência salva no `localStorage`

### Responsividade
- Mobile-first design
- Breakpoints: 480px, 768px, 1024px
- Grid flexível e imagens responsivas

### Acessibilidade
- Semântica HTML5 adequada
- Contraste de cores WCAG AA
- Foco visível em elementos interativos
- Atributos ARIA em componentes dinâmicos
- Texto alternativo em imagens

### SEO
- Meta tags apropriadas
- Open Graph e Twitter Cards
- Sitemap.xml
- Robots.txt
- URLs amigáveis

## 🔧 Desenvolvimento Local

Para testar localmente:

1. **Usando Python:**
   ```bash
   cd /caminho/para/Azefalo.github.io
   python -m http.server 8000
   ```
   Acesse: `http://localhost:8000`

2. **Usando Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

3. **Usando PHP:**
   ```bash
   php -S localhost:8000
   ```

## 🌐 Domínio Customizado (Opcional)

Para usar um domínio próprio:

1. Crie um arquivo **`CNAME`** na raiz com seu domínio:
   ```
   seudominio.com
   ```

2. Configure os registros DNS do seu domínio:
   ```
   A    185.199.108.153
   A    185.199.109.153
   A    185.199.110.153
   A    185.199.111.153
   ```
   
   Ou para subdomínio (www):
   ```
   CNAME    [seu-usuario].github.io
   ```

3. Ative HTTPS em **Settings → Pages**

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Abra uma issue ou pull request.

## 📧 Contato

- **Email:** seu.email@exemplo.com
- **LinkedIn:** [seu-perfil](https://linkedin.com/in/seu-perfil)
- **GitHub:** [Azefalo](https://github.com/Azefalo)

---

Desenvolvido com ❤️ usando HTML, CSS e JavaScript puro