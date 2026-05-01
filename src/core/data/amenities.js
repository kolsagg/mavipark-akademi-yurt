/**
 * Genel İmkanlar ve Ortak Alanlar Veri Yapısı
 * Her iki yurt için de ortak olan veya temaya göre değişebilen genel özellikleri içerir.
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
      description: 'Düzenli oda ve ortak alan temizliği ile her zaman hijyenik bir ortam.',
      icon: 'cleaning',
      image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800&fm=webp'
    },
    {
      id: 'amenity-internet',
      title: 'Yüksek Hızlı Fiber İnternet',
      description: 'Her noktadan erişilebilen kesintisiz ve yüksek hızlı internet bağlantısı.',
      icon: 'wifi',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800&fm=webp'
    }
  ],
  kiz: [
    {
      id: 'amenity-study-kiz',
      title: 'Sessiz Çalışma Salonu',
      description: 'Lila tonlarının verdiği huzurla, akademik başarınız için tasarlanmış izole çalışma alanları.',
      icon: 'desk',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800&fm=webp'
    },
    {
      id: 'amenity-social-kiz',
      title: 'Modern Kafeterya',
      description: 'Keyifli molalar ve sıcak sohbetler için şık ve konforlu sosyal alan.',
      icon: 'coffee',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800&fm=webp'
    }
  ],
  erkek: [
    {
      id: 'amenity-study-erkek',
      title: 'Focus Çalışma Alanı',
      description: 'Konsantrasyonu artıran çelik mavisi detaylar ve ergonomik donanımlı etüt odaları.',
      icon: 'desk',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&fm=webp'
    },
    {
      id: 'amenity-gym-erkek',
      title: 'Aktif Yaşam Alanı',
      description: 'Zinde kalmanız için modern ekipmanlarla donatılmış fitness ve hobi alanı.',
      icon: 'gym',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800&fm=webp'
    }
  ]
};
