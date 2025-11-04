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
  'camlica-hill': {
    name: {
      en: 'Çamlıca Hill',
      tr: 'Çamlıca Tepesi',
    },
    description: {
      en: 'The highest point in Istanbul, offering breathtaking panoramic views of the entire city, the Bosphorus, and the Marmara Sea. The hill features beautifully landscaped gardens, walking paths, cafes, and picnic areas. It\'s particularly popular during sunset and evening hours when the city lights create a magical atmosphere. The recently built Çamlıca Mosque, one of Turkey\'s largest mosques, adds to the hill\'s impressive skyline.',
      tr: 'İstanbul\'un en yüksek noktası, tüm şehrin, Boğaz\'ın ve Marmara Denizi\'nin nefes kesici panoramik manzarasını sunuyor. Tepede güzel peyzajlı bahçeler, yürüyüş yolları, kafeler ve piknik alanları bulunuyor. Özellikle şehir ışıklarının büyülü bir atmosfer yarattığı gün batımı ve akşam saatlerinde popülerdir. Yakın zamanda inşa edilen Çamlıca Camii, Türkiye\'nin en büyük camilerinden biri olarak tepenin etkileyici silüetine katkıda bulunuyor.',
    },
    summary: {
      en: 'Highest point, panoramic views, gardens & mosque',
      tr: 'En yüksek nokta, panoramik manzara, bahçeler ve cami',
    },
  },
  'basilica-cistern': {
    name: {
      en: 'Basilica Cistern',
      tr: 'Yerebatan Sarnıcı',
    },
    description: {
      en: 'An ancient underground water reservoir built in the 6th century during the reign of Byzantine Emperor Justinian I. This atmospheric cistern features 336 marble columns, each 9 meters high, arranged in 12 rows. The most famous features are the two Medusa head column bases, mysteriously placed upside down and sideways. The cistern\'s dim lighting, dripping water, and classical music create an otherworldly ambiance. It could store up to 80,000 cubic meters of water.',
      tr: 'Bizans İmparatoru Justinianus I döneminde 6. yüzyılda inşa edilmiş antik bir yeraltı su deposu. Bu atmosferik sarnıç, her biri 9 metre yüksekliğinde 12 sıra halinde düzenlenmiş 336 mermer sütuna sahiptir. En ünlü özellikleri, gizemli bir şekilde baş aşağı ve yana yerleştirilmiş iki Medusa başı sütun tabanıdır. Sarnıcın loş aydınlatması, damlayan su ve klasik müzik dünya dışı bir ortam yaratır. 80.000 metreküpe kadar su depolayabiliyordu.',
    },
    summary: {
      en: 'Underground cistern, 336 columns, Medusa heads',
      tr: 'Yeraltı sarnıcı, 336 sütun, Medusa başları',
    },
  },
  'spice-bazaar': {
    name: {
      en: 'Spice Bazaar (Egyptian Bazaar)',
      tr: 'Mısır Çarşısı',
    },
    description: {
      en: 'A historic covered market built in 1664 as part of the New Mosque complex. The L-shaped bazaar is filled with vendors selling spices, Turkish delight, dried fruits, nuts, caviar, and traditional Turkish products. The air is filled with the aroma of exotic spices like saffron, sumac, and cumin. It\'s smaller and less overwhelming than the Grand Bazaar, making it perfect for purchasing authentic Turkish food products and souvenirs.',
      tr: '1664 yılında Yeni Cami kompleksinin bir parçası olarak inşa edilmiş tarihi bir kapalı pazar. L şeklindeki çarşı, baharat, lokum, kuru meyve, kuruyemiş, havyar ve geleneksel Türk ürünleri satan satıcılarla doludur. Hava safran, sumak ve kimyon gibi egzotik baharatların aromasıyla doludur. Kapalıçarşı\'dan daha küçük ve daha az bunaltıcıdır, bu da onu otantik Türk gıda ürünleri ve hediyelik eşya satın almak için mükemmel kılar.',
    },
    summary: {
      en: 'Historic spice market, Turkish delight, aromatic',
      tr: 'Tarihi baharat çarşısı, lokum, aromatik',
    },
  },
  'galata-bridge': {
    name: {
      en: 'Galata Bridge',
      tr: 'Galata Köprüsü',
    },
    description: {
      en: 'A famous bridge spanning the Golden Horn, connecting Eminönü and Karaköy. The bridge is lined with fishermen, restaurants beneath, and offers stunning views of the historic peninsula and Bosphorus. It\'s a great spot for photos and watching the sunset.',
      tr: 'Haliç\'i geçen, Eminönü ve Karaköy\'ü birleştiren ünlü bir köprü. Köprü balıkçılarla kaplıdır, altında restoranlar vardır ve tarihi yarımada ile Boğaz\'ın muhteşem manzarasını sunar. Fotoğraf çekmek ve gün batımını izlemek için harika bir yerdir.',
    },
    summary: {
      en: 'Golden Horn bridge, sunset views, fishing',
      tr: 'Haliç köprüsü, gün batımı manzarası, balık tutma',
    },
  },
  'new-mosque': {
    name: {
      en: 'New Mosque (Yeni Camii)',
      tr: 'Yeni Cami',
    },
    description: {
      en: 'An Ottoman imperial mosque located in the Eminönü district. Completed in 1665, it\'s one of Istanbul\'s most prominent landmarks with its majestic domes and minarets. The mosque is part of a large complex that includes the Spice Bazaar.',
      tr: 'Eminönü semtinde bulunan bir Osmanlı padişah camisi. 1665\'te tamamlanan cami, görkemli kubbeleri ve minareleriyle İstanbul\'un en önemli simgelerinden biridir. Cami, Mısır Çarşısı\'nı da içeren büyük bir külliyenin parçasıdır.',
    },
    summary: {
      en: 'Ottoman mosque, domes & minarets, Spice Bazaar complex',
      tr: 'Osmanlı camisi, kubbeler ve minareler, Mısır Çarşısı külliyesi',
    },
  },
  'rumeli-hisari': {
    name: {
      en: 'Rumeli Fortress (Rumeli Hisarı)',
      tr: 'Rumeli Hisarı',
    },
    description: {
      en: 'A 15th-century fortress built by Sultan Mehmed II before the conquest of Constantinople. Overlooking the Bosphorus, the fortress has towers, walls, and gardens offering stunning views. Today it\'s an open-air museum and occasional concert venue.',
      tr: 'Sultan II. Mehmed tarafından İstanbul\'un fethinden önce inşa edilmiş 15. yüzyıl kalesi. Boğaz\'a hakim olan kalenin kuleleri, surları ve muhteşem manzara sunan bahçeleri vardır. Bugün açık hava müzesi ve ara sıra konser mekanı olarak kullanılmaktadır.',
    },
    summary: {
      en: '15th-century fortress, Bosphorus views, museum',
      tr: '15. yüzyıl kalesi, Boğaz manzarası, müze',
    },
  },
  'bebek-coast': {
    name: {
      en: 'Bebek Coast',
      tr: 'Bebek Sahili',
    },
    description: {
      en: 'A beautiful Bosphorus neighborhood promenade, popular for scenic walks, cafes, and sea views. Bebek is one of the most elegant areas of Istanbul.',
      tr: 'Manzaralı yürüyüşler, kafeler ve deniz manzarası için popüler güzel bir Boğaz semti sahil yolu. Bebek, İstanbul\'un en zarif bölgelerinden biridir.',
    },
    summary: {
      en: 'Promenade, Bosphorus view, elegant cafes',
      tr: 'Sahil yolu, Boğaz manzarası, zarif kafeler',
    },
  },
  'ortakoy-mosque': {
    name: {
      en: 'Ortaköy Mosque (Büyük Mecidiye Camii)',
      tr: 'Ortaköy Camii (Büyük Mecidiye Camii)',
    },
    description: {
      en: 'A Baroque-style mosque built in the 19th century, located on the Bosphorus shore in Ortaköy. It\'s one of the most photographed landmarks of Istanbul, offering spectacular waterfront views.',
      tr: '19. yüzyılda inşa edilmiş, Ortaköy\'de Boğaz kıyısında yer alan Barok tarzı bir cami. İstanbul\'un en çok fotoğraflanan simgelerinden biri olup muhteşem sahil manzarası sunuyor.',
    },
    summary: {
      en: 'Baroque mosque, Bosphorus views, iconic landmark',
      tr: 'Barok cami, Boğaz manzarası, ikonik simge',
    },
  },
  'istiklal-tram': {
    name: {
      en: 'Historic Tram on İstiklal Avenue',
      tr: 'İstiklal Caddesi Nostaljik Tramvay',
    },
    description: {
      en: 'A nostalgic red tram that runs along İstiklal Avenue between Taksim Square and Tünel. It\'s a symbol of the district and offers a charming way to see the lively street.',
      tr: 'Taksim Meydanı ile Tünel arasında İstiklal Caddesi boyunca işleyen nostaljik kırmızı tramvay. Semtün simgesidir ve canlı caddeyi görmenin büyüleyici bir yolunu sunar.',
    },
    summary: {
      en: 'Historic tram, İstiklal Avenue, Taksim to Tünel',
      tr: 'Nostaljik tramvay, İstiklal Caddesi, Taksim\'den Tünel\'e',
    },
  },
  'takim-square': {
    name: {
      en: 'Taksim Square',
      tr: 'Taksim Meydanı',
    },
    description: {
      en: 'The heart of modern Istanbul, Taksim Square is surrounded by hotels, shops, and restaurants. It\'s a major transportation hub and the site of the Republic Monument. The area hosts public events, celebrations, and cultural activities.',
      tr: 'Modern İstanbul\'un kalbi olan Taksim Meydanı, oteller, dükkanlar ve restoranlarla çevrilidir. Önemli bir ulaşım merkezi ve Cumhuriyet Anıtı\'nın bulunduğu yerdir. Bölge, halka açık etkinliklere, kutlamalara ve kültürel faaliyetlere ev sahipliği yapar.',
    },
    summary: {
      en: 'Central square, Republic Monument, cultural hub',
      tr: 'Merkezi meydan, Cumhuriyet Anıtı, kültür merkezi',
    },
  },
  'princes-islands': {
    name: {
      en: 'Princes\' Islands',
      tr: 'Adalar',
    },
    description: {
      en: 'An archipelago of nine islands in the Marmara Sea, famous for its beaches, historic mansions, pine forests, and tranquil atmosphere. The islands are car-free, with bicycles and electric vehicles used for transport. Büyükada is the largest and most visited.',
      tr: 'Marmara Denizi\'nde dokuz adadan oluşan bir takımada, plajları, tarihi köşkleri, çam ormanları ve sakin atmosferiyle ünlüdür. Adalarda araba yoktur, ulaşım için bisiklet ve elektrikli araçlar kullanılır. Büyükada en büyük ve en çok ziyaret edilen adadır.',
    },
    summary: {
      en: 'Car-free islands, beaches, historic mansions',
      tr: 'Arabasız adalar, plajlar, tarihi köşkler',
    },
  },
  'fener-greek-orthodox-patriarchate': {
    name: {
      en: 'Fener Greek Orthodox Patriarchate',
      tr: 'Fener Rum Ortodoks Patrikhanesi',
    },
    description: {
      en: 'The spiritual center of the Eastern Orthodox Church, located in the Fener district. It includes the Church of St. George, which houses important relics and icons.',
      tr: 'Fener semtinde bulunan Doğu Ortodoks Kilisesi\'nin manevi merkezi. Önemli kutsal emanetleri ve ikonaları barındıran Aya Yorgi Kilisesi\'ni içerir.',
    },
    summary: {
      en: 'Orthodox Patriarchate, historic church, relics',
      tr: 'Ortodoks Patrikhanesi, tarihi kilise, kutsal emanetler',
    },
  },
  'balat-streets': {
    name: {
      en: 'Balat Colorful Streets',
      tr: 'Balat Renkli Sokakları',
    },
    description: {
      en: 'Famous for its colorful historic houses, steep cobbled streets, and vibrant cafes. Balat has become a popular spot for photography and cultural walks.',
      tr: 'Renkli tarihi evleri, dik taş döşeli sokakları ve canlı kafeleriyle ünlüdür. Balat, fotoğrafçılık ve kültürel yürüyüşler için popüler bir yer haline gelmiştir.',
    },
    summary: {
      en: 'Colorful houses, photography, cultural walks',
      tr: 'Renkli evler, fotoğrafçılık, kültürel yürüyüşler',
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
  'Ortaköy': {
    displayName: {
      en: 'Ortaköy',
      tr: 'Ortaköy',
    },
    description: {
      en: 'Charming Bosphorus neighborhood famous for its mosque and waterfront cafes',
      tr: 'Camisi ve sahil kafeleriyle ünlü büyüleyici Boğaz semti',
    },
  },
  'Eminönü': {
    displayName: {
      en: 'Eminönü',
      tr: 'Eminönü',
    },
    description: {
      en: 'Historic area with Spice Bazaar, Galata Bridge, and ferry terminals',
      tr: 'Mısır Çarşısı, Galata Köprüsü ve vapur iskelesiyle tarihi bölge',
    },
  },
  'Galata': {
    displayName: {
      en: 'Galata',
      tr: 'Galata',
    },
    description: {
      en: 'Iconic neighborhood around Galata Tower with stunning city views',
      tr: 'Galata Kulesi etrafında muhteşem şehir manzaralı ikonik semt',
    },
  },
  'Balat': {
    displayName: {
      en: 'Balat',
      tr: 'Balat',
    },
    description: {
      en: 'Colorful historic neighborhood known for its old houses and cafes',
      tr: 'Eski evleri ve kafeleriyle tanınan renkli tarihi semt',
    },
  },
  'Fener': {
    displayName: {
      en: 'Fener',
      tr: 'Fener',
    },
    description: {
      en: 'Historic Greek Orthodox neighborhood with old churches and narrow streets',
      tr: 'Eski kiliseleri ve dar sokakları olan tarihi Rum Ortodoks semti',
    },
  },
  'Taksim': {
    displayName: {
      en: 'Taksim',
      tr: 'Taksim',
    },
    description: {
      en: 'Central square and lively area with shops, restaurants, and nightlife',
      tr: 'Dükkanlar, restoranlar ve gece hayatıyla merkezi meydan ve canlı bölge',
    },
  },
  'Nişantaşı': {
    displayName: {
      en: 'Nişantaşı',
      tr: 'Nişantaşı',
    },
    description: {
      en: 'Upscale neighborhood with luxury boutiques and cafes',
      tr: 'Lüks butikler ve kafelerle üst düzey semt',
    },
  },
  'Rumeli Hisarı': {
    displayName: {
      en: 'Rumeli Hisarı',
      tr: 'Rumeli Hisarı',
    },
    description: {
      en: 'Historic fortress area with Bosphorus views and cafes',
      tr: 'Boğaz manzarası ve kafeleriyle tarihi kale bölgesi',
    },
  },
  'Bebek': {
    displayName: {
      en: 'Bebek',
      tr: 'Bebek',
    },
    description: {
      en: 'Elegant Bosphorus neighborhood popular for seaside walks and cafes',
      tr: 'Sahil yürüyüşleri ve kafeleriyle popüler zarif Boğaz semti',
    },
  },
  'Moda': {
    displayName: {
      en: 'Moda',
      tr: 'Moda',
    },
    description: {
      en: 'Trendy neighborhood in Kadıköy with sea views, cafes, and parks',
      tr: 'Deniz manzarası, kafeler ve parklarla Kadıköy\'de trendy semt',
    },
  },
  'Princes\' Islands': {
    displayName: {
      en: 'Princes\' Islands',
      tr: 'Adalar',
    },
    description: {
      en: 'Car-free islands in the Marmara Sea famous for their beaches and mansions',
      tr: 'Plajları ve köşkleriyle ünlü Marmara Denizi\'ndeki arabasız adalar',
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

// Landmark translations
export const landmarkTranslations: Record<string, Record<Language, string>> = {
  'Hagia Sophia': {
    en: 'Hagia Sophia',
    tr: 'Ayasofya',
  },
  'Blue Mosque': {
    en: 'Blue Mosque',
    tr: 'Sultan Ahmet Camii',
  },
  'Topkapi Palace': {
    en: 'Topkapi Palace',
    tr: 'Topkapı Sarayı',
  },
  'Galata Tower': {
    en: 'Galata Tower',
    tr: 'Galata Kulesi',
  },
  'İstiklal Avenue': {
    en: 'İstiklal Avenue',
    tr: 'İstiklal Caddesi',
  },
  'Pera Museum': {
    en: 'Pera Museum',
    tr: 'Pera Müzesi',
  },
  'Dolmabahçe Palace': {
    en: 'Dolmabahçe Palace',
    tr: 'Dolmabahçe Sarayı',
  },
  'Beşiktaş Square': {
    en: 'Beşiktaş Square',
    tr: 'Beşiktaş Meydanı',
  },
  'Yıldız Park': {
    en: 'Yıldız Park',
    tr: 'Yıldız Parkı',
  },
  'Kadıköy Market': {
    en: 'Kadıköy Market',
    tr: 'Kadıköy Çarşısı',
  },
  'Moda Coast': {
    en: 'Moda Coast',
    tr: 'Moda Sahili',
  },
  'Fenerbahçe Park': {
    en: 'Fenerbahçe Park',
    tr: 'Fenerbahçe Parkı',
  },
  'Maiden\'s Tower': {
    en: 'Maiden\'s Tower',
    tr: 'Kız Kulesi',
  },
  'Çamlıca Hill': {
    en: 'Çamlıca Hill',
    tr: 'Çamlıca Tepesi',
  },
  'Mihrimah Sultan Mosque': {
    en: 'Mihrimah Sultan Mosque',
    tr: 'Mihrimah Sultan Camii',
  },
  'Ortaköy Mosque': {
    en: 'Ortaköy Mosque',
    tr: 'Ortaköy Camii',
  },
  'Bosphorus Bridge': {
    en: 'Bosphorus Bridge',
    tr: 'Boğaziçi Köprüsü',
  },
  'Ortaköy Square': {
    en: 'Ortaköy Square',
    tr: 'Ortaköy Meydanı',
  },
  'Spice Bazaar': {
    en: 'Spice Bazaar',
    tr: 'Mısır Çarşısı',
  },
  'Galata Bridge': {
    en: 'Galata Bridge',
    tr: 'Galata Köprüsü',
  },
  'New Mosque': {
    en: 'New Mosque',
    tr: 'Yeni Cami',
  },
  'Historic Streets': {
    en: 'Historic Streets',
    tr: 'Tarihi Sokaklar',
  },
  'Colorful Streets': {
    en: 'Colorful Streets',
    tr: 'Renkli Sokaklar',
  },
  'Historic Houses': {
    en: 'Historic Houses',
    tr: 'Tarihi Evler',
  },
  'Cafes': {
    en: 'Cafes',
    tr: 'Kafeler',
  },
  'Greek Orthodox Patriarchate': {
    en: 'Greek Orthodox Patriarchate',
    tr: 'Rum Ortodoks Patrikhanesi',
  },
  'Church of St. George': {
    en: 'Church of St. George',
    tr: 'Aya Yorgi Kilisesi',
  },
  'Taksim Square': {
    en: 'Taksim Square',
    tr: 'Taksim Meydanı',
  },
  'Republic Monument': {
    en: 'Republic Monument',
    tr: 'Cumhuriyet Anıtı',
  },
  'Luxury Boutiques': {
    en: 'Luxury Boutiques',
    tr: 'Lüks Butikler',
  },
  'City\'s Park': {
    en: 'City\'s Park',
    tr: 'Şehir Parkı',
  },
  'Rumeli Fortress': {
    en: 'Rumeli Fortress',
    tr: 'Rumeli Hisarı',
  },
  'Bosphorus Views': {
    en: 'Bosphorus Views',
    tr: 'Boğaz Manzarası',
  },
  'Historic Walls': {
    en: 'Historic Walls',
    tr: 'Tarihi Surlar',
  },
  'Bebek Coast': {
    en: 'Bebek Coast',
    tr: 'Bebek Sahili',
  },
  'Bosphorus Promenade': {
    en: 'Bosphorus Promenade',
    tr: 'Boğaz Sahil Yolu',
  },
  'Moda Coastal Park': {
    en: 'Moda Coastal Park',
    tr: 'Moda Sahil Parkı',
  },
  'Historic Pier': {
    en: 'Historic Pier',
    tr: 'Tarihi İskele',
  },
  'Art Nouveau Buildings': {
    en: 'Art Nouveau Buildings',
    tr: 'Art Nouveau Binalar',
  },
  'Büyükada': {
    en: 'Büyükada',
    tr: 'Büyükada',
  },
  'Beaches': {
    en: 'Beaches',
    tr: 'Plajlar',
  },
  'Historic Mansions': {
    en: 'Historic Mansions',
    tr: 'Tarihi Köşkler',
  },
};

export function getTranslatedLandmark(
  landmark: string,
  language: Language
): string {
  const translation = landmarkTranslations[landmark];
  if (translation && translation[language]) {
    return translation[language];
  }
  return landmark;
}

// Error message translations
export const errorTranslations: Record<string, Record<Language, string>> = {
  // Location service errors
  'location.permission.request.failed': {
    en: 'Failed to request location permissions',
    tr: 'Konum izinleri istenemedi',
  },
  'location.services.disabled': {
    en: 'Location services are disabled. Please enable them in your device settings.',
    tr: 'Konum servisleri devre dışı. Lütfen cihaz ayarlarınızdan etkinleştirin.',
  },
  'location.permission.denied': {
    en: 'Location permission not granted',
    tr: 'Konum izni verilmedi',
  },
  'location.gps.timeout': {
    en: 'GPS timeout. Please ensure you have a clear view of the sky and try again.',
    tr: 'GPS zaman aşımı. Lütfen gökyüzüne açık bir görüş alanınız olduğundan emin olun ve tekrar deneyin.',
  },
  'location.unavailable': {
    en: 'Unable to determine your location. Please try again.',
    tr: 'Konumunuz belirlenemiyor. Lütfen tekrar deneyin.',
  },
  'location.watch.failed': {
    en: 'Failed to start location tracking',
    tr: 'Konum takibi başlatılamadı',
  },

  // Attraction service errors
  'attractions.load.failed': {
    en: 'Failed to load attraction data',
    tr: 'Cazibe merkezi verileri yüklenemedi',
  },
  'attractions.validation.failed': {
    en: 'Attraction data validation failed',
    tr: 'Cazibe merkezi verisi doğrulaması başarısız',
  },
  'attractions.no.valid.data': {
    en: 'No valid attractions found in data',
    tr: 'Veride geçerli cazibe merkezi bulunamadı',
  },
  'districts.validation.failed': {
    en: 'District data validation failed',
    tr: 'İlçe verisi doğrulaması başarısız',
  },
  'districts.no.valid.data': {
    en: 'No valid districts found in data',
    tr: 'Veride geçerli ilçe bulunamadı',
  },

  // Storage service errors
  'storage.save.failed': {
    en: 'Failed to save district selection',
    tr: 'İlçe seçimi kaydedilemedi',
  },
  'storage.clear.failed': {
    en: 'Failed to clear district selection',
    tr: 'İlçe seçimi temizlenemedi',
  },
};

export function getErrorMessage(
  errorKey: string,
  language: Language
): string {
  const translation = errorTranslations[errorKey];
  if (translation && translation[language]) {
    return translation[language];
  }
  // Return the key itself as fallback
  return errorKey;
}
