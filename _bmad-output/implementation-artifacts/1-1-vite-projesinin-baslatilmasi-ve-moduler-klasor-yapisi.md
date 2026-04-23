# Story 1.1: Vite Projesinin Başlatılması ve Modüler Klasör Yapısı

**Epic:** 1 - Teknik Altyapı ve Tasarım Sistemi
**Story Key:** 1-1-vite-projesinin-baslatilmasi-ve-moduler-klasor-yapisi
**Status:** review

## 📖 Story Requirements (Hikaye Gereksinimleri)

**User Story:**
As a Geliştirici,
I want Vite tabanlı Vanilla JS projesini belirtilen modüler klasör yapısıyla kurmak,
So that Proje sürdürülebilir, hızlı ve mimari kararlara uygun bir temele sahip olur.

**Acceptance Criteria (Kabul Kriterleri):**
- **Given** Boş bir çalışma dizini
- **When** `npm create vite@latest . -- --template vanilla` komutu çalıştırıldığında (veya gerekli altyapı manuel kurulduğunda)
- **Then** Standart Vite Vanilla iskeleti oluşmalı
- **And** `src/core`, `src/styles/components`, `src/components`, `src/partials` klasörleri oluşturulmuş olmalı
- **And** `.htaccess` dosyası proje köküne eklenmiş olmalı

**Business Value & Context:**
Bu hikaye, "Akademi Suit" projesinin temelini atar. Modern bir frontend mimarisi ve cPanel (Static) hosting ile çalışacak bir MPA (Multi-Page Application) altyapısı için Vite ve modüler klasör yapısı zorunludur.

---

## 👨‍💻 Developer Context (Geliştirici Bağlamı)

> **CRITICAL:** Bu bölüm, mimari dokümanlardan ve BMad kurallarından çıkarılmış, geliştirici (Dev Agent) için kesinlikle uyulması gereken zorunlu kuralları içerir.

### 🛠 Technical Requirements (Teknik Gereksinimler)
- Vite yapılandırması Vanilla JS (ES6+) standartlarında olmalıdır. Typescript veya herhangi bir framework (React, Vue vb.) KESİNLİKLE KULLANILMAYACAKTIR.
- cPanel üzerinde statik hosting'de çalışacağı için Node.js tabanlı sunucu tarafı kod yazılmayacaktır.
- Performans için LCP (Largest Contentful Paint) hedefine (< 2.5s) uygun olarak en yalın iskelet oluşturulmalıdır.

### 🏗 Architecture Compliance (Mimari Uyumluluk)
- **Tech Stack:** Vite, Vanilla JS, CSS (Framework yasak).
- **Hosting Hedefi:** cPanel (Static). `.htaccess` dosyası, ileride eklenecek olan sanal yolların (örn: `/kiz`, `/erkek`) `index.html`'e yönlendirilmesi için URL-First routing stratejisine uygun şekilde proje köküne eklenmelidir.
- **Mimari Karar (Sıfır Form):** Proje başlangıcında form ögelerine ihtiyaç yoktur.

### 📚 Library & Framework Requirements (Kütüphane ve Çatı Kuralları)
- Sadece `vite` ve gerekiyorsa `vite-plugin-handlebars` (bir sonraki story'de de yapılandırılabilir ama iskelette yeri olmalı) eklentileri kurulacaktır.
- İleride kullanılacak olan GSAP 3.x projeye şu aşamada dahil edilebilir veya iskelette bırakılabilir, ancak Tailwind vb. CSS framework'leri KESİNLİKLE yüklenmemelidir.

### 📂 File Structure Requirements (Dosya Yapısı Kuralları)
Oluşturulması gereken ZORUNLU klasör yapısı şöyledir:
```text
akademi_yurt/
├── .htaccess                 # URL-First routing for cPanel
├── vite.config.js            # Vite yapılandırması
├── index.html                # Single entry point
├── src/
│   ├── main.js               # Bootstrap & Global state
│   ├── core/
│   │   └── (boş kalabilir, ThemeManager.js eklenecek)
│   ├── styles/
│   │   ├── components/       # Scoped BEM styles için
│   ├── components/           # Modular UI bileşenleri için
│   └── partials/             # Handlebars eklentisi için
├── public/assets/            # Statik dosyalar
```
*Not: Git'in boş klasörleri takip edebilmesi için ilgili klasörlere `.gitkeep` dosyası ekleyebilirsiniz.*

### 🧪 Testing Requirements (Test Kuralları)
- Projenin `npm run dev` komutuyla sorunsuz çalıştığı test edilmelidir.
- `npm run build` komutunun hatasız bir şekilde `dist/` klasörünü ürettiği doğrulanmalıdır.

### 🌐 Latest Tech Information (Güncel Teknoloji Bilgileri)
- Vite projeyi başlatmak için önerilen komut: `npm create vite@latest . -- --template vanilla`. Eğer klasör boş değilse (`.git` veya BMad dosyaları varsa), `npm create vite@latest . -- --template vanilla` çalışmayabilir. Bu durumda eksik `package.json`, `vite.config.js` vb. dosyalar manuel oluşturulabilir veya gereksinimler manuel yüklenebilir (`npm init -y` ve `npm install vite --save-dev`).

### 🔗 Project Context Reference (Proje Bağlamı Referansı)
Tüm işlemler, BMad'in `project-context.md` dosyasında belirtilen kodlama standartlarına ve mimari dokümana (`architecture.md`) uygun yapılmalıdır.

## ✅ Tasks / Subtasks (Görevler)

- [x] **Task 1: Vite Vanilla JS projesini başlat**
  - [x] 1.1: Mevcut dosyaları bozmadan `package.json` ve Vite bağımlılıklarını oluştur
  - [x] 1.2: `vite.config.js` dosyasını MPA yapısına uygun şekilde yapılandır
  - [x] 1.3: `index.html` giriş noktasını oluştur
  - [x] 1.4: `src/main.js` bootstrap dosyasını oluştur

- [x] **Task 2: Modüler klasör yapısını oluştur**
  - [x] 2.1: `src/core/` klasörünü oluştur (.gitkeep)
  - [x] 2.2: `src/styles/` ve `src/styles/components/` klasörlerini oluştur (.gitkeep)
  - [x] 2.3: `src/components/` klasörünü oluştur (.gitkeep)
  - [x] 2.4: `src/partials/` klasörünü oluştur (.gitkeep)
  - [x] 2.5: `public/assets/` klasörünü oluştur (.gitkeep)

- [x] **Task 3: `.htaccess` dosyasını oluştur**
  - [x] 3.1: URL-First routing stratejisine uygun `.htaccess` kurallarını yaz

- [x] **Task 4: Doğrulama ve test**
  - [x] 4.1: `npm run dev` komutunun sorunsuz çalıştığını doğrula
  - [x] 4.2: `npm run build` komutunun hatasız `dist/` ürettiğini doğrula

---

## 📝 Dev Agent Record (Geliştirici Ajan Kaydı)

### Debug Log
- Port 3000 meşgul olduğunda Vite otomatik olarak 3001'e geçti. Sonraki testte `--port 3333` ile sıfırdan test edildi, HTTP 200 alındı.
- Klasör yapısı oluşturulurken `mkdir -p` ile önce dizinler yaratıldı, ardından `.gitkeep` dosyaları eklendi.

### Implementation Plan
- **Yaklaşım:** Mevcut projede `.git`, `_bmad/`, `memory-bank/` gibi dosyalar bulunduğu için `npm create vite` yerine manuel kurulum tercih edildi (Story Dev Notes'ta da bu senaryo belirtilmiş).
- **package.json:** `"type": "module"` ile ES6+ modül desteği, `"private": true` ile yanlışlıkla npm publish'i engelleme.
- **vite.config.js:** MPA yapısı için `rollupOptions.input` ile açık entry point tanımı. `publicDir: 'public'` statik dosyalar için.
- **index.html:** Türkçe `lang="tr"`, SEO meta description, favicon referansı.
- **main.js:** Minimal bootstrap — DOMContentLoaded ile init, `#app` mount noktası. İlerideki story'ler ThemeManager, GSAP vb. ekleyecek.
- **main.css:** Minimal reset + base styles. Design tokens Story 1.2'de gelecek.
- **.htaccess:** URL-First routing (kiz/erkek path'leri → index.html), dotfile güvenliği, gzip compression, browser caching.

### Completion Notes
- ✅ Task 1: Vite Vanilla JS projesi başarıyla başlatıldı. `package.json`, `vite.config.js`, `index.html`, `src/main.js` oluşturuldu.
- ✅ Task 2: Tüm modüler klasörler (`src/core`, `src/styles/components`, `src/components`, `src/partials`, `public/assets`) `.gitkeep` ile oluşturuldu.
- ✅ Task 3: `.htaccess` dosyası URL-First routing, güvenlik ve performans kurallarıyla oluşturuldu.
- ✅ Task 4: `npm run dev` HTTP 200 döndü, `npm run build` hatasız `dist/` üretti (5 modül, 419ms).

---

## 📁 File List (Dosya Listesi)

### Oluşturulan Dosyalar (New)
- `package.json` — Proje manifest, Vite dev dependency
- `vite.config.js` — MPA yapılandırması
- `index.html` — Single entry point
- `src/main.js` — Bootstrap & global state
- `src/styles/main.css` — Base styles & reset
- `.htaccess` — cPanel URL-First routing
- `src/core/.gitkeep`
- `src/styles/components/.gitkeep`
- `src/components/.gitkeep`
- `src/partials/.gitkeep`
- `public/assets/.gitkeep`

### Otomatik Oluşturulan (Auto-generated)
- `package-lock.json` — npm lock file
- `node_modules/` — Bağımlılıklar (gitignore'da)

---

## 📋 Change Log (Değişiklik Günlüğü)
- **2026-04-24:** Story 1.1 implementasyonu tamamlandı. Vite Vanilla JS projesi başlatıldı, modüler klasör yapısı oluşturuldu, .htaccess eklendi. Tüm kabul kriterleri karşılandı.

---

**Completion Status:**
- [x] Ultimate context engine analysis completed - comprehensive developer guide created

