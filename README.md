# ಬಂಜಾರ ಸಾಹಿತ್ಯ ಪರಿಷತ್ತು | Banjara Sahitya Parishattu

A modern, responsive website for the Banjara Sahitya Parishattu (Banjara Literary Council) - dedicated to preserving and promoting Banjara literature and cultural heritage.

## 🌐 Project Overview

This website serves as the online presence for the Banjara Sahitya Parishattu, featuring:

- **Home Page** with hero section and key statistics
- **About Us** section highlighting the organization's history and mission
- **News & Announcements** - Latest updates and literary news
- **Events** - Upcoming literary events and conferences
- **Publications** - Books and journals published by the Parishat
- **Photo Gallery** - Visual documentation of events and activities
- **Membership** - Information on joining the organization
- **Contact** - Contact form and organizational details

## 📁 Project Structure

```
BanjaraSahityaParishattu/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript for interactivity
├── images/             # Image assets
│   └── .gitkeep
├── assets/             # Other assets (fonts, icons)
│   └── .gitkeep
└── README.md           # This file
```

## 🚀 Getting Started

### Viewing the Website Locally

1. Simply open `index.html` in any modern web browser
2. For a better development experience, use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (if installed):**
```bash
npx serve
```

**Using VS Code:**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

### Making Changes

1. **HTML (`index.html`)**: Edit content, add new sections, modify structure
2. **CSS (`css/style.css`)**: Customize colors, fonts, layouts, and responsiveness
3. **JavaScript (`js/script.js`)**: Add interactivity and dynamic features

## 🎨 Customization Guide

### Changing Colors

The color scheme is defined using CSS custom properties (variables) at the top of `style.css`:

```css
:root {
    --color-primary: #8B2635;      /* Main brand color (maroon) */
    --color-secondary: #D4A03E;     /* Accent color (gold) */
    --color-accent: #1A5F5F;        /* Teal accent */
    /* ... more colors */
}
```

Simply change these values to update colors throughout the site.

### Changing Fonts

Fonts are loaded from Google Fonts. To change:

1. Visit [Google Fonts](https://fonts.google.com/)
2. Select your fonts
3. Update the `<link>` tag in `index.html`
4. Update the font-family in `style.css`

### Adding Images

1. Add your images to the `images/` folder
2. Update the `src` attributes in `index.html`
3. Always include descriptive `alt` text for accessibility

### Adding New Pages

1. Copy `index.html` as a template
2. Modify the content section
3. Update navigation links in the header

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers (1024px+)
- Tablets (768px - 1024px)
- Mobile phones (< 768px)

Key responsive features:
- Hamburger menu on mobile
- Flexible grid layouts
- Responsive typography (using `clamp()`)
- Optimized image sizes

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Alt text for all images
- Focus indicators

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactivity without frameworks
- **Google Fonts** - Typography (Playfair Display, Source Sans Pro, Noto Sans Kannada)
- **Font Awesome 6** - Icons

## 📋 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## 🚀 Deployment Options

### GitHub Pages (Free)
1. Push code to a GitHub repository
2. Go to Settings > Pages
3. Select the main branch
4. Your site will be live at `https://username.github.io/repository-name`

### Netlify (Free)
1. Create a Netlify account
2. Drag and drop your project folder
3. Your site is live!

### Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### Traditional Hosting
Upload all files to your web hosting provider via FTP/SFTP.

## 📧 Contact Form Setup

The contact form currently uses a simulated submission. To make it functional:

### Option 1: Formspree (Recommended for beginners)
1. Sign up at [Formspree](https://formspree.io/)
2. Create a new form
3. Update the form action in `index.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: EmailJS
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Follow their integration guide
3. Update `script.js` with EmailJS SDK

## 📝 Content Updates

### Updating News/Events
Edit the corresponding sections in `index.html`. Each card follows this pattern:

```html
<article class="news-card">
    <div class="news-image">
        <img src="your-image.jpg" alt="Description">
        <span class="news-category">Category</span>
    </div>
    <div class="news-content">
        <h3 class="news-title">Your Title</h3>
        <p class="news-excerpt">Your description...</p>
        <a href="#" class="news-link">Read More</a>
    </div>
</article>
```

### Updating Publications
Similar structure - add new publication cards to the publications section.

## 🔧 Performance Tips

1. **Optimize Images**: Use compressed images (TinyPNG, Squoosh)
2. **Minify CSS/JS**: Use online minifiers before deployment
3. **Enable Caching**: Configure on your hosting provider
4. **Use CDN**: For external resources like fonts and icons

## 📄 License

This project is created for the Banjara Sahitya Parishattu. Feel free to modify and use for similar literary organization websites.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

**Built with ❤️ for Banjara literature and culture**

*ಬಂಜಾರ ಸಾಹಿತ್ಯ ಮತ್ತು ಸಂಸ್ಕೃತಿಯ ಉನ್ನತಿಗಾಗಿ*
