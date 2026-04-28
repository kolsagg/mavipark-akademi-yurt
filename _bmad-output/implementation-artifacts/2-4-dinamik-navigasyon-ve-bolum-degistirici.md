# Story 2.4: Dinamik Navigasyon ve Bölüm Değiştirici

**Epic:** 2 - Split-Screen Giriş ve Dinamik Temalandırma
**Story Key:** 2-4-dinamik-navigasyon-ve-bolum-degistirici
**Status:** review

## 📖 Story Requirements (Hikaye Gereksinimleri)

**User Story:**
As a Kullanıcı,
I want Sayfalar arasında gezerken istediğim an Kız/Erkek bölümleri arasında geçiş yapabilmek,
So that Her iki yurdu da kolayca inceleyebilirim.

**Acceptance Criteria (Kabul Kriterleri):**

1. **Given** Kullanıcı sitenin herhangi bir yerindeyken (Split Hero hariç veya üzerinde)
   **When** Navigasyondaki "Kız / Erkek" anahtarına (switcher) tıkladığında
   **Then** Sayfa yenilenmeden tema (`data-theme`) ve içerik bağlamı güncellenmeli.

2. **Given** Navigasyon çubuğu (Header)
   **When** Sayfa kaydırıldığında veya tema değiştiğinde
   **Then** Cam efekti (Glassmorphism) ve seçili temaya uygun vurgu rengi korunmalı.

3. **Given** Mobil görünüm
   **When** Menü açıldığında veya switcher kullanıldığında
   **Then** Dokunma hedefleri minimum 44x44px olmalı ve pürüzsüz animasyonlar sunmalı.

4. **Given** Tema değişimi
   **When** Switcher üzerinden manuel seçim yapıldığında
   **Then** `ThemeManager.setTheme()` çağrılmalı ve URL güncellenmeli.

**Business Value & Context:**
Kullanıcının site içinde kaybolmadan bölümler arası geçiş yapabilmesi, keşif sürecini hızlandırır. "Kız" ve "Erkek" bölümleri arasındaki kesintisiz geçiş, premium bir SPA (Single Page Application) deneyimi sunarak markanın teknolojik gücünü yansıtır.

---

## 👨‍💻 Developer Context (Geliştirici Bağlamı)

> **CRITICAL:** Bu hikaye, `ThemeManager.js` tarafından fırlatılan `themeChanged` event'ini dinlemeli ve arayüzdeki "aktif" durumu bu event'e göre senkronize etmelidir.

### 🛠 Technical Requirements (Teknik Gereksinimler)

- **Partial Location:** `src/partials/_header.hbs`
- **Component Location:** `src/components/Navigation.js`
- **Style Location:** `src/styles/components/navigation.css`
- **Switcher UI:** Bir "Segmented Control" veya "Toggle Switch" yapısı kullanılmalı. (Örn: [ Kız | Erkek ] şeklinde bir kapsayıcı içinde hareket eden bir vurgu katmanı).
- **Glassmorphism:** `.header` sınıfı `backdrop-filter: blur(10px)` ve `background: var(--white-glass)` kullanmalı.
- **GSAP:** Switcher üzerindeki aktif durum geçişi (hareket eden background) GSAP ile canlandırılmalı.
- **Event Handling:**
  - `ThemeManager.setTheme(newTheme)` çağrısı yapılmalı.
  - `window.addEventListener('themeChanged', ...)` ile dışarıdan gelen (örn. SplitHero'dan) tema değişimleri yakalanmalı.

### 🏗 Architecture Compliance (Mimari Uyumluluk)

- **BEM Metodolojisi:** `.nav`, `.nav__switcher`, `.nav__item--active` gibi isimlendirmeler zorunludur.
- **GSAP Context:** Tüm animasyonlar `gsap.context()` içinde tanımlanmalı ve `cleanup()` metoduna sahip olmalı.
- **Design Tokens:** Renkler için `--accent-girls` ve `--accent-boys` değişkenleri kullanılmalı.

### 📂 File Structure Requirements (Dosya Yapısı Kuralları)

```text
src/
├── components/
│   └── Navigation.js           # Switcher mantığı ve GSAP animasyonları
├── partials/
│   └── _header.hbs              # Logo ve Navigasyon iskeleti
└── styles/
    └── components/
        └── navigation.css       # Header ve Switcher stilleri
```

---

## 📝 Previous Story Intelligence (Önceki Story Öğrenmeleri)

**Story 2.3'ten:**
- `ThemeManager.js` singleton olarak çalışıyor ve `popstate` / `pushState` işlemlerini yönetiyor.
- `themeChanged` event'i `{ detail: { theme } }` verisini taşıyor.
- `index.css` içinde `body[data-theme="girls"]` selector'ları `--accent` rengini güncelliyor.

---

## 🔀 Git Intelligence

**Son commits:**
- `feat: Story 2.3 - ThemeManager logic and URL-first state management`
- `feat: Story 2.2 - Vertical Split-Screen Hero implementation`

---

## 🌐 Latest Tech Information (Segmented Control UX 2025)

- **Sliding Highlight:** Aktif seçeneğin altında/üstünde kayan bir arka plan (pill indicator), en yüksek premium hissiyatı veren yöntemdir.
- **Aria-Pressed:** Switcher butonları için erişilebilirlik açısından `aria-pressed` veya `aria-checked` (radio mantığı ise) kullanılmalıdır.

---

## 🔗 Project Context Reference

- [Architecture: Frontend Architecture](_bmad-output/planning-artifacts/architecture.md#Frontend-Architecture)
- [UX: Deneyimi Tanımlama](_bmad-output/planning-artifacts/ux-design-specification.md#Deneyimi-Tanımlama)
- [Design Tokens](_bmad-output/planning-artifacts/architecture.md#CSS-Architecture)

---

## 🛠 Tasks/Subtasks (Görevler)

- [x] **Task 1: Header Partial Oluşturulması**
    - [x] `src/partials/_header.hbs` dosyasını oluştur.
    - [x] Logo alanı ve `.nav__switcher` kapsayıcısını ekle.
- [x] **Task 2: Navigation CSS Yazımı**
    - [x] `.header` için sticky ve glassmorphism stillerini tanımla.
    - [x] Switcher için segmented control görünümünü ve lila/mavi hover efektlerini ekle.
- [x] **Task 3: Navigation.js Modülü**
    - [x] `src/components/Navigation.js` içinde switcher etkileşimlerini yönet.

### 🔍 Review Findings (İnceleme Bulguları)

- [x] [Review][Patch] **Resize Sync:** Ekran boyutu değiştiğinde pill pozisyonu artık güncelleniyor. [src/components/Navigation.js]
- [x] [Review][Patch] **Touch Targets:** Mobil buton yükseklikleri AC 3 uyumu için 44px'e çıkarıldı. [src/styles/components/_navigation.css]
- [x] [Review][Patch] **Mobile UX:** Switcher görünürlüğü ve mobil menü animasyonları iyileştirildi. [src/styles/components/_navigation.css]
- [x] [Review][Patch] **Initialization:** Çift init koruması (idempotency) ve temizleme (cleanup) desteği eklendi. [src/components/Navigation.js]
    - [x] `themeChanged` event'ini dinle ve pill animasyonunu tetikle.
- [x] **Task 4: Entegrasyon**
    - [x] `index.html` içine `{{> _header }}` ekle.
    - [x] `src/main.js` içinde `Navigation.init()` çağrısını yap.
- [x] **Task 5: Responsive Cilalama**
    - [x] Mobilde switcher'ın merkeze alınması veya logo ile uyumunu optimize et.

---

## 🛠 Dev Agent Record (AI)

### 📋 Implementation Plan
- [x] Header partial (`_header.hbs`) created with BEM structure.
- [x] Sticky Glassmorphism styles implemented in `_navigation.css`.
- [x] JS module created with GSAP pill animation and event sync.
- [x] Integration via Handlebars partial and `main.js` bootstrap.

### 📝 Completion Notes
- Premium "segmented control" switcher implemented with elastic GSAP transitions.
- Fully synchronized with `ThemeManager` via `themeChanged` custom event.
- Mobile menu toggle skeleton added with responsive switcher layout.
- Unit tests added in `tests/Navigation.test.js`.

## 📂 File List
- [M] `index.html`
- [M] `src/main.js`
- [M] `src/styles/main.css`
- [A] `src/partials/_header.hbs`
- [A] `src/styles/components/_navigation.css`
- [A] `src/components/Navigation.js`
- [A] `tests/Navigation.test.js`

## 📜 Change Log
- 2026-04-24: Initial implementation of dynamic navigation and theme switcher.

**Status:** review
