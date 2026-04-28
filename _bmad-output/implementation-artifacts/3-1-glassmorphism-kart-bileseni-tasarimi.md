# Story 3.1: Glassmorphism Kart Bileşeni Tasarimi

**Epic:** 3 - Odalar ve İmkanlar (Keşif Deneyimi)
**Story Key:** 3-1-glassmorphism-kart-bileseni-tasarimi
**Status:** done

## 📖 Story Requirements (Hikaye Gereksinimleri)

**User Story:**
As a Geliştirici,
I want yeniden kullanılabilir bir cam efektli kart bileşeni oluşturmak,
So that tüm içerikler premium estetiğe uygun şekilde sergilenir.

**Acceptance Criteria (Kabul Kriterleri):**

1. **Given** İçerik listesi (odalar, imkanlar vb.) hazır olduğunda
   **When** `backdrop-filter: blur()` ve transparan arka planlı kartlar oluşturulduğunda
   **Then** Kartlar okunabilirliği yüksek ve modern bir yapıda olmalı (WCAG AA 4.5:1 kontrast).

2. **Given** Kullanıcı kart üzerine geldiğinde (Hover)
   **When** Fare imleci kartın üzerindeyken
   **Then** Hafif transform (scale/translate) ve shadow animasyonları GSAP ile tetiklenmeli.

3. **Given** Tema değişimi (Kız/Erkek)
   **When** `data-theme` değiştiğinde
   **Then** Kartın kenarlık (border) veya vurgu (accent) renkleri otomatik olarak güncellenmeli.

4. **Given** Mobil görünüm
   **When** Kartlar küçük ekranlarda listelendiğinde
   **Then** Yerleşim (layout) bozulmamalı ve okunabilirlik korunmalı.

**Business Value & Context:**
Akademi Suit'in "Premium Butik Otel" imajını pekiştiren en önemli görsel öğelerden biri Glassmorphism kartlarıdır. Bu bileşen, sadece bir kutu değil, derinlik hissi veren ve içeriği ön plana çıkaran interaktif bir tasarım öğesidir.

---

## 👨‍💻 Developer Context (Geliştirici Bağlamı)

> **CRITICAL:** Kart bileşeni modüler olmalıdır. Başlık, açıklama ve opsiyonel görsel alanlarını içermeli, ancak tasarımı bozmadan farklı içerik türlerine uyum sağlamalıdır.

### 🛠 Technical Requirements (Teknik Gereksinimler)

- **Style Location:** `src/styles/components/_glass-card.css`
- **Partial Location:** `src/partials/_glass-card.hbs`
- **Logic Location:** `src/components/GlassCard.js` (GSAP hover efektleri için)
- **CSS Architecture:** 
  - `backdrop-filter: blur(var(--blur-glass))` (design-tokens.css'den alınmalı).
  - `background: var(--theme-surface)` kullanılmalı.
  - Kenarlıklar için `1px solid rgba(255, 255, 255, 0.2)` gibi çok ince bir hat kullanılmalı.
- **GSAP:** Hover animasyonları `gsap.context()` içinde kapsüllenmeli. `mouseenter` ve `mouseleave` event'leri ile yönetilmeli.

### 🏗 Architecture Compliance (Mimari Uyumluluk)

- **BEM Metodolojisi:** `.glass-card`, `.glass-card__image`, `.glass-card__body`, `.glass-card__title`, `.glass-card__content` kullanılmalı.
- **Design Tokens:** Boşluklar için `--space-*`, renkler için `--theme-*` token'ları kullanılmalı.
- **Performance:** `will-change: transform` özelliği hover animasyonu olan kartlara eklenmeli.

### 📂 File Structure Requirements (Dosya Yapısı Kuralları)

```text
src/
├── components/
│   └── GlassCard.js            # Hover interaksiyonları ve GSAP
├── partials/
│   └── _glass-card.hbs         # Reusable HBS şablonu
└── styles/
    └── components/
        └── _glass-card.css      # BEM tabanlı glassmorphism stilleri
```

---

## 📝 Previous Story Intelligence (Önceki Story Öğrenmeleri)

**Story 2.4'ten:**
- Header ve Navigasyon için kullanılan glassmorphism değerleri (`blur(20px)`) kartlar için de referans alınabilir.
- `ThemeManager` üzerinden gelen renk değişimleri kart kenarlıklarında (vurgu rengi olarak) kullanılabilir.

---

## 🔀 Git Intelligence

**Son çalışma pattern'i:**
- Bileşen mantığı `src/components/` altında, partial `src/partials/` altında, stiller ise `src/styles/components/` altında toplanıyor.
- `main.js` içinde component'lerin `init()` metodları çağrılıyor.

---

## 🌐 Latest Tech Information (Modern Glassmorphism 2025)

- **Dynamic Contrast:** Arka plandaki görsel çok açıksa, kartın okunabilirliğini artırmak için `background: rgba(var(--color-white-rgb), 0.8)` gibi daha opak değerler veya metin altına hafif bir gölge (text-shadow) eklenebilir.
- **Smoothness:** GSAP `power2.out` ease kullanımı, lüks hissiyatı için en uygun geçiş eğrisidir.

---

## 🔗 Project Context Reference

- [Architecture: CSS Architecture](_bmad-output/planning-artifacts/architecture.md#CSS-Architecture)
- [UX: Glassmorphism](_bmad-output/planning-artifacts/ux-design-specification.md#Glassmorphism)
- [Design Tokens: Surface & Blur](src/styles/design-tokens.css#L46-168)

---

## 🛠 Tasks/Subtasks (Görevler)

- [ ] **Task 1: Glass Card Partial Oluşturulması**
    - [ ] `src/partials/_glass-card.hbs` oluştur.
    - [ ] `title`, `description`, `image`, `footer` gibi parametreleri kabul eden esnek bir yapı kur.
- [ ] **Task 2: Glass Card CSS Yazımı**
    - [ ] `.glass-card` ana sınıfını tanımla (blur, transparent bg, border).
    - [ ] BEM alt öğelerini (`__title`, `__body` vb.) stilize et.
    - [ ] Erişilebilirlik için kontrast kontrollerini yap.
- [ ] **Task 3: GlassCard.js Modülü**
    - [ ] GSAP ile hover animasyonlarını (`scale: 1.02`, `y: -5`) ekle.
    - [ ] `init()` ve `cleanup()` metodlarını implement et.
- [ ] **Task 4: Entegrasyon ve Test**
    - [ ] `src/main.js` içinde `GlassCard.init()` çağrısı yap (tüm `.glass-card` öğelerini otomatik bulup bağlayacak şekilde).
    - [ ] `index.html` içinde geçici bir test kartı oluşturarak görünümü doğrula.

---

## 🛠 Dev Agent Record (AI)

### 📋 Implementation Plan
- [ ] Create `_glass-card.hbs` with flexible props.
- [ ] Implement `_glass-card.css` with premium blur effects.
- [ ] Create `GlassCard.js` for high-performance GSAP interactions.
- [ ] Bootstrap component in `main.js`.

### 📝 Completion Notes
- (To be filled by developer)

## 📂 File List
- [A] `src/partials/_glass-card.hbs`
- [A] `src/styles/components/_glass-card.css`
- [A] `src/components/GlassCard.js`
- [M] `src/main.js`
- [M] `src/styles/main.css` (import component css)

## 📜 Change Log
- 2026-04-25: Initial story creation for Glassmorphism Card component.

### Review Findings (2026-04-25)

#### Decision Needed
- [x] [Review][Decision] Kontrast Oranı Riski — 0.7 opaklık, çok açık renkli arka planlarda 4.5:1 kontrastı tehlikeye atabilir. (Çözüldü: Opaklık 0.85'e çıkarıldı ve fallback eklendi)

#### Patches
- [x] [Review][Patch] Hardcoded CSS Değerleri [_glass-card.css]
- [x] [Review][Patch] Mükerrer Init Kontrolü Eksikliği [GlassCard.js:13]
- [x] [Review][Patch] GSAP "Magic Numbers" Kullanımı [GlassCard.js]
- [x] [Review][Patch] Z-Index Yönetimi [_glass-card.css]
- [x] [Review][Patch] Yetersiz Alt Text Mantığı [_glass-card.hbs]
- [x] [Review][Patch] Glassmorphism Fallback Eksikliği [_glass-card.css:9]
- [x] [Review][Patch] SPA/Cleanup Yönetimi [GlassCard.js:58]
- [x] [Review][Patch] Boş Badge Render Riski [_glass-card.hbs:12]

#### Deferred
- [x] [Review][Defer] Main JS Senkron Import Yükü [main.js] — deferred, pre-existing
