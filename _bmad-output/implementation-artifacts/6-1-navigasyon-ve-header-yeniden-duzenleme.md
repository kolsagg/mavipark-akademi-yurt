# Story 6.1: Navigasyon ve Header Yeniden Düzenleme

Status: done

## Story

As a Kullanıcı,
I want navigasyon menüsünün ve Kız/Erkek anahtarının dengeli bir şekilde yerleştiğini görmek,
so that menüde daha rahat gezinebilirim ve bölüm geçişlerini merkeze odaklanmış bir yapıda yapabilirim.

## Acceptance Criteria

1. **Given** Masaüstü görünümünde
2. **When** Header yüklendiğinde
3. **Then** Kız/Erkek switch'i header'ın tam merkezinde konumlanmalı.
4. **And** Switch'in solunda "Ana Sayfa" ve "Odalar" linkleri yer almalı.
5. **And** Switch'in sağında "İmkanlar" ve "İletişim" linkleri yer almalı.
6. **Given** Mobil görünümde
7. **When** Hamburger menü açıldığında veya header daraldığında
8. **Then** Menü hiyerarşisi bozulmamalı ve switch erişilebilir kalmalı (UX-DR8 uyumlu).
9. **Given** Tema değişimi yapıldığında
10. **When** Kullanıcı switch'i kullandığında
11. **Then** Navigasyon aktif linkleri ve switch durumu anında güncellenmeli.

## Tasks / Subtasks

- [ ] **Header Layout Refactor:** `_header.hbs` dosyasını `flexbox` veya `grid` kullanarak 3 ana sütuna (Sol Nav - Merkez Switch - Sağ Nav) ayır.
- [ ] **Navigation Alignment:** Linkleri mimari plana uygun olarak yerleştir (Sol: Ana Sayfa, Odalar | Sağ: İmkanlar, İletişim).
- [ ] **Switch Styling:** `ThemeManager` ile entegre çalışan Kız/Erkek switch'ini görsel olarak merkezde premium (Glassmorphism) bir toggle olarak düzenle.
- [ ] **Mobile Responsiveness:** Mobil görünümde header'ın nasıl davranacağını (örn: logolu üst bar ve hamburger menü içinde switch) optimize et.
- [ ] **Active Link Logic:** `Navigation.js` (eğer varsa veya `main.js` içinde) üzerinde aktif sayfayı ve aktif temayı vurgulayacak CSS sınıflarını yönet.
- [ ] **GSAP Interaction:** Header üzerindeki hover ve geçiş efektlerini `gsap.context()` içinde modernize et.

## Developer Context Section

### Technical Requirements
- **CSS Architecture:** BEM metodolojisi zorunludur. Header bloğu (`.header`), elementler (`.header__nav`, `.header__switch`) ve modifikasyonlar (`--active`).
- **GSAP Context:** Header üzerindeki tüm animasyonlar `gsap.context()` ile kapsüllenmeli ve `cleanup` fonksiyonu hazırlanmalıdır.
- **Theme Integration:** Switch, `ThemeManager.js` tarafından tetiklenen `data-theme` değişimini dinlemeli veya tetiklemelidir.
- **A11y:** Navigasyon linkleri ve switch için açıklayıcı `aria-label` değerleri kullanılmalıdır (Örn: `aria-label="Kız yurdu bölümüne geç"`).

### Architecture Compliance
- `src/styles/components/_header.css` dosyasında stil düzenlemeleri yapılmalıdır.
- `src/partials/_header.hbs` ana yapı değişikliği noktasıdır.
- `src/components/Navigation.js` üzerinden dinamik davranışlar yönetilmelidir.

### Previous Story Intelligence
- **Story 5.3 Learnings:** `aria-label` ve `focus-visible` standartlarına uyulmalıdır. `outline-offset` değerinin header linklerinde taşma yapmadığından emin olun.
- **Theme Transition:** Hızlı tıklamalarda oluşabilecek yarış durumları (Race conditions) için `ThemeManager` entegrasyonu test edilmelidir.

### Git Intelligence Summary
- Son commitlerde Epic 6 başlatıldı ve genel cila (Polish) fazına girildi.
- Önceki aşamada preloader ve A11y iyileştirmeleri yapıldı, header'ın bu yeni görsel dile uyumu şart.

## Project Context Reference
- [Architecture Document](file:///Users/emrekolunsag/Dev/akademi_yurt/_bmad-output/planning-artifacts/architecture.md)
- [Design Tokens](file:///Users/emrekolunsag/Dev/akademi_yurt/src/styles/design-tokens.css)
- [UX Specifications](file:///Users/emrekolunsag/Dev/akademi_yurt/_bmad-output/planning-artifacts/ux-design-specification.md)

## Story Completion Status
- **Status:** ready-for-dev
- **Completion Note:** Ultimate context engine analysis completed - comprehensive developer guide created.
- [x] [Review][Patch] Mobil Menü ARIA State [src/partials/_header.hbs:41]
- [x] [Review][Patch] Tema Event Verisi [src/components/Navigation.js:70]
- [x] [Review][Patch] Duplicate Listeners [src/components/Navigation.js:228]
- [x] [Review][Patch] Ana Sayfa Aktif Link [src/components/Navigation.js:90]
- [x] [Review][Patch] Placeholder Tel No [src/partials/_header.hbs:30]
- [x] [Review][Patch] Scroll Link Takibi [src/components/Navigation.js:105]
- [x] [Review][Patch] GSAP Context Kapsülleme [src/components/Navigation.js:180]
- [x] [Review][Defer] Grid Hizalama Riski [src/styles/components/_navigation.css:29] — deferred, pre-existing

