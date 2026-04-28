# Story 2.3: ThemeManager.js ve URL-First Tema Mantığı

**Epic:** 2 - Split-Screen Giriş ve Dinamik Temalandırma
**Story Key:** 2-3-thememanager-js-ve-url-first-tema-mantigi
**Status:** done

## 📖 Story Requirements (Hikaye Gereksinimleri)

**User Story:**
As a Geliştirici,
I want Temayı URL parametrelerine göre yöneten merkezi bir script yazmak,
So that Kullanıcı tercihi sayfalar arasında tutarlı bir şekilde korunur.

**Acceptance Criteria (Kabul Kriterleri):**

1. **Given** Kullanıcı ana sayfada bir panele tıkladığında
   **When** `history.pushState()` ile URL güncellendiğinde (örn: `?type=girls` veya `/kiz`)
   **Then** `ThemeManager.js` bu değişikliği yakalayıp `body` etiketine `data-theme="girls"` (veya `boys`) eklemeli

2. **Given** Sayfa yenilendiğinde veya doğrudan bir URL ile girildiğinde
   **When** URL parametresinde tema bilgisi varsa
   **Then** `ThemeManager` açılışta bu temayı otomatik olarak uygulamalı

3. **Given** Tema değiştiğinde
   **When** `body[data-theme]` güncellendiğinde
   **Then** CSS değişkenleri (`design-tokens.css`) anında güncellenmeli (Lila veya Çelik Mavisi)

4. **Given** Mimari yapı
   **When** Tema değişikliği gerçekleştiğinde
   **Then** Diğer bileşenlerin bu değişikliği dinleyebilmesi için bir `CustomEvent` (`themeChanged`) tetiklenmeli

**Business Value & Context:**
URL-First yaklaşımı, kullanıcının yaptığı seçimin kalıcı olmasını sağlar. Sayfalar arası geçişlerde veya link paylaşımlarında doğru temanın (Kız/Erkek) görünmesi, premium "App-like" deneyiminin temelidir.

---

## 👨‍💻 Developer Context (Geliştirici Bağlamı)

> **CRITICAL:** Bu bölüm, mimari dokümanlardan çıkarılmış, geliştirici için kesinlikle uyulması gereken zorunlu kuralları içerir.

### 🛠 Technical Requirements (Teknik Gereksinimler)

- **Module Location:** `src/core/ThemeManager.js`
- **Singleton Pattern:** `ThemeManager` sınıfı veya modülü tek bir instance üzerinden çalışmalı.
- **URL Strategy:**
  - URL parametresi (`?type=girls`) veya path (`/kiz`) desteği. (Tercihen parametre: `?type=`).
  - `.htaccess` kuralları tüm path'leri `index.html`'e yönlendirdiği için path bazlı (`/kiz`, `/erkek`) okuma da yapılabilir.
- **DOM Update:** Sadece `document.body.dataset.theme = theme;` şeklinde güncellenmeli.
- **History API:** Sayfa yenilenmeden URL değişimi için `history.pushState` kullanılmalı.
- **Initial Load:** `DOMContentLoaded` anında URL kontrol edilip tema set edilmeli.

### 🏗 Architecture Compliance (Mimari Uyumluluk)

- **CSS Integration:** `design-tokens.css` içinde tanımlı `body[data-theme="girls"]` ve `body[data-theme="boys"]` seçicileriyle tam uyumlu olmalı.
- **Event Bus:** Tema değiştiğinde `window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }))` fırlatılmalı.
- **Clean Code:** URL temizleme ve varsayılan tema (fallback) mantığı içermeli.

### 📚 Library & Framework Requirements

- **Vanilla JS:** Herhangi bir kütüphane (JQuery vb.) kullanma.
- **GSAP:** Tema değişimi anında yapılacak görsel geçişler (varsa) GSAP ile koordine edilebilir (Story 2.4 kapsamına girebilir ama altyapı hazır olmalı).

### 📂 File Structure Requirements (Dosya Yapısı Kuralları)

```text
akademi_yurt/
├── src/
│   ├── core/
│   │   └── ThemeManager.js             # YENİ: Merkezi tema yönetim mantığı
│   ├── main.js                        # ThemeManager'ın initialize edilmesi
│   └── components/
│       └── SplitHero.js                # Güncelleme: Tıklama anında ThemeManager çağrısı
```

---

## 📝 Previous Story Intelligence (Önceki Story Öğrenmeleri)

**Story 2.2'den:**
- `SplitHero.js` hover etkileşimlerini yönetiyor.
- `src/core/` klasörü merkezi mantık için kullanılıyor.
- `design-tokens.css` tema override'ları için hazır.

---

## 🔀 Git Intelligence

**Son commits:**
- `feat: Story 2.2 - Dikey Split-Screen Hero Yapısı ve Giriş Animasyonu`

---

## 🌐 Latest Tech Information (URL & History API 2024/25)

- **`URLSearchParams`:** URL parametrelerini okumak için en modern ve temiz yöntemdir.
- **`popstate` Event:** Kullanıcı tarayıcı geri/ileri butonuna bastığında temanın senkronize kalması için bu event dinlenmelidir.
- **`data-theme` Performance:** CSS attribute selector (`[data-theme]`) kullanımı, class değişimine göre performans açısından oldukça verimlidir.

---

## 🔗 Project Context Reference

- [Architecture: Theme Management](_bmad-output/planning-artifacts/architecture.md#Theme-Management)
- [UX: URL-First Tema Yönetimi](_bmad-output/planning-artifacts/ux-design-specification.md#Deneyimi-Tanımlama)
- [Design Tokens](src/styles/design-tokens.css#L67-L78)

---

## 🛠 Tasks/Subtasks (Görevler)

- [x] **Task 1: ThemeManager.js Oluşturulması**
    - [x] `src/core/ThemeManager.js` modülünü yaz.
    - [x] URL'den tema okuma (`getThemeFromURL`) fonksiyonu.
    - [x] Temayı body'ye uygulama (`applyTheme`) fonksiyonu.
    - [x] URL'yi güncelleme (`updateURL`) fonksiyonu.
- [x] **Task 2: Global Initialization**
    - [x] `src/main.js` içinde `ThemeManager.init()` çağrısı yap.
    - [x] `popstate` event dinleyicisini ekle.
- [x] **Task 3: SplitHero Entegrasyonu**
    - [x] `src/components/SplitHero.js` içinde panellere tıklandığında `ThemeManager.setTheme()` fonksiyonunu tetikle.
    - [x] `history.pushState` ile URL geçişini sağla.
- [x] **Task 4: Custom Event Tetikleme**
    - [x] `themeChanged` event'ini fırlat ve konsolda test et.
- [x] **Task 5: CSS Sync Kontrolü**
    - [x] Tema değiştiğinde `design-tokens.css`'deki renklerin (Lila/Mavi) doğru şekilde swap edildiğini doğrula.

## 📝 Dev Agent Record (Geliştirici Kaydı)

### Debug Log
- Test için `tests/ThemeManager.test.js` dosyası Node.js test runner ile mock DOM kullanılarak çalıştırıldı.
- `src/main.js` içinde `ThemeManager.init()` çağrıldı ve eski `localStorage` mantığı SplitHero'dan temizlendi.

### Implementation Plan
- **ThemeManager.js:** Sınıf bazlı singleton pattern ile statik metodlar kullanıldı. `URLSearchParams` ve fallback olarak `location.pathname` okuması yapıldı.
- **Tarihçe ve Event:** `history.pushState` ile sayfa yenilenmeden URL güncellendi, bileşenlerin dinleyebilmesi için `CustomEvent('themeChanged')` eklendi.
- **SplitHero:** Eski `localStorage` mantığı `ThemeManager.setTheme(theme)` çağrısı ile değiştirildi.
- **Test:** Red-Green-Refactor döngüsü Node.js mock testleri ile doğrulandı.

### Completion Notes
- ✅ Task 1: `ThemeManager.js` oluşturuldu, url okuma, tema uygulama, pushState mantığı eklendi.
- ✅ Task 2: `main.js` içerisinde bootstrap işlemi gerçekleştirildi, popstate event listener aktif edildi.
- ✅ Task 3: `SplitHero.js` güncellenerek lokal depolama mantığı `ThemeManager`'a devredildi.
- ✅ Task 4: `CustomEvent` tetiklemesi gerçekleştirildi.
- ✅ Task 5: CSS senkronizasyonu testleri yapıldı, `[data-theme]` üzerinden hatasız çalıştığı teyit edildi.

---

## 📁 File List (Dosya Listesi)

### Modified
- `src/main.js`
- `src/components/SplitHero.js`

### Added
- `src/core/ThemeManager.js`
- `tests/ThemeManager.test.js`

---

## 📋 Change Log (Değişiklik Günlüğü)
- **2026-04-24:** ThemeManager modülü URL-first stratejisine uygun olarak kodlandı ve projeye entegre edildi.

---

**Status:** done
