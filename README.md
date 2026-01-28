# Portfolio - GitHub Pages

Static professional portfolio website developed with pure HTML, CSS, and JavaScript (no frameworks or build steps).

🌐 **Demo:** [https://azefalo.github.io](https://azefalo.github.io)

## 📋 About the Project

This is a complete portfolio to showcase projects from the final year of college, including:
- Homepage with hero section, about me, experience, and featured project
- Complete project listing with technology filters
- Individual project pages with galleries, detailed descriptions, and report downloads
- Automatic and manual light/dark theme
- Responsive design (mobile-first)
- Accessibility (WCAG)
- Optimized SEO

## 🚀 How to Publish on GitHub Pages

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

2. **Activate GitHub Pages:**
   - Go to: **Settings → Pages**
   - In **Source**, select: **Deploy from a branch**
   - Choose the **main** branch and **/ (root)** folder
   - Click **Save**

3. **Wait a few minutes** and your site will be available at:
   `https://[your-username].github.io`

## ✏️ How to Customize

### 1. Edit Personal Information

Replace the placeholders marked with `<!-- EDITAR: ... -->` in the HTML files:

#### **index.html**
- Name and role in the hero section
- "About Me" description
- Professional experience
- Known technologies
- Contact links (email, LinkedIn, GitHub)
- Copyright in footer

#### **projetos.html** and **projeto.html**
- Name in navigation logo
- Copyright in footer

### 2. Add/Edit Projects

Edit the **`data/projects.json`** file:

```json
{
  "featured": "featured-project-id",
  "items": [
    {
      "id": "project-slug",
      "titulo": "Project Name",
      "parcerias": ["Company 1", "Company 2"],
      "periodo": "2024-2025",
      "status": "In development",
      "intro": "Short summary (2-3 lines)",
      "descricao": "Full project description",
      "tecnologias": ["Tech1", "Tech2"],
      "imagens": ["assets/img/project1.jpg"],
      "relatorio_pdf": "reports/project1.pdf",
      "tags": ["Tag1", "Tag2"]
    }
  ]
}
```

### 3. Replace Images

Replace the files in **`assets/img/`** with your real images:
- Recommended formats: JPG, PNG, WebP
- Recommended size: maximum 1200px width
- Optimize images before uploading (use TinyPNG, Squoosh, etc.)

Images used:
- `profile.jpg` - Profile photo (Open Graph meta tags)
- `keyless.jpg`, `keyless-app.jpg`, etc. - Project screenshots

### 4. Replace PDF Reports

Replace the files in **`reports/`** with your real PDFs:
- File name must match the one defined in `projects.json`
- Keep a reasonable size (maximum 10MB recommended)

### 5. Customize Colors and Styles

Edit the CSS variables in **`assets/css/main.css`** (lines 1-30):

```css
:root {
    --color-primary: #0d6efd;        /* Primary color */
    --color-bg: #ffffff;             /* Light background */
    --color-text: #212529;           /* Light text */
    /* ... other variables ... */
}
```

## 📁 Folder Structure

```
.
├─ index.html                 # Homepage
├─ projetos.html             # Project listing
├─ projeto.html              # Project detail (dynamic)
├─ assets/
│  ├─ css/main.css          # Global styles
│  ├─ js/app.js             # Main JavaScript
│  └─ img/                  # Site images
├─ data/
│  └─ projects.json         # Project data
├─ reports/                  # Report PDFs
├─ favicon.ico              # Site icon
├─ sitemap.xml              # Site map (SEO)
├─ robots.txt               # Bot instructions
├─ .nojekyll                # Disable Jekyll processing
├─ LICENSE                  # MIT License
└─ README.md                # This file
```

## 🎨 Features

### Light/Dark Theme
- Respects operating system preference
- Manual toggle in the upper corner
- Preference saved in `localStorage`

### Responsiveness
- Mobile-first design
- Breakpoints: 480px, 768px, 1024px
- Flexible grid and responsive images

### Accessibility
- Proper HTML5 semantics
- WCAG AA color contrast
- Visible focus on interactive elements
- ARIA attributes on dynamic components
- Alternative text on images

### SEO
- Appropriate meta tags
- Open Graph and Twitter Cards
- Sitemap.xml
- Robots.txt
- Friendly URLs

## 🔧 Local Development

To test locally:

1. **Using Python:**
   ```bash
   cd /path/to/Azefalo.github.io
   python -m http.server 8000
   ```
   Access: `http://localhost:8000`

2. **Using Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

3. **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

## 🌐 Custom Domain (Optional)

To use your own domain:

1. Create a **`CNAME`** file in the root with your domain:
   ```
   yourdomain.com
   ```

2. Configure your domain's DNS records:
   ```
   A    185.199.108.153
   A    185.199.109.153
   A    185.199.110.153
   A    185.199.111.153
   ```
   
   Or for subdomain (www):
   ```
   CNAME    [your-username].github.io
   ```

3. Enable HTTPS in **Settings → Pages**

## 📝 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

## 🤝 Contributing

Suggestions and improvements are welcome! Open an issue or pull request.

## 📧 Contact

- **Email:** your.email@example.com
- **LinkedIn:** [your-profile](https://linkedin.com/in/your-profile)
- **GitHub:** [Azefalo](https://github.com/Azefalo)

---

Developed with ❤️ using pure HTML, CSS and JavaScript