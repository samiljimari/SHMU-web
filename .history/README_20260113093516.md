# SHMU Sports Games 2026 Website

A simple, modern website for the XXXII. Sports Games between SHMU (Slovak Hydrometeorological Institute) and ČHMÚ (Czech Hydrometeorological Institute).

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Simple Navigation**: Easy-to-use menu with 6 main sections
- **No Login Required**: Pure informational website
- **Modern UI**: Clean, professional design with smooth animations
- **Easy to Update**: Simple HTML structure, easy to modify content

## Structure

```
SHMU-sport/
├── index.html          # Home page
├── sports.html         # Sports disciplines
├── info.html          # Event information & schedule
├── results.html       # Competition results
├── gallery.html       # Photo gallery
├── history.html       # History of the games
├── css/
│   └── style.css      # All styling
├── js/
│   └── script.js      # JavaScript functionality
└── img/
    └── logo.svg       # SHMU logo (placeholder - replace with actual)
```

## Pages Overview

### 1. Home (index.html)
- Hero section with event details
- About the games
- Quick links to all sections
- Useful external links

### 2. Sports (sports.html)
- List of all sports disciplines
- Details about each sport (teams, duration, location)
- Important notes and registration info

### 3. Information (info.html)
- Event schedule (Day 1 & Day 2)
- Venue information
- Accommodation options
- Transportation details
- Registration information
- Meals information
- Contact details

### 4. Results (results.html)
- Overall standings
- Results for each sport
- Medal count
- Easy to update during/after event

### 5. Gallery (gallery.html)
- Photo grid for event photos
- Links to previous years' galleries
- Upload information for participants

### 6. History (history.html)
- Timeline of all previous games
- Statistics about the tradition
- Hosting pattern information

## How to Use

1. **Replace Placeholders**: 
   - Update `[Event Date]`, `[Location]`, and other bracketed placeholders with actual information
   - Replace `img/logo.svg` with the actual SHMU logo
   - Update contact information (email, phone)

2. **Add Photos**:
   - Add photos to the `img/` folder
   - Update `gallery.html` to display them

3. **Update Results**:
   - During/after the event, update `results.html` with actual scores
   - Use the provided table structure

4. **Customize Colors** (optional):
   - Edit CSS variables in `css/style.css` at the top of the file
   - Change primary/secondary colors to match your branding

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (no frameworks required)
- Font: Segoe UI (system font)

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## Deployment

Simply upload all files to any web server or hosting service:
- Traditional web hosting (via FTP)
- GitHub Pages
- Netlify
- Vercel
- Any static site hosting

No server-side code or database required!

## Maintenance

- **Before Event**: Update all placeholder information
- **During Event**: Update results in real-time if desired
- **After Event**: Add final results and photos
- **Archive**: Consider linking to this year's site from future editions

## Customization Tips

### Change Colors
Edit the `:root` section in `css/style.css`:
```css
:root {
    --primary-color: #2563eb;    /* Main blue color */
    --secondary-color: #1e40af;  /* Darker blue */
    --accent-color: #3b82f6;     /* Light blue */
}
```

### Add More Sports
Copy a sport card in `sports.html` and modify:
```html
<div class="sport-card">
    <div class="sport-icon">🎯</div>
    <h3>Your Sport</h3>
    <p>Description</p>
    <ul>
        <li>Detail 1</li>
        <li>Detail 2</li>
    </ul>
</div>
```

### Update Schedule
Edit the tables in `info.html` - simply add/remove table rows.

## Support

For questions about the website structure, refer to the comments in the code or contact your web developer.

## License

This is a custom website created for SHMU Sports Games 2026. All rights reserved by the Slovak Hydrometeorological Institute.

---

**Created**: January 2026  
**Event**: XXXII. Sports Games SHMU & ČHMÚ  
**Organizer**: Slovak Hydrometeorological Institute (SHMÚ)
