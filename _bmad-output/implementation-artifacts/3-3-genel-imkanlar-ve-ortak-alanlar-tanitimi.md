# Story 3.3: Genel İmkanlar ve Ortak Alanlar Tanıtımı

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Ziyaretçi,
I want yurdun sunduğu genel imkanları ve ortak alanları (güvenlik, temizlik, sosyal alanlar) premium cam kartlarla incelemek,
so that konaklama konforu ve yaşam kalitesi hakkında net bir fikir sahibi olabilirim.

## Acceptance Criteria

1. **Given** Kullanıcı "Genel İmkanlar" (Amenities) bölümüne geldiğinde
   **When** Sayfa kaydırıldığında
   **Then** İmkanlar (Güvenlik, Temizlik, İnternet vb.) Glassmorphism kartlar içinde akıcı bir şekilde belirmeli. [Source: epics.md#AC3.3.1]
2. **Given** Aktif tema (Kız/Erkek) değiştiğinde
   **When** `ThemeManager` URL üzerinden temayı güncellediğinde
   **Then** Ortak alan içerikleri (Örn: Kızlar için Sosyal Alan vs Erkekler için Gym) anlık olarak ilgili yurda göre güncellenmeli. [Source: architecture.md#Contextual-Discovery]
3. **Given** Her imkan kartı
   **When** Görüntülendiğinde
   **Then** Semantik HTML yapısı (BEM), premium ikonlar ve yüksek kontrastlı tipografi (WCAG AA) içermeli. [Source: ux-design-specification.md#Accessibility]
4. **Given** Tasarım sistemi
   **When** Uygulandığında
   **Then** Kartlar `:root` token'larından beslenmeli ve hover etkileşimleri tutarlı olmalı.

## Tasks / Subtasks

- [x] **Task 1: Veri Katmanının Tamamlanması (AC: 2)**
  - [x] `src/core/data/amenities.js` oluşturuldu ve mock veriler eklendi.
  - [x] Veri yapısının `AmenitiesPanel.js` tarafından tüketilmesini sağla.
- [x] **Task 2: Amenities Panel Bileşeni (AC: 1, 3)**
  - [x] `src/partials/_amenities-panel.hbs` oluşturuldu.
  - [x] `src/components/AmenitiesPanel.js` oluşturuldu (RoomPanel mimarisi uygulandı).
  - [x] `src/styles/components/_amenities-panel.css` ile grid ve layout yapısı kuruldu.
- [x] **Task 3: Tema Duyarlı Render ve Animasyon (AC: 2, 4)**
  - [x] `ThemeManager`'ın `themeChanged` event'i dinleniyor ve içerik güncelleniyor.
  - [x] GSAP `ScrollTrigger` ile kartlar için stagger (ardışık) giriş animasyonları eklendi.
  - [x] `AnimationEngine.js` prensiplerine uygun cleanup (`gsap.context`) yapısı kuruldu.
- [x] **Task 4: Entegrasyon (AC: 1)**
  - [x] `src/main.js` içinde `AmenitiesPanel.init()` çağrısı yapıldı.
  - [x] `index.html` üzerinde ilgili bölüme partial eklendi.

## Dev Notes

- **Mimari:** `RoomPanel.js` ile aynı "URL-First" ve "Dynamic Render" mantığı kullanılmalıdır.
- **Bileşen:** `_glass-card.hbs` partial'ı tekrar kullanılmalıdır.
- **Animasyon:** `gsap.context()` kullanımı zorunludur.
- **Erişilebilirlik:** Görseller için `alt` etiketleri ve ikonlar için `aria-hidden="true"` unutulmamalıdır.

### Project Structure Notes

- Dosya yolları:
  - `src/core/data/amenities.js`
  - `src/components/AmenitiesPanel.js`
  - `src/partials/_amenities-panel.hbs`
  - `src/styles/components/_amenities-panel.css`
- Naming: BEM (Block Element Modifier) zorunludur. `.amenities-panel`, `.amenities-panel__grid`, `.amenities-panel__card`.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.3]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Glass Card]
- [Source: _bmad-output/planning-artifacts/architecture.md#Decision Impact Analysis]

## Dev Agent Record

### Agent Model Used

Gemini 3 Flash (Antigravity)

### Debug Log References

- Story context created based on Epic 3 requirements and existing RoomPanel implementation pattern.

### Completion Notes List

- Story 3.3 created with full context for developer agent.
- Mock data for amenities initialized in separate file.

### File List

- [x] `src/core/data/amenities.js`
- [x] `src/components/AmenitiesPanel.js`
- [x] `src/partials/_amenities-panel.hbs`
- [x] `src/styles/components/_amenities-panel.css`

### Review Findings

- [x] [Review][Patch] Tema değişiminde yarış durumu (Race Condition) [src/components/AmenitiesPanel.js:145]
- [x] [Review][Patch] Global event listener bellek sızıntısı [src/components/AmenitiesPanel.js:133]
- [x] [Review][Patch] Veri yapısı için eksik fallback [src/components/AmenitiesPanel.js:55]
- [x] [Review][Patch] Preloader başlatma sırası gecikmesi [src/main.js:13]
- [x] [Review][Patch] Tanımlanmayan ikonlar için varsayılan SVG dönüşü [src/components/AmenitiesPanel.js:84]
- [x] [Review][Defer] Görseller için eksik fallback [src/core/data/amenities.js] — deferred, pre-existing pattern
- [x] [Review][Defer] innerHTML performansı [src/components/AmenitiesPanel.js:52] — deferred, small list size
