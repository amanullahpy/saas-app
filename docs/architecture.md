# Project Architecture
## AmanNex SaaS Application

**Version**: 1.0  
**Last Updated**: July 22, 2026

---

## Overview

This document describes the architectural decisions, directory structure, and system design of the AmanNex SaaS application. The architecture follows enterprise best practices with a focus on scalability, maintainability, and developer experience.

---

## Technology Stack

### Core Framework
- **Next.js 16.2.1**: React framework with App Router
- **React 19.2.4**: UI library
- **TypeScript 5**: Type-safe JavaScript

### Styling & UI
- **TailwindCSS v4**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Icon library
- **next-themes**: Theme management (light/dark mode)
- **Framer Motion**: Animation library

### State Management
- **Redux Toolkit**: Global state management
- **React Hook Form**: Form state management
- **Zod**: Schema validation

### Internationalization
- **next-intl**: Internationalization framework
- **Support**: English (en), Urdu (ur) with RTL

### Data Visualization
- **Recharts**: Chart library for analytics

### Utilities
- **clsx**: Conditional className utility
- **tailwind-merge**: Merge Tailwind classes
- **class-variance-authority**: Component variants

---

## Directory Structure

```
saas-app/
├── docs/                          # Documentation
│   ├── PRD.md                    # Product Requirements Document
│   ├── architecture.md           # This file
│   └── tasks.md                  # Task tracking
├── public/                       # Static assets
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   └── next.svg
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── [locale]/            # Internationalized routes
│   │   │   ├── admin/          # Platform admin pages
│   │   │   ├── analytics/      # Analytics pages
│   │   │   ├── auth/           # Authentication pages
│   │   │   ├── billing/        # Billing pages
│   │   │   ├── chat/           # AI chat pages
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   ├── documents/      # Document management
│   │   │   ├── help/           # Help center
│   │   │   ├── login/          # Login page
│   │   │   ├── notifications/  # Notification center
│   │   │   ├── projects/       # Project management
│   │   │   ├── settings/       # User settings
│   │   │   ├── signup/         # Signup page
│   │   │   ├── team/           # Team management
│   │   │   ├── tenant/         # Tenant management
│   │   │   └── workspace/      # Workspace overview
│   │   ├── globals.css         # Global styles and CSS variables
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Root page
│   ├── components/             # Reusable components
│   │   ├── ui/                 # shadcn/ui components (24 components)
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── page-header.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── table.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   └── tooltip.tsx
│   │   └── modals/             # Modal components
│   ├── config/                 # Configuration files
│   │   ├── app.config.ts       # App-wide configuration
│   │   ├── auth.ts             # Auth configuration
│   │   ├── env.ts              # Environment variables
│   │   ├── index.ts            # Config exports
│   │   ├── locales.ts          # Locale configuration
│   │   ├── navigation.ts       # Navigation/sidebar config
│   │   └── routes.ts           # Route definitions
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-mobile.ts       # Mobile detection
│   │   └── use-rtl.ts          # RTL detection
│   ├── i18n/                   # Internationalization
│   │   └── routing.ts          # i18n routing configuration
│   ├── lib/                    # Utility functions
│   │   ├── nav-active.ts       # Navigation active state
│   │   └── utils.ts            # General utilities
│   ├── locales/                # Translation files
│   │   ├── en.json             # English translations
│   │   └── ur.json             # Urdu translations
│   ├── modules/                # Feature modules
│   │   ├── admin/              # Admin module
│   │   ├── auth/               # Authentication module
│   │   ├── billing/            # Billing module
│   │   ├── chat/               # AI chat module
│   │   ├── dashboard/          # Dashboard module
│   │   ├── documents/          # Documents module
│   │   ├── notifications/      # Notifications module
│   │   ├── projects/           # Projects module
│   │   ├── settings/           # Settings module
│   │   ├── shell/              # Shell/layout module
│   │   ├── team/               # Team module
│   │   └── tenant/             # Tenant module
│   ├── services/               # API services
│   │   └── auth/               # Auth service
│   ├── store/                  # Redux store
│   │   ├── slices/             # Redux slices
│   │   ├── StoreProvider.tsx   # Store provider
│   │   └── store.ts            # Store configuration
│   ├── theme/                  # Theme system
│   │   ├── ThemeProvider.tsx   # Theme provider component
│   │   ├── semantic/           # Semantic color mappings
│   │   └── tokens/              # Design tokens
│   │       ├── colors.ts       # Color tokens
│   │       ├── spacing.ts      # Spacing tokens
│   │       └── typography.ts   # Typography tokens
│   ├── ui/                     # UI-specific components
│   │   ├── components/         # Shared UI components
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── ThemeModeToggle.tsx
│   │   └── layout/             # Layout components
│   │       ├── AppNavbar.tsx
│   │       ├── AppSidebar.tsx
│   │       └── MainShell.tsx
│   ├── middleware.ts           # Next.js middleware
│   └── ... (other files)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── components.json             # shadcn/ui configuration
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project README
```

---

## Architecture Patterns

### 1. Modular Architecture

The application follows a **modular architecture** where each feature is organized into its own module under `src/modules/`. Each module contains:

- **Components**: Feature-specific UI components
- **Forms**: Form components with validation
- **Services**: API calls and business logic
- **Types**: TypeScript type definitions
- **Validation**: Zod schemas

**Benefits**:
- Clear separation of concerns
- Easy to locate and maintain code
- Scalable as features grow
- Reusable across projects

### 2. Configuration-Driven Design

All configuration is externalized to avoid hardcoded values:

- **Navigation**: `src/config/navigation.ts` - Sidebar items, sections
- **Routes**: `src/config/routes.ts` - Route definitions
- **App Config**: `src/config/app.config.ts` - App-wide settings
- **Auth**: `src/config/auth.ts` - Authentication configuration
- **Locales**: `src/config/locales.ts` - Supported locales

**Benefits**:
- Easy to update without touching components
- Centralized configuration management
- Better maintainability
- Easier testing

### 3. Internationalization (i18n)

All user-facing strings are externalized to translation files:

- **English**: `src/locales/en.json`
- **Urdu**: `src/locales/ur.json`

Components use `next-intl` hooks to access translations:
- `useTranslations()` for component-level translations
- `getTranslations()` for server components

**RTL Support**:
- Urdu uses right-to-left text direction
- Layout automatically adjusts based on locale
- Sidebar and navigation respect RTL

### 4. Theme System

The theme system uses **CSS custom properties** with OKLCH color space:

- **Light Mode**: Defined in `:root` in `globals.css`
- **Dark Mode**: Defined in `.dark` in `globals.css`
- **Semantic Tokens**: Mapped in `src/theme/semantic/colors.ts`
- **Design Tokens**: Base tokens in `src/theme/tokens/`

**ThemeProvider**:
- Manages theme state via Redux
- Persists preference to localStorage
- Applies CSS variables to document root
- Supports system preference detection

### 5. State Management

**Redux Toolkit** is used for global state:

- **User Slice**: User profile, authentication state
- **Theme Slice**: Theme mode, palette preferences
- **Store Provider**: Wraps the application with Redux provider

**Local State**:
- React hooks for component-level state
- React Hook Form for form state
- URL params for route-level state

### 6. Component Architecture

**UI Components** (`src/components/ui/`):
- Based on shadcn/ui
- Built on Radix UI primitives
- Fully accessible
- Customizable via variants
- TypeScript typed

**Feature Components** (`src/modules/*/components/`):
- Feature-specific UI
- Composed from UI components
- Business logic included
- Translation integrated

**Layout Components** (`src/ui/layout/`):
- Application shell
- Navigation
- Responsive behavior

### 7. Form Handling

**React Hook Form + Zod** pattern:

```typescript
const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: { ... },
});
```

**Benefits**:
- Type-safe forms
- Automatic validation
- Minimal re-renders
- Easy to test

### 8. Routing

**Next.js App Router** with internationalization:

- **Locale-based routing**: `/en/dashboard`, `/ur/dashboard`
- **Route groups**: `[locale]` for i18n
- **Middleware**: Handles locale detection and routing
- **Navigation**: Custom Link component from next-intl

### 9. Authentication

**Multi-tenant authentication**:

- Session management via Redux
- Role-based access control
- Protected routes via middleware
- Auth service for API calls

**Roles**:
- **member**: Regular workspace user
- **admin**: Tenant administrator
- **super_admin**: Platform administrator

---

## Data Flow

### 1. User Authentication Flow

```
User enters credentials
  ↓
Auth service validates
  ↓
Redux store updates (user slice)
  ↓
Session stored
  ↓
Redirect to dashboard
```

### 2. Theme Change Flow

```
User toggles theme
  ↓
Redux store updates (theme slice)
  ↓
ThemeProvider detects change
  ↓
CSS variables updated on document root
  ↓
UI re-renders with new theme
  ↓
Preference saved to localStorage
```

### 3. Navigation Flow

```
User clicks navigation item
  ↓
Link component (next-intl)
  ↓
Route change detected
  ↓
Active state calculated (nav-active.ts)
  ↓
Sidebar highlights active item
  ↓
Page renders with new content
```

### 4. Form Submission Flow

```
User fills form
  ↓
React Hook Form tracks state
  ↓
User submits
  ↓
Zod validates
  ↓
If valid: API call
  ↓
If invalid: Show errors
```

---

## Design System

### Color System

**OKLCH Color Space**:
- Modern, perceptually uniform
- Better color manipulation
- Consistent across light/dark modes

**Semantic Tokens**:
- `--background`: Page background
- `--foreground`: Primary text
- `--primary`: Brand color
- `--secondary`: Secondary actions
- `--muted`: Subtle backgrounds
- `--accent`: Highlight elements
- `--destructive`: Error/danger
- `--border`: Borders and dividers
- `--card`: Card backgrounds
- `--sidebar`: Sidebar background

### Typography

**Font Family**:
- **Sans**: Inter (primary)
- **Mono**: JetBrains Mono (code)

**Scale**:
- `xs`: 12px
- `sm`: 14px
- `base`: 16px
- `lg`: 18px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 30px
- `4xl`: 36px
- `5xl`: 48px

### Spacing

**8px Grid System**:
- Base unit: 8px
- All spacing multiples of 8px
- Consistent padding/margins

### Border Radius

**Scale**:
- `sm`: 0.375rem
- `md`: 0.5rem
- `lg`: 0.625rem (default)
- `xl`: 0.875rem
- `2xl`: 1.125rem

---

## Security Considerations

### Authentication
- Session-based authentication
- Secure token storage
- Automatic session refresh
- Logout on session expiry

### Authorization
- Role-based access control (RBAC)
- Route-level protection
- Component-level checks
- API-level validation

### Data Isolation
- Multi-tenant data separation
- User-scoped queries
- Tenant-scoped data access
- Admin-only operations

### XSS Prevention
- React's built-in XSS protection
- Input sanitization
- Content security policy (future)
- Proper escaping

---

## Performance Optimizations

### Code Splitting
- Route-based splitting via Next.js
- Dynamic imports for heavy components
- Lazy loading for non-critical features

### Bundle Optimization
- Tree shaking
- Minification
- Compression
- Asset optimization

### Rendering
- Server components where possible
- Client components only when needed
- Memoization for expensive operations
- Virtual scrolling for long lists

### Caching
- Redis for session storage (future)
- CDN for static assets
- Browser caching headers
- API response caching (future)

---

## Accessibility

### Keyboard Navigation
- All interactive elements keyboard accessible
- Proper focus management
- Skip to content link (future)
- Focus visible indicators

### Screen Reader Support
- ARIA labels on interactive elements
- Semantic HTML
- Alt text on images
- Proper heading hierarchy

### Color Contrast
- WCAG AA compliant contrast ratios
- Not color-dependent
- Focus indicators visible
- Error states clear

---

## Deployment Architecture

### Environment Variables
- `.env.example` for template
- Environment-specific configs
- Secrets management (future)
- CI/CD integration (future)

### BuildProcess
- `npm run build`: Production build
- `npm run dev`: Development server
- `npm start`: Production server
- `npm run lint`: Code linting

### Hosting
- Vercel recommended (Next.js optimized)
- Docker support (future)
- Kubernetes (future)
- Self-hosting option (future)

---

## Monitoring & Observability (Future)

### Logging
- Structured logging
- Error tracking (Sentry)
- Performance monitoring
- User analytics

### Metrics
- Page load times
- Error rates
- User engagement
- Feature usage

---

## Future Architecture Enhancements

### Microservices (Phase 2)
- Separate auth service
- Separate billing service
- Separate notification service
- API gateway

### Event-Driven Architecture (Phase 3)
- Event bus for cross-service communication
- Async processing for heavy operations
- Webhook system
- Real-time updates via WebSockets

### Database Architecture (Phase 2)
- PostgreSQL for relational data
- Redis for caching
- S3 for file storage
- Elasticsearch for search

---

## Development Guidelines

### Code Style
- ESLint for linting
- Prettier for formatting (future)
- TypeScript strict mode
- Consistent naming conventions

### Git Workflow
- Feature branches
- Pull request reviews
- Automated tests (future)
- CI/CD pipeline (future)

### Testing Strategy (Future)
- Unit tests with Jest
- Integration tests with Playwright
- E2E tests with Cypress
- Visual regression tests

---

## Documentation

### Code Documentation
- JSDoc comments on functions
- TypeScript for type documentation
- README in each module
- Component prop documentation

### API Documentation (Future)
- OpenAPI/Swagger specs
- API examples
- Rate limiting docs
- Authentication docs

---

## Conclusion

This architecture provides a solid foundation for building an enterprise-grade SaaS application. The modular design, configuration-driven approach, and emphasis on type safety and accessibility ensure the application is maintainable, scalable, and professional.

The architecture is designed to evolve with the product, supporting future enhancements like microservices, advanced analytics, and mobile applications without requiring major refactoring.
