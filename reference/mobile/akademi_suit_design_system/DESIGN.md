---
name: Akademi Suit Design System
colors:
  surface: '#F8FAFC'
  surface-dim: '#d8dae1'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3fb'
  surface-container: '#ecedf5'
  surface-container-high: '#e6e8ef'
  surface-container-highest: '#e1e2e9'
  on-surface: '#191c21'
  on-surface-variant: '#414751'
  inverse-surface: '#2e3036'
  inverse-on-surface: '#eff0f8'
  outline: '#717783'
  outline-variant: '#c1c7d3'
  surface-tint: '#0060ac'
  primary: '#005da7'
  on-primary: '#ffffff'
  primary-container: '#2976c7'
  on-primary-container: '#fdfcff'
  inverse-primary: '#a4c9ff'
  secondary: '#6151a8'
  on-secondary: '#ffffff'
  secondary-container: '#b2a1ff'
  on-secondary-container: '#443289'
  tertiary: '#7f5300'
  on-tertiary: '#ffffff'
  tertiary-container: '#a06900'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#a4c9ff'
  on-primary-fixed: '#001c39'
  on-primary-fixed-variant: '#004883'
  secondary-fixed: '#e6deff'
  secondary-fixed-dim: '#cbbeff'
  on-secondary-fixed: '#1d0061'
  on-secondary-fixed-variant: '#49388f'
  tertiary-fixed: '#ffddb4'
  tertiary-fixed-dim: '#ffb953'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#633f00'
  background: '#f8f9ff'
  on-background: '#191c21'
  surface-variant: '#e1e2e9'
  accent-girls: '#A594F1'
  accent-boys: '#4682B4'
  text-main: '#1E293B'
  white-glass: rgba(255, 255, 255, 0.6)
typography:
  h1:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  h2:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  h3:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.25'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.25'
  cta-label:
    fontFamily: Epilogue
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
---

# Akademi Suit - Design System

## Overview
This design system is crafted for **Akademi Suit**, a premium student dormitory located in Sivas. The primary goal is to bridge the gap between the dynamic expectations of Gen Z students and the reliability sought by parents. The experience is centered around a gender-based split entry and a high-conversion "Apply Now" strategy.

## Colors
We use a branching palette to personalize the user journey based on the dormitory type.

- **Primary Blue (#4A90E2)**: Used for the entry screen and corporate trust elements. Represents professionalism.
- **Modern Lilac (#A594F1)**: The accent color for the Girls' Dormitory sections. Warm and sophisticated.
- **Steel Blue (#4682B4)**: The accent color for the Boys' Dormitory sections. Dynamic and focused.
- **Surface White (#F8FAFC)**: The primary background color to maintain a clean, minimalist feel.

## Typography
A combination of **Montserrat** and **Open Sans** ensures both character and readability.

- **Headlines**: Montserrat (Semi-bold/Bold) - Modern, geometric, and authoritative.
- **Body Text**: Open Sans (Regular) - High legibility for long descriptions and parent-focused information.
- **Line Height**: 1.25 - Optimized for screen reading comfort.

## Components

### 1. Split-Screen Entry
Upon arrival, users encounter a vertical split screen.
- **Left Side**: Girls' Dormitory (Lilac accents, soft imagery).
- **Right Side**: Boys' Dormitory (Steel Blue accents, dynamic imagery).
- **Center**: The Akademi Suit logo acts as the anchor point.

### 2. Sticky Header & CTA
The header remains fixed at the top of the viewport.
- **Action**: A prominent "Apply Now" button is always accessible in the top right corner.
- **Visuals**: High contrast against the background to drive conversions.

### 3. Glassmorphism Cards
Information blocks (room features, amenities) utilize a "Glassmorphism" effect.
- **Style**: Semi-transparent background with a subtle background blur (`backdrop-filter`).
- **Effect**: Adds modern depth that appeals to a younger audience without sacrificing clarity.

## Do's and Don'ts

- **Do**: Maintain a 4.5:1 contrast ratio for all descriptive text to ensure accessibility for parents.
- **Do**: Use high-quality photography of the facilities as the primary visual driver.
- **Don't**: Overcomplicate the landing page with heavy text; keep the initial choice fast and intuitive.
- **Don't**: Use aggressive, high-saturation neon colors; stay within the refined pastel-modern spectrum.