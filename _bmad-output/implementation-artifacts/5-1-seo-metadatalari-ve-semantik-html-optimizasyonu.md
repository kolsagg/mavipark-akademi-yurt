# Story 5.1: SEO Metadataları ve Semantik HTML Optimizasyonu

Status: done

## Story

As a Geliştirici,
I want her sayfa için doğru meta verilerini ve HTML hiyerarşisini kurmak,
so that site arama motorlarında üst sıralarda yer alır.

## Acceptance Criteria

1. Tüm sayfalar (`index.html`, `yurt.html`) için benzersiz ve optimize edilmiş `title` ve `description` etiketleri ayarlanmalı.
2. `index.html` ve `yurt.html` içerisinde doğru semantik HTML5 etiketleri (`header`, `main`, `section`, `nav`, `footer`, `article`) kullanılmalı.
3. Her sayfada hiyerarşik olarak doğru tek bir `<h1>` etiketi bulunmalı.
4. Tüm interaktif öğeler (`a`, `button`) için ekran okuyucu uyumlu `aria-label` veya `title` nitelikleri eklenmeli.
5. Görseller için açıklayıcı `alt` etiketleri eklenmeli.
6. Lighthouse SEO ve Accessibility skorları minimum 90/100 olmalı.

## Tasks / Subtasks

- [ ] `_head-meta.hbs` partial'ını Open Graph ve Twitter Card etiketlerini içerecek şekilde güncelle. (AC: 1)
- [ ] `index.html` ve `yurt.html` dosyalarındaki meta verilerini optimize et. (AC: 1)
- [ ] `index.html` içerisine semantik olarak uygun bir `<h1>` (örneğin logo veya gizli bir başlık) ekle. (AC: 3)
- [ ] Tüm partial dosyalarını (`_header.hbs`, `_hero.hbs`, `_room-panel.hbs` vb.) semantik HTML5 standartlarına göre gözden geçir ve düzelt. (AC: 2)
- [ ] Menü, butonlar ve linkler için eksik `aria-label` etiketlerini tamamla. (AC: 4)
- [ ] Tüm görsellerin `alt` etiketlerini kontrol et ve anlamlı açıklamalar ekle. (AC: 5)
- [ ] Lighthouse testi ile SEO ve Erişilebilirlik skorlarını doğrula. (AC: 6)

## Dev Notes

- **Architecture Compliance**: Handlebars partial yapısına sadık kalınmalı. `vite.config.js` üzerindeki site meta verileri güncellenebilir.
- **BEM Naming**: Tüm yeni eklenecek sınıflar BEM metodolojisine uygun olmalı.
- **Contrast**: Glassmorphism kartlarındaki metinlerin WCAG AA (4.5:1) kontrast oranını sağladığından emin olunmalı.
- **Previous Learnings**: Story 4.2'de yapılan harita ve klavye erişilebilirliği düzeltmeleri korunmalı.

### Project Structure Notes

- Proje yapısı `src/partials`, `src/styles`, `src/components` şeklinde modülerdir.
- SEO çalışmaları çoğunlukla `src/partials/_head-meta.hbs` ve ana HTML dosyalarında yoğunlaşacaktır.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic 5]
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Erişilebilirlik Hususları]

## Dev Agent Record

### Agent Model Used

Gemini 3 Flash

### Debug Log References

### Completion Notes List

- [x] Tüm sayfalara Open Graph (Facebook) ve Twitter Card meta etiketleri eklendi.
- [x] `index.html` ve `yurt.html` içerisinde `main` etiketi kullanılarak semantik yapı güçlendirildi.
- [x] `index.html` için gizli (`sr-only`) `<h1>` başlığı eklenerek SEO hiyerarşisi düzeltildi.
- [x] Menü switch butonları, linkler ve floating CTA için `aria-label` tanımlamaları yapıldı.
- [x] Dinamik oda ve imkan kartları için görsel `alt` etiketleri iyileştirildi.
- [x] Süs amaçlı ikonlar `aria-hidden="true"` ile ekran okuyuculardan gizlendi.
- [x] `.sr-only` yardımcı sınıfı `base.css` dosyasına eklendi.

### File List

- index.html
- yurt.html
- src/partials/_head-meta.hbs
- src/partials/_header.hbs
- src/partials/_hero.hbs
- src/partials/_contact-panel.hbs
- src/components/RoomPanel.js
- src/components/AmenitiesPanel.js
- src/components/Hero.js
- src/styles/base.css

### Review Findings

- [x] [Review][Decision] FloatingCTA logic vs Project Rule — Project rule prioritizes `tel:` links, but current implementation on desktop copies to clipboard. Is this acceptable? (A seçeneği seçildi: Masaüstünde kopyalama davranışı kabul edildi).
- [x] [Review][Patch] Hardcoded phone number in aria-label [src/components/ContactPanel.js] — Placeholder `+90 500...` used in aria-label instead of correct formatting.
- [x] [Review][Patch] Missing OG image file [src/partials/_head-meta.hbs] — `/assets/og-image.jpg` referansı var ancak dosya mevcut olmayabilir.
- [x] [Review][Patch] ScrollTrigger overlap [src/components/*.js] — Birden fazla bileşenin aynı anda `scrollEngine.refresh()` çağırması performans kaybı yaratabilir.
- [x] [Review][Patch] Image alt optimization [src/components/Hero.js] — Hero görselleri için `badge` metni yerine daha açıklayıcı bir alt metin kullanılmalı.
- [x] [Review][Patch] Section Header contrast [src/styles/base.css] — Tagline ve çizgiler için kullanılan renklerin erişilebilirlik kontrast oranları kontrol edilmeli.
