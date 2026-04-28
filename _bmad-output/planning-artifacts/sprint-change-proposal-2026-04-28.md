# Sprint Change Proposal - 2026-04-28

**Goal:** Manage the final polish phase and address technical debt by creating Epic 6 and updating planning artifacts.

## Section 1: Issue Summary
- **Trigger**: Post-implementation review and `deferred-work.md` log.
- **Problem**: 
  - Navigation layout needs better balance (centered switch).
  - Split Hero animations are too abrupt on hover.
  - Assets (images/icons) have broken links or rendering issues.
  - Room cards have redundant "Discover" buttons.
  - Significant technical debt: Synchronous imports, code duplication between layouts, and missing footer A11y checks.

## Section 2: Impact Analysis
- **Epic Impact**: Existing Epics 1-5 are complete. A new **Epic 6** is required to track these changes.
- **Story Impact**: 5 new stories (6.1 to 6.5) covering polish, fixes, and debt.
- **Artifact Conflicts**:
  - **PRD**: Navigation functional requirements need updating.
  - **Architecture**: Component loading and layout strategies need refinement.
  - **Epics**: Needs a new section for Epic 6.
  - **UX Design**: Navigation and interaction patterns need updates.
- **Technical Impact**: Transition to dynamic imports, implementation of an asset fallback system, and refactoring to a unified layout system.

## Section 3: Recommended Approach
- **Approach**: **Direct Adjustment**. Add Epic 6 to the plan and implement stories incrementally.
- **Rationale**: The project is in the final polish phase. Grouping these items into a dedicated "Polish & Health" epic maintains clarity and allows for systematic verification.

## Section 4: Detailed Change Proposals

### 1. Artifact: `epics.md`
**Action**: Append Epic 6.

```markdown
## Epic 6: Final Polish ve Teknik İyileştirme
Sitenin navigasyon yapısı, kullanıcı etkileşimleri ve teknik altyapısı mükemmelleştirilir; biriken teknik borçlar temizlenir.

### Story 6.1: Navigasyon ve Header Yeniden Düzenleme
- **Acceptance Criteria**:
  - Kız/Erkek switchi header merkezinde olmalı.
  - Solunda: Ana Sayfa, Odalar.
  - Sağında: İmkanlar, İletişim.
  - Mobil uyum korunmalı.

### Story 6.2: Split-Hero Animasyon Optimizasyonu
- **Acceptance Criteria**:
  - Hover durumunda bir panel büyürken diğeri eş zamanlı ve yumuşak şekilde küçülmeli (GSAP).
  - Ani büyüme/sıçrama efektleri giderilmeli.

### Story 6.3: Varlık Onarımı ve Hata Giderme
- **Acceptance Criteria**:
  - Bozuk görsel linkleri onarılmalı (Unsplash fallback eklenmeli).
  - Metin olarak görünen ikonlar doğru SVG/Icon font halleriyle değiştirilmeli.

### Story 6.4: Kart ve UI Sadeleştirme
- **Acceptance Criteria**:
  - Oda kartlarındaki "Keşfet" (Discover) butonu kaldırılmalı.
  - Kartın tamamı veya başlığı tıklanabilir kalmalı (gerekirse).

### Story 6.5: Teknik Borç Temizliği ve A11y Final
- **Acceptance Criteria**:
  - Dynamic import (lazy loading) stratejisine geçilmeli (`main.js`).
  - `yurt.html` ve `index.html` arasındaki kod tekrarı azaltılmalı (Unified layout partial).
  - Footer A11y denetimi tamamlanmalı.
  - ScrollEngine magic number temizliği.
```

### 2. Artifact: `prd.md`
**Action**: Update Functional Requirements Section 12.1.

- **FR2**: "Kız/Erkek" geçişi artık header merkezindeki switch üzerinden yapılır.
- **FR8 (New)**: Görsel varlıklar için otomatik hata yakalama (fallback) sistemi bulunmalıdır.

### 3. Artifact: `architecture.md`
**Action**: Update Section 5 (Frontend Architecture).

- **Lazy Loading**: Tüm bileşen modülleri `dynamic import` ile yüklenmelidir.
- **Layout System**: Tekrarlanan HTML yapısını önlemek için Handlebars tabanlı merkezi bir `layout.hbs` kullanılmalıdır.

## Section 5: Implementation Handoff
- **Scope**: **Moderate** (Requires planning updates and multiple code changes).
- **Recipient**: Developer Agent.
- **Success Criteria**: 
  - Centered navigation works on all screens.
  - Split hero animations are buttery smooth.
  - 0 broken images/icons.
  - Lighthouse scores remain 90+.
  - `main.js` uses dynamic imports.
