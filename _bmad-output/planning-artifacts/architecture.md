---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/product-brief-akademi_yurt.md
  - _bmad-output/project-context.md
  - reference/mobile/akademi_suit_design_system/DESIGN.md
  - memory-bank/projectbrief.md
  - memory-bank/productContext.md
  - memory-bank/activeContext.md
  - memory-bank/systemPatterns.md
  - memory-bank/techContext.md
  - memory-bank/progress.md
workflowType: 'architecture'
project_name: 'akademi_yurt'
user_name: 'Emrekolunsag'
date: '2026-04-24'
lastStep: 8
status: 'complete'
completedAt: '2026-04-24'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
- **Split-Screen Entry:** Dual-entry point for Girls/Boys dormitories with immediate visual feedback.
- **URL-First Theme Management:** State persistence and UI context switching driven by URL parameters/paths using History API.
- **Direct Conversion (tel:):** Elimination of web forms in favor of direct telephony integration via floating CTA.
- **Contextual Discovery:** Dorm-specific content blocks (Rooms, Amenities) rendered based on active theme.

**Non-Functional Requirements:**
- **Performance:** 60 FPS animations, <2.5s LCP, and 90+ Lighthouse scores across all metrics.
- **Accessibility:** WCAG AA (4.5:1) contrast ratios on semi-transparent glass elements and support for `prefers-reduced-motion`.
- **Architectural Integrity:** Strict Vanilla CSS usage (no frameworks) and modular ES6+ JS structure with GSAP context management.

**Scale & Complexity:**
- Primary domain: Premium Frontend (Web App/MPA)
- Complexity level: Medium (High-fidelity interactions, custom animation orchestration)
- Estimated architectural components: ~10 (ThemeManager, SplitHero, GlassCard, FloatingCTA, ScrollEngine, etc.)

### Technical Constraints & Dependencies
- **Vanilla Only:** Absolute prohibition of CSS frameworks (Tailwind, etc.).
- **GSAP Centric:** Deep dependency on GSAP for the "WOW" factor.
- **Static First:** No complex backend or database requirements for the MVP phase.

### Cross-Cutting Concerns Identified
- **Global State (Theme):** How the theme propagates from URL to CSS variables and JS components.
- **Animation Cleanup:** Managing GSAP instances during navigation to prevent memory leaks.
- **Responsive Contrast:** Ensuring readability of glass cards over dynamic backgrounds on mobile.

## Starter Template Evaluation

### Primary Technology Domain
**Web Application (Premium MPA)** - High-fidelity interactions and static content focus.

### Starter Options Considered
- **Vite Vanilla:** Minimalist, high performance, no framework overhead. (Selected)
- **Vite Vanilla-TS:** Considered for type safety, but the project context specifies "Modern JavaScript (ES6+)" as the primary language.

### Selected Starter: Vite Vanilla

**Rationale for Selection:**
The project requires a custom design system with strict Vanilla CSS rules and complex GSAP animations. Vite Vanilla provides the cleanest possible environment to implement these requirements without the "jank" or complexity introduced by larger frameworks. It aligns perfectly with the "Zero-Form" and "URL-First Theme" architectural goals.

**Initialization Command:**

```bash
npm create vite@latest . -- --template vanilla
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
Modern ES6+ JavaScript.

**Styling Solution:**
Standard CSS files linked via HTML or imported in JS (Vanilla CSS).

**Build Tooling:**
Vite for lightning-fast bundling and development server.

**Code Organization:**
Flat structure (index.html, main.js, style.css) which we will evolve into a modular pattern.

**Development Experience:**
Fast HMR, optimized production builds, and simple dependency management.

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- **Project Structure:** Modular folder organization for components, core logic, and styles.
- **Templating:** Use of Handlebars Partials for reusable UI blocks and better SEO.
- **Theme Management:** `data-theme` attribute on `<body>` driven by URL/History API.

**Important Decisions (Shape Architecture):**
- **GSAP Orchestration:** Strict use of `gsap.context()` for scoped animations and cleanup.
- **CSS Architecture:** `:root` based design tokens with theme-specific overrides.

**Deferred Decisions (Post-MVP):**
- **Advanced Caching:** Service Worker integration for offline assets.
- **Analytics:** Integration of privacy-focused analytics.

### Data Architecture
- **State Management:** URL-First strategy. Current theme (Girls/Boys) is the primary state, persisted in the URL and applied to the DOM via `data-theme`.
- **Data Source:** Static JSON or Handlebars context for room and amenity data.

### Authentication & Security
- **Auth:** Not required for MVP (Public information site).
- **Security:** Standard CSP headers and secure HTTPS hosting.

### API & Communication Patterns
- **Direct Interaction:** Native `tel:` protocol for conversion. No web-based communication APIs needed for MVP.
- **Internal Messaging:** Custom Event bus or direct module imports for interaction between UI components.

### Frontend Architecture
- **Component Architecture:** Functional modules that initialize their own GSAP contexts and DOM event listeners. **Dynamic imports** are used in `main.js` for lazy loading.
- **Templating:** Handlebars via `vite-plugin-handlebars` for MPA structure. A unified `layout.hbs` approach is used to prevent code duplication between entry points.
- **Styling:** Custom CSS Custom Properties (Variables) within a central `design-tokens.css` file.
- **Animation:** GSAP 3.x with ScrollTrigger.

### Infrastructure & Deployment
- **Hosting:** cPanel (Static). Optimized for legacy shared hosting environments.
- **CI/CD:** Manual deployment strategy via FTP/File Manager of the `dist/` folder.

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialize Vite project.
2. Configure Handlebars plugin and base folders.
3. Implement `design-tokens.css` and base layout.
4. Build `ThemeManager` and `SplitHero` (The "WOW" factor).
5. Develop subsequent pages and components.

**Cross-Component Dependencies:**
`ThemeManager` is the root dependency; all components must check the current theme on initialization and listen for theme changes if necessary.

## Implementation Patterns & Consistency Rules

### Naming Patterns
- **CSS Classes:** BEM (Block Element Modifier) methodology is MANDATORY. (e.g., `.glass-card__content--active`).
- **Files:** `kebab-case` for JS/CSS files, `PascalCase` for Handlebars partials.
- **JS:** `camelCase` for all variables and functions.

### Structure Patterns
- **Modular CSS:** Styles should be scoped to components using BEM to avoid global collisions.
- **Animation Scoping:** All GSAP timelines must be wrapped in a `gsap.context()` for automatic cleanup and selector scoping.

### Theme & State Patterns
- **Single Source of Truth:** The active theme (Girls/Boys) is derived from the URL.
- **DOM Attribute:** The theme is reflected on the `<body>` element via `data-theme="girls"` or `data-theme="boys"`.
- **CSS Variable Swapping:** All theme-specific colors must use CSS variables overridden within the `data-theme` scope.

### Process Patterns
- **Zero-Form Policy Enforcement:** No `input` or `textarea` elements allowed. All contact flows must lead to a `tel:` link.
- **GSAP Cleanup:** Agents must implement a cleanup function for every component that initializes a GSAP instance to prevent memory leaks during theme/page transitions.

### Enforcement Guidelines
**All AI Agents MUST:**
- Use `gsap.context()` for all animation logic.
- Avoid utility classes (e.g., `.flex`, `.p-4`) and prefer semantic BEM classes.
- Use the central `design-tokens.css` for all color and spacing values.

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
akademi_yurt/
├── .htaccess                 # URL-First routing for cPanel (Amelia's Strategy)
├── vite.config.js            # Handlebars & Static asset config
├── index.html                # Single entry point
├── src/
│   ├── main.js               # Bootstrap & Global state
│   ├── core/
│   │   ├── ThemeManager.js    # Logic to read URL and swap body[data-theme]
│   │   ├── AnimationEngine.js # GSAP global orchestration
│   │   └── utils.js           # Shared helper functions
│   ├── styles/
│   │   ├── design-tokens.css  # CSS Variables (:root)
│   │   ├── base.css           # Global resets
│   │   └── components/        # Scoped BEM styles
│   ├── components/            # Modular UI components
│   │   ├── SplitHero/         # Girls/Boys entry point
│   │   ├── GlassCard/         # Contextual content cards
│   │   ├── FloatingCTA/       # Conversion trigger
│   │   └── Navigation/        # Global menu
│   └── partials/              # HBS Fragments (Header, Footer, Meta)
├── public/assets/             # Static Assets (Images, Fonts)
└── dist/                     # PRODUCTION BUILD (Manual upload)
```

### Architectural Boundaries & Routing

**Routing Boundary:**
- The project functions as an **SPA-driven MPA**. 
- A `.htaccess` file on cPanel redirects all virtual paths (e.g., `/kiz`, `/erkek`) to `index.html`.
- `ThemeManager.js` interprets the path and sets the global `data-theme` state WITHOUT a full page reload, ensuring 60FPS GSAP transitions.

**Deployment Boundary:**
- **Local:** Vite handles development and build.
- **Remote:** Static deployment to cPanel `public_html`. No server-side Node.js logic permitted.

### Requirements to Structure Mapping

**Feature: Girls/Boys Split Entry**
- **Location:** `src/components/SplitHero/`
- **Logic:** `SplitHero.js` manages GSAP interaction and triggers URL change.

**Feature: High-Fidelity Transitions**
- **Location:** `src/core/AnimationEngine.js`
- **Pattern:** Uses the routing boundary to trigger "Out-In" animations during theme swaps.

**Feature: Zero-Form Floating CTA**
- **Location:** `src/components/FloatingCTA/`
- **Logic:** Native `tel:` links in `FloatingCTA.hbs`.

## Architecture Validation Results

### Coherence Validation ✅
- **Decision Compatibility:** Local Vite development + Static cPanel deployment with `.htaccess` is a coherent and robust strategy for a modern frontend on classic hosting.
- **Pattern Consistency:** BEM naming and GSAP Context scoping ensure multiple agents produce consistent, maintainable, and leak-free code.

### Requirements Coverage Validation ✅
- **Functional:** All primary epics (SplitHero, Theming, Conversion) are mapped to physical modules and architectural boundaries.
- **Non-Functional:** Performance and Premium aesthetics are enforced by the strict Vanilla stack and GSAP orchestration patterns.

### Implementation Readiness Validation ✅
- **Status:** READY FOR IMPLEMENTATION
- **Confidence Level:** HIGH
- **Key Strengths:** Explicit project structure, strict naming conventions, and a clear deployment boundary tailored to the user's specific hosting constraints.

### Architecture Completeness Checklist
- [x] Project context thoroughly analyzed
- [x] Technical constraints (cPanel, No Node) identified
- [x] Technology stack fully specified (Vite, Vanilla, GSAP)
- [x] Implementation patterns (BEM, GSAP Context) defined
- [x] Complete directory structure defined
- [x] Requirements to structure mapping complete

### Implementation Handoff
- **First Implementation Priority:** `npm create vite@latest . -- --template vanilla`
- **Core Initialization:** Setup `vite-plugin-handlebars` and `src/core/ThemeManager.js`.
