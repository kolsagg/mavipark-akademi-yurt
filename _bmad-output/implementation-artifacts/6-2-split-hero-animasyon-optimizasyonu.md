# Story 6.2: Split-Hero Animasyon Optimizasyonu

Status: done

## Story

As a Ziyaretçi,
I want Split-Hero üzerindeki hover etkileşimlerinin daha yumuşak olmasını görmek,
so that görsel geçişler premium hissettirir ve ani sıçramalar olmadan bir keşif deneyimi yaşarım.

## Acceptance Criteria

1. **Given** Ana sayfada (Index) Split-Hero görünümündeyken
2. **When** Bir panelin (Kız veya Erkek) üzerine mouse ile gelindiğinde (hover)
3. **Then** Hover yapılan panel genişlemeli, diğer panel ise eş zamanlı ve yumuşak bir şekilde daralmalıdır.
4. **And** Arka plan görseli hafifçe scale (zoom) olmalı ve overlay opaklığı değişmelidir.
5. **And** Tüm bu animasyonlar GSAP kullanılarak 60 FPS akıcılığında yönetilmelidir.
6. **Given** Mouse panelden çekildiğinde (leave)
7. **When** Tüm paneller eski dengeli (50/50) hallerine geri dönmelidir.
8. **Given** `prefers-reduced-motion` aktifse
9. **Then** Hover animasyonları ya tamamen devre dışı bırakılmalı ya da çok basitleştirilmiş (sadece renk/opaklık değişimi gibi) hale getirilmelidir.

## Tasks / Subtasks

- [x] **CSS Clean-up:** `_split-hero.css` içindeki CSS tabanlı `:hover` ve `transition` kurallarını (`flex`, `transform`, `background-color` değişimleri) kaldır.
- [x] **GSAP Context Integration:** `SplitHero.js` içinde `gsap.context()` yapısını kur ve `init` aşamasında bileşen kapsamındaki tüm elementleri seç.
- [x] **Hover Logic (Desktop):** `mouseenter` ve `mouseleave` event listener'larını ekle.
- [x] **Panel Animation:** Bir panel hover olduğunda `flex: 1.2` (veya eşdeğer genişlik), diğeri `flex: 0.8` olacak şekilde `gsap.to()` ile animasyon yap.
- [x] **Visual Effects:** Panel içindeki `.split-hero__bg` için `scale: 1.05` ve `.split-hero__overlay` için opaklık değişimini animasyona dahil et.
- [x] **Content Animation:** `.split-hero__content` elemanlarının (başlık, buton) hover durumunda hafifçe yukarı kayma (`y: -10`) etkisini optimize et.
- [x] **Reduced Motion Support:** `AnimationEngine`'deki `matchMedia` pattern'ini kullanarak düşük hareket modu desteği ekle.
- [x] **Cleanup:** Bileşen yok edildiğinde (eğer gerekirse) GSAP context'ini revert et.

## Dev Agent Record

### Implementation Plan
- GSAP kullanılarak `SplitHero.js` içerisine hover animasyonları eklendi.
- `_split-hero.css` içerisindeki hover ve geçiş (transition) durumları iptal edildi, animasyon yükü CSS'den GSAP'e geçirildi.
- `window.matchMedia('(prefers-reduced-motion: reduce)')` ile erişilebilirlik gereksinimleri (Reduced Motion) sağlandı.
- Sadece `(hover: hover)` destekleyen cihazlarda (genelde masaüstü) tetiklenmesi için hover media sorgusu JS'e taşındı.
- Test dosyası `SplitHero.test.js` eklendi.

### Completion Notes
✅ Split-Hero hover GSAP animasyonları ve responsive etkileşim başarıyla uygulandı. 
GSAP Context ile izole animasyon yönetimi kuruldu ve Cleanup fonksiyonu tanımlandı.

## File List
- `src/components/SplitHero.js`
- `src/styles/components/_split-hero.css`
- `tests/SplitHero.test.js`

## Change Log
- Addressed hover performance by moving CSS transitions to GSAP. Added proper reduced motion checks and JS-based cleanup for hover context. Added related test module.

## Story Completion Status
- **Status:** done
- **Completion Note:** Story implementation completed successfully and validated. Ready for code review.

### Review Findings

- [x] [Review][Patch] Memory Leak: Event listeners are not cleaned up in `destroy()` [src/components/SplitHero.js]
- [x] [Review][Patch] Inconsistent Color Usage in JS: Hardcoded overlay colors [src/components/SplitHero.js:71, 108]
- [x] [Review][Defer] Static Event Binding: Hover behavior does not update on orientation change or resize [src/components/SplitHero.js:28] — deferred, pre-existing
