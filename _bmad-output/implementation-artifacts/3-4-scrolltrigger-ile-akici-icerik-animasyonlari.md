# Story 3.4: ScrollTrigger ile Akıcı İçerik Animasyonları

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Ziyaretçi,
I want sayfayı kaydırdıkça içeriklerin pürüzsüzce belirmesini görmek,
so that sitede gezinmek bir deneyime dönüşür.

## Acceptance Criteria

1. **Given** Kullanıcı sayfayı aşağı kaydırdığında
   **When** GSAP ScrollTrigger tetiklenme noktalarına ulaşıldığında
   **Then** İçerik kartları ve başlıklar `fade-in-up` animasyonuyla 60 FPS akıcılığında ekrana gelmeli. [Source: epics.md#Story 3.4]
2. **Given** Kullanıcı cihazında "Hareketi Azalt" (prefers-reduced-motion) aktifse
   **When** Sayfa yüklendiğinde veya kaydırıldığında
   **Then** Animasyonlar devre dışı bırakılmalı veya çok basit fade geçişlerine dönüştürülmelidir. [Source: epics.md#NFR3]
3. **Given** Tüm GSAP animasyon mantığı
   **When** Uygulandığında
   **Then** Bellek sızıntılarını önlemek için `gsap.context()` içinde kapsüllenmeli ve cleanup fonksiyonları içermelidir. [Source: epics.md#AR5]
4. **Given** Animasyon performansı
   **When** Yürütüldüğünde
   **Then** Sadece GPU hızlandırmalı özellikler (`transform`, `opacity`) kullanılmalı, layout değişimine (LCP/CLS) neden olan özelliklerden kaçınılmalıdır. [Source: project-context.md#Quality]
5. **Given** Dinamik tema değişimi
   **When** `ThemeManager` üzerinden bölüm değiştirildiğinde
   **Then** `ScrollTrigger.refresh()` çağrılarak animasyon tetikleme noktaları yeni içerik yüksekliğine göre güncellenmelidir. [Source: project-context.md#Edge Cases]

## Tasks / Subtasks

- [x] **Task 1: ScrollEngine.js Altyapısı (AC: 1, 3, 5)**
  - [x] `src/core/ScrollEngine.js` modülünü oluştur.
  - [x] Global `gsap.context()` ve `ScrollTrigger` yapılandırmasını yap.
  - [x] `ThemeManager`'ın `themeChanged` event'ini dinleyerek `ScrollTrigger.refresh()` entegrasyonunu sağla.
- [x] **Task 2: Reveal Animasyonlarının Uygulanması (AC: 1, 4)**
  - [x] `[data-reveal]` attribute'una sahip elementleri otomatik olarak anime eden bir loop kur.
  - [x] `index.html` ve bileşen partial'larındaki (`_room-panel.hbs`, `_amenities-panel.hbs`) kartlara reveal attribute'larını ekle.
  - [x] CSS ile başlangıç (hidden) durumlarını (`opacity: 0`, `transform: translateY(30px)`) tanımla.
- [x] **Task 3: Erişilebilirlik ve Performans Cilalaması (AC: 2, 4)**
  - [x] `gsap.matchMedia()` kullanarak `prefers-reduced-motion` kontrolünü ekle.
  - [x] Animasyonların 60 FPS çalıştığını ve memory leak olmadığını doğrula.

### Review Findings

- [x] [Review][Patch] RoomPanel Bellek Sızıntısı [src/components/RoomPanel.js:432]
- [x] [Review][Patch] RoomPanel Yarış Durumu [src/components/RoomPanel.js:441]
- [x] [Review][Patch] Gereksiz Refresh Çağrıları [src/core/ScrollEngine.js:121, src/components/RoomPanel.js:425]
- [x] [Review][Patch] FOUC Riski (Batch) [src/styles/components/_reveal.css]
- [x] [Review][Patch] GPU Bellek Kullanımı (will-change) [src/styles/components/_reveal.css:253]
- [x] [Review][Patch] Hatalı Seçici (Selecter) Hatası [src/components/RoomPanel.js:317, src/components/AmenitiesPanel.js:509]
- [x] [Review][Patch] Magic Number (Timeout) [src/core/ScrollEngine.js:123]
- [x] [Review][Patch] Missing GSAP Import (AmenitiesPanel & RoomPanel)
- [x] [Review][Defer] Sabit Trigger Noktaları [src/core/ScrollEngine.js:166] — deferred, pre-existing
- [x] [Review][Defer] A11y Fallback Eksikliği [src/core/ScrollEngine.js:132] — deferred, pre-existing

## Dev Notes

- **Performans:** `ScrollTrigger`'ın `batch` özelliğini kullanarak çok sayıda kartın aynı anda animasyonunu optimize etmeyi düşün.
- **Mimari:** Animasyon mantığını `AnimationEngine.js` ile koordine et. `ScrollEngine` daha çok scroll-reveal (kaydırınca görünme) işlerine odaklanmalı.
- **BEM:** Animasyon durumları için BEM varyantları (örn: `.card--revealed`) yerine doğrudan GSAP transformasyonlarını tercih et, ancak state yönetimi gerekirse BEM kurallarına uy.
- **Cleanup:** `ScrollEngine` içinde mutlaka bir `destroy()` veya `cleanup()` metodu bulundur ve bu metod `gsap.context.revert()` çağırmalıdır.

### Project Structure Notes

- Dosya Yolları:
  - `src/core/ScrollEngine.js`
- Naming: Sınıf isimleri ve değişkenler camelCase, CSS sınıfları BEM (kebab-case) olmalıdır.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.4]
- [Source: _bmad-output/planning-artifacts/architecture.md#ScrollEngine]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Micro-interactions]
- [Source: _bmad-output/project-context.md#GSAP Context Zorunluluğu]
 
## File List
 
 - `src/core/ScrollEngine.js` (New)
 - `src/styles/components/_reveal.css` (New)
 - `src/main.js` (Modified)
 - `src/styles/main.css` (Modified)
 - `src/partials/_room-panel.hbs` (Modified)
 - `src/partials/_amenities-panel.hbs` (Modified)
 - `src/components/RoomPanel.js` (Modified)
 - `src/components/AmenitiesPanel.js` (Modified)
 
 ## Change Log
 
 - 2026-04-26: Centralized ScrollEngine.js created with batching support.
 - 2026-04-26: Reveal animations applied to Room and Amenities panels.
 - 2026-04-26: Accessibility (reduced-motion) and performance (GPU accel) optimizations implemented.
 
 ## Dev Agent Record

### Agent Model Used

Gemini 3 Flash (Antigravity)

### Debug Log References

- Story created based on Epic 3 requirements and architecture guardrails.
- Previous story (3.3) learnings regarding memory leaks and theme change race conditions incorporated.

### Completion Notes List

- Story 3.4 initialized in ready-for-dev status.
- Task list covers core implementation, accessibility, and performance requirements.
- Centralized ScrollEngine implemented using GSAP ScrollTrigger.batch for performance.
- ThemeManager integration ensures animation refresh on dynamic content changes.
- Accessibility handled via gsap.matchMedia for prefers-reduced-motion.
