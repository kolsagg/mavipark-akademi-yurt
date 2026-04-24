# Story 1.2: Tasarım Sistemi (Tokens) ve Handlebars Kurulumu

**Epic:** 1 - Teknik Altyapı ve Tasarım Sistemi
**Story Key:** 1-2-tasarim-sistemi-tokens-ve-handlebars-kurulumu
**Status:** done

## 📖 Story Requirements (Hikaye Gereksinimleri)

**User Story:**
As a Geliştirici,
I want CSS değişkenlerini (tokens) tanımlamak ve Handlebars eklentisini yapılandırmak,
So that Tüm bileşenler merkezi bir tasarım dilinden beslenir ve HTML kodları modüler hale gelir.

**Acceptance Criteria (Kabul Kriterleri):**

1. **Given** Başlatılmış bir Vite projesi
   **When** `design-tokens.css` dosyası oluşturulup `:root` altında değişkenler (lila, çelik mavisi, fontlar) tanımlandığında
   **Then** Bu değişkenler tüm projede kullanılabilir olmalı

2. **Given** Tasarım token'ları tanımlanmış bir proje
   **When** `vite-plugin-handlebars` yapılandırılmış olduğunda
   **Then** İlk Partial başarıyla render edilmiş olmalı

3. **Given** Tipografi sistemi kurulacağında
   **When** Google Fonts (Epilogue, Inter) bağlantıları eklendiğinde
   **Then** Fontlar hem geliştirme hem de production ortamında doğru yüklenebilir olmalı

**Business Value & Context:**
Bu hikaye, projenin görsel DNA'sını oluşturur. Tüm bileşenler (GlassCard, SplitHero, FloatingCTA vb.) bu token'lardan beslenecek. Handlebars ise Header/Footer gibi tekrarlayan yapıları DRY tutacak.

---

## 👨‍💻 Developer Context (Geliştirici Bağlamı)

> **CRITICAL:** Bu bölüm, mimari dokümanlardan ve BMad kurallarından çıkarılmış, geliştirici (Dev Agent) için kesinlikle uyulması gereken zorunlu kuralları içerir.

### 🛠 Technical Requirements (Teknik Gereksinimler)

- **CSS Framework YASAK:** Tailwind, Bootstrap veya herhangi bir CSS framework'ü KESİNLİKLE kullanılmayacaktır. Tüm stiller Vanilla CSS ile yazılacak.
- **BEM Metodolojisi:** Tüm CSS sınıfları BEM (Block Element Modifier) kurallarına uyacak (örn: `.glass-card__content--active`).
- **Tasarım Token Mimarisi:** Üç katmanlı yaklaşım:
  1. **Primitive Tokens:** Gerçek renk ve değerler (örn: `--color-lilac-500: #9B59B6`)
  2. **Semantic Tokens:** Amaca yönelik değişkenler (örn: `--theme-primary: var(--color-lilac-500)`)
  3. **Theme Overrides:** `body[data-theme="girls"]` ve `body[data-theme="boys"]` scope'larında semantic token'ların yeniden tanımlanması
- **Utility Class Yasağı:** `.flex`, `.pt-4`, `.text-center` gibi utility sınıflar YASAKTIR. Semantik BEM sınıfları kullanılacak.

### 🏗 Architecture Compliance (Mimari Uyumluluk)

**Tech Stack:** Vite 8.x, Vanilla JS (ES6+), Vanilla CSS, vite-plugin-handlebars
**Hosting:** cPanel (Static) — Node.js sunucu kodu yok
**State Management:** URL-First tema yönetimi. `body[data-theme]` üzerinden CSS değişken değiştirme (ThemeManager Story 2.3'te implement edilecek, ancak token altyapısı BURADA hazırlanacak).

**Kritik Mimari Kararlar:**
- Bileşenler renk değerlerini HEX yerine `var(--theme-primary)`, `var(--theme-surface)` gibi semantic token'lardan okuyacak
- `:root` üzerinde default (nötr) tema tanımlanacak, `[data-theme="girls"]` ve `[data-theme="boys"]` ile override edilecek
- Google Fonts `<link>` ile `index.html` `<head>` içinde yüklenecek (`@import` DEĞİL — performans)

### 📚 Library & Framework Requirements

#### vite-plugin-handlebars
- **Paket:** `npm install -D vite-plugin-handlebars` (alexlafroscia paketi, Vite 5-8 destekli)
- **Yapılandırma:** `vite.config.js` içinde Handlebars plugin tanımı
- **Partial Dizini:** `src/partials/` — `.hbs` uzantılı dosyalar
- **Context Data:** Plugin config'de `context` objesi ile global değişkenler (site adı, telefon vb.) geçirilebilir

#### Google Fonts
- **Yükleme:** `<link>` tag ile `index.html` `<head>` bölümünde — `@import` KULLANMA
- **Preconnect:** `fonts.googleapis.com` ve `fonts.gstatic.com` için `<link rel="preconnect">` ekle
- **Font Aileleri ve Ağırlıkları:**
  - `Epilogue`: 600, 700 (başlıklar)
  - `Inter`: 400, 500 (gövde metni)
  - `Montserrat`: 700 (alternatif başlık, opsiyonel)
- **`display=swap`:** Zorunlu — FOUT (Flash of Unstyled Text) önleme

### 📂 File Structure Requirements (Dosya Yapısı Kuralları)

Bu story sonunda oluşacak/güncellenecek dosyalar:

```text
akademi_yurt/
├── index.html                         # Google Fonts <link> eklenmeli
├── vite.config.js                     # Handlebars plugin eklenmeli
├── package.json                       # vite-plugin-handlebars dev dependency
├── src/
│   ├── main.js                        # design-tokens.css import'u eklenmeli
│   ├── styles/
│   │   ├── design-tokens.css          # YENİ: :root CSS değişkenleri
│   │   ├── base.css                   # YENİ: Global reset + tipografi kuralları
│   │   ├── main.css                   # GÜNCELLEME: token import'ları
│   │   └── components/               # (boş kalabilir, sonraki story'ler)
│   └── partials/
│       └── _head-meta.hbs            # YENİ: İlk test partial'ı
```

**ÖNEMLİ:** Mevcut `src/styles/main.css` içindeki reset kodlarını silme. `base.css`'e taşı veya `main.css`'in import chain'ine ekle.

### 🎨 Tasarım Token Spesifikasyonu

#### Renk Paleti (Primitive Tokens)

```css
/* Kız Yurdu - Lila/Mor tonları */
--color-lilac-50:  /* açık lila */
--color-lilac-100: /* ... */
--color-lilac-500: /* ana lila */
--color-lilac-700: /* koyu lila - vurgular */
--color-lilac-900: /* en koyu */

/* Erkek Yurdu - Çelik Mavisi tonları */
--color-steel-50:  /* açık mavi */
--color-steel-100: /* ... */
--color-steel-500: /* ana çelik mavisi */
--color-steel-700: /* koyu - vurgular */
--color-steel-900: /* en koyu - lacivert */

/* Nötr / Ortak */
--color-white: #FFFFFF;
--color-black: #0A0A0A;
--color-anthracite: #1A1A1A;
--color-gray-dark: #333333;
--color-gray-mid: #666666;
--color-gray-light: #999999;

/* Glassmorphism Surface */
--color-glass-white: rgba(255, 255, 255, 0.7);
--color-glass-white-light: rgba(255, 255, 255, 0.4);
```

#### Semantic Tokens (Theme-Aware)

```css
:root {
  /* Default tema (nötr/landing) */
  --theme-primary: var(--color-lilac-500);
  --theme-primary-dark: var(--color-lilac-700);
  --theme-accent: var(--color-lilac-900);
  --theme-surface: var(--color-glass-white);
  --theme-bg: var(--color-black);
  --theme-text: var(--color-anthracite);
  --theme-text-light: var(--color-gray-dark);
}

body[data-theme="girls"] {
  --theme-primary: var(--color-lilac-500);
  --theme-primary-dark: var(--color-lilac-700);
  --theme-accent: var(--color-lilac-900);
}

body[data-theme="boys"] {
  --theme-primary: var(--color-steel-500);
  --theme-primary-dark: var(--color-steel-700);
  --theme-accent: var(--color-steel-900);
}
```

#### Tipografi Tokens

```css
--font-heading: 'Epilogue', 'Montserrat', sans-serif;
--font-body: 'Inter', system-ui, sans-serif;

--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
--font-size-hero: 4rem;     /* 64px - Hero başlıklar */

--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.6;  /* Gövde metni için */

--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

--letter-spacing-tight: -0.02em;  /* Başlıklar */
--letter-spacing-normal: 0;
```

#### Spacing Tokens (8px Sistemi)

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.5rem;   /* 24px */
--space-6: 2rem;     /* 32px */
--space-8: 3rem;     /* 48px */
--space-10: 4rem;    /* 64px */
--space-12: 6rem;    /* 96px */
--space-16: 8rem;    /* 128px */
```

#### Z-Index ve Efekt Tokens

```css
--z-base: 1;
--z-overlay: 10;
--z-nav: 100;
--z-modal: 200;
--z-floating-cta: 300;
--z-preloader: 999;

--blur-glass: 20px;
--blur-glass-light: 10px;

--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;

--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
--shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.1);

--transition-fast: 0.2s ease;
--transition-base: 0.3s ease;
--transition-slow: 0.5s ease;
```

#### Breakpoint Referansları (CSS'de değişken olarak kullanılmaz, dokümantasyon)

```
Mobile (default): < 768px
Tablet: @media (min-width: 768px)
Desktop: @media (min-width: 1024px)
Wide: @media (min-width: 1440px)
```

### 🔗 Handlebars Yapılandırma Detayları

**vite.config.js güncelleme örneği:**
```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  // ... mevcut config
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: {
        siteName: 'Akademi Suit',
        siteDescription: 'Premium Öğrenci Yurdu',
        phoneNumber: '+90 XXX XXX XX XX',
      },
    }),
  ],
});
```

**İlk test partial'ı (`src/partials/_head-meta.hbs`):**
```handlebars
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="{{siteDescription}}" />
<title>{{siteName}} | {{pageTitle}}</title>
```

**`index.html` içinde partial kullanımı:**
```html
<head>
  {{> _head-meta pageTitle="Ana Sayfa" }}
  <!-- Google Fonts & CSS -->
</head>
```

### 🧪 Testing Requirements (Test Kuralları)

- `npm run dev` komutuyla proje sorunsuz çalışmalı
- `npm run build` hatasız `dist/` üretmeli
- Browser DevTools'ta `:root` altında tüm CSS değişkenleri görülebilmeli
- `body[data-theme="girls"]` ve `body[data-theme="boys"]` attribute'ları DevTools'ta manuel eklendiğinde renk değişkenleri anında güncellenmeli
- Handlebars partial'ı (`_head-meta.hbs`) başarıyla render edilmeli ve `{{siteName}}` gibi context değişkenleri HTML çıktısında görülebilmeli
- Google Fonts (Epilogue, Inter) Network tab'da başarıyla yüklenmeli

---

## ✅ Tasks / Subtasks (Görevler)

- [x] **Task 1: Google Fonts entegrasyonu** (AC: #3)
  - [x] 1.1: `index.html` `<head>` bölümüne `preconnect` linkleri ekle
  - [x] 1.2: Epilogue (600, 700) ve Inter (400, 500) font yükleme `<link>` tag'i ekle (display=swap)

- [x] **Task 2: design-tokens.css oluştur** (AC: #1)
  - [x] 2.1: `src/styles/design-tokens.css` dosyasını oluştur
  - [x] 2.2: Primitive renk token'larını tanımla (Lila paleti, Çelik Mavisi paleti, Nötr renkler, Glass yüzeyler)
  - [x] 2.3: Semantic (theme-aware) token'ları tanımla (`:root` default + `[data-theme]` overrides)
  - [x] 2.4: Tipografi token'larını tanımla (font aileler, boyutlar, ağırlıklar, satır aralıkları)
  - [x] 2.5: Spacing token'larını tanımla (8px sistemi)
  - [x] 2.6: Z-index, blur, radius, shadow ve transition token'larını tanımla

- [x] **Task 3: base.css ve CSS import zinciri** (AC: #1)
  - [x] 3.1: `src/styles/base.css` oluştur (global reset, tipografi kuralları, body stilleri)
  - [x] 3.2: `main.css`'i güncelle — `design-tokens.css` ve `base.css` import et
  - [x] 3.3: Mevcut `main.css` reset kodlarını `base.css`'e taşı (mevcut kodu silme, taşı)

- [x] **Task 4: vite-plugin-handlebars kurulumu** (AC: #2)
  - [x] 4.1: `npm install -D vite-plugin-handlebars` komutuyla eklentiyi kur
  - [x] 4.2: `vite.config.js` içinde Handlebars plugin'ini yapılandır (partialDirectory, context)
  - [x] 4.3: `src/partials/_head-meta.hbs` ilk test partial'ını oluştur
  - [x] 4.4: `index.html` dosyasını Handlebars partial'ı kullanacak şekilde güncelle

- [x] **Task 5: Doğrulama ve test**
  - [x] 5.1: `npm run dev` çalıştır — hatasız başladığını doğrula
  - [x] 5.2: `npm run build` çalıştır — `dist/` hatasız üretildiğini doğrula
  - [x] 5.3: DevTools'ta CSS değişkenlerinin `:root` altında görünür olduğunu doğrula
  - [x] 5.4: DevTools'ta `data-theme` attribute'u ekleyerek renk değişimini doğrula
  - [x] 5.5: Google Fonts'un başarıyla yüklendiğini Network tab'da doğrula
  - [x] 5.6: Handlebars partial'ının render edildiğini (title, meta description) doğrula

---

## 📝 Previous Story Intelligence (Önceki Story Öğrenmeleri)

**Story 1.1'den çıkarılan dersler:**

1. **Manuel Kurulum:** Proje kökünde `.git` ve BMad dosyaları olduğu için `npm create vite` çalışmadı, manuel kurulum yapıldı. Bu story'de de mevcut dosyaların bozulmamasına dikkat et.
2. **Port Çakışması:** Vite geliştirme sunucusu port 3000 meşgulken otomatik olarak 3001'e geçti. Test sırasında buna dikkat et.
3. **Mevcut Dosya Yapısı:** `package.json` zaten var (`vite ^8.0.10` devDep). Yeni dependency eklerken mevcut yapıyı boz**MA**.
4. **CSS Import Zinciri:** `main.js` zaten `import './styles/main.css'` yapıyor. Yeni CSS dosyaları `main.css` üzerinden `@import` ile zincirlenmeli veya `main.js`'den ayrıca import edilmeli.
5. **Favicon:** `index.html`'de `favicon.svg` referansı var ama dosya fiziksel olarak mevcut değil — bu story'de düzeltme beklenmez ama dikkat et.
6. **.htaccess:** URL-First routing zaten yapılandırılmış, dokunma.

**Mevcut `main.css` içeriği (taşınacak reset kodu):**
```css
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; ... }
body { min-height: 100vh; font-family: system-ui; background-color: #0a0a0a; color: #f5f5f5; }
.app-container { display: flex; ... }
```
Bu kod `base.css`'e taşınacak ve `body` font-family `var(--font-body)` ile güncellenecek.

---

## 🔀 Git Intelligence

**Son commit'ler:**
- `b21b58c` — `feat: Story 1.1 - Vite Vanilla JS projesi ve modüler klasör yapısı`
- `86e9858` — `1-1 sprint`
- `dca3678` — `docs: sprint planlama tamamlandı`

**Story 1.1'de oluşturulan/değiştirilen dosyalar:**
- `.htaccess`, `index.html`, `package.json`, `package-lock.json`, `vite.config.js`
- `src/main.js`, `src/styles/main.css`
- `.gitkeep` dosyaları: `src/core/`, `src/styles/components/`, `src/components/`, `src/partials/`, `public/assets/`

**Geliştirici bu dosyaları DEĞİŞTİRECEK:** `index.html`, `vite.config.js`, `package.json`, `src/main.js`, `src/styles/main.css`
**Geliştirici bu dosyaları OLUŞTURACAK:** `src/styles/design-tokens.css`, `src/styles/base.css`, `src/partials/_head-meta.hbs`

---

## 🌐 Latest Tech Information

### vite-plugin-handlebars
- **Paket:** `vite-plugin-handlebars` (alexlafroscia)
- **Uyumluluk:** Vite 5-8 arası test edilmiş
- **Kurulum:** `npm install -D vite-plugin-handlebars`
- **API:** `handlebars({ partialDirectory, context })` — plugin export'u default

### Google Fonts
- **Performans:** `<link>` tag tercih edilmeli, `@import` DEĞİL
- **Preconnect:** Zorunlu — `fonts.googleapis.com` ve `fonts.gstatic.com`
- **display=swap:** FOUT (Flash of Unstyled Text) önlemek için zorunlu
- Sadece kullanılan ağırlıklar yüklenmeli (gereksiz ağırlık performansı düşürür)

### CSS Custom Properties & Tema Yönetimi
- **Best Practice:** `data-theme` attribute ile `body` veya `html` üzerinde tema değiştirme
- **Katmanlı Token Yapısı:** Primitive → Semantic → Theme Override
- Bileşenler SADECE semantic token'ları referans almalı, asla primitive değerleri doğrudan kullanmamalı

---

## 🔗 Project Context Reference

Tüm işlemler şu dokümanlara uygun yapılmalıdır:
- [Mimari Doküman](_bmad-output/planning-artifacts/architecture.md#Implementation-Patterns)
- [UX Tasarım](_bmad-output/planning-artifacts/ux-design-specification.md#Tasarım-Sistemi-Temeli)
- [Proje Bağlamı](_bmad-output/project-context.md#Critical-Implementation-Rules)
- [PRD](_bmad-output/planning-artifacts/prd.md#Non-Functional-Requirements)

---

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6 (Thinking)

### Debug Log References
- Dev server `npm run dev` hatasız başladı (port 3000)
- `npm run build` hatasız `dist/` üretti (65ms, 5 modül)
- Browser doğrulaması: CSS değişkenleri, tema değişimi, font yükleme, Handlebars render — tümü başarılı

### Completion Notes List
- ✅ Task 1: Google Fonts preconnect + Epilogue/Inter link'leri `index.html`'e eklendi
- ✅ Task 2: `design-tokens.css` oluşturuldu — 3 katmanlı token mimarisi (Primitive → Semantic → Theme Override)
  - Lila paleti (50-900), Çelik Mavisi paleti (50-900), Nötr renkler, Glass yüzeyler
  - Semantic token'lar: `:root` default + `body[data-theme="girls"]` + `body[data-theme="boys"]` overrides
  - Tipografi: font aileleri, 10 boyut skalası, ağırlıklar, satır aralıkları, harf aralıkları
  - Spacing: 8px sistemi (space-1..space-16)
  - Z-index (5 katman), blur, radius, shadow, transition token'ları
- ✅ Task 3: `base.css` oluşturuldu — reset kodu `main.css`'den taşındı, tipografi kuralları eklendi. `main.css` import zinciri: `design-tokens.css` → `base.css`
- ✅ Task 4: `vite-plugin-handlebars` kuruldu, `vite.config.js`'de yapılandırıldı, `_head-meta.hbs` partial'ı oluşturuldu ve `index.html`'de kullanıldı
- ✅ Task 5: Tüm doğrulamalar geçti — dev server, build, CSS variables, tema değişimi, Google Fonts yükleme, Handlebars partial render

### File List
- `index.html` — Handlebars partial kullanımı, Google Fonts preconnect + link eklendi
- `vite.config.js` — vite-plugin-handlebars plugin yapılandırması eklendi
- `package.json` — vite-plugin-handlebars devDependency eklendi
- `package-lock.json` — otomatik güncellendi
- `src/styles/design-tokens.css` — YENİ: 3 katmanlı CSS token sistemi
- `src/styles/base.css` — YENİ: global reset + tipografi kuralları
- `src/styles/main.css` — GÜNCELLEME: import zinciri (design-tokens → base)
- `src/partials/_head-meta.hbs` — YENİ: meta tag'ları Handlebars partial'ı

---

## 📋 Change Log (Değişiklik Günlüğü)
- **2026-04-24:** Story 1.2 comprehensive context engine analysis completed — ready-for-dev.
- **2026-04-24:** Story 1.2 implementasyonu tamamlandı — tasarım token'ları, base CSS, Google Fonts, Handlebars kurulumu. Tüm AC'ler karşılandı.

---

**Completion Status:**
- [x] Ultimate context engine analysis completed - comprehensive developer guide created
- [x] Tüm task ve subtask'lar tamamlandı — review'e hazır

### Review Findings
- [x] [Review][Patch] Google Fonts Tüm Ağırlıkları Yüklüyor [index.html:12-13]
- [x] [Review][Patch] main.js Import Eksikliği [src/main.js]
- [x] [Review][Patch] Hardcoded RGBA Renkler [src/styles/design-tokens.css:45-46]
- [x] [Review][Patch] __dirname Çözümleme Hatası Potansiyeli [vite.config.js:10]
- [x] [Review][Patch] Handlebars Context Değişken Eksikliği [index.html:4]
