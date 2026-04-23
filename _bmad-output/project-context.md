---
project_name: 'akademi_yurt'
user_name: 'Emrekolunsag'
date: '2026-04-23'
sections_completed:
  ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 27
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Çalışma Ortamı ve Derleme:** Node.js, Vite
- **Diller:** HTML5, Modern JavaScript (ES6+), Vanilla CSS
- **Animasyon:** GSAP (GreenSock Animation Platform) ve ScrollTrigger
- **Şablonlama (Templating):** Handlebars (MPA yapısı için opsiyonel)
- **Tasarım ve Tipografi:** Vanilla CSS (Tasarım Sistemi Değişkenleri ile), Google Fonts (Epilogue, Inter, Montserrat)
- **CSS Framework Kısıtlaması:** Tailwind, Bootstrap vb. harici CSS kütüphaneleri KESİNLİKLE kullanılmayacaktır.

## Critical Implementation Rules

### Language-Specific Rules

- **Vanilla CSS ve Tasarım Sistemi:** Projede tasarım sistemi kurallarına kesinlikle uyulacaktır. Renk, tipografi ve boşluk (spacing) gibi tüm değerler `:root` üzerinde CSS değişkenleri olarak (örn: `var(--primary)`, `var(--surface)`) tanımlanmalı ve bileşenlerde sadece bu değişkenler kullanılmalıdır. Rastgele hex kodları veya ad-hoc (geçici) sınıflar kullanmak YASAKTIR.
- **GSAP Context Zorunluluğu:** Performans düşüşlerini ve bellek sızıntılarını (memory leak) engellemek adına, GSAP animasyonları daima `gsap.context()` veya uygun `cleanup` yöntemleriyle yönetilmelidir. Animasyonlar cihaz performansını asla düşürmemelidir.
- **ES6+ Modülaritesi:** JavaScript kodları tek bir büyük dosya yerine, modüler (`import/export`) yapıda, temiz ve ayrılmış bileşen (component) ya da yardımcı (utils) fonksiyonlar olarak düzenlenmelidir.
- **Erişilebilirlik ve Glassmorphism:** Glassmorphism efekti uygulanırken, velilerin (ebeveynlerin) kullanımı gözetilerek açıklayıcı metinlerin olduğu kısımlarda kontrast oranının (özellikle yarı saydam arka planlarda) en az `4.5:1` olmasına dikkat edilmelidir.

### Framework-Specific Rules

- **URL-First Tema Yönetimi (State Management):** Split Entry (Kız/Erkek yurdu) seçimi yapıldıktan sonra arayüzün teması ve renk paleti, geçici yerel durum (local state) yerine doğrudan URL üzerinden (örn. `/kiz-yurdu`, `/erkek-yurdu` veya `?theme=girls`) yönetilmelidir. Bu sayede sayfalar arası geçişlerde ve sayfa yenilemelerinde (refresh) tutarlılık sağlanır.
- **Bileşen Hiyerarşisi ve Şablonlama:** Geliştirme sürecinde Handlebars (veya benzeri bir şablon motoru) kullanılarak Header, Footer ve Glassmorphism Kartları gibi tekrar eden yapılar "partial" olarak modülerleştirilmelidir. Saf Vanilla JS bileşenleri de kendi içinde kapsüllenmiş (encapsulated) fonksiyonlar veya sınıflar halinde yazılmalıdır.
- **Split-Screen Animasyon Önceliği:** Sitenin kalbini oluşturan ana sayfa dikey "Split-Screen" açılış animasyonu (Sol: Kız Yurdu, Sağ: Erkek Yurdu, Ortada: Logo) projenin "WOW Faktörü"dür. Ajanlar bu bileşeni kodlarken render performansını maksimize etmeli ve sadece GPU hızlandırmalı CSS özelliklerini (`transform`, `opacity`) anime etmelidir.

### Testing Rules

- **Görsel ve Etkileşim Odaklı Testler:** Projenin kalbi "WOW Faktörü" ve akıcı animasyonlardır. İleride eklenecek uçtan uca (E2E) testler (örn. Playwright/Cypress), GSAP animasyonlarının doğru tetiklendiğini, ScrollTrigger noktalarının pürüzsüz çalıştığını ve responsive ekranlarda kırılma olmadığını doğrulamaya odaklanmalıdır.
- **Performans (Lighthouse) Testleri:** Sayfa geçişleri ve animasyonlar eklenirken Lighthouse metrikleri (özellikle "Cumulative Layout Shift" ve "First Contentful Paint") düzenli olarak kontrol edilmelidir. Premium hissiyatın yavaş yüklenme süreleriyle bozulmasına izin verilmemelidir.
- **Kontrast ve Okunabilirlik Kontrolleri:** Özellikle Glassmorphism (yarı saydam) bileşenler eklendiğinde veya değiştirildiğinde, kontrast oranları ve okunabilirlik, mobil cihaz ekranları (farklı parlaklık seviyeleri) göz önünde bulundurularak test edilmelidir.

### Code Quality & Style Rules

- **Semantik İsimlendirme:** Sınıf adları (class names), değişkenler ve fonksiyon isimleri daima işlevlerini net olarak belirtecek şekilde İngilizce yazılmalıdır (örn: `girlsDormSection`, `.hero-split-screen`, `initGSAP()`).
- **Prettier ve Formatlama:** Kod formatlanırken kullanıcı beklentilerine saygı duyulacak. Standart JS/HTML formatlarına (girintiler, tırnak işaretleri vb.) uyulacak ve projenin mevcut bir `.prettierrc` dosyası varsa kesinlikle ona riayet edilecektir.
- **Semantik HTML5 & SEO Önceliği:** Karmaşık ve anlamsız "div çorbası" (div soup) yapmaktan kaçınılmalıdır. Her sayfa SEO kurallarına uygun olarak sadece tek bir `<h1>` etiketine sahip olmalı; içerikler `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>` gibi HTML5 semantik etiketleriyle organize edilmelidir.
- **Kısa ve Modüler Fonksiyonlar:** JavaScript fonksiyonları "Tek Sorumluluk Prensibi"ne (Single Responsibility Principle) sadık kalmalı, gereğinden uzun ve yönetimi zor olan (spaghetti) yapıların oluşmasına izin verilmemelidir.

### Development Workflow Rules

- **Bellek Bankası (Memory Bank) Güncellemeleri:** Proje kuralları (Cline's Memory Bank) gereği, geliştirme aşamasında mimari kararlarda veya gereksinimlerde önemli bir değişiklik yapılırsa, `memory-bank/` altındaki dosyalar (özellikle `activeContext.md` ve `progress.md`) ilgili ajan tarafından anında Türkçe olarak güncellenmelidir. Her görevin başında bu dosyalar okunmalıdır.
- **Git ve Commit Alışkanlıkları:** Yapay zeka ajanları kodlama yaparken; mantıksal olarak bütünlüğü olan bir özelliği (örneğin Split-Screen yapısı) tamamladıklarında, durumu kaybetmemek adına anlamlı ve açıklayıcı commit mesajları ile (örn. `feat: split-screen HTML yapısı eklendi`) commit oluşturmayı önermeli/yapmalıdır.
- **Adım Adım İlerleme (Progressive Enhancement):** Karmaşık bileşenler (özellikle animasyonlu olanlar) tek bir koca adımda değil; önce semantik HTML iskeleti, ardından Vanilla CSS tasarımı ve en son GSAP JavaScript davranışları eklenecek şekilde sırayla (adım adım) inşa edilmelidir.

### Critical Don't-Miss Rules

- **Tailwind/Bootstrap Yasağı:** AI Ajanları alışkanlık gereği arayüz oluştururken yardımcı (utility) CSS sınıfları (örn. `flex`, `pt-4`, `text-center`) yazma eğilimindedir. Bu projede **KESİNLİKLE** Tailwind veya Bootstrap gibi framework'ler kullanılmayacaktır; her şey `index.css` içindeki Vanilla CSS ve Tasarım Sistemi (Design System) değişkenleriyle çözülecektir.
- **İletişim Kanalı Önceliği (WhatsApp vs. Telefon):** Ürün Gereksinimleri (PRD) belgesinde belirtildiği üzere; iletişim için öncelikli kanal WhatsApp **DEĞİLDİR**, doğrudan telefon görüşmesi amaçlanmaktadır. "Hemen Başvur" CTA (Call to Action) butonları veya iletişim alanları `tel:` protokolleriyle yapılandırılmalı, WhatsApp entegrasyonuna öncelik verilmemelidir.
- **GSAP ScrollTrigger Edge Case'leri:** Animasyonlar tasarlanırken, sayfa sonuna gelindiğinde (footer) veya çok hızlı scroll yapıldığında animasyonların kırılmasını önlemek adına, `ScrollTrigger` bileşenlerinin "refresh" döngüleri ve "markers" yapıları dikkatlice kontrol edilmeli, son kullanıcıya hatalı animasyon gösterilmemelidir.
- **"High-Level" Yanıt Yasağı:** Kullanıcı (Emrekolunsag) global kurallarında "DO NOT GIVE ME HIGH LEVEL SHIT" kuralını belirlemiştir. Ajanlar bir çözüm üretirken "şöyle yapabilirsiniz" tarzı genel geçer tavsiyeler yerine DAİMA doğrudan çalışan, entegre edilebilir gerçek kod blokları sunmak zorundadır.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2026-04-23
