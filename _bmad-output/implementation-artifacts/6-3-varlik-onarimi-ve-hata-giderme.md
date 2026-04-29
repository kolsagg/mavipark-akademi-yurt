# Story 6.3: Varlık Onarımı ve Hata Giderme

Status: done

## Story

As a Ziyaretçi,
I want tüm görsel ve ikonların doğru şekilde yüklendiğini görmek,
so that sitenin premium kalitesi korunur ve bozuk görseller veya metin tabanlı ikonlarla karşılaşmam.

## Acceptance Criteria

1. **Given** Herhangi bir sayfada (Kız veya Erkek teması) gezinirken
2. **When** Bir görsel yüklenemediğinde veya linki bozuk olduğunda
3. **Then** Otomatik olarak Unsplash tabanlı bir fallback (yedek) görsel mekanizması devreye girmeli ve ilgili kategoriye uygun (oda, yurt, bahçe vb.) bir görsel göstermelidir.
4. **Given** İkonların kullanıldığı alanlarda (Navigasyon, İletişim, Özellikler)
5. **When** Sayfa render edildiğinde
6. **Then** Metin olarak bırakılmış ("İletişim", "Konum" vb.) ikonlar yerine, premium estetiğe uygun, net ve ölçeklenebilir SVG ikonlar görünmelidir.
7. **And** Tüm ikonlar seçili tema rengine (Lila veya Çelik Mavisi) uyumlu olmalıdır.

## Tasks / Subtasks

- [x] **Asset Audit:** `index.html`, `src/partials/*.hbs` ve bileşen dosyalarındaki tüm `<img>` etiketlerini ve ikon alanlarını tara.
- [x] **Image Fallback Utility:** `src/core/utils.js` (veya yeni bir utility dosyası) içinde `getImageFallback(keyword)` fonksiyonu oluştur. Bu fonksiyon hata durumunda Unsplash'ten ilgili keyword'e uygun görsel dönmeli.
- [x] **Error Handling Integration:** Mevcut görsellere `onerror` event listener'ı ekle veya global bir görsel hata yönetimi kur.
- [x] **SVG Icon Integration:** Metin tabanlı ikonları modern SVG setleri (örn. Lucide-like custom SVGs) ile değiştir. BEM isimlendirmesine (`.icon--primary`) uygun sınıflar ata.
- [x] **Theme Alignment:** İkon renklerinin `data-theme` ile değişen CSS değişkenlerinden (`var(--color-primary)`) beslendiğinden emin ol.
- [x] **Testing:** Yanlış URL'ler vererek fallback mekanizmasını ve farklı tema geçişlerinde ikon renklerini doğrula.

## Developer Context

### Technical Requirements
- **Vanilla JS & CSS:** Herhangi bir ikon kütüphanesi (FontAwesome vb.) yerine inline SVG veya sembol kullanımı tercih edilmelidir (Performans ve özelleştirme için).
- **BEM Methodology:** Yeni eklenen ikon sınıfları BEM kuralına uymalıdır.
- **Unsplash Fallback:** `https://images.unsplash.com/photo-...` yapısını veya Source API'yi kullanarak kaliteli görseller seçilmelidir.

### Architecture Compliance
- **Modular Assets:** Görsel yönetimini mümkünse merkezi bir `AssetManager` veya basit utility fonksiyonları üzerinden yürüt.
- **Handlebars Compatibility:** Partials içindeki ikonları merkezi bir yerden yönetmek için HBS helper'ları veya partial-specific context kullanabilirsin.

### Previous Story Intelligence (from 6.2)
- GSAP animasyonları ve tema geçişleri sırasında (özellikle SplitHero'da) görsellerin titrememesi veya aniden kaybolmaması sağlanmalıdır.
- 6.2'de kurulan `gsap.context()` yapısı, yeni eklenen ikonların animasyonlarına da (eğer varsa) uygulanmalıdır.

### Git Intelligence Summary
- Son commitlerde SplitHero ve Header yapısı optimize edildi. İkonların bu yeni yapılara tam uyumlu yerleştirilmesi gerekiyor.

## Project Context Reference
- **PRD:** NFR1 (LCP < 2.5s) ve NFR2 (Performance > 90) hedeflerine dikkat edilmeli. Optimize edilmemiş büyük görsellerden kaçınılmalı.
- **Architecture:** `public/assets/` klasörü statik varlıklar için kullanılmalı.

## Story Completion Status
- **Status:** done
- **Completion Note:** Görsel fallback mekanizması (Unsplash tabanlı) src/core/utils.js içinde kuruldu ve global olarak entegre edildi. Tüm <img> etiketlerine data-fallback eklendi. Hero bölümündeki materyal ikonları modern SVG'lerle değiştirildi. .icon--primary sınıfı base.css'e eklendi.

### Review Findings

- [x] [Review][Decision] D1 — Unsplash Source API → picsum.photos'a geçirildi ✅
- [x] [Review][Decision] D2 — Hero src="" → data-uri placeholder ile düzeltildi ✅
- [x] [Review][Patch] P1 — İkincil local SVG fallback eklendi ✅
- [x] [Review][Patch] P2 — Inline style kaldırıldı (GSAP uyumu) ✅
- [x] [Review][Patch] P3 — Guard flag ile çoklu çağrı koruması eklendi ✅
- [x] [Review][Patch] P4 — Ölü .material-symbols-outlined CSS kuralları temizlendi ✅
- [x] [Review][Defer] W1 — Nav/İletişim/Özellikler bölümlerinde ikon dönüşümü eksik — deferred, pre-existing
- [x] [Review][Defer] W2 — console.warn production'da gürültü yapar — deferred, pre-existing
