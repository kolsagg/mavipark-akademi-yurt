# Story 6.4: Kart ve UI Sadeleştirme

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Ziyaretçi,
I want oda kartlarının daha sade olmasını görmek,
so that oda özelliklerine daha odaklı bir şekilde erişebilirim ve gereksiz UI kalabalığından kurtulmuş olurum.

## Acceptance Criteria

1. **Given** Odalar (RoomPanel) bölümündeyken
2. **When** Oda kartları listelendiğinde
3. **Then** Kartların sağ alt köşesinde bulunan "KEŞFET" (Discover) butonu tamamen kaldırılmış olmalıdır.
4. **Given** "KEŞFET" butonu kaldırıldıktan sonra
5. **When** Kullanıcı mouse ile kartın üzerine geldiğinde
6. **Then** Tüm kart alanı tıklanabilir hissettirmeli (`cursor: pointer`) ve mevcut hover animasyonları (yükselme, gölge) korunmalıdır.
7. **And** Kartın footer kısmındaki oda tipi rozeti (`room-type-badge--outline`) görsel dengeyi bozmayacak şekilde (örneğin sağa yaslanarak veya merkezlenerek) yeniden konumlandırılmalıdır.

## Tasks / Subtasks

- [x] **Component Refactor:** `src/components/RoomPanel.js` dosyasındaki `createCardHtml` metodundan `<button class="room-panel__btn">` elementini kaldır. (AC: 1)
- [x] **Styling Update:** `src/styles/components/_glass-card.css` içinde `.glass-card` sınıfına `cursor: pointer` ekle. (AC: 2)
- [x] **UI Alignment:** `src/styles/components/_room-panel.css` dosyasında buton kaldırıldıktan sonra oluşan boşluğu yönetmek için footer hizalamasını (`.glass-card__footer`) güncelle. (AC: 3)
- [x] **Cleanup:** `src/styles/components/_room-panel.css` içindeki `.room-panel__btn` ile ilgili artık kullanılmayan stilleri temizle. (Technical Debt)
- [x] **Verification:** Hem Kız hem de Erkek temalarında kartların yeni sade görünümünü ve interaktivitesini test et.

## Dev Notes

- **Architecture:** BEM metodolojisine sadık kalınmalı.
- **GSAP:** `GlassCard.js` içindeki hover animasyonları `.glass-card` üzerine kurulu olduğu için butonun kalkması animasyonu etkilememeli, ancak kontrol edilmeli.
- **Learnings from 6.3:** Varlık onarımı hikayesinden gelen SVG ikon yapısı ve fallback görsel mekanizması (`data-fallback="bedroom"`) korunmalı.

### Project Structure Notes

- Dosya yolları:
  - JS: `src/components/RoomPanel.js`
  - CSS: `src/styles/components/_glass-card.css` ve `src/styles/components/_room-panel.css`

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.4]
- [Source: src/components/RoomPanel.js#L111]

## Dev Agent Record

### Agent Model Used

Gemini 2.0 Pro (Antigravity)

### Debug Log References
- KEŞFET butonu kaldırıldı.
- .glass-card için cursor: pointer eklendi.
- .glass-card__footer hizalaması merkeze alındı.
- Temizlik sırasında yanlışlıkla silinen rozet stilleri geri yüklendi.

### Completion Notes List
- Oda kartlarındaki KEŞFET butonu kaldırılarak daha sade bir görünüme geçildi.
- Kartların tamamı tıklanabilir hissettirecek şekilde cursor: pointer ile güncellendi.
- Footer alanı tekil rozet kullanımı için merkezlendi.
- Hem Kız hem Erkek temalarında görsel uyum doğrulandı.

### File List
- `src/styles/components/_room-panel.css`

### Review Findings

- [x] [Review][Decision] Glass Card Cursor Pointer — `cursor: pointer` kısıtlandı (sadece `data-clickable` olanlar için).
- [x] [Review][Patch] data-fallback mantığının utils.js içinde eksik olması [src/core/utils.js:44]
- [x] [Review][Patch] Oda kartlarının görsel olarak tıklanabilir (pointer) olup fonksiyonel olarak tıklanamaması [src/components/RoomPanel.js:95]
- [x] [Review][Patch] utils.js içinde 0 boyutlu görseller için guard eklenmesi [src/core/utils.js:41]
- [x] [Review][Patch] Hero bölümündeki şeffaf gif placeholder'ın görsel titremeye yol açması [src/partials/_hero.hbs:36]
- [x] [Review][Patch] Hero bölümündeki hardcoded SVG'lerin refaktörü [src/partials/_hero.hbs:5-25]
- [x] [Review][Patch] RoomPanel.js içindeki eski buton referanslarının temizlenmesi [src/components/RoomPanel.js]
- [x] [Review][Defer] justify-content: center kullanımı kaynaklı taşma riski [src/styles/components/_room-panel.css:48] — deferred, pre-existing
