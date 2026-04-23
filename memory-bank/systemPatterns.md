# Sistem Kalıpları

## Sistem Mimarisi
- **Frontend**: Vite + Vanilla JS + HTML.
- **Styling**: Vanilla CSS (Tasarım sistemine dayalı CSS değişkenleri).
- **Animasyon**: GSAP (GreenSock Animation Platform) + ScrollTrigger.
- **Templating**: Handlebars partials (MPA yapısı için).

## Teknik Kararlar
- **URL-First Tema Yönetimi**: Kız/Erkek seçimi URL parametreleri veya path üzerinden yönetilerek tasarım sistemi renkleri dinamik olarak değişir.
- **Modüler CSS**: Her bileşen kendi CSS dosyasına sahip olabilir veya ana bir tasarım sistemi dosyasından beslenir.
- **Premium UI**: Glassmorphism, yumuşak geçişler ve özel tipografi.

## Bileşen İlişkileri
- `Header`: Sabit, dinamik CTA içerir.
- `SplitEntry`: İlk etkileşim noktası.
- `FeatureCards`: Glassmorphism efektli bilgi blokları.
- `ThemeManager`: URL'ye göre renk paletini (`--primary`, `--accent`) günceller.

## Kritik Uygulama Yolları
- Ana sayfa yüklenirken GSAP ile logo ve split ekran animasyonu.
- Sayfa geçişlerinde akıcılığın korunması.
- SEO için semantik HTML5 yapısı.
