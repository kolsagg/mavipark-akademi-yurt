---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-akademi_yurt.md
  - _bmad-output/planning-artifacts/product-brief-akademi_yurt-distillate.md
  - _bmad-output/project-context.md
  - memory-bank/activeContext.md
  - memory-bank/productContext.md
  - memory-bank/progress.md
  - memory-bank/projectbrief.md
  - memory-bank/systemPatterns.md
  - memory-bank/techContext.md
documentCounts:
  briefCount: 2
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 7
workflowType: 'prd'
---

# Product Requirements Document - akademi_yurt

**Author:** Emrekolunsag
**Date:** 2026-04-24

## Executive Summary

Akademi Suit, Sivas'taki premium öğrenci konaklama sektöründe dijital standartları yeniden belirlemeyi hedefleyen yenilikçi bir web platformudur. Standart, eski moda ve karmaşık yurt sitelerinin aksine; Gen-Z öğrencilerin dinamik estetik beklentilerini karşılayacak ve aynı anda ebeveynlere profesyonellik hissiyle güven verecek şeffaf bir yapı hedeflenmektedir. Platform, bilgi karmaşasını ortadan kaldırarak ziyaretçileri en hızlı şekilde doğru bilgiye ulaştırmak ve doğrudan telefon araması ile net bir dönüşüm sağlamak üzere kurgulanmıştır.

### What Makes This Special

Sistemi benzersiz kılan temel özellik, "Split-Screen" (Bölünmüş Ekran) giriş mimarisi ile kullanıcıların anında kendi deneyimlerini (Kız veya Erkek Yurdu) seçerek kişiselleştirilmiş bir arayüzle karşılaşmalarıdır. Uygulama; GSAP tabanlı akıcı mikro-animasyonlar ve Glassmorphism tasarım detayları kullanılarak sıradan bir yurt sitesinden ziyade "üst düzey butik otel" hissiyatı uyandırır. Kullanıcıyı uzun kayıt formları, karmaşık menüler veya WhatsApp konuşmalarıyla yormak yerine, doğrudan telefon araması ("Hemen Başvur") ile net iletişime yönlendiren hedefe odaklı bir strateji benimsenmiştir.

## Success Criteria

### User Success
- Gen-Z öğrencilerin ve ebeveynlerin siteye ilk girişte "üst düzey butik otel" kalitesini hissetmesi (WOW faktörü).
- Kullanıcıların karmaşık menülerde kaybolmadan saniyeler içinde "Kız Yurdu" veya "Erkek Yurdu" sayfalarına ulaşarak aradıkları bilgilere net bir şekilde erişmesi.
- Herhangi bir form doldurma veya mesajlaşma zahmetine girmeden tek tıkla doğrudan yurt yönetimiyle telefon iletişimine geçebilmeleri.

### Business Success
- **Dönüşüm Oranı:** Web sitesindeki "Hemen Başvur" (Apply Now) butonları üzerinden başlatılan doğrudan telefon aramalarında belirgin (ölçülebilir) bir artış.
- **Etkileşim (Engagement):** Bölünmüş ana ekran (Split-Screen) tercihinden sonra kullanıcıların iç sayfalarda (İmkanlar, Odalar vb.) daha fazla vakit geçirmesi ve sayfadan hemen çıkma oranının (bounce rate) düşmesi.
- Sivas bölgesindeki öğrenci yurtları arasında dijital kalite algısı olarak zirveye oturarak marka değerinin ve doluluk oranının artması.

### Technical Success
- **Performans:** Akıcı GSAP animasyonları kullanılmasına rağmen Lighthouse performans, erişilebilirlik ve SEO skorlarının 90+ seviyesinde olması.
- **Progressive Enhancement:** Düşük donanımlı eski mobil cihazlarda animasyonların sorunsuz çalışması veya otomatik azaltılarak donmaların engellenmesi.
- **Kusursuz Mobil Uyum:** Tasarım sistemindeki Glassmorphism detaylarının mobil cihazlarda da yeterli kontrast (okunabilirlik) sağlayarak kusursuz görünmesi.

## Product Scope & Phased Development

### MVP Strategy & Philosophy
**MVP Approach ("Experience MVP"):** Sistemin karmaşık backend, form veya veritabanı entegrasyonlarına ihtiyacı yoktur. Asıl amaç, en temel bilgileri "wow" dedirtecek premium bir görsel kalite ve kusursuz GSAP animasyonlarıyla sunarak kullanıcıyı doğrudan telefon aramasına (`tel:`) yönlendirmektir.
**Resource Requirements:** Sadece Frontend odaklı geliştirme. Sunucu tarafı kodlama gerekmez; HTML/CSS/Vanilla JS (Vite) ve GSAP uzmanlığı gerektirir.

### Phase 1: MVP Feature Set
- Bölünmüş Ana Ekran (Split Entry) animasyonu.
- Kız/Erkek yurdu için URL tabanlı farklı tema (renk/görsel) yükleme mekanizması.
- Glassmorphism detaylı, tam responsive Odalar, İmkanlar ve İletişim sayfaları.
- Tüm ekranlardan kolayca erişilebilen "Hemen Başvur" (Ara) CTA butonları.

### Phase 2: Growth Features
- Erken kayıt dönemleri için animasyonlu duyuru çubukları / pop-uplar.
- Kampüs, ulaşım ve Sivas rehberi gibi SEO destekleyici alt sayfalar.

### Phase 3: Vision & Expansion
- Odalar için 360 derece sanal tur entegrasyonu.
- Altyapının farklı konaklama projeleri için standart bir şablona (White-label çözüm) dönüştürülmesi.

### Risk Mitigation Strategy
- **Technical Risks:** GSAP animasyonlarının mobil cihazlarda kasması → `gsap.matchMedia()` kullanılarak donanım limitlerine göre animasyon sadeleştirmesi.
- **Market Risks:** Kullanıcıların form veya WhatsApp araması → Butik otel tasarımıyla güven vermek ve sitede alternatif iletişim bilgileri (adres/mail) sunmak.
- **Resource Risks:** LLM ile kodlama sırasında mimari karmaşa → Projeyi React/Tailwind gibi framework'ler olmadan Vanilla JS + CSS ile sade tutmak.

## User Journeys

### Journey 1: "İlk İzlenim Her Şeydir" (Zeynep, 18, Gen-Z Öğrenci)
**Situation:** Zeynep, Sivas'ta üniversiteyi yeni kazanmış ve modern, rahat, "premium" hissettiren bir yaşam alanı aramaktadır.
**The Journey:**
1. Zeynep, Google üzerinden siteye girer.
2. Site anında yüklenir ve dinamik "Split-Screen" animasyonuyla Kız/Erkek Yurdu seçeneği sunar (WOW etkisi).
3. "Kız Yurdu"na tıklar; arayüz akıcı bir GSAP animasyonuyla lila tonlarında bir temaya dönüşür.
4. Glassmorphism efektli şık kartlar üzerinden odaları ve imkanları inceler.
5. "Hemen Başvur" butonuna tıklar, telefon uygulaması açılır ve yurt yönetimini doğrudan arar.

### Journey 2: "Güven Arayışı" (Ahmet Bey, 50, Öğrenci Velisi)
**Situation:** Ahmet Bey kızını farklı bir şehre okumaya gönderecektir; güvenlik ve kurumsallık arar.
**The Journey:**
1. Kızı Zeynep ona site linkini gönderir. Ahmet Bey mobil cihazından girer.
2. Şeffaf ve profesyonel tasarım ona yurdun kurumsal olduğu mesajını verir.
3. Yarı saydam menüden "İmkanlar" detaylarını yüksek kontrastlı metinlerle rahatça okur.
4. Kayıt formu doldurup aranmayı beklemek yerine "Hemen Başvur" butonuna tıklar.
5. Doğrudan yurt yetkilisiyle görüşerek içini rahatlatır.

## Project-Type Requirements (Web App)

### Technical Architecture Considerations
- **Mimari Yaklaşım:** Vanilla JS ve Vite tabanlı MPA (Multi-Page Application). Framework (React vb.) veya CSS kütüphanesi (Tailwind vb.) kullanılmayacaktır.
- **Gerçek Zamanlı Veri:** Gerekli değil. Statik içerik + animasyonlar hedeflenmektedir.
- **SEO Stratejisi:** Semantik HTML5 yapısı ve alt sayfalar için benzersiz meta etiketleri kullanılacaktır.

### Browser & Platform Support
- Modern Tarayıcılar (Chrome, Safari, Firefox, Edge) için tam destek.
- Dikey veya özel mobil tasarımlı "Split-Screen" kurgusu.

## Functional Requirements

### 1. Tema ve Gezinme (Theming & Navigation)
- **FR1:** Kullanıcılar, siteye ilk girişte "Kız Yurdu" veya "Erkek Yurdu" olmak üzere iki farklı başlangıç noktasından (Split-Screen) birini seçebilir.
- **FR2:** Kullanıcılar, oturumları sırasında istedikleri an ana menü merkezinde bulunan switch üzerinden "Kız" veya "Erkek" bölümleri arasında geçiş yapabilir. Menü hiyerarşisi: [Ana Sayfa, Odalar] < Switch > [İmkanlar, İletişim].
- **FR3:** Sistem, seçilen yurt türüne (Kız/Erkek) göre tüm arayüz temasını, görselleri ve içerik bağlamını otomatik olarak güncelleyebilir.

### 2. İçerik Görüntüleme (Content Discovery)
- **FR4:** Kullanıcılar, yurtlarda sunulan oda tiplerini, odaların fotoğraflarını ve özelliklerini görüntüleyebilir.
- **FR5:** Kullanıcılar, yurdun sunduğu ortak alanları ve genel imkanları (güvenlik, temizlik, sosyal alanlar vb.) görüntüleyebilir.
- **FR6:** Kullanıcılar, yurdun açık adres, e-posta ve harita konum bilgilerini iletişim bölümünde görüntüleyebilir.

### 3. Doğrudan İletişim (Direct Communication)
- **FR7:** Kullanıcılar, sitenin tüm sayfalarında (ve mobil/masaüstü cihazlarda) her an erişilebilir olan bir eylem butonu ("Hemen Başvur" / "Ara") üzerinden doğrudan yurt yönetimini telefonla arayabilir (`tel:` etkileşimi).
- **FR8:** Görsel varlıklar (resim/ikon) için otomatik hata yakalama ve fallback (yedek) mekanizması bulunmalıdır.

## Non-Functional Requirements

### Performance
- **NFR-PERF-1:** Sayfanın LCP (Largest Contentful Paint) yükleme süresi standart ağ koşullarında 2.5 saniyenin altında gerçekleşmelidir.
- **NFR-PERF-2:** Google Lighthouse testlerinde masaüstü ve mobil platformlar için "Performance" ve "SEO" skorları minimum 90/100 olmalıdır.
- **NFR-PERF-3:** GSAP animasyonları 60 FPS hedeflenerek kodlanmalı; cihaz zorlanması tespit edilen tarayıcılarda veya `prefers-reduced-motion` aktif olduğunda animasyonlar otomatik olarak devre dışı bırakılmalı/basitleştirilmelidir.
- **NFR-PERF-4:** GSAP kullanımında memory leak (bellek sızıntısı) oluşmaması için sayfa geçişlerinde gerekli temizlikler (cleanup) yapılmalıdır.

### Accessibility
- **NFR-ACC-1:** Yarı saydam (Glassmorphism) arka planlar üzerine yerleştirilen tüm metinler, WCAG AA standartlarına uygun şekilde minimum 4.5:1 kontrast oranına sahip olmalıdır.
- **NFR-ACC-2:** Tüm etkileşimli buton ve bağlantılarda ekran okuyucular için doğru ve açıklayıcı `aria-label` nitelikleri kullanılmalıdır.
- **NFR-ACC-3:** Google Lighthouse testlerinde "Accessibility" skoru minimum 90/100 olmalıdır.
