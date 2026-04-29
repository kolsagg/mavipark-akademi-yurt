# Deferred Work Log

## Deferred from: code review of 5-3-erisilebilirlik-a11y-ve-kontrast-denetimi (2026-04-28)

- **Footer A11y Denetimi**: `_footer.hbs` dosyası henüz oluşturulmadığı için erişilebilirlik denetimi yapılamadı. Story 5.3 tamamlandıktan sonra ele alınacak. (Reason: Bu story bittikten sonra geliştirilecek)

## Deferred from: code review of 6-4-kart-ve-ui-sadelestirme (2026-04-30)

- **justify-content: center kullanımı kaynaklı taşma riski [src/styles/components/_room-panel.css:48]**: Oda kartı footer alanında buton kaldırıldıktan sonra tekil rozet merkeze alındı. Eğer gelecekte buraya daha fazla bilgi eklenirse yerleşim bozulabilir. Şu anki sade tasarım için kabul edilebilir.

## Deferred from: code review of 3-1-glassmorphism-kart-bileseni-tasarimi (2026-04-25)
- **Main JS Senkron Import Yükü**: Tüm bileşen modülleri main.js içinde senkron olarak import ediliyor. Proje büyüdükçe dynamic import (lazy loading) stratejisine geçilmesi gerekebilir.

## Deferred from: code review of story-3.3 (2026-04-26)
- Görseller için eksik fallback (amenities.js): Unsplash URL'leri patlarsa placeholder gösterilmesi planlanmalı.
- innerHTML performansı (AmenitiesPanel.js): Liste büyürse DOM parçacıkları veya sanallaştırma düşünülmeli.

## Deferred from: code review of 3-4-scrolltrigger-ile-akici-icerik-animasyonlari (2026-04-26)
- **Sabit Trigger Noktaları**: Tüm reveal animasyonları `top 85%` kullanıyor; bazı uzun içerikler için özel trigger noktaları gerekebilir.
- **A11y Fallback Eksikliği**: `revealImmediately` sadece temel değerleri sıfırlıyor; çok karmaşık animasyon durumları eklenirse daha kapsamlı bir temizlik gerekebilir.

## Deferred from: code review of 4-1-sabit-floating-cta-bileseni.md (2026-04-26)

- Manuel initialization listesi büyümesi (Architectural debt) [src/main.js:24] — Her yeni bileşen için manuel init satırı eklenmesi ileride bakımı zorlaştırabilir.
- yurt.html içinde kod tekrarı (Layout sistemi eksikliği) — index.html ile yurt.html arasındaki yapısal benzerlik kod tekrarına yol açıyor.

- Eksik Temizlik (Cleanup) Çağrısı: destroy metodu var ama çağrılmıyor. Şu an proje SPA değil, bu yüzden kritik değil.

## Deferred from: code review of 5-2-gorsel-optimizasyon-ve-lighthouse-performans-cilalamasi.md (2026-04-28)
- Magic Number for Refresh (ScrollEngine.js): 150ms debounce süresi keyfi bir değer, pre-existing ve şimdilik yeterli.

## Deferred from: code review of 6-1-navigasyon-ve-header-yeniden-duzenleme (2026-04-28)
- **Grid Hizalama Riski**: `1fr auto 1fr` yapısı dengesiz içerikte merkezin kaymasına neden olabilir. (Reason: Pre-existing tasarım tercihi)

## Deferred from: code review of 6-2-split-hero-animasyon-optimizasyonu.md (2026-04-29)

- Static Event Binding: Hover behavior (isHoverable and reduced motion check) does not update on orientation change or window resize after initialization.

## Deferred from: code review of 6-3-varlik-onarimi-ve-hata-giderme (2026-04-30)

- **Nav/İletişim/Özellikler İkon Dönüşümü Eksik:** AC Navigasyon, İletişim ve Özellikler alanlarını kapsıyor ama diff sadece Hero ikonlarını değiştirmiş. Diğer bölümler gelecek story'lerde ele alınmalı.
- **console.warn Production Gürültüsü:** `src/core/utils.js:31`'de her kırık görsel için console.warn basılıyor. Production build'de gereksiz log çıktısı.
