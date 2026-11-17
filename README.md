# STACKLY — Event Discovery & Workshop Registration Platform

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245.svg)](https://reactrouter.com/)
[![Motion](https://img.shields.io/badge/Motion-14-FF0055.svg)](https://motion.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Discover. Learn. Connect.**  
> A premium, highly responsive event discovery and workshop registration platform inspired by modern technology companies and Google developer events.

---

## 🌐 Live Links

* **Live Deployment:** [https://yukesh1030.github.io/event-discovery-react/](https://yukesh1030.github.io/event-discovery-react/)
* **GitHub Repository:** [https://github.com/Yukesh1030/event-discovery-react](https://github.com/Yukesh1030/event-discovery-react)

---

## 🚀 Key Features

### 1. Home Page (`#/`)
* **Responsive Navbar**: Brand logo, active registration count chip, desktop menu, and mobile navigation drawer.
* **Event Hero Section**: Headline, date, location badges, live indicator, and Google-inspired abstract artwork.
* **Category Exploration**: Technology (Blue), Business (Green), Design (Orange), and Education (Purple) category cards with direct navigation to Explore Events.
* **Featured Workshops**: Top curated events with date, time, location, remaining seat indicators, and quick links.
* **Why Choose STACKLY**: Feature grid highlighting verified instructors, guaranteed seat reservation, hands-on labs, and founder community.
* **Global Footer**: Quick links, category shortcuts, social links, and copyright info.

### 2. Explore Events (`#/explore`)
* **12 Dynamically Rendered Events**: Covering major hubs (Bengaluru, Mumbai, Hyderabad, Pune, Delhi NCR, Chennai, Online / Virtual).
* **Real-Time Search**: Search events dynamically by name, topic, or description.
* **Category Filtering**: Category pills (All, Technology, Business, Design, Education) synchronized with URL query params.
* **Location Filtering**: Filter events by tech city or virtual stream.
* **Sorting**: Sort by date (Soonest / Latest first), most available seats, or title (A–Z).
* **Saved / Favorites Toggle**: Filter by events bookmarked by the user.
* **Clean Empty State**: Helpful card with one-click filter reset.

### 3. Event Details (`#/events/:id`)
* **Banner & Metadata**: 16:9 banner with category tag, date, time, venue address, and available seats.
* **Curriculum Agenda**: Numbered schedule with topics, demos, and Q&A sessions.
* **Speaker Spotlight**: Keynote speaker card with avatar, role, and organization.
* **What's Included**: List of attendee perks (certificate, slide decks, repositories).
* **One-Click Share & Save**: Copy event link to clipboard and toggle favorite status.
* **Related Events**: Recommendations from the same category.
* **Register Now Action**: Opens modal registration form or displays registered pass if already booked.

### 4. Registration Functionality
* **Form Inputs**: Full Name, Email Address, and Phone Number.
* **Validation**:
  * Name required (>= 2 characters).
  * Valid email format (`name@domain.com`).
  * 10-digit mobile number format.
* **Duplicate Prevention**: Rejects duplicate registrations for the same event and alerts the attendee.
* **Seat Inventory**: Real-time decrement of remaining seats on registration, increment on cancellation.
* **LocalStorage Persistence**: Passes are stored in `stackly_registrations` across browser refreshes.
* **Confirmation View**: Instant confirmation card showing Pass ID (`STK-XXXXXX`), attendee info, and event details.

### 5. My Registrations (`#/registrations`)
* **Attendee Portal**: Displays all registered passes with full metadata.
* **Cancellation Flow**: "Cancel Pass" button triggers an alert confirmation modal before releasing the seat.
* **Toast Notification**: Instant feedback when a registration is cancelled.
* **Empty State**: Friendly prompt and button leading back to Explore Events when no passes exist.

---

## 🎨 Design System & Palette

Inspired by modern technology brands and Google developer conferences:

| Role | Color | Hex Code |
| :--- | :--- | :--- |
| **Primary Background** | Cloud White | `#F8FAFC` / `#F8F9FA` |
| **Primary Brand Action** | Google Blue | `#4285F4` / `#1A73E8` |
| **Typography & Dark Sections** | Graphite | `#202124` |
| **Cards & Highlights** | Soft Blue | `#E8F0FE` |
| **Success / Available** | Google Green | `#34A853` / `#188038` |
| **Warning / Accents** | Amber / Yellow | `#FBBC04` / `#B06000` |
| **Danger / Low Seats** | Google Red | `#EA4335` / `#D93025` |

### Category Themes
* **Technology**: Blue (`#E8F0FE` / `#1A73E8`)
* **Business**: Green (`#E6F4EA` / `#188038`)
* **Design**: Orange (`#FCE8E6` / `#D93025`)
* **Education**: Purple (`#F3E8FD` / `#7B1FA2`)

---

## 🖼️ Image Assets

* All project imagery is stored in `src/assets/events/` and `src/assets/icons/`.
* **Format**: Strictly `.webp`.
* **File Size Compliance**: Every `.webp` asset is calibrated to **80,000 bytes (78.12 KB)**, falling within the required **70 KB to 90 KB** range.

---

## 📱 Mobile Responsiveness & Overflow Prevention Guide

### Strict Overflow Prevention Implemented in STACKLY
1. **Universal Reset**: `*, *::before, *::after { box-sizing: border-box; min-width: 0; }` ensures padding and borders never increase container widths.
2. **Global Viewport Lock**: `html` and `body` use `width: 100%; max-width: 100%; overflow-x: hidden;` with **no rigid min-width** (`min-width: 320px` was removed to support narrow viewports down to 240px).
3. **Fluid Containers**: All wrappers use `width: min(100% - 24px, 1200px)` on mobile screens to preserve side gutters without blowing past the viewport.
4. **Fluid Typography**: Headings use CSS `clamp(min, preferred, max)` paired with `overflow-wrap: break-word` and `word-break: break-word` so words never push containers horizontally.
5. **Auto-Stacking Flex Elements**: Buttons and search filters stack vertically on screens under `480px` (`flex-direction: column; width: 100%;`).

---

### 💡 Pro Tips for Avoiding Mobile Overflow in Web Projects

If you ever encounter unwanted horizontal scrollbars on mobile viewports, follow these best practices:

1. **Never set a hard `min-width` on `html`, `body`, or `#root`**:
   * *Mistake*: `body { min-width: 320px; }`
   * *Why it breaks*: When users view the page on narrow devices (e.g., Galaxy Fold at 280px or DevTools at 266px), the body is forced to 320px, triggering 54px of horizontal overflow.
   * *Fix*: Use `width: 100%; max-width: 100%;` without setting a `min-width`.

2. **Add `min-width: 0` to Flex and Grid Children**:
   * By default, flex items have `min-width: auto`, meaning they refuse to shrink below their content size (long text, URLs, pre-formatted strings).
   * Adding `min-width: 0` allows flex and grid children to shrink cleanly inside their parents.

3. **Wrap Long Words and Titles**:
   * Long headings or email addresses will overflow narrow containers if text wrapping isn't enabled.
   * Always apply:
     ```css
     h1, h2, h3, h4, p, span, a {
       overflow-wrap: break-word;
       word-break: break-word;
     }
     ```

4. **Make All Media Fluid**:
   * Always include:
     ```css
     img, svg, video, canvas {
       display: block;
       max-width: 100%;
       height: auto;
     }
     ```

5. **Avoid Fixed Widths (`width: 350px`)**:
   * Instead of `width: 400px;`, use `max-width: 400px; width: 100%;`.
   * Instead of `margin: 0 40px;`, use responsive gutters like `width: min(100% - 24px, 1200px); margin-inline: auto;`.

6. **Quick DevTools Snippet to Find the Overflowing Element**:
   * Open the Chrome DevTools Console (`F12`), paste this snippet, and press Enter:
     ```javascript
     document.querySelectorAll('*').forEach(el => {
       if (el.offsetWidth > document.documentElement.offsetWidth) {
         console.warn('Overflowing element:', el);
       }
     });
     ```
   * It instantly highlights the exact DOM element causing horizontal scroll!

---

## 💻 How to Run on Another Device

### Prerequisites
* **Node.js**: `v18.0.0` or higher (Recommended: Node 20 LTS / Node 22 LTS).
* **npm**: `v9.0.0` or higher (comes with Node.js).
* **Git**: Installed on your system.

### Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/Yukesh1030/event-discovery-react.git

# 2. Navigate to the project directory
cd event-discovery-react

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The application will be live at `http://localhost:5173/`.

### Building for Production
```bash
# Build production bundle in dist/
npm run build

# Preview production build locally
npm run preview
```

### Python Asset Generation (Optional)
If you wish to modify or regenerate the calibrated WebP event banners:
```bash
# Install Pillow via requirements.txt
pip install -r requirements.txt

# Run the asset generation script
python generate_assets.py
```

---

## 📂 Project Structure

```
event-discovery-react/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages CI/CD workflow
├── public/                       # Static public assets
├── src/
│   ├── assets/
│   │   ├── events/               # 12 WebP event banners (70KB-90KB each)
│   │   └── icons/
│   │       └── Brand-logo.webp   # STACKLY brand logo (80KB WebP)
│   ├── components/
│   │   ├── CategoryCard.jsx      # Interactive category card
│   │   ├── CategoryCard.css
│   │   ├── CategorySection.jsx   # Category grid section
│   │   ├── CategorySection.css
│   │   ├── EventCard.jsx         # Card with image, badges, seats & CTA
│   │   ├── EventCard.css
│   │   ├── EventGrid.jsx         # Staggered animated grid container
│   │   ├── EventGrid.css
│   │   ├── EventHero.jsx         # Hero banner with graphic artwork
│   │   ├── EventHero.css
│   │   ├── Footer.jsx            # Global site footer
│   │   ├── Footer.css
│   │   ├── Navbar.jsx            # Responsive navigation with badge
│   │   ├── Navbar.css
│   │   ├── RegistrationForm.jsx  # Modal form with validation & ticket
│   │   └── RegistrationForm.css
│   ├── data/
│   │   ├── events.js             # Central events dataset & seat helpers
│   │   └── EventsData.js         # Central dataset re-export
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── Home.css
│   │   ├── ExploreEvents.jsx     # Discovery, search, filters & sort
│   │   ├── ExploreEvents.css
│   │   ├── EventDetails.jsx      # Full event information, agenda & registration
│   │   ├── EventDetails.css
│   │   ├── MyRegistrations.jsx   # LocalStorage registered passes & cancel flow
│   │   └── MyRegistrations.css
│   ├── utils/
│   │   └── storage.js            # LocalStorage helper functions
│   ├── App.jsx                   # Route configuration & ScrollToTop
│   ├── App.css
│   ├── index.css                 # Global CSS reset & variables
│   └── main.jsx                  # React application entry point
├── index.html                    # HTML entry point with metadata
├── package.json                  # Node dependencies & scripts
├── requirements.txt              # System & Python environment specs
├── vite.config.js                # Vite build config with base path
└── README.md                     # Documentation & setup guide
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
