/**
 * Oda Veri Yapısı (Mock Data)
 * Kız ve Erkek yurtları için farklı oda tipleri ve özellikleri içerir.
 */

export const roomData = {
  kiz: [
    {
      id: 'kiz-1-person',
      type: '1 Kişilik',
      title: 'Zümrüt Tek Kişilik Oda',
      description: 'Maksimum odaklanma ve konfor için tasarlanmış, kişiye özel premium yaşam alanı.',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800&fm=webp', // Placeholder for now, can be generated
      features: [
        { icon: 'bed', text: 'Kişiye Özel Yatak' },
        { icon: 'desk', text: 'Geniş Çalışma Masası' },
        { icon: 'bath', text: 'Özel Banyo & WC' },
        { icon: 'wardrobe', text: 'Gömme Gardırop' },
        { icon: 'wifi', text: 'Fiber İnternet' }
      ],
      tag: 'Premium'
    },
    {
      id: 'kiz-2-person',
      type: '2 Kişilik',
      title: 'Safir İki Kişilik Oda',
      description: 'Sosyal bir ortam ile kişisel alan dengesini koruyan, modern tasarımlı paylaşım alanı.',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800&fm=webp',
      features: [
        { icon: 'users', text: 'Paylaşımlı Alan' },
        { icon: 'desk', text: '2 Ayrı Çalışma Masası' },
        { icon: 'bath', text: 'Özel Banyo & WC' },
        { icon: 'balcony', text: 'Fransız Balkon' },
        { icon: 'fridge', text: 'Mini Buzdolabı' }
      ],
      tag: 'Popüler'
    },
    {
      id: 'kiz-3-person',
      type: '3 Kişilik',
      title: 'Yakut Üç Kişilik Oda',
      description: 'Ekonomik çözümü premium kaliteyle birleştiren, geniş ve ferah yaşam alanı.',
      image: 'https://images.unsplash.com/photo-1555854817-40e098ee7af5?auto=format&fit=crop&q=80&w=800&fm=webp',
      features: [
        { icon: 'users', text: 'Geniş Sosyal Alan' },
        { icon: 'desk', text: '3 Ayrı Çalışma Masası' },
        { icon: 'bath', text: 'Özel Banyo & WC' },
        { icon: 'wifi', text: 'Fiber İnternet' },
        { icon: 'storage', text: 'Ekstra Depolama' }
      ],
      tag: 'Ekonomik'
    }
  ],
  erkek: [
    {
      id: 'erkek-1-person',
      type: '1 Kişilik',
      title: 'Aslan Tek Kişilik Oda',
      description: 'Liderler için tasarlanmış, sessiz ve konforlu bir çalışma ortamı sunan özel oda.',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800&fm=webp',
      features: [
        { icon: 'bed', text: 'Ortopedik Yatak' },
        { icon: 'desk', text: 'Gaming/Çalışma Masası' },
        { icon: 'bath', text: 'Ebeveyn Banyosu' },
        { icon: 'ac', text: 'Merkezi Klima' },
        { icon: 'tv', text: 'Smart TV' }
      ],
      tag: 'Elite'
    },
    {
      id: 'erkek-2-person',
      type: '2 Kişilik',
      title: 'Kartal İki Kişilik Oda',
      description: 'Dostlukların pekiştiği, her detayında konforun ön planda olduğu modern oda.',
      image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800&fm=webp',
      features: [
        { icon: 'users', text: '2 Kişilik Kapasite' },
        { icon: 'desk', text: 'Bireysel Çalışma Masaları' },
        { icon: 'bath', text: 'Modern Banyo' },
        { icon: 'wifi', text: 'Yüksek Hızda Wifi' },
        { icon: 'wardrobe', text: 'Büyük Gardırop' }
      ],
      tag: 'Modern'
    },
    {
      id: 'erkek-4-person',
      type: '4 Kişilik',
      title: 'Pars Dört Kişilik Oda',
      description: 'Grup sinerjisini ve bireysel çalışma konforunu bir araya getiren ferah süit.',
      image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=800&fm=webp',
      features: [
        { icon: 'users', text: 'Geniş Paylaşımlı Alan' },
        { icon: 'desk', text: '4 Ayrı Çalışma Masası' },
        { icon: 'bath', text: 'Çift Lavabolu Banyo' },
        { icon: 'security', text: 'Kişiye Özel Kasa' },
        { icon: 'storage', text: 'Valiz Odası Erişimi' }
      ],
      tag: 'Geniş'
    }
  ]
};
