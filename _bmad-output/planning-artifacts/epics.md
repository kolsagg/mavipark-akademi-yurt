---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# Akademi Suit - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Akademi Suit, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Kullanıcılar, siteye ilk girişte "Kız Yurdu" veya "Erkek Yurdu" olmak üzere iki farklı başlangıç noktasından (Split-Screen) birini seçebilir.
FR2: Kullanıcılar, oturumları sırasında istedikleri an ana menü üzerinden "Kız" veya "Erkek" bölümleri arasında geçiş yapabilir.
FR3: Sistem, seçilen yurt türüne göre tüm arayüz temasını, görselleri ve içerik bağlamını (Kız: Lila, Erkek: Çelik Mavisi) otomatik olarak güncelleyebilir.
FR4: Kullanıcılar, oda tiplerini, fotoğraflarını ve özelliklerini görüntüleyebilir.
FR5: Kullanıcılar, yurdun sunduğu ortak alanları ve genel imkanları (güvenlik, temizlik vb.) görüntüleyebilir.
FR6: Kullanıcılar, yurdun açık adres, e-posta ve harita konum bilgilerini iletişim bölümünde görüntüleyebilir.
FR7: Kullanıcılar, sitenin tüm sayfalarında her an erişilebilir olan bir eylem butonu ("Hemen Başvur" / "Ara") üzerinden doğrudan yurt yönetimini telefonla arayabilir (tel: etkileşimi).

### NonFunctional Requirements

NFR1: Sayfanın LCP (Largest Contentful Paint) yükleme süresi standart ağ koşullarında 2.5 saniyenin altında gerçekleşmelidir.
NFR2: Google Lighthouse testlerinde masaüstü ve mobil platformlar için "Performance" ve "SEO" skorları minimum 90/100 olmalıdır.
NFR3: GSAP animasyonları 60 FPS hedeflenerek kodlanmalı; prefers-reduced-motion aktif olduğunda animasyonlar otomatik olarak devre dışı bırakılmalı/basitleştirilmelidir.
NFR4: GSAP kullanımında memory leak (bellek sızıntısı) oluşmaması için sayfa geçişlerinde gerekli temizlikler (cleanup) yapılmalıdır.
NFR5: Yarı saydam (Glassmorphism) arka planlar üzerine yerleştirilen tüm metinler, WCAG AA standartlarına uygun şekilde minimum 4.5:1 kontrast oranına sahip olmalıdır.
NFR6: Tüm etkileşimli buton ve bağlantılarda ekran okuyucular için doğru ve açıklayıcı aria-label nitelikleri kullanılmalıdır.
NFR7: Google Lighthouse testlerinde "Accessibility" skoru minimum 90/100 olmalıdır.

### Additional Requirements

- AR1: Vite Vanilla projesi başlatılmalı (npm create vite@latest . -- --template vanilla).
- AR2: Modüler folder organizasyonu (src/core, src/styles, src/components, src/partials) uygulanmalı.
- AR3: Handlebars Partials (vite-plugin-handlebars) kullanılarak reusable UI blokları ve SEO iyileştirmesi sağlanmalı.
- AR4: ThemeManager.js ile URL/Path tabanlı tema yönetimi ve body[data-theme] attribute uygulaması yapılmalı.
- AR5: Tüm GSAP animasyonları gsap.context() içinde kapsüllenmeli ve cleanup fonksiyonları eklenmeli.
- AR6: CSS isimlendirmesinde BEM (Block Element Modifier) metodolojisi zorunludur.
- AR7: design-tokens.css üzerinden merkezi CSS değişkenleri (renk, tipografi, boşluk) kullanılmalı.
- AR8: cPanel (Static) hosting için .htaccess URL yönlendirme stratejisi izlenmeli.

### UX Design Requirements

UX-DR1: Açılışta 100vh yüksekliğinde, masaüstünde 50vw/50vw, mobilde 50vh/50vh dinamik Split-Screen Hero girişi uygulanmalı.
UX-DR2: İçerik kartları backdrop-filter: blur() ve transparan beyaz zemin ile "Premium Butik Otel" hissi vermeli.
UX-DR3: Sabit (Floating) CTA butonu; mobilde tel: araması, masaüstünde numara kopyalama (Toast bildirimi ile) yapmalı.
UX-DR4: Tipografi: Başlıklar için Epilogue/Montserrat (Bold), gövde için Inter (line-height: 1.6).
UX-DR5: Hover ve ScrollTrigger animasyonları (fade-in/up) ile akıcı kullanıcı deneyimi sağlanmalı.
UX-DR6: Kız/Erkek seçimi sonrası history.pushState() ile sayfa yenilenmeden geçiş yapılmalı.
UX-DR7: Görsel yükleme süresince marka logolu zarif bir Preloader gösterilmeli.
UX-DR8: Mobil dokunma hedefleri minimum 44x44px olmalı.

### FR Coverage Map

FR1: Epic 2 - Split-Screen Giriş
FR2: Epic 2 - Menü üzerinden tema geçişi
FR3: Epic 2 - Dinamik tema ve içerik güncelleme
FR4: Epic 3 - Oda tipleri ve özellikleri görüntüleme
FR5: Epic 3 - Ortak alanlar ve imkanlar görüntüleme
FR6: Epic 4 - İletişim bilgilerini görüntüleme
FR7: Epic 4 - Hemen Başvur (tel:) etkileşimi

## Epic List

## Epic 1: Teknik Altyapı ve Tasarım Sistemi
Kullanıcılar sitenin yüksek performanslı iskeletine ve tutarlı, premium bir görsel kimliğe (Tasarım Sistemi) sahip olur.
**FRs covered:** AR1, AR2, AR3, AR6, AR7, UX-DR4, UX-DR10.

### Story 1.1: Vite Projesinin Başlatılması ve Modüler Klasör Yapısı

As a Geliştirici,
I want Vite tabanlı Vanilla JS projesini belirtilen modüler klasör yapısıyla kurmak,
So that Proje sürdürülebilir, hızlı ve mimari kararlara uygun bir temele sahip olur.

**Acceptance Criteria:**

**Given** Boş bir çalışma dizini
**When** `npm create vite@latest . -- --template vanilla` komutu çalıştırıldığında
**Then** Standart Vite Vanilla iskeleti oluşmalı
**And** `src/core`, `src/styles/components`, `src/components`, `src/partials` klasörleri oluşturulmuş olmalı
**And** `.htaccess` dosyası proje köküne eklenmiş olmalı

### Story 1.2: Tasarım Sistemi (Tokens) ve Handlebars Kurulumu

As a Geliştirici,
I want CSS değişkenlerini (tokens) tanımlamak ve Handlebars eklentisini yapılandırmak,
So that Tüm bileşenler merkezi bir tasarım dilinden beslenir ve HTML kodları modüler hale gelir.

**Acceptance Criteria:**

**Given** Başlatılmış bir Vite projesi
**When** `design-tokens.css` dosyası oluşturulup :root altında değişkenler (lila, çelik mavisi, fontlar) tanımlandığında
**Then** Bu değişkenler tüm projede kullanılabilir olmalı
**And** `vite-plugin-handlebars` yapılandırılmış ve ilk Partial başarıyla çağrılmış olmalı
**And** Google Fonts (Epilogue, Inter) bağlantıları kurulmuş olmalı

## Epic 2: Split-Screen Giriş ve Dinamik Temalandırma
Ziyaretçiler siteye girdiklerinde "WOW" etkisi yaratan bir açılışla karşılanır ve Kız/Erkek tercihlerine göre anında kişiselleştirilmiş bir temaya geçiş yaparlar.
**FRs covered:** FR1, FR2, FR3, AR4, UX-DR1, UX-DR6, UX-DR8.

### Story 2.1: Marka Logolu Preloader Animasyonu

As a Ziyaretçi,
I want Sayfa yüklenirken marka logosunun olduğu zarif bir animasyon görmek,
So that İçerik yüklenene kadar premium bir bekleme deneyimi yaşarım.

**Acceptance Criteria:**

**Given** Sayfa yüklenme aşamasındayken
**When** İlk baytlar alındığında
**Then** Marka logolu, cam (glass) efektli bir preloader katmanı görünmeli
**And** İçerik hazır olduğunda preloader akıcı bir GSAP animasyonuyla yerini ana sayfaya bırakmalı

### Story 2.2: Dikey Split-Screen Hero Yapısı ve Giriş Animasyonu

As a Ziyaretçi,
I want Ana sayfada dikey olarak bölünmüş (Kız/Erkek) iki alan görmek,
So that Tercihimi görsel bir şölen eşliğinde yapabilirim.

**Acceptance Criteria:**

**Given** Preloader kapandığında
**When** Masaüstünde 50vw/50vw, mobilde 50vh/50vh dikey bölünmüş iki panel göründüğünde
**Then** GSAP ile panellerin zıt yönlerden kayarak gelme animasyonu tetiklenmeli
**And** Her panelin üzerinde ilgili yurdun ismi ve çağrışım yapan görselleri bulunmalı

### Story 2.3: ThemeManager.js ve URL-First Tema Mantığı

As a Geliştirici,
I want Temayı URL parametrelerine göre yöneten merkezi bir script yazmak,
So that Kullanıcı tercihi sayfalar arasında tutarlı bir şekilde korunur.

**Acceptance Criteria:**

**Given** Kullanıcı bir panele tıkladığında
**When** history.pushState() ile URL güncellendiğinde (örn: ?type=girls)
**Then** ThemeManager.js bu değişikliği yakalayıp body'ye data-theme="girls" eklemeli
**And** CSS değişkenleri anında güncellenmeli (Lila veya Çelik Mavisi)

### Story 2.4: Dinamik Navigasyon ve Bölüm Değiştirici

As a Kullanıcı,
I want Sayfalar arasında gezerken istediğim an Kız/Erkek bölümleri arasında geçiş yapabilmek,
So that Her iki yurdu da kolayca inceleyebilirim.

**Acceptance Criteria:**

**Given** Kullanıcı sitenin herhangi bir yerindeyken
**When** Navigasyondaki "Kız/Erkek" anahtarına tıkladığında
**Then** Sayfa yenilenmeden tema ve içerik bağlamı güncellenmeli
**And** Menü tasarımı cam efektine ve seçili temaya uygun olmalı

## Epic 3: Odalar ve İmkanlar (Keşif Deneyimi)
Kullanıcılar yurt imkanlarını ve oda tiplerini premium cam (Glassmorphism) kartlar ve akıcı animasyonlarla detaylıca inceler.
**FRs covered:** FR4, FR5, UX-DR2, UX-DR5.

### Story 3.1: Glassmorphism Kart Bileşeni Tasarımı
As a Geliştirici,
I want yeniden kullanılabilir bir cam efektli kart bileşeni oluşturmak,
So that tüm içerikler premium estetiğe uygun şekilde sergilenir.

**Acceptance Criteria:**
**Given** İçerik listesi hazır olduğunda
**When** `backdrop-filter: blur()` ve transparan arka planlı kartlar oluşturulduğunda
**Then** Kartlar okunabilirliği yüksek ve modern bir yapıda olmalı
**And** Hover durumunda hafif transform animasyonları içermeli

### Story 3.2: Dinamik Oda Tipleri ve Özellikleri Paneli
As a Ziyaretçi,
I want seçtiğim yurdun oda tiplerini ve özelliklerini görmek,
So that ihtiyacıma uygun odayı seçebilirim.

**Acceptance Criteria:**
**Given** Kullanıcı oda tipleri bölümüne geldiğinde
**When** Seçili temaya göre (Kız/Erkek) renk paleti güncellendiğinde
**Then** Her oda için görsel ve özellikler cam kartlar içinde listelenmeli

### Story 3.3: Genel İmkanlar ve Ortak Alanlar Tanıtımı
As a Ziyaretçi,
I want yurdun sunduğu genel imkanları incelemek,
So that konaklama konforu hakkında fikir sahibi olabilirim.

**Acceptance Criteria:**
**Given** Yurt genel özellikleri listelendiğinde
**When** Semantik HTML yapısı kullanıldığında
**Then** Güvenlik, temizlik, sosyal alanlar gibi bilgiler net bir şekilde sunulmalı

### Story 3.4: ScrollTrigger ile Akıcı İçerik Animasyonları
As a Ziyaretçi,
I want sayfayı kaydırdıkça içeriklerin pürüzsüzce belirmesini görmek,
So that sitede gezinmek bir deneyime dönüşür.

**Acceptance Criteria:**
**Given** Kullanıcı sayfayı aşağı kaydırdığında
**When** GSAP ScrollTrigger noktalarına ulaşıldığında
**Then** Kartlar fade-in-up animasyonuyla 60 FPS akıcılığında ekrana gelmeli

## Epic 4: İletişim ve Doğrudan Başvuru (Dönüşüm)
Kullanıcılar her an erişilebilir "Hemen Başvur" butonu ile form doldurma zahmetine girmeden yurt yönetimini doğrudan arayabilir.
**FRs covered:** FR6, FR7, UX-DR3, UX-DR9.

### Story 4.1: Sabit (Floating) CTA Bileşeni
As a Kullanıcı,
I want sayfanın her yerinde erişilebilir bir "Hemen Başvur" butonu görmek,
So that yurdu istediğim an doğrudan arayabilirim.

**Acceptance Criteria:**
**Given** Sayfa üzerinde gezinirken
**When** Floating butona tıklandığında
**Then** Mobilde `tel:` protokolü tetiklenmeli, masaüstünde numara kopyalama/gösterme aksiyonu gerçekleşmeli

### Story 4.2: İletişim Bilgileri ve Harita Entegrasyonu
As a Kullanıcı,
I want yurdun açık adresini ve konumunu harita üzerinden görmek,
So that yurda nasıl ulaşacağımı öğrenebilirim.

**Acceptance Criteria:**
**Given** İletişim bölümüne gelindiğinde
**When** Google Haritalar iframe/link entegrasyonu sağlandığında
**Then** Konum bilgisi doğru ve etkileşimli olmalı

## Epic 5: Optimizasyon, SEO ve Performans Cilalaması
Sitenin performansı, erişilebilirliği ve arama motoru görünürlüğü premium standartlara (90+ Lighthouse) çıkarılır.
**FRs covered:** NFR1-NFR7, AR5, AR8, UX-DR7.

### Story 5.1: SEO Metadataları ve Semantik HTML Optimizasyonu
As a Geliştirici,
I want her sayfa için doğru meta verilerini ve HTML hiyerarşisini kurmak,
So that site arama motorlarında üst sıralarda yer alır.

**Acceptance Criteria:**
**Given** Tüm sayfalar hazır olduğunda
**When** Title, description ve H1 etiketleri kontrol edildiğinde
**Then** Lighthouse SEO skoru minimum 90/100 olmalı

### Story 5.2: Görsel Optimizasyon ve Lighthouse Performans Cilalaması
As a Geliştirici,
I want görselleri sıkıştırmak ve performansı optimize etmek,
So that site saniyeler içinde yüklenir.

**Acceptance Criteria:**
**Given** Performans testi yapıldığında
**When** LCP 2.5 saniyenin altına düştüğünde
**Then** Lighthouse Performance skoru minimum 90/100 olmalı

### Story 5.3: Erişilebilirlik (A11y) ve Kontrast Denetimi
As a Kullanıcı,
I want sitenin herkes tarafından rahatça okunabilmesini sağlamak,
So that erişilebilirlik standartlarına uyulur.

**Acceptance Criteria:**
**Given** Erişilebilirlik testi yapıldığında
**When** Kontrast oranları 4.5:1 üzerinde olduğunda
**Then** Lighthouse Accessibility skoru minimum 90/100 olmalı

