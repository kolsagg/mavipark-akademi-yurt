# Retrospective: Epic 1 - Teknik Altyapı ve Tasarım Sistemi

**Tarih:** 2026-04-24
**Epic:** 1 - Teknik Altyapı ve Tasarım Sistemi
**Katılımcılar:** Amelia (Dev), Alice (PO), Charlie (Senior Dev), Dana (QA), Elena (Junior Dev), Emrekolunsag (Project Lead)

## 🎯 Epic Özeti
Bu epic kapsamında Akademi Suit projesinin teknolojik temelleri atılmış, modüler klasör yapısı kurulmuş ve tasarım sistemi (Tokens + Handlebars) yapılandırılmıştır. Proje, premium bir MPA (Multi-Page Application) deneyimi sunmak üzere cPanel hosting ve yüksek performans hedefleriyle başlatılmıştır.

## ✅ Neler İyi Gitti?
- **Modüler Yapı:** Klasör yapısı (`src/core`, `src/styles`, `src/components`) temiz ve ölçeklenebilir bir şekilde kuruldu.
- **Tasarım Sistemi:** Üç katmanlı token yapısı (Primitive → Semantic → Theme Override) başarıyla uygulandı. Bu, Epic 2'deki tema geçişleri için sağlam bir zemin hazırladı.
- **Handlebars Entegrasyonu:** SEO metadataları ve tekrarlayan HTML blokları için partials yapısı başarıyla kuruldu.
- **Performans Odaklılık:** Google Fonts optimizasyonları ve minimal CSS resetleri ile LCP hedeflerine uygun bir başlangıç yapıldı.
- **URL-First Stratejisi:** `.htaccess` üzerinden kurgulanan routing yapısı statik hosting için optimize edildi.

## ⚠️ Karşılaşılan Zorluklar ve Çözümler
- **Vite Kurulumu:** Proje dizini boş olmadığı için `npm create vite` yerine manuel kurulum yapıldı.
- **Handlebars Context:** Partial'lar içinde context değişkenlerinin kullanımı ve varsayılan değer atamaları (`or` helper) başlangıçta deneme-yanılma gerektirdi.
- **Renk Tanımları:** İlk başta hardcoded olan RGBA değerleri, ilerideki esneklik için `rgb` değişkenleri üzerinden yeniden yapılandırıldı.

## 💡 Öğrenilen Dersler
1. **Dinamik Opasite:** CSS renk değişkenlerinde `rgb` değerlerini ayrı saklamak (`--color-white-rgb: 255, 255, 255`), `rgba(var(--color-white-rgb), 0.7)` gibi dinamik kullanımlar için kritiktir.
2. **SEO Önceliği:** Handlebars partials kullanımı, projenin en başından SEO tutarlılığını sağlamak için vazgeçilmezdir.
3. **Statik Güvenlik:** `.htaccess` içinde `.well-known` gibi dizinlere erişim izni verilmesi (SSL vb. için) unutulmamalıdır.

## 🚀 Epic 2 Hazırlık ve Aksiyon Planı
1. **GSAP Entegrasyonu:** Preloader ve Split-Screen için GSAP 3.x kütüphanesi projeye dahil edilecek.
2. **ThemeManager Gelişimi:** `body[data-theme]` kontrolü için merkezi bir JS sınıfı oluşturulacak.
3. **Mobil Deneyim:** Split-Screen'in mobil (v-split) görünümü için medya sorguları ve dokunma hedefleri optimize edilecek.

## 🏁 Sonuç
Epic 1 tüm kabul kriterlerini %100 karşılayarak tamamlanmıştır. Teknik borç minimal düzeydedir ve proje görsel yoğunluklu Epic 2 aşamasına geçmeye hazırdır.
