/**
 * Oda Veri Yapısı
 * Kız ve Erkek suitleri için oda tipleri.
 * Galeri görselleri public/assets/ altından çekiliyor.
 */

export const roomData = {
  kiz: [
    {
      id: "kiz-1-0-tek",
      type: "1+0 Tek Kişilik Suit",
      title: "1+0 Tek Kişilik Suit",
      description:
        "Kompakt ve fonksiyonel tasarımıyla tek kişilik konforlu yaşam alanı. Çalışma, dinlenme ve banyo alanları aynı suit içinde.",
      image: "/assets/bir_arti_sifir/4.webp",
      features: [
        { icon: "bed", text: "Tek Kişilik Yatak" },
        { icon: "desk", text: "Çalışma Masası" },
        { icon: "bath", text: "Özel Banyo & WC" },
        { icon: "kitchen", text: "Mutfak" },
        { icon: "fridge", text: "Buzdolabı" },
        { icon: "wardrobe", text: "Gardırop" },
        { icon: "wifi", text: "Fiber İnternet" },
      ],
      tag: "Suit",
      gallery: [
        {
          type: "image",
          src: "/assets/bir_arti_sifir/2.webp",
          alt: "1+0 Tek Kişilik Suit - Yatak Alanı",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/3.webp",
          alt: "1+0 Tek Kişilik Suit - Çalışma Alanı",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/4.webp",
          alt: "1+0 Tek Kişilik Suit - Banyo",
        },
      ],
    },
    {
      id: "kiz-1-0-cift",
      type: "1+0 İki Kişilik Suit",
      title: "1+0 İki Kişilik Suit",
      description:
        "İki kişilik konforlu yaşam alanı. Ortak kullanıma uygun kompakt tasarım, özel banyo ve mutfak imkanı.",
      image: "/assets/bir_arti_sifir/2.webp",
      features: [
        { icon: "bed", text: "Ayrı Yataklar" },
        { icon: "desk", text: "Çalışma Masası" },
        { icon: "bath", text: "Özel Banyo & WC" },
        { icon: "kitchen", text: "Mutfak" },
        { icon: "fridge", text: "Buzdolabı" },
        { icon: "wardrobe", text: "Gardırop" },
        { icon: "wifi", text: "Fiber İnternet" },
      ],
      tag: "Suit",
      gallery: [
        {
          type: "image",
          src: "/assets/bir_arti_sifir/1.webp",
          alt: "1+0 İki Kişilik Suit - Genel Görünüm",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/5.webp",
          alt: "1+0 İki Kişilik Suit - Detay",
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
        { icon: "fridge", text: "Buzdolabı" },
        { icon: "wardrobe", text: "Gardırop" },
        { icon: "wifi", text: "Fiber İnternet" },
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
      id: "erkek-1-0-tek",
      type: "1+0 Tek Kişilik Suit",
      title: "1+0 Tek Kişilik Suit",
      description:
        "Kompakt ve fonksiyonel tasarımıyla tek kişilik konforlu yaşam alanı. Çalışma, dinlenme ve banyo alanları aynı suit içinde.",
      image: "/assets/bir_arti_sifir/4.webp",
      features: [
        { icon: "bed", text: "Tek Kişilik Yatak" },
        { icon: "desk", text: "Çalışma Masası" },
        { icon: "bath", text: "Özel Banyo & WC" },
        { icon: "kitchen", text: "Mutfak" },
        { icon: "fridge", text: "Buzdolabı" },
        { icon: "wardrobe", text: "Gardırop" },
        { icon: "wifi", text: "Fiber İnternet" },
      ],
      tag: "Suit",
      gallery: [
        {
          type: "image",
          src: "/assets/bir_arti_sifir/2.webp",
          alt: "1+0 Tek Kişilik Suit - Yatak Alanı",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/3.webp",
          alt: "1+0 Tek Kişilik Suit - Çalışma Alanı",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/4.webp",
          alt: "1+0 Tek Kişilik Suit - Banyo",
        },
      ],
    },
    {
      id: "erkek-1-0-cift",
      type: "1+0 İki Kişilik Suit",
      title: "1+0 İki Kişilik Suit",
      description:
        "İki kişilik konforlu yaşam alanı. Ortak kullanıma uygun kompakt tasarım, özel banyo ve mutfak imkanı.",
      image: "/assets/bir_arti_sifir/2.webp",
      features: [
        { icon: "bed", text: "İki Kişilik Yatak" },
        { icon: "desk", text: "Çalışma Masası" },
        { icon: "bath", text: "Özel Banyo & WC" },
        { icon: "kitchen", text: "Mutfak" },
        { icon: "fridge", text: "Buzdolabı" },
        { icon: "wardrobe", text: "Gardırop" },
        { icon: "wifi", text: "Fiber İnternet" },
      ],
      tag: "Suit",
      gallery: [
        {
          type: "image",
          src: "/assets/bir_arti_sifir/1.webp",
          alt: "1+0 İki Kişilik Suit - Genel Görünüm",
        },
        {
          type: "image",
          src: "/assets/bir_arti_sifir/5.webp",
          alt: "1+0 İki Kişilik Suit - Detay",
        },
      ],
    },
    {
      id: "erkek-1-1",
      type: "1+1 Suit",
      title: "1+1 Suit",
      description:
        "Ayrı yaşam ve yatak odası ile ayrıcalıklı konfor. Geniş alan, özel banyo ve balkon imkanı.",
      image: "/assets/bir_arti_bir/1.webp",
      features: [
        { icon: "bed", text: "Ayrı Yatak Odası" },
        { icon: "desk", text: "Geniş Çalışma Alanı" },
        { icon: "bath", text: "Özel Banyo & WC" },
        { icon: "kitchen", text: "Mutfak" },
        { icon: "fridge", text: "Buzdolabı" },
        { icon: "wardrobe", text: "Gardırop" },
        { icon: "wifi", text: "Fiber İnternet" },
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
};
