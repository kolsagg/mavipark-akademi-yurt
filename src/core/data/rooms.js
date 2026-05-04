/**
 * Oda Veri Yapısı
 * Kız ve Erkek suitleri için oda tipleri.
 * Galeri görselleri public/assets/ altından çekiliyor.
 */

export const roomData = {
  kiz: [
    {
      id: "kiz-1-0",
      type: "1+0 Suit",
      title: "1+0 Suit",
      description:
        "Kompakt ve fonksiyonel tasarımıyla tek kişilik konforlu yaşam alanı. Çalışma, dinlenme ve banyo alanları aynı suit içinde.",
      image: "/assets/bir_arti_sifir/4.webp",
      features: [
        { icon: "bed", text: "Tek Kişilik Yatak" },
        { icon: "desk", text: "Çalışma Masası" },
        { icon: "bath", text: "Özel Banyo & WC" },
        { icon: "kitchen", text: "Mutfak" },
        { icon: "wifi", text: "Fiber İnternet" },
      ],
      tag: "Suit",
      gallery: [
        {
          type: "image",
          src: "/assets/bir_arti_sifir/1.webp",
          alt: "1+0 Suit - Genel Görünüm",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/2.webp",
          alt: "1+0 Suit - Yatak Alanı",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/3.webp",
          alt: "1+0 Suit - Çalışma Alanı",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/4.webp",
          alt: "1+0 Suit - Banyo",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/5.webp",
          alt: "1+0 Suit - Detay",
        },
      ],
    },
    {
      id: "kiz-1-1",
      type: "1+1 Suit",
      title: "1+1 Suit",
      description:
        "Ayrı yaşam ve yatak odası ile ayrıcalıklı konfor. Geniş alan, özel banyo ve balkon imkanı.",
      image: "/assets/bir_arti_bir/3.webp",
      features: [
        { icon: "bed", text: "Ayrı Yatak Odası" },
        { icon: "desk", text: "Geniş Çalışma Alanı" },
        { icon: "bath", text: "Özel Banyo & WC" },
        { icon: "kitchen", text: "Mutfak" },
        { icon: "fridge", text: "Mini Buzdolabı" },
      ],
      tag: "Ayrıcalıklı",
      gallery: [
        {
          type: "image",
          src: "/assets/bir_arti_bir/1.webp",
          alt: "1+1 Suit - Genel Görünüm",
        },
        {
          type: "image",
          src: "/assets/bir_arti_bir/2.webp",
          alt: "1+1 Suit - Salon",
        },
        {
          type: "image",
          src: "/assets/bir_arti_bir/3.webp",
          alt: "1+1 Suit - Yatak Odası",
        },
        {
          type: "image",
          src: "/assets/bir_arti_bir/4.webp",
          alt: "1+1 Suit - Banyo",
        },
        {
          type: "image",
          src: "/assets/bir_arti_bir/5.webp",
          alt: "1+1 Suit - Detay",
        },
        {
          type: "video",
          src: "/assets/bir_arti_bir/6.webm",
          alt: "1+1 Suit - Tanıtım Videosu",
        },
      ],
    },
  ],
  erkek: [
    {
      id: "erkek-1-0",
      type: "Tek Kişilik Suit",
      title: "Tek Kişilik Suit",
      description:
        "Kompakt ve fonksiyonel tasarımıyla tek kişilik konforlu yaşam alanı. Çalışma, dinlenme ve banyo alanları aynı suit içinde.",
      image: "/assets/bir_arti_sifir/4.webp",
      features: [
        { icon: "bed", text: "Tek Kişilik Yatak" },
        { icon: "desk", text: "Çalışma Masası" },
        { icon: "bath", text: "Özel Banyo & WC" },
        { icon: "kitchen", text: "Mutfak" },
        { icon: "wifi", text: "Fiber İnternet" },
      ],
      tag: "Suit",
      gallery: [
        {
          type: "image",
          src: "/assets/bir_arti_sifir/2.webp",
          alt: "1+0 Suit - Yatak Alanı",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/3.webp",
          alt: "1+0 Suit - Çalışma Alanı",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/4.webp",
          alt: "1+0 Suit - Banyo",
        },
      ],
    },
    {
      id: "erkek-1-1",
      type: "Çift Kişilik Suit",
      title: "Çift Kişilik Suit",
      description:
        "Ayrı yaşam ve yatak odası ile ayrıcalıklı konfor. Geniş alan, özel banyo ve balkon imkanı.",
      image: "/assets/bir_arti_bir/1.webp",
      features: [
        { icon: "bed", text: "Ayrı Yataklar" },
        { icon: "desk", text: "Geniş Çalışma Alanı" },
        { icon: "bath", text: "Özel Banyo & WC" },
        { icon: "kitchen", text: "Mutfak" },
        { icon: "wifi", text: "Fiber İnternet" },
      ],
      tag: "Ayrıcalıklı",
      gallery: [
        {
          type: "image",
          src: "/assets/bir_arti_sifir/2.webp",
          alt: "Çift Kişilik Suit",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/5.webp",
          alt: "Çift Kişilik Suit",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/1.webp",
          alt: "Çift Kişilik Suit",
        },
      ],
    },
  ],
};
