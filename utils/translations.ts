import { Language } from '@/context/LanguageContext';

// Attraction translations
export const attractionTranslations: Record<string, { name: Record<Language, string>; description: Record<Language, string>; summary: Record<Language, string> }> = {
  'hagia-sophia': {
    name: {
      en: 'Hagia Sophia',
      tr: 'Ayasofya',
    },
    description: {
      en: 'A magnificent architectural marvel that has served as a church, mosque, and museum throughout its 1,500-year history. Built in 537 AD by Byzantine Emperor Justinian I, it features stunning Byzantine mosaics, a massive dome that seems to float on light, and intricate Islamic calligraphy.',
      tr: '1.500 yıllık tarihi boyunca kilise, cami ve müze olarak hizmet vermiş muhteşem bir mimari harika. MS 537\'de Bizans İmparatoru Justinianus I tarafından inşa edilmiş, çarpıcı Bizans mozaikleri, ışık üzerinde yüzüyor gibi görünen devasa bir kubbe ve karmaşık İslami hat sanatı içerir.',
    },
    summary: {
      en: 'Byzantine masterpiece, iconic dome, 1500+ years old',
      tr: 'Bizans şaheseri, ikonik kubbe, 1500+ yıllık',
    },
  },
  'blue-mosque': {
    name: {
      en: 'Blue Mosque (Sultan Ahmed Mosque)',
      tr: 'Sultan Ahmet Camii',
    },
    description: {
      en: 'Built between 1609 and 1616 during the rule of Ahmed I, the Blue Mosque is famous for its stunning blue İznik tiles that adorn its interior walls. With six minarets and a cascading series of domes, it remains an active mosque and one of Istanbul\'s most iconic landmarks.',
      tr: 'I. Ahmet\'in saltanatı döneminde 1609-1616 yılları arasında inşa edilen Sultan Ahmet Camii, iç duvarlarını süsleyen muhteşem mavi İznik çinileriyle ünlüdür. Altı minaresi ve kademeli kubbe serisiyle aktif bir cami olarak İstanbul\'un en ikonik simgelerinden biridir.',
    },
    summary: {
      en: 'Six minarets, 20,000 blue tiles, active mosque',
      tr: 'Altı minare, 20.000 mavi çini, aktif cami',
    },
  },
  'topkapi-palace': {
    name: {
      en: 'Topkapı Palace',
      tr: 'Topkapı Sarayı',
    },
    description: {
      en: 'The primary residence of Ottoman sultans for approximately 400 years (1465-1856). This sprawling palace complex covers 700,000 square meters and houses an impressive collection of Ottoman treasures, including the famous Topkapı Dagger and the Spoonmaker\'s Diamond.',
      tr: 'Yaklaşık 400 yıl (1465-1856) boyunca Osmanlı padişahlarının ana ikametgahı. 700.000 metrekarelik bu geniş saray kompleksi, ünlü Topkapı Hançeri ve Kaşıkçı Elması dahil olmak üzere etkileyici bir Osmanlı hazinesi koleksiyonuna ev sahipliği yapar.',
    },
    summary: {
      en: 'Ottoman palace, imperial treasury, Bosphorus views',
      tr: 'Osmanlı sarayı, hazine, Boğaz manzarası',
    },
  },
  'grand-bazaar': {
    name: {
      en: 'Grand Bazaar (Kapalıçarşı)',
      tr: 'Kapalıçarşı',
    },
    description: {
      en: 'One of the largest and oldest covered markets in the world, with over 4,000 shops spread across 61 covered streets. Dating back to 1461, the Grand Bazaar attracts between 250,000 and 400,000 visitors daily.',
      tr: 'Dünyanın en büyük ve en eski kapalı çarşılarından biri, 61 kapalı sokağa yayılmış 4.000\'den fazla dükkan. 1461\'e dayanan Kapalıçarşı, günde 250.000 ile 400.000 arasında ziyaretçi çeker.',
    },
    summary: {
      en: '4,000 shops, historic market, carpets & spices',
      tr: '4.000 dükkan, tarihi çarşı, halı ve baharat',
    },
  },
  'galata-tower': {
    name: {
      en: 'Galata Tower',
      tr: 'Galata Kulesi',
    },
    description: {
      en: 'A medieval stone tower built in 1348 that dominates the skyline of the Galata district. Standing 67 meters tall, the tower offers panoramic 360-degree views of Istanbul.',
      tr: '1348\'de inşa edilen ve Galata semtinin siluetine hakim olan ortaçağ taş kulesi. 67 metre yüksekliğindeki kule, İstanbul\'un 360 derecelik panoramik manzarasını sunar.',
    },
    summary: {
      en: 'Medieval tower, 360° views, 67m tall',
      tr: 'Ortaçağ kulesi, 360° manzara, 67m yükseklik',
    },
  },
  'istiklal-street': {
    name: {
      en: 'İstiklal Avenue',
      tr: 'İstiklal Caddesi',
    },
    description: {
      en: 'Istanbul\'s most famous pedestrian street, stretching 1.4 kilometers from Taksim Square to Galata Tower. This bustling avenue is lined with historic buildings, shops, galleries, and restaurants.',
      tr: 'Taksim Meydanı\'ndan Galata Kulesi\'ne 1,4 kilometre uzanan İstanbul\'un en ünlü yaya caddesi. Bu hareketli cadde tarihi binalar, dükkanlar, galeriler ve restoranlarla doludur.',
    },
    summary: {
      en: 'Pedestrian street, shopping, historic tram',
      tr: 'Yaya caddesi, alışveriş, nostaljik tramvay',
    },
  },
  'pera-museum': {
    name: {
      en: 'Pera Museum',
      tr: 'Pera Müzesi',
    },
    description: {
      en: 'A private museum featuring a rich collection of Orientalist paintings, Anatolian weights and measures, and Kütahya tiles. Famous for housing \'The Tortoise Trainer\' by Osman Hamdi Bey.',
      tr: 'Oryantalist resimler, Anadolu ağırlık ve ölçüleri ve Kütahya çinilerinden oluşan zengin bir koleksiyona sahip özel müze. Osman Hamdi Bey\'in \'Kaplumbağa Terbiyecisi\' tablosuna ev sahipliği yapar.',
    },
    summary: {
      en: 'Orientalist art, Turkish paintings, contemporary exhibits',
      tr: 'Oryantalist sanat, Türk resimleri, çağdaş sergiler',
    },
  },
  'dolmabahce-palace': {
    name: {
      en: 'Dolmabahçe Palace',
      tr: 'Dolmabahçe Sarayı',
    },
    description: {
      en: 'A stunning 19th-century palace that served as the main administrative center of the Ottoman Empire. Built along the Bosphorus shore, it features 285 rooms and houses the world\'s largest Bohemian crystal chandelier.',
      tr: '19. yüzyılda Osmanlı İmparatorluğu\'nun ana idari merkezi olarak hizmet veren muhteşem bir saray. Boğaz kıyısında inşa edilmiş, 285 odası var ve dünyanın en büyük Bohemya kristal avizelisine ev sahipliği yapar.',
    },
    summary: {
      en: 'Bosphorus palace, crystal chandelier, Ottoman grandeur',
      tr: 'Boğaz sarayı, kristal avize, Osmanlı ihtişamı',
    },
  },
  'kadikoy-market': {
    name: {
      en: 'Kadıköy Market',
      tr: 'Kadıköy Çarşısı',
    },
    description: {
      en: 'A vibrant local market on the Asian side of Istanbul, offering an authentic Turkish shopping experience. Famous for fresh produce, fish, spices, cheeses, and traditional Turkish delicacies.',
      tr: 'İstanbul\'un Asya yakasında otantik bir Türk alışveriş deneyimi sunan canlı bir yerel pazar. Taze ürünler, balık, baharat, peynir ve geleneksel Türk lezzetleriyle ünlüdür.',
    },
    summary: {
      en: 'Local market, fresh produce, Asian side charm',
      tr: 'Yerel pazar, taze ürünler, Asya yakası cazibesi',
    },
  },
  'moda-coast': {
    name: {
      en: 'Moda Coastal Park',
      tr: 'Moda Sahili',
    },
    description: {
      en: 'A scenic waterfront promenade in the Moda neighborhood, offering stunning views of the Marmara Sea. Perfect for leisurely walks, picnics, and watching the sunset.',
      tr: 'Moda semtinde Marmara Denizi\'nin muhteşem manzarasını sunan pitoresk bir sahil yürüyüş yolu. Rahat yürüyüşler, piknikler ve gün batımı izlemek için mükemmel.',
    },
    summary: {
      en: 'Waterfront park, sunset views, local favorite',
      tr: 'Sahil parkı, gün batımı manzarası, yerel favorisi',
    },
  },
  'maiden-tower': {
    name: {
      en: 'Maiden\'s Tower (Kız Kulesi)',
      tr: 'Kız Kulesi',
    },
    description: {
      en: 'An iconic tower located on a small islet in the Bosphorus, off the coast of Üsküdar. Dating back to ancient times, it offers spectacular views of both the European and Asian sides of Istanbul.',
      tr: 'Üsküdar açıklarında Boğaz\'da küçük bir adacık üzerinde yer alan ikonik bir kule. Antik çağlara dayanan kule, İstanbul\'un hem Avrupa hem de Asya yakasının muhteşem manzarasını sunar.',
    },
    summary: {
      en: 'Bosphorus islet, ancient tower, legendary views',
      tr: 'Boğaz adacığı, antik kule, efsanevi manzara',
    },
  },
};

// District translations
export const districtTranslations: Record<string, { displayName: Record<Language, string>; description: Record<Language, string> }> = {
  'Sultanahmet': {
    displayName: {
      en: 'Sultanahmet',
      tr: 'Sultanahmet',
    },
    description: {
      en: 'Historic heart of Istanbul with Byzantine and Ottoman monuments',
      tr: 'Bizans ve Osmanlı anıtlarıyla İstanbul\'un tarihi kalbi',
    },
  },
  'Beyoğlu': {
    displayName: {
      en: 'Beyoğlu',
      tr: 'Beyoğlu',
    },
    description: {
      en: 'Vibrant district with Istiklal Street, galleries, and nightlife',
      tr: 'İstiklal Caddesi, galeriler ve gece hayatıyla canlı ilçe',
    },
  },
  'Beşiktaş': {
    displayName: {
      en: 'Beşiktaş',
      tr: 'Beşiktaş',
    },
    description: {
      en: 'Modern waterfront district with palaces and museums',
      tr: 'Saraylar ve müzelerle modern sahil ilçesi',
    },
  },
  'Kadıköy': {
    displayName: {
      en: 'Kadıköy',
      tr: 'Kadıköy',
    },
    description: {
      en: 'Asian side hub with markets, cafes, and street art',
      tr: 'Pazarlar, kafeler ve sokak sanatıyla Asya yakası merkezi',
    },
  },
  'Üsküdar': {
    displayName: {
      en: 'Üsküdar',
      tr: 'Üsküdar',
    },
    description: {
      en: 'Historic Asian district with mosques and Bosphorus views',
      tr: 'Camiler ve Boğaz manzarasıyla tarihi Asya ilçesi',
    },
  },
};

export function getTranslatedAttractionField(
  attractionId: string,
  field: 'name' | 'description' | 'summary',
  language: Language,
  fallback: string
): string {
  const translation = attractionTranslations[attractionId];
  if (translation && translation[field] && translation[field][language]) {
    return translation[field][language];
  }
  return fallback;
}

export function getTranslatedDistrictField(
  districtName: string,
  field: 'displayName' | 'description',
  language: Language,
  fallback: string
): string {
  const translation = districtTranslations[districtName];
  if (translation && translation[field] && translation[field][language]) {
    return translation[field][language];
  }
  return fallback;
}
