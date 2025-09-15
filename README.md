# 30-Day Reset - Habit Transformation App

A minimalistic Progressive Web App (PWA) designed to help users build lasting habits through mindful morning and evening rituals over 30 days.

## 🌟 Features

- **📱 Progressive Web App**: Installable on mobile devices with offline capability
- **🎨 Apple-Inspired Design**: Clean, minimalistic UI following Apple's design principles [[memory:2893598]] [[memory:2893595]]
- **⚡ Fast & Responsive**: Built with Next.js and optimized for mobile-first experience
- **💾 Local Storage**: All progress stored locally (easily extensible to Firebase)
- **🔄 Real-time Progress**: Visual progress tracking with streaks and achievements
- **🌅🌙 Dual Rituals**: Morning and evening habit tracking

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (Pages Router), React 18, TypeScript
- **Styling**: TailwindCSS with custom Apple color palette
- **PWA**: Service Worker, Web App Manifest
- **State Management**: LocalStorage with future Firebase integration ready
- **Deployment**: Netlify (optimized configuration included)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Apple-styled buttons with variants
│   ├── Card.tsx        # Interactive cards
│   ├── ProgressRing.tsx # Circular progress indicators
│   ├── Toggle.tsx      # iOS-style toggle switches
│   └── RitualTabs.tsx  # Morning/Evening tab switcher
├── lib/                # Core logic and utilities
│   ├── types.ts        # TypeScript interfaces
│   ├── challenges.ts   # Challenge data and helpers
│   ├── state.ts        # LocalStorage state management
│   ├── uiCopy.ts       # Centralized UI text
│   └── utils.ts        # Utility functions
├── pages/              # Next.js pages
│   ├── index.tsx       # Home screen with current rituals
│   ├── onboarding.tsx  # Initial setup and preferences
│   ├── checkin/        # Dynamic check-in pages
│   └── progress/       # Progress tracking and stats
└── styles/
    └── globals.css     # Global styles with CSS variables
```

## 🎯 Key Features

### 📊 Progress Tracking
- **Streak Counters**: Separate tracking for morning and evening rituals
- **Visual Progress**: Circular progress rings showing completion percentage
- **Statistics**: Detailed stats including perfect days and total completions
- **Achievements**: Milestone celebrations and motivational messages

### 🎨 Design System
- **Apple Color Palette**: Pure whites, light gray (#F5F5F7), and Apple blue (#007AFF)
- **Responsive Design**: Mobile-first approach with safe area handling
- **Dark Mode Support**: Automatic dark/light theme switching
- **Smooth Animations**: Subtle transitions and hover effects

### 💾 Data Model
```typescript
type Challenge = {
  id: string;
  name: string;
  description: string;
  days: DayEntry[];
};

type RitualProgress = {
  completed: { [day: number]: { morning?: boolean; evening?: boolean } };
  morningStreak: number;
  eveningStreak: number;
  startedAt?: string;
};
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository** (or use the files created)
```bash
cd /Users/fridtjof/habit-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run export
```

The static files will be generated in the `out/` directory.

## 🌐 Deployment

### Netlify Deployment

1. **Connect your repository** to Netlify
2. **Build settings** are automatically configured via `netlify.toml`
   - Build command: `npm run export`
   - Publish directory: `out`
3. **Deploy**: Netlify will automatically build and deploy your app

### Manual Deployment
1. Run `npm run export`
2. Upload the `out/` directory to your static hosting provider

## 📱 PWA Features

- **Installable**: Add to home screen on mobile devices
- **Offline Capable**: Works without internet connection
- **Background Sync**: Sync data when connection is restored
- **Service Worker**: Caches app shell and resources

## 🔮 Future Enhancements

- **Firebase Integration**: User authentication and cloud sync
- **Custom Challenges**: User-created habit challenges
- **Social Features**: Share progress and challenges with friends
- **Analytics**: Detailed habit analytics and insights
- **Notifications**: Push notifications for ritual reminders

## 🎨 Customization

### Colors
Modify the color palette in `tailwind.config.js` and `src/styles/globals.css`:

```css
:root {
  --color-primary: #007AFF;        /* Apple Blue */
  --color-background: #ffffff;      /* Pure White */
  --color-secondary: #F5F5F7;       /* Light Gray */
}
```

### Content
Update challenge content in `src/lib/challenges.ts` and UI text in `src/lib/uiCopy.ts`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by Apple's Human Interface Guidelines
- Built with modern web technologies for optimal performance
- Designed for habit formation based on behavioral psychology principles

---

**Start your transformation journey today! 🌱**

*Last updated: $(date)*
