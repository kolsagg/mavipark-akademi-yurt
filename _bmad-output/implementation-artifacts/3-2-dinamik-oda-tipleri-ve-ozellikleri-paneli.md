# Story 3.2: Dinamik Oda Tipleri ve Özellikleri Paneli

**Epic:** 3 - Odalar ve İmkanlar (Keşif Deneyimi)
**Story Key:** 3-2-dinamik-oda-tipleri-ve-ozellikleri-paneli
**Status:** done

## 📖 Story Requirements (Hikaye Gereksinimleri)

**User Story:**
As a Ziyaretçi,
I want seçtiğim yurdun oda tiplerini ve özelliklerini (yatak sayısı, banyo, çalışma masası vb.) premium bir panelde görmek,
So that ihtiyacıma ve bütçeme uygun odayı kolayca seçebilirim.

**Acceptance Criteria (Kabul Kriterleri):**

1. **Given** Kullanıcı oda tipleri bölümüne (Room Panel) ulaştığında
   **When** Sayfa aşağı kaydırıldığında (ScrollTrigger)
   **Then** Mevcut oda tipleri (1 kişilik, 2 kişilik vb.) Glassmorphism kartlar içinde akıcı bir şekilde belirmeli.

2. **Given** Aktif tema (Kız/Erkek) değiştiğinde
   **When** `ThemeManager` URL üzerinden temayı güncellediğinde
   **Then** Oda paneli içeriği (görseller, oda özellikleri, fiyatlar/etiketler) anlık olarak ilgili yurda göre güncellenmeli.

3. **Given** Oda kartları listelendiğinde
   **When** Her kartın üzerinde "Özellikler" (ikonlu liste) ve "Görsel" alanı bulunduğunda
   **Then** Tasarım sistemi (tokens) renkleri ve tipografisi (Epilogue/Inter) kusursuz uygulanmalı.

4. **Given** Mobil görünüm
   **When** Ekran genişliği daraldığında
   **Then** Oda kartları alt alta dizilmeli ve okunabilirlik korunmalı.

**Business Value & Context:**
Kullanıcıların en kritik karar verme noktalarından biri odaları görmektir. Bu panel, sadece bilgi vermekle kalmamalı, aynı zamanda yurdun premium kalitesini her oda tipi için ayrı ayrı hissettirmelidir.

---

## 👨‍💻 Developer Context (Geliştirici Bağlamı)

> **CRITICAL:** Oda verileri statik bir JSON yapısından veya Handlebars context'inden beslenmelidir. Tema değişiminde DOM'un tamamı yerine sadece ilgili içerik alanları güncellenmeli veya HBS partial'ı akıllıca yönetilmelidir.

### 🛠 Technical Requirements (Teknik Gereksinimler)

- **Style Location:** `src/styles/components/_room-panel.css`
- **Partial Location:** `src/partials/_room-panel.hbs` (İçinde Story 3.1'de oluşturulan `_glass-card.hbs`'i döngü ile çağırmalı).
- **Logic Location:** `src/components/RoomPanel.js`
- **Data Structure:** `src/core/data/rooms.js` (veya benzeri bir yapı) Kız ve Erkek yurtları için ayrı oda array'leri içermeli.
- **GSAP:** Panel başlığı ve kartlar için `gsap.from()` ile stagger (ardışık) giriş animasyonları eklenmeli. `ScrollTrigger` kullanılmalı.

### 🏗 Architecture Compliance (Mimari Uyumluluk)

- **Theme Consistency:** `body[data-theme]` değişimlerini dinle veya `ThemeManager` state'ini kullan.
- **BEM Metodolojisi:** `.room-panel`, `.room-panel__grid`, `.room-panel__header` gibi isimlendirmeler kullan.
- **Reusability:** Oda özellik listesi (icons + text) için modüler bir yapı kur.

### 📂 File Structure Requirements (Dosya Yapısı Kuralları)

```text
src/
├── core/
│   └── data/
│       └── rooms.js            # Oda verileri (mock data)
├── components/
│   └── RoomPanel.js            # Tema bazlı render ve animasyon mantığı
├── partials/
│   └── _room-panel.hbs         # Ana panel yapısı
└── styles/
    └── components/
        └── _room-panel.css      # Grid ve layout stilleri
```

---

## 📝 Previous Story Intelligence (Önceki Story Öğrenmeleri)

**Story 3.1'den (Glass Card):**
- Kartların `opacity: 0.85` olması okunabilirliği artırıyor.
- `GlassCard.js` içindeki hover logic'i oda kartları için de geçerli olmalı.
- GSAP `power2.out` ease kullanımı premium hissi destekliyor.

---

## 🔀 Git Intelligence

**Son çalışma pattern'i:**
- `ThemeManager.js` `popstate` ve `pushState` olaylarını yönetiyor. `RoomPanel.js` bu olaylara abone (subscribe) olabilir veya `ThemeManager`'ın sağladığı bir callback'i kullanabilir.

---

## 🌐 Latest Tech Information (GSAP ScrollTrigger Best Practices)

- **Batch Rendering:** Eğer çok fazla oda varsa `ScrollTrigger.batch()` kullanarak animasyon performansını artırın.
- **Memory Management:** `gsap.context()` her zaman `init()` içinde kurulmalı ve `cleanup()` içinde `revert()` edilmeli.

---

## 🔗 Project Context Reference

- [Architecture: URL-First Theme Management](_bmad-output/planning-artifacts/architecture.md#Theme-Management)
- [UX: Contextual Discovery](_bmad-output/planning-artifacts/ux-design-specification.md#Contextual-Discovery)
- [Design Tokens: Colors](src/styles/design-tokens.css)

---

## 🛠 Tasks/Subtasks (Görevler)

- [x] **Task 1: Oda Veri Yapısının (Mock Data) Oluşturulması**
    - [x] `src/core/data/rooms.js` oluştur.
    - [x] Kız ve Erkek yurtları için en az 3'er farklı oda tipi (1, 2, 3 kişilik) ekle.
- [x] **Task 2: Room Panel Partial ve Layout**
    - [x] `src/partials/_room-panel.hbs` oluştur.
    - [x] HBS helper veya JS loop ile `_glass-card.hbs`'leri render et.
    - [x] `src/styles/components/_room-panel.css` ile responsive grid yapısını kur.
- [x] **Task 3: RoomPanel.js ve Dinamik İçerik Yönetimi**
    - [x] `init()` metodunda aktif temayı kontrol et ve doğru veriyi yükle.
    - [x] Tema değişimini (popstate veya custom event) dinle ve içeriği yumuşak bir fade animasyonuyla güncelle.
    - [x] GSAP ScrollTrigger ile kartların stagger girişlerini ekle.
- [x] **Task 4: Entegrasyon**
    - [x] `src/main.js` içinde `RoomPanel.init()` çağrısı yap.
    - [x] `index.html` üzerinde ilgili bölüme partial'ı ekle.

---

## 🛠 Dev Agent Record (AI)

### 📋 Implementation Plan
- [x] Setup `rooms.js` with premium descriptions and feature sets.
- [x] Create `_room-panel.hbs` integrating existing `_glass-card.hbs`.
- [x] Implement `RoomPanel.js` with theme-aware rendering and GSAP.
- [x] Refine CSS for pixel-perfect glassmorphism layout.

### 📝 Completion Notes
- Oda veri yapısı (rooms.js) kız ve erkek temaları için genişletildi.
- RoomPanel.js ile tema duyarlı (themeChanged event) dinamik render sistemi kuruldu.
- GSAP ScrollTrigger ile kartlar için stagger (ardışık) giriş animasyonları eklendi.
- Glassmorphism grid yapısı responsive olarak src/styles/components/_room-panel.css içinde tanımlandı.
- main.js ve index.html entegrasyonları tamamlandı.

## 📂 File List
- [x] `src/core/data/rooms.js`
- [x] `src/components/RoomPanel.js`
- [x] `src/partials/_room-panel.hbs`
- [x] `src/styles/components/_room-panel.css`
- [x] `src/main.js`
- [x] `index.html` (add room section)

## 📜 Change Log
- 2026-04-25: Initial story creation for Dynamic Room Panel.

### Review Findings (2026-04-25)

- [x] [Review][Decision] Emojis vs Professional Icons — `getIcon` returns SVG paths for a more consistent premium look.
- [x] [Review][Patch] Client-side Manual HTML String Rendering [src/components/RoomPanel.js:58-79]
- [x] [Review][Patch] Missing GSAP Context and Animation Cleanup [src/components/RoomPanel.js:107-130]
- [x] [Review][Patch] Hardcoded Inline Styles in Component Logic [src/components/RoomPanel.js:75-76]
- [x] [Review][Patch] Unguarded DOM Container Reference [src/components/RoomPanel.js:23, 40, 149]
- [x] [Review][Patch] Unguarded Theme State Access [src/components/RoomPanel.js:28]
- [x] [Review][Patch] CSS Hover Transform Conflict [src/styles/components/_room-panel.css:73-76]
- [x] [Review][Patch] Buttons Lacking Descriptive ARIA Labels [src/components/RoomPanel.js:76]
- [x] [Review][Patch] Full DOM Replacement on Theme Change [src/components/RoomPanel.js:45-51]

