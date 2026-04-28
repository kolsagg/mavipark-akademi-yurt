# Story 2.2: Dikey Split-Screen Hero Yapısı ve Giriş Animasyonu

**Epic:** 2 - Split-Screen Giriş ve Dinamik Temalandırma
**Story Key:** 2-2-dikey-split-screen-hero-yapisi-ve-giris-animasyonu
**Status:** done

## 📖 Story Requirements (Hikaye Gereksinimleri)

**User Story:**
As a Ziyaretçi,
I want Ana sayfada dikey olarak bölünmüş (Kız/Erkek) iki alan görmek,
So that Tercihimi görsel bir şölen eşliğinde yapabilirim.

**Acceptance Criteria (Kabul Kriterleri):**

1. **Given** Preloader animasyonu tamamlandığında
   **When** Ana sayfa içeriği görünür hale geldiğinde
   **Then** Masaüstünde yan yana (50vw/50vw), mobilde altlı-üstlü (50vh/50vh) dikey bölünmüş iki panel (Split-Screen) görünmeli

2. **Given** Hero yapısı render edildiğinde
   **When** Giriş animasyonu tetiklendiğinde
   **Then** GSAP ile paneller zıt yönlerden (örn: soldaki soldan, sağdaki sağdan) kayarak gelmeli

3. **Given** Paneller yerleştiğinde
   **When** Kullanıcı bir panelin üzerine geldiğinde (hover)
   **Then** Seçili alan hafifçe genişlemeli veya parlamalı, diğer alan ise hafifçe sönükleşmeli

4. **Given** Görsel içerik
   **When** Paneller görüntülendiğinde
   **Then** Her panelde ilgili yurdun (Kız/Erkek) ismi, premium tipografiyle (Epilogue/Montserrat) ve yüksek kaliteli arka plan görselleriyle yer almalı

**Business Value & Context:**
Bu bölüm sitenin "WOW" faktörünü oluşturan ana unsurdur. Kullanıcıya sıradan bir yurt sitesi değil, premium bir deneyim sunulduğunu hissettirir. Kullanıcıyı anında iki farklı evrenden birini seçmeye yönlendirerek bilişsel yükü azaltır.

---

## 👨‍💻 Developer Context (Geliştirici Bağlamı)

> **CRITICAL:** Bu bölüm, mimari dokümanlardan ve BMad kurallarından çıkarılmış, geliştirici (Dev Agent) için kesinlikle uyulması gereken zorunlu kuralları içerir.

### 🛠 Technical Requirements (Teknik Gereksinimler)

- **BEM Methodology:** `.split-hero`, `.split-hero__panel`, `.split-hero__panel--girls`, `.split-hero__content` gibi sınıflar kullan.
- **GSAP Context:** Tüm animasyonlar `src/core/AnimationEngine.js` içinde veya bileşen modülünde `gsap.context()` ile sarmalanmalı.
- **Responsive Split:**
  - **Desktop:** `display: flex; flex-direction: row;` (50vw/50vw)
  - **Mobile:** `display: flex; flex-direction: column;` (50vh/50vh)
- **Performance:** 60 FPS hedefi. Sadece `transform` ve `opacity` anime edilmeli.
- **Interactivity:** Panellere tıklandığında (veya hover edildiğinde) akıcı geçişler sağlanmalı. (URL değişimi Story 2.3'te ele alınacak, bu story'de yapı ve giriş animasyonu öncelikli).

### 🏗 Architecture Compliance (Mimari Uyumluluk)

**Tech Stack:** Vite Vanilla, GSAP 3.x, Handlebars
**Pattern:**
- Hero yapısı `src/partials/_split-hero.hbs` (veya components klasöründe) tanımlanmalı.
- Stiller `src/styles/components/_split-hero.css` içinde olmalı ve `main.css`'e import edilmeli.
- Giriş animasyonu `AnimationEngine.js` içinde `introSplitHero()` gibi bir fonksiyonla yönetilmeli.

### 📚 Library & Framework Requirements

- **GSAP:** `gsap` (Kullanılmalı).
- **CSS:** Vanilla CSS (Tailwind/Bootstrap yasak).

### 📂 File Structure Requirements (Dosya Yapısı Kuralları)

```text
akademi_yurt/
├── src/
│   ├── core/
│   │   └── AnimationEngine.js          # Split Hero giriş animasyonunun eklenmesi
│   ├── styles/
│   │   ├── main.css                   # _split-hero.css import'u
│   │   └── components/
│   │       └── _split-hero.css        # YENİ: Split-Hero stilleri
│   ├── partials/
│   │   └── _split-hero.hbs            # YENİ: Hero HTML yapısı
│   └── components/
│       └── SplitHero.js                # YENİ: Etkileşim (hover/click) mantığı
```

---

## 📝 Previous Story Intelligence (Önceki Story Öğrenmeleri)

**Story 2.1'den:**
- Preloader çıkış animasyonu bittiğinde `CustomEvent` veya callback ile Hero animasyonu tetiklenebilir.
- `AnimationEngine.js` merkezi animasyon yönetimi için kuruldu.
- Marka logolu preloader dark/glass bir yapıya sahip, Hero geçişinin bu estetiği devam ettirmesi önemli.

---

## 🔀 Git Intelligence

**Son commits:**
- `feat: Story 2.1 - Marka Logolu Preloader implementasyonu`
- Proje kökünde temiz bir git geçmişi korunmalı.

---

## 🌐 Latest Tech Information (GSAP & Layout 2024/25)

- **`flex-grow` vs `width`:** Hover genişlemesi için `flex: 1` -> `flex: 1.5` gibi bir geçiş yerine `width: 50%` -> `60%` (transform: scaleX ile simüle edilmiş) daha performanslı olabilir, ancak flexbox ile basit tutulabilir.
- **`object-fit: cover`:** Arka plan görsellerinin her ekran boyutunda düzgün görünmesi için zorunludur.
- **`will-change`:** `transform` özelliği anime edilecek paneller için CSS'de tanımlanmalı.

---

## 🔗 Project Context Reference

- [Architecture: Frontend Architecture](_bmad-output/planning-artifacts/architecture.md#Frontend-Architecture)
- [UX: Split-Screen Hero](_bmad-output/planning-artifacts/ux-design-specification.md#2.1-Deneyimi-Tanımlayan-Etkileşim)
- [Design Tokens](src/styles/design-tokens.css)

---

## 🛠 Tasks/Subtasks (Görevler)

- [x] **Task 1: Split-Screen HTML Yapısı**
    - [x] `src/partials/_split-hero.hbs` oluştur (Kız ve Erkek panelleri, içerik alanları)
    - [x] `index.html` içinde ana içerik alanına ekle
- [x] **Task 2: Responsive Stiller**
    - [x] `src/styles/components/_split-hero.css` oluştur (Flexbox yapısı, Desktop/Mobile ayrımı)
    - [x] Arka plan görselleri ve tipografi yerleşimi
- [x] **Task 3: GSAP Giriş Animasyonu**
    - [x] `src/core/AnimationEngine.js` içinde panellerin zıt yönlerden kayarak gelme (intro) animasyonunu yaz
    - [x] Preloader tamamlandığında bu animasyonu tetikle
- [x] **Task 4: Hover ve Etkileşim**
    - [x] `src/components/SplitHero.js` içinde hover durumunda panel genişleme efektini ekle
    - [x] Tıklama olayları için placeholder (Story 2.3'e hazırlık)
- [x] **Task 5: Görsel ve Performans Optimizasyonu**
    - [x] Görsellerin `object-fit` ve GPU hızlandırma uyumunu kontrol et
    - [x] 60 FPS akıcılığını doğrula

## 📝 Dev Agent Record (Geliştirici Kaydı)

### Implementation Plan
- Handlebars partial for semantic HTML tags and logical classes (`.split-hero`).
- BEM methodology strictly followed for CSS.
- GSAP's timeline used for smooth sequential entry, triggering after preloader completion in `main.js`.
- Javascript module `SplitHero.js` created for managing future interactions.

### Debug Log
- Restored `animationEngine` import in `main.js` that was accidentally removed when `initSplitHero` was added.
- Setup specific initial states for Mobile and Desktop in GSAP.
- Added Unsplash placeholder images to visually test the `split-hero` component layout.

### Completion Notes
- All acceptance criteria are met: the hero sections split vertically on mobile and horizontally on desktop.
- `will-change` correctly applied to moving items to allow for GPU acceleration.
- Preloader transitions smoothly into the split hero intro animation.

---

**Status:** done

## 📂 File List
- `index.html` (modified)
- `src/main.js` (modified)
- `src/styles/main.css` (modified)
- `src/partials/_split-hero.hbs` (new)
- `src/styles/components/_split-hero.css` (new)
- `src/core/AnimationEngine.js` (modified)
- `src/components/SplitHero.js` (new)

## 🔄 Change Log
- Split-Screen layout built using flexbox.
- Animation engine extended to support Intro Hero sequence.
- Component interactivity scaffolded with SplitHero.js

**Completion Status:**
- [x] Ultimate context engine analysis completed - comprehensive developer guide created
- [x] ready-for-dev status set
- [x] in-progress status set
- [x] review status set
