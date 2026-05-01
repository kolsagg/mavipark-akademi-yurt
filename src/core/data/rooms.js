/**
 * Oda Veri Yapısı
 * Kız ve Erkek yurtları için aynı oda tipleri: 1+0 ve 1+1
 * Galeri görselleri public/assets/ altından çekiliyor.
 */

export const roomData = {
  kiz: [
    {
      id: 'kiz-1-0',
      type: '1+0 Suit',
      title: '1+0 Suit',
      description: 'Kompakt ve fonksiyonel tasarımıyla tek kişilik konforlu yaşam alanı. Çalışma, dinlenme ve banyo alanları aynı suit içinde.',
      image: '/assets/bir_artı_sıfır/1.webp',
      features: [
        { icon: 'bed', text: 'Tek Kişilik Yatak' },
        { icon: 'desk', text: 'Çalışma Masası' },
        { icon: 'bath', text: 'Özel Banyo & WC' },
        { icon: 'wardrobe', text: 'Gömme Dolap' },
        { icon: 'wifi', text: 'Fiber İnternet' }
      ],
      tag: 'Suit',
      gallery: [
        { type: 'image', src: '/assets/bir_artı_sıfır/1.webp', alt: '1+0 Suit - Genel Görünüm' },
        { type: 'image', src: '/assets/bir_artı_sıfır/2.webp', alt: '1+0 Suit - Yatak Alanı' },
        { type: 'image', src: '/assets/bir_artı_sıfır/3.webp', alt: '1+0 Suit - Çalışma Alanı' },
        { type: 'image', src: '/assets/bir_artı_sıfır/4.webp', alt: '1+0 Suit - Banyo' },
        { type: 'image', src: '/assets/bir_artı_sıfır/5.webp', alt: '1+0 Suit - Detay' }
      ]
    },
    {
      id: 'kiz-1-1',
      type: '1+1 Suit',
      title: '1+1 Suit',
      description: 'Ayrı yaşam ve yatak odası ile ayrıcalıklı konfor. Geniş alan, özel banyo ve balkon imkanı.',
      image: '/assets/bir_artı_bir/1.webp',
      features: [
        { icon: 'bed', text: 'Ayrı Yatak Odası' },
        { icon: 'desk', text: 'Geniş Çalışma Alanı' },
        { icon: 'bath', text: 'Özel Banyo & WC' },
        { icon: 'balcony', text: 'Balkon' },
        { icon: 'fridge', text: 'Mini Buzdolabı' }
      ],
      tag: 'Ayrıcalıklı',
      gallery: [
        { type: 'image', src: '/assets/bir_artı_bir/1.webp', alt: '1+1 Suit - Genel Görünüm' },
        { type: 'image', src: '/assets/bir_artı_bir/2.webp', alt: '1+1 Suit - Salon' },
        { type: 'image', src: '/assets/bir_artı_bir/3.webp', alt: '1+1 Suit - Yatak Odası' },
        { type: 'image', src: '/assets/bir_artı_bir/4.webp', alt: '1+1 Suit - Banyo' },
        { type: 'image', src: '/assets/bir_artı_bir/5.webp', alt: '1+1 Suit - Detay' },
        { type: 'video', src: '/assets/bir_artı_bir/6.webm', alt: '1+1 Suit - Tanıtım Videosu' }
      ]
    }
  ],
  erkek: [
    {
      id: 'erkek-1-0',
      type: '1+0 Suit',
      title: '1+0 Suit',
      description: 'Kompakt ve fonksiyonel tasarımıyla tek kişilik konforlu yaşam alanı. Çalışma, dinlenme ve banyo alanları aynı suit içinde.',
      image: '/assets/bir_artı_sıfır/1.webp',
      features: [
        { icon: 'bed', text: 'Tek Kişilik Yatak' },
        { icon: 'desk', text: 'Çalışma Masası' },
        { icon: 'bath', text: 'Özel Banyo & WC' },
        { icon: 'wardrobe', text: 'Gömme Dolap' },
        { icon: 'wifi', text: 'Fiber İnternet' }
      ],
      tag: 'Suit',
      gallery: [
        { type: 'image', src: '/assets/bir_artı_sıfır/1.webp', alt: '1+0 Suit - Genel Görünüm' },
        { type: 'image', src: '/assets/bir_artı_sıfır/2.webp', alt: '1+0 Suit - Yatak Alanı' },
        { type: 'image', src: '/assets/bir_artı_sıfır/3.webp', alt: '1+0 Suit - Çalışma Alanı' },
        { type: 'image', src: '/assets/bir_artı_sıfır/4.webp', alt: '1+0 Suit - Banyo' },
        { type: 'image', src: '/assets/bir_artı_sıfır/5.webp', alt: '1+0 Suit - Detay' }
      ]
    },
    {
      id: 'erkek-1-1',
      type: '1+1 Suit',
      title: '1+1 Suit',
      description: 'Ayrı yaşam ve yatak odası ile ayrıcalıklı konfor. Geniş alan, özel banyo ve balkon imkanı.',
      image: '/assets/bir_artı_bir/1.webp',
      features: [
        { icon: 'bed', text: 'Ayrı Yatak Odası' },
        { icon: 'desk', text: 'Geniş Çalışma Alanı' },
        { icon: 'bath', text: 'Özel Banyo & WC' },
        { icon: 'balcony', text: 'Balkon' },
        { icon: 'fridge', text: 'Mini Buzdolabı' }
      ],
      tag: 'Ayrıcalıklı',
      gallery: [
        { type: 'image', src: '/assets/bir_artı_bir/1.webp', alt: '1+1 Suit - Genel Görünüm' },
        { type: 'image', src: '/assets/bir_artı_bir/2.webp', alt: '1+1 Suit - Salon' },
        { type: 'image', src: '/assets/bir_artı_bir/3.webp', alt: '1+1 Suit - Yatak Odası' },
        { type: 'image', src: '/assets/bir_artı_bir/4.webp', alt: '1+1 Suit - Banyo' },
        { type: 'image', src: '/assets/bir_artı_bir/5.webp', alt: '1+1 Suit - Detay' },
        { type: 'video', src: '/assets/bir_artı_bir/6.webm', alt: '1+1 Suit - Tanıtım Videosu' }
      ]
    }
  ]
};
