---
title: "Product Brief: akademi_yurt"
status: "complete"
created: "2026-04-24T00:09:00+03:00"
updated: "2026-04-24T00:13:00+03:00"
inputs: ["reference/mobile/akademi_suit_design_system/DESIGN.md", "memory-bank/projectbrief.md", "memory-bank/productContext.md"]
---

# Product Brief: Akademi Suit Web Projesi

## Yönetici Özeti (Executive Summary)
Akademi Suit, Sivas'ta yer alan premium bir öğrenci yurdudur. Bu proje, yurdun dijital varlığını modernleştirerek hem Gen-Z öğrencilerinin dinamik estetik beklentilerini karşılamayı hem de ebeveynlere güven aşılamayı hedefler. Benzersiz bir "Bölünmüş Ekran (Split-Screen)" giriş yapısıyla kullanıcıları doğrudan hedef kitlelerine (Kız/Erkek) göre kişiselleştirilmiş bir yolculuğa çıkarır ve "Hemen Başvur" stratejisiyle yüksek dönüşüm oranları sağlamayı amaçlar.

## Problem
Mevcut öğrenci yurdu web siteleri genellikle eski moda, karmaşık ve profesyonellikten uzaktır. 
- **Öğrenciler (Gen-Z):** Estetikten yoksun, mobil uyumu zayıf ve yavaş siteler yüzünden yurt kalitesini dijitalde hissedemiyor.
- **Veliler:** Net bilgiye ulaşamama, karmaşık navigasyon ve güven vermeyen tasarımlar sebebiyle karar verme sürecinde zorlanıyor.
- **İşletme:** Eski tasarımlar, sunulan "premium" hizmeti yansıtamadığı için potansiyel müşteri kaybına yol açıyor.

## Çözüm
Modern web teknolojileriyle (Vite, Vanilla JS, GSAP) inşa edilmiş, "Wow" faktörüne sahip bir web deneyimi.
- **Kişiselleştirilmiş Yolculuk:** Ana sayfadan itibaren Kız (Lilac tonları) ve Erkek (Steel Blue tonları) yurdu olarak ikiye ayrılan, Glassmorphism detaylarıyla süslenmiş bir arayüz.
- **Premium Estetik & Akıcılık:** GSAP destekli mikro-animasyonlar ve temiz, minimalist bir yüzey (Surface White) ile desteklenen şık tasarım.
- **Net Yönlendirme:** Karmaşıklıktan uzak, doğrudan iletişime ve aksiyona odaklanan bir yapı.

## Bizi Farklı Kılan Ne?
- **Tasarım Kalitesi:** Bölgede standartlaşmış vasat yurt sitelerinden sıyrılarak "üst düzey butik otel" hissiyatı veren bir UI/UX.
- **Split-Screen Mimarisi:** Ziyaretçinin siteye adım atar atmaz kendi deneyimini seçmesini sağlayan cesur bir giriş.
- **Doğrudan İletişim Stratejisi:** WhatsApp karmaşası yerine doğrudan ve güvenilir telefon iletişimini merkeze alan "Apply Now" (Hemen Başvur) kurgusu.

## Kimlere Hizmet Ediyor?
1. **Üniversite Öğrencileri (Gen-Z):** Birincil kullanıcı. Hızlı karar veren, görselliğe önem veren, modern ve rahat bir yaşam alanı arayan kitle.
2. **Ebeveynler:** İkincil ama karar verici kullanıcı. Güvenlik, kalite, net bilgi ve profesyonel bir iletişim arayan kitle.

## Başarı Kriterleri
- **Dönüşüm Oranı:** Siteden başlatılan doğrudan telefon aramalarında (Apply Now butonu üzerinden) artış.
- **Performans:** Yüksek GSAP animasyonlarına rağmen düşük sayfa yükleme süreleri (Lighthouse'ta yüksek skor).
- **Etkileşim:** Bölünmüş ana ekran sonrasında iç sayfalara (Örn: İmkanlar/Amenities) geçiş oranının yüksekliği.

## Kapsam
- **Dahil Olanlar:** Bölünmüş Ana Ekran (Split Entry), Kız Yurdu Sayfası, Erkek Yurdu Sayfası, İmkanlar (Amenities) Sayfası, İletişim (Contact) Sayfası. Tasarım sisteminin (DESIGN.md) birebir uygulanması. Düşük performanslı cihazlar (eski akıllı telefonlar vb.) için GSAP animasyonlarını azaltan **Progressive Enhancement / Fallback** stratejisi.
- **Kapsam Dışı:** Online ödeme sistemleri, öğrenci portalı/login sistemleri, **herhangi bir form kullanımı** (iletişim, rezervasyon vs.), **WhatsApp entegrasyonu**. Her türlü dönüşüm (conversion) doğrudan telefon araması üzerinden gerçekleşecektir.

## Vizyon
Başarılı olduğu takdirde, bu platform Sivas'taki diğer premium yurt veya konaklama yatırımları için bir şablon haline gelecek; öğrenci konaklamasında dijital dönüşümün ve marka kalitesinin bölgedeki standart belirleyicisi olacaktır.
