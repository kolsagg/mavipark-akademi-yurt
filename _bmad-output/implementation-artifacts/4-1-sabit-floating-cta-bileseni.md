# Story 4.1: Sabit (Floating) CTA Bileşeni

Status: done

## Story

As a Kullanıcı,
I want sayfanın her yerinde erişilebilir bir "Hemen Başvur" butonu görmek,
so that yurdu istediğim an doğrudan arayabilirim.

## Acceptance Criteria

1. **Given** Herhangi bir sayfa yüklendiğinde
   **When** Sayfa içeriği belirdiğinde
   **Then** Ekranın bir köşesinde (Mobilde alt, Masaüstünde sağ alt/üst) sabit, dikkat çekici bir "Hemen Başvur" butonu görünmelidir. [Source: ux-design-specification.md#Floating CTA]
2. **Given** Mobil bir cihazda
   **When** Floating CTA butonuna tıklandığında
   **Then** `tel:+90XXXXXXXXXX` protokolü tetiklenerek doğrudan telefon arama ekranı açılmalıdır. [Source: prd.md#FR7]
3. **Given** Masaüstü bir cihazda
   **When** Floating CTA butonuna tıklandığında
   **Then** Telefon numarası panoya kopyalanmalı ve kullanıcıya "Numara kopyalandı" şeklinde bir Toast bildirimi gösterilmelidir. [Source: ux-design-specification.md#Fast Conversion Flow]
4. **Given** Tasarım gereksinimleri
   **When** Buton stilize edildiğinde
   **Then** Cam efekti (Glassmorphism), yüksek kontrastlı metin ve premium mikro-animasyonlar (hover/entry) içermelidir. [Source: architecture.md#FloatingCTA]
5. **Given** Erişilebilirlik (A11y)
   **When** Uygulandığında
   **Then** Butonun ekran okuyucular için açıklayıcı bir `aria-label` etiketi olmalı ve klavye ile odaklanılabilir olmalıdır. [Source: nfr-acc-2]

## Tasks / Subtasks

- [x] **Task 1: FloatingCTA Bileşen Yapısı ve Stil (AC: 1, 4, 5)**
  - [x] `src/partials/_floating-cta.hbs` partial dosyasını oluştur.
  - [x] `src/styles/components/_floating-cta.css` dosyasını oluştur (BEM: `.floating-cta`).
  - [x] Butona cam efekti (backdrop-filter) ve tasarım token'larından gelen renkleri uygula.
  - [x] Butonun her zaman en üstte kalmasını sağla (`z-index: var(--z-fixed)` gibi).
- [x] **Task 2: İnce Etkileşim ve Kopyalama Mantığı (AC: 2, 3)**
  - [x] `src/components/FloatingCTA.js` modülünü oluştur.
  - [x] `navigator.clipboard.writeText` kullanarak kopyalama fonksiyonunu yaz (Fallback ile birlikte).
  - [x] Basit bir Toast bildirimi (CSS + JS) mekanizması kur.
  - [x] Cihaz türüne (mobil/masaüstü) göre farklı aksiyonları (`tel:` vs `copy`) tetikleyen mantığı kur.
- [x] **Task 3: GSAP Animasyonları ve Kayıt (AC: 4)**
  - [x] Butonun sayfaya girişi için `gsap.context()` içinde bir intro animasyonu yaz.
  - [x] `src/main.js` dosyasına `FloatingCTA.init()` ekleyerek bileşeni ayağa kaldır.
  - [x] Hover ve click efektleri için mikro-etkileşimleri ekle.

## Developer Context

### Architecture Guardrails
- **BEM Zorunluluğu**: CSS sınıfları mutlaka BEM formatında olmalıdır. (örn: `.floating-cta__icon`).
- **GSAP Context**: Tüm animasyonlar `gsap.context()` içinde olmalı ve `cleanup()` metoduna sahip olmalıdır.
- **Vanilla Only**: Herhangi bir kütüphane (Tailwind, React vb.) kullanmak KESİNLİKLE yasaktır.
- **Theme Awareness**: Buton, `data-theme` değişimlerine uyumlu olmalı; lila veya mavi vurgu renklerini token'lardan çekmelidir.

### Technical Intelligence
- **Clipboard API**: Güvenli bağlam (HTTPS/Localhost) gerektirir. 2026 standartlarına uygun fallback (execCommand) içermelidir.
- **Z-Index Yönetimi**: Diğer tüm katmanların (split-screen, glass cards) üzerinde olmalıdır.
- **Performance**: Animasyonlarda GPU hızlandırmalı özellikler (`opacity`, `transform`) kullanılmalıdır.

## Dev Notes

- **Aesthetic**: Butonun "premium butik otel" hissini bozmaması için fazla agresif/parlak olmamasına, ancak her zaman fark edilebilir olmasına dikkat et.
- **Toast**: Toast bildirimi ekranın üst orta kısmında zarif bir şekilde belirip 3 saniye sonra kaybolmalıdır.
- **A11y**: `aria-label="Hemen Başvur - Yurdu Ara"` gibi net bir etiket kullan.

## Dev Agent Record
### Implementation Plan
- Handlebars partial created for the floating CTA button.
- CSS module implemented with glassmorphism and BEM naming.
- JavaScript module developed for device detection (mobile call vs desktop copy).
- GSAP intro, hover, and click animations implemented for premium feel.
- Toast notification system added for feedback on desktop copy action.

### Completion Notes
- All ACs satisfied.
- Unit tests created and verified.
- Integrated into main application loop.

## File List
- `src/partials/_floating-cta.hbs`
- `src/styles/components/_floating-cta.css`
- `src/components/FloatingCTA.js`
- `src/main.js` (Modified)
- `index.html` (Modified)
- `yurt.html` (Modified)
- `tests/FloatingCTA.test.js` (New)

## Change Log
- 2026-04-26: Initial implementation of Floating CTA component with animations and mobile/desktop logic.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 4.1]
- [Source: _bmad-output/planning-artifacts/prd.md#FR7]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Floating CTA]
- [Source: _bmad-output/planning-artifacts/architecture.md#FloatingCTA]

### Review Findings (2026-04-26)

- [x] [Review][Decision] Mobil Pozisyon Sapması — Spec "köşe" (corner) diyor ancak CSS butonu mobilde merkeze (`right: 50%`) alıyor. (Kullanıcı onayı ile mevcut hali korundu).
- [x] [Review][Patch] Sabit telefon numarası (Hardcoded +905555555555) [src/components/FloatingCTA.js:34]
- [x] [Review][Patch] Brittle mobile detection via UserAgent regex [src/components/FloatingCTA.js:109]
- [x] [Review][Patch] Deprecated document.execCommand('copy') usage [src/components/FloatingCTA.js:132]
- [x] [Review][Patch] Modül seviyesinde yan etki (Constructor side-effects on export) [src/components/FloatingCTA.js:199]
- [x] [Review][Patch] No JS fallback for CTA visibility (visibility: hidden) [src/styles/components/_floating-cta.css:6]
- [x] [Review][Patch] Missing cleanup call for FloatingCTA in main.js [src/main.js]
- [x] [Review][Patch] Hover shadow tema renklerine uyumlu değil (Hardcoded rgba) [src/components/FloatingCTA.js:70]
- [x] [Review][Patch] Toast bildirimleri ekran okuyucular için erişilebilir değil (ARIA live eksik) [src/components/FloatingCTA.js:151]
- [x] [Review][Defer] Manuel initialization listesi büyümesi (Architectural debt) [src/main.js:24] — deferred, pre-existing
- [x] [Review][Defer] yurt.html içinde kod tekrarı (Layout sistemi eksikliği) [yurt.html] — deferred, pre-existing
