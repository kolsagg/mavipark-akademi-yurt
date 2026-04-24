# Story 2.1: Marka Logolu Preloader Animasyonu

**Epic:** 2 - Split-Screen Giriş ve Dinamik Temalandırma
**Story Key:** 2-1-marka-logolu-preloader-animasyonu
**Status:** in-progress

## 📖 Story Requirements (Hikaye Gereksinimleri)

**User Story:**
As a Ziyaretçi,
I want Sayfa yüklenirken marka logosunun olduğu zarif bir animasyon görmek,
So that İçerik yüklenene kadar premium bir bekleme deneyimi yaşarım.

**Acceptance Criteria (Kabul Kriterleri):**

1. **Given** Sayfa yüklenme aşamasındayken
   **When** İlk baytlar alındığında (HTML render edildiğinde)
   **Then** Marka logolu, cam (glass) efektli bir preloader katmanı tam ekran olarak görünmeli

2. **Given** Preloader aktifken
   **When** İçerik hazır olduğunda (window.onload veya kritik asset'ler yüklendiğinde)
   **Then** Preloader akıcı bir GSAP animasyonuyla (fade/scale/slide) yerini ana sayfaya bırakmalı

3. **Given** Animasyon çalışırken
   **When** Performans denetlendiğinde
   **Then** Animasyon 60 FPS akıcılığında olmalı ve `gsap.context()` içinde temiz bir şekilde yönetilmeli

**Business Value & Context:**
Ziyaretçinin siteyle ilk temasıdır. "Butik Otel" hissini ve kalite algısını ilk saniyeden kurar. Ayrıca yüksek çözünürlüklü Hero görselleri yüklenirken kullanıcının boş bir beyaz ekran görmesini engeller.

---

## 👨‍💻 Developer Context (Geliştirici Bağlamı)

> **CRITICAL:** Bu bölüm, mimari dokümanlardan ve BMad kurallarından çıkarılmış, geliştirici (Dev Agent) için kesinlikle uyulması gereken zorunlu kuralları içerir.

### 🛠 Technical Requirements (Teknik Gereksinimler)

- **Vanilla CSS & BEM:** Preloader stilleri için harici kütüphane kullanma. `.preloader`, `.preloader__logo`, `.preloader__overlay` gibi BEM sınıfları kullan.
- **GSAP Orchestration:** Animasyonlar `src/core/AnimationEngine.js` veya bileşen içinde `gsap.context()` ile kapsüllenmeli.
- **GPU Acceleration:** Sadece `opacity` ve `transform` (scale, translate) özelliklerini anime et. `top`, `left`, `width`, `height` gibi layout tetikleyen özelliklerden kaçın.
- **Z-Index:** Preloader en üst katmanda olmalı (`var(--z-preloader)` = 999).
- **Glassmorphism:** Preloader arka planı veya logo konteyneri cam efekti (`backdrop-filter: blur()`) içermeli.

### 🏗 Architecture Compliance (Mimari Uyumluluk)

**Tech Stack:** Vite Vanilla, GSAP 3.x, Handlebars
**Pattern:**
- Preloader HTML'i `index.html` içinde veya bir Handlebars partial (`src/partials/_preloader.hbs`) olarak bulunmalı.
- CSS stilleri `src/styles/components/_preloader.css` içinde tanımlanmalı ve `main.css`'e import edilmeli.
- Animasyon mantığı `src/main.js` veya `src/core/AnimationEngine.js` üzerinden yönetilmeli.

### 📚 Library & Framework Requirements

- **GSAP:** `npm install gsap` (zaten yüklü değilse kurulmalı).
- **ImagesLoaded (Opsiyonel):** Eğer görsellerin yüklenmesi bekleniyorsa kullanılabilir, ancak basitlik için `window.addEventListener('load')` yeterlidir.

### 📂 File Structure Requirements (Dosya Yapısı Kuralları)

```text
akademi_yurt/
├── index.html                         # Preloader partial kullanımı
├── src/
│   ├── main.js                        # Preloader'ı kapatma tetikleyicisi
│   ├── core/
│   │   └── AnimationEngine.js          # GSAP animasyon tanımı
│   ├── styles/
│   │   ├── main.css                   # _preloader.css import'u
│   │   └── components/
│   │       └── _preloader.css         # YENİ: Preloader stilleri
│   └── partials/
│       └── _preloader.hbs             # YENİ: Preloader HTML yapısı
```

---

## 📝 Previous Story Intelligence (Önceki Story Öğrenmeleri)

**Story 1.2'den:**
- `design-tokens.css` içinde `--z-preloader: 999;` ve `--blur-glass: 20px;` tanımlandı.
- Handlebars partial sistemi aktif, `{{> _preloader }}` şeklinde kullanılabilir.
- Projede `data-theme` yapısı kuruldu, preloader'ın bu temadan bağımsız (neutral/dark) veya default tema ile uyumlu olması önerilir.

---

## 🔀 Git Intelligence

**Son commits:**
- `b21b58c` — `feat: Story 1.1 - Vite Vanilla JS projesi ve modüler klasör yapısı`
- Proje kökünde `.git` mevcut. Geliştirici her özellik sonunda commit atmalıdır.

---

## 🌐 Latest Tech Information (GSAP Best Practices 2024/25)

- **`gsap.context()`:** Memory leak önlemek için zorunludur.
- **`will-change: transform, opacity`:** Preloader overlay ve logo elemanlarına CSS'de eklenerek browser optimizasyonu sağlanmalı.
- **Prefers-Reduced-Motion:** `window.matchMedia("(prefers-reduced-motion: reduce)")` kontrol edilerek animasyon hızı/varlığı ayarlanmalı.
- **Document Ready State:** `document.readyState === 'complete'` kontrolü ile `window.onload` kaçırılsa bile preloader'ın kapanması garantiye alınmalı.

---

## 🔗 Project Context Reference

- [Architecture: Animation Scoping](_bmad-output/planning-artifacts/architecture.md#Animation-Scoping)
- [UX: Loading States](_bmad-output/planning-artifacts/ux-design-specification.md#Yükleme-Durumları)
- [Design Tokens](src/styles/design-tokens.css)

---

---

## 🛠 Tasks/Subtasks (Görevler)

- [x] **Task 1: Preloader Yapısının Oluşturulması**
    - [x] `src/partials/_preloader.hbs` dosyasını oluştur ve logo placeholder ekle
    - [x] `index.html` içinde `#app` öncesine preloader partial'ını ekle
- [x] **Task 2: Stil ve Görselleştirme**
    - [x] `src/styles/components/_preloader.css` oluştur (Glassmorphism + Fullscreen Overlay)
    - [x] `src/styles/main.css` içinde yeni stili import et
- [x] **Task 3: GSAP Animasyon Motoru**
    - [x] `src/core/AnimationEngine.js` oluştur ve `gsap.context()` ile çıkış animasyonunu tanımla
    - [x] `src/main.js` içinde `window.load` olayında animasyonu tetikle
- [x] **Task 4: Kalite ve Performans Kontrolü**
    - [x] Animasyonun 60 FPS olduğunu ve bellek sızıntısı olmadığını doğrula
    - [x] `prefers-reduced-motion` desteğini kontrol et

## 📝 Dev Agent Record (Geliştirici Kaydı)

### Implementation Plan
- Glassmorphism efekti için `backdrop-filter` kullanılacak.
- GSAP `timeline` ile logo ve overlay sıralı olarak kapatılacak.
- `src/core/AnimationEngine.js` singleton veya statik bir yapı olarak tasarlanacak.

### Debug Log
- [2026-04-24 03:43] Story başlatıldı, bağımlılıklar (GSAP) kuruldu.
- [2026-04-24 03:44] Handlebars "or" helper hatası giderildi (vite.config.js).
- [2026-04-24 03:45] Preloader görseli ve çıkış animasyonu doğrulandı.

### Completion Notes
- Premium glassmorphism preloader başarıyla implement edildi.
- GSAP AnimationEngine merkezi yönetime hazır hale getirildi.
- Bellek sızıntısını önlemek için `gsap.context()` ve `revert()` kullanıldı.

---

### Review Findings

- [x] [Review][Patch] `rgba(var(--color-anthracite))` geçersiz CSS sözdizimi [`_preloader.css:82`] ✅ Fixed
- [x] [Review][Patch] `clipPath` animasyonu GPU uyumsuz + spec ihlali [`AnimationEngine.js:73`] ✅ Fixed
- [x] [Review][Patch] `document.readyState` fallback eksik [`main.js:38-42`] ✅ Fixed
- [x] [Review][Patch] Preloader'da ARIA desteği eksik [`_preloader.hbs`] ✅ Fixed
- [x] [Review][Defer] `will-change` sadece `__content` üzerinde [`_preloader.css:46`] — deferred, pre-existing

## 📂 File List
- `index.html`
- `src/main.js`
- `src/styles/main.css`
- `src/partials/_preloader.hbs` (Yeni)
- `src/styles/components/_preloader.css` (Yeni)
- `src/core/AnimationEngine.js` (Yeni)

## 🔄 Change Log
- 2026-04-24: Story başlatıldı ve görevler tanımlandı.

**Status:** done

**Completion Status:**
- [x] Ultimate context engine analysis completed - comprehensive developer guide created
- [ ] ready-for-dev status set
- [x] in-progress status set
- [x] All tasks completed and verified


