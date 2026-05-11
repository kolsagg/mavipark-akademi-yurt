/**
 * Genel İmkanlar ve Ortak Alanlar Veri Yapısı
 * Her iki suit için de ortak olan veya temaya göre değişebilen genel özellikleri içerir.
 */

export const amenitiesData = {
  common: [
    {
      id: 'amenity-security',
      title: '7/24 Kesintisiz Güvenlik',
      description: 'Profesyonel güvenlik ekibi ve gelişmiş kamera sistemleri ile huzurlu bir yaşam alanı.',
      icon: 'security',
      image: 'https://images.unsplash.com/photo-1549109926-58f039549485?auto=format&fit=crop&q=80&w=800&fm=webp'
    },
    {
      id: 'amenity-cleaning',
      title: 'Profesyonel Temizlik',
      description: 'Düzenli ortak alan temizliği ile her zaman hijyenik bir ortam.',
      icon: 'cleaning',
      image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800&fm=webp'
    },
    {
      id: 'amenity-internet',
      title: 'Yüksek Hızlı Fiber İnternet',
      description: 'Her noktadan erişilebilen kesintisiz ve yüksek hızlı internet bağlantısı.',
      icon: 'wifi',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800&fm=webp'
    },
    {
      id: 'amenity-hotwater',
      title: '7/24 Sıcak Su ve Isınma',
      description: 'Kesintisiz sıcak su ve merkezi ısınma sistemi ile yılın her günü konforlu yaşam.',
      icon: 'hotwater',
      image: '/assets/amenities/hot-water.webp'
    },
    {
      id: 'amenity-laundry',
      title: 'Çamaşırhane',
      description: 'Modern çamaşır makineleri ve kurutma imkanı ile pratik çamaşır hizmeti.',
      icon: 'laundry',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=800&fm=webp'
    }
  ],
  kiz: [
    {
      id: 'amenity-study-kiz',
      title: 'Sessiz Çalışma Salonu',
      description: 'Her katta etüt odaları bulunmaktadır. Sessiz ve huzurlu ortamda verimli çalışma imkanı.',
      icon: 'desk',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&fm=webp'
    }
  ],
  erkek: [
    {
      id: 'amenity-study-erkek',
      title: 'Focus Çalışma Alanı',
      description: 'Her katta etüt odaları bulunmaktadır. Sessiz ve huzurlu ortamda verimli çalışma imkanı.',
      icon: 'desk',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&fm=webp'
    }
  ]
};
