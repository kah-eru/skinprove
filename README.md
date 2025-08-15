# SkinProve 🍑

A beautiful, modern skincare website with personalized routines, calendar tracking, and a premium shop. Built with React, TypeScript, and Tailwind CSS.

## Features

- ✨ **Beautiful Peach Theme** - Warm, inviting design with custom peach color palette
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI/UX** - Clean, professional interface with smooth animations
- 🚀 **Fast Performance** - Built with Vite for lightning-fast development
- 📝 **TypeScript** - Full type safety and better development experience

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom peach color palette
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx          # Main application component
├── main.tsx         # React entry point
├── index.css        # Global styles and Tailwind imports
└── components/      # React components (to be added)

public/              # Static assets
tailwind.config.js   # Tailwind configuration
vite.config.ts       # Vite configuration
```

## Customization

### Colors

The peach theme is defined in `tailwind.config.js`:

```javascript
colors: {
  peach: {
    50: '#fef7f0',   // Lightest
    500: '#f27524',  // Primary
    900: '#7a2f19',  // Darkest
  }
}
```

### Components

Custom component classes are defined in `src/index.css`:

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style  
- `.card` - Card component style

## Next Steps

This is a single-page homepage. To build the full application, you'll need to add:

- **Authentication System** - Login/register functionality
- **Routine Builder** - Create and manage skincare routines
- **Calendar Integration** - Track daily routines
- **Shop System** - Product catalog and e-commerce
- **Backend API** - Node.js + Express + Database
- **User Dashboard** - Personal profile and progress tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own skincare business!

---

**Made with ❤️ for beautiful skin everywhere**
