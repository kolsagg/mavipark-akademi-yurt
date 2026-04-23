# Story 1.1: Vite Projesinin Başlatılması ve Modüler Klasör Yapısı

**Epic:** 1 - Teknik Altyapı ve Tasarım Sistemi
**Story Key:** 1-1-vite-projesinin-baslatilmasi-ve-moduler-klasor-yapisi
**Status:** ready-for-dev

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

---
**Completion Status:**
- [x] Ultimate context engine analysis completed - comprehensive developer guide created
