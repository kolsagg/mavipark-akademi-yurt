# Story 5.3: Erişilebilirlik (A11y) ve Kontrast Denetimi

Status: done

## Story

As a Kullanıcı,
I want sitenin herkes tarafından rahatça okunabilmesini sağlamak,
so that erişilebilirlik standartlarına uyulur.

## Acceptance Criteria

1. **Given** Erişilebilirlik testi yapıldığında
2. **When** Kontrast oranları 4.5:1 üzerinde olduğunda
3. **Then** Lighthouse Accessibility skoru minimum 90/100 olmalı.
4. **Given** Ekran okuyucu kullanımı senaryosunda
5. **When** Tüm interaktif öğeler (butonlar, linkler) odaklandığında
6. **Then** Doğru ve açıklayıcı `aria-label` değerleri okunmalı.
7. **Given** Hareket hassasiyeti olan kullanıcılar için
8. **When** `prefers-reduced-motion: reduce` ayarı aktif olduğunda
9. **Then** Kritik olmayan GSAP animasyonları devre dışı kalmalı veya basitleştirilmelidir.

## Tasks / Subtasks

- [x] **Contrast Audit:** `design-tokens.css` içindeki lila (`--color-lilac-500`) ve çelik mavisi (`--color-steel-500`) renklerinin beyaz/siyah metinler üzerindeki kontrastını doğrula. Gerekirse WCAG AA (4.5:1) için renkleri hafifçe koyulaştır/aç. (AC: 2)
- [x] **Aria-Label Review:** `_header.hbs`, `_floating-cta.hbs` ve `_split-hero.hbs` içindeki buton ve linkleri kontrol et, eksik `aria-label` veya `title` niteliklerini tamamla. (AC: 6)
- [x] **Reduced Motion Support:** `src/core/AnimationEngine.js` veya ilgili bileşenlerde (Hero.js, SplitHero.js) `gsap.matchMedia()` kullanarak `(prefers-reduced-motion: reduce)` desteği ekle. (AC: 9)
- [x] **Focus Management:** Tüm buton ve linkler için `focus-visible` stilini kontrol et; klavye navigasyonu sırasında odaklanan öğenin net bir şekilde görünür olduğundan emin ol.
- [x] **Semantic HTML:** Sayfa yapısındaki landmark öğelerini (`<main>`, `<nav>`, `<header>`, `<footer>`) doğrula.
- [x] **Final Lighthouse A11y Test:** Lighthouse Accessibility skorunun 90+ olduğunu doğrula. (AC: 3)

### Review Findings

- [x] [Review][Defer] Eksik A11y Görevleri — _footer.hbs projenin bu aşamasında henüz mevcut değil. — deferred, pre-existing (Reason: Bu story bittikten sonra geliştirilecek)
- [x] [Review][Patch] AnimationEngine: Tutarsız Motion Preference Kontrolü — `exitPreloader` metodu `window.matchMedia`'yı doğrudan kullanırken diğer metodlar `this.mm` (`gsap.matchMedia`) kullanıyor. Merkezi yapıya geçilmeli. [src/core/AnimationEngine.js:49]
- [x] [Review][Patch] MatchMedia Promise Yarış Durumu — `introSplitHero` ve `introPageContent` içindeki `this.mm.add` dinleyicileri, ekran boyutu veya tercihi değiştiğinde Promise'in birden fazla kez `resolve` edilmesine veya animasyonların çakışmasına neden olabilir. [src/core/AnimationEngine.js:88]
- [x] [Review][Patch] Tasarım Token Paleti Tutarsızlığı — Sadece 500 ağırlıklı lila ve çelik mavisi renkleri güncellendi. 700 ve üzeri ağırlıklar da semantic tokenlarda (primary-dark) kullanıldığı için hiyerarşik uyum adına kontrol edilmeli. [src/styles/design-tokens.css:19]
- [x] [Review][Patch] Riskli focus-visible Offset Değeri — `outline-offset: 4px` değeri küçük butonlarda veya `overflow: hidden` olan konteynırlarda odak çerçevesinin kesilmesine veya görünmemesine neden olabilir. [src/styles/base.css:91]
- [x] [Review][Patch] Hero.js Tema Değişim Çakışması — Hızlı tema geçişlerinde `onComplete` callback'leri yanlış içeriğin uygulanmasına neden olabilir (yarış durumu). [src/components/Hero.js:85]
- [x] [Review][Patch] Hero Görsel Alt Metni Yerelleştirme Hatası — `applyContent` içindeki `img.alt` metni, hala İngilizce olan `content.badge` değerini kullanıyor. [src/components/Hero.js:114]

## Dev Notes

- **GSAP & A11y**: Animasyonların erişilebilirliği bozmadığından emin olunmalı. `gsap.matchMedia` bu iş için en temiz yöntemdir.
- **Glassmorphism Contrast**: Cam efekti arkasındaki görseller kontrastı bozabilir. `backdrop-filter: blur()` ve yeterli opaklıkta bir arka plan rengi kullanımı kritiktir.
- **Form-Zero Policy**: Projede form bulunmadığı için (sadece tel: linkleri), input label'ları ile uğraşmaya gerek yok, ancak butonların rolleri ve etiketleri çok önemli.

### Project Structure Notes

- Değişiklikler ağırlıklı olarak `src/partials/*.hbs` dosyalarında ve `src/styles/components/` altındaki ilgili CSS dosyalarında yapılacaktır.
- `src/core/AnimationEngine.js` merkezi animasyon kısıtlama noktası olabilir.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic 5]
- [Source: _bmad-output/planning-artifacts/architecture.md#Non-Functional Requirements]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Erişilebilirlik]

## Dev Agent Record

### Agent Model Used
 
 Gemini 3 Flash
 
 ### Debug Log References
 
 - Lila ve Çelik Mavisi 500 tonları WCAG AA (4.5:1) kontrastı için koyulaştırıldı.
 - `AnimationEngine.js` `gsap.matchMedia` kullanacak şekilde refaktör edildi.
 - `base.css` üzerinde global `focus-visible` stilleri eklendi.
 
 ### File List
 
 - `src/styles/design-tokens.css`
 - `src/styles/base.css`
 - `src/partials/_split-hero.hbs`
 - `src/core/AnimationEngine.js`
 - `src/components/Hero.js`
 
 ### last_updated: 2026-04-28T16:32:00+03:00
 Erişilebilirlik ve kontrast optimizasyonları tamamlandı.
 
 ### Completion Notes List
 
 - [x] Renk kontrastları 4.5:1 üzerine çıkarıldı.
 - [x] `aria-label` eksikleri giderildi.
 - [x] `prefers-reduced-motion` desteği GSAP ile entegre edildi.
 - [x] Klavye navigasyonu için odak stilleri eklendi.
