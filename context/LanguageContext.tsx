import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = '@istanbuller_language';

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const saved = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'en' || saved === 'tr') {
        setLanguageState(saved);
      }
    } catch (error) {
      console.error('Failed to load language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const t = (key: string): string => {
    const translations = language === 'tr' ? translationsTR : translationsEN;
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

const translationsEN: Record<string, string> = {
  'tab.home': 'Home',
  'tab.explore': 'Explore',
  'tab.language': 'Language',
  'home.title': 'Discover Istanbul',
  'home.subtitle': 'Your location-based guide',
  'home.currentDistrict': 'Current District',
  'home.nearbyAttractions': 'Nearby Attractions',
  'home.noDistrict': 'Outside Istanbul',
  'home.selectDistrict': 'Select District',
  'explore.title': 'Explore Istanbul',
  'explore.subtitle': 'Discover all districts and their attractions',
  'explore.allDistricts': 'All Districts',
  'location.permissionRequired': 'Location Permission Required',
  'location.permissionMessage': 'We need your location to show you the best attractions in your current district. Your location data stays private and is only used to enhance your experience.',
  'location.grantPermission': 'Enable Location',
  'location.requesting': 'Requesting...',
  'location.denied': 'Location permission is required to show nearby attractions',
  'location.error': 'Failed to get your location',
  'location.outsideIstanbul': 'You appear to be outside Istanbul districts',
  'location.accessDenied': 'Location Access Denied',
  'location.settingsMessage': 'To discover amazing attractions near you, we need access to your location. Please enable location permissions in your device settings.',
  'location.openSettings': 'Open Settings',
  'location.privacyNote': 'Your privacy matters. We never share your location data.',
  'location.feature1': 'Find nearby attractions',
  'location.feature2': 'Calculate walking distances',
  'location.feature3': 'Get personalized recommendations',
  'location.refreshLocation': 'Refresh Location',
  'location.retryLocation': 'Retry Location',
  'attraction.distance': 'Distance',
  'attraction.walkingTime': 'Walking',
  'attraction.publicTransport': 'Public Transport',
  'attraction.minutes': 'min',
  'attraction.km': 'km',
  'attraction.viewDetails': 'View Details',
  'attraction.noAttractions': 'No Attractions Found',
  'attraction.noAttractionsMessage': 'There are no attractions in your current area. Try moving to a different district.',
  'attraction.loading': 'Finding attractions near you...',
  'attraction.distanceFromYou': 'Distance from You',
  'attraction.about': 'About',
  'attraction.address': 'Address',
  'attraction.takeMeThere': 'Take Me There',
  'attraction.notFound': 'Attraction not found',
  'district.select': 'Select a District',
  'district.manual': 'Manual Selection',
  'district.gps': 'GPS Location',
  'district.detected': 'District Detected',
  'district.detectedMessage': "You're now in {district}. Would you like to switch to automatic detection?",
  'district.keepManual': 'Keep Manual',
  'district.switchToAuto': 'Switch to Auto',
  'district.chooseManually': 'Choose District Manually',
  'district.chooseDistrict': 'Choose a District',
  'district.place': 'place',
  'district.places': 'places',
  'district.keyLandmarks': 'Key Landmarks',
  'district.attractions': 'Attractions',
  'district.distancesFromCenter': 'Distances from district center',
  'district.noDistrictTitle': "We couldn't detect your district",
  'district.noDistrictMessage': "You might be outside our covered areas. You can still explore Istanbul by choosing a district manually.",
  'district.gpsTimeoutTitle': 'GPS is taking too long',
  'district.gpsTimeoutMessage': "We're still trying to find your location. You can choose a district manually while we keep trying.",
  'district.servicesDisabledTitle': 'Location services are disabled',
  'district.servicesDisabledMessage': "Location services are turned off. You can still explore by choosing a district manually.",
  'district.permissionNeededTitle': 'Location permission needed',
  'district.permissionNeededMessage': "Location permission is needed for automatic detection. You can browse districts manually in the meantime.",
  'common.loading': 'Loading...',
  'common.error': 'Oops!',
  'common.retry': 'Try Again',
  'common.cancel': 'Cancel',
  'common.ok': 'OK',
  'common.close': 'Close',
  'common.goBack': 'Go Back',
};

const translationsTR: Record<string, string> = {
  'tab.home': 'Ana Sayfa',
  'tab.explore': 'Keşfet',
  'tab.language': 'Dil',
  'home.title': 'İstanbul\'u Keşfet',
  'home.subtitle': 'Konum tabanlı rehberiniz',
  'home.currentDistrict': 'Bulunduğunuz İlçe',
  'home.nearbyAttractions': 'Yakındaki Yerler',
  'home.noDistrict': 'İstanbul Dışında',
  'home.selectDistrict': 'İlçe Seç',
  'explore.title': 'İstanbul\'u Keşfet',
  'explore.subtitle': 'Tüm ilçeleri ve yerlerini keşfedin',
  'explore.allDistricts': 'Tüm İlçeler',
  'location.permissionRequired': 'Konum İzni Gerekli',
  'location.permissionMessage': 'Bulunduğunuz ilçedeki en iyi yerleri göstermek için konumunuza ihtiyacımız var. Konum verileriniz gizli kalır ve sadece deneyiminizi geliştirmek için kullanılır.',
  'location.grantPermission': 'Konumu Etkinleştir',
  'location.requesting': 'İsteniyor...',
  'location.denied': 'Yakındaki yerleri göstermek için konum izni gereklidir',
  'location.error': 'Konumunuz alınamadı',
  'location.outsideIstanbul': 'İstanbul ilçeleri dışında görünüyorsunuz',
  'location.accessDenied': 'Konum Erişimi Reddedildi',
  'location.settingsMessage': 'Yakınınızdaki harika yerleri keşfetmek için konumunuza erişmemiz gerekiyor. Lütfen cihaz ayarlarınızdan konum izinlerini etkinleştirin.',
  'location.openSettings': 'Ayarları Aç',
  'location.privacyNote': 'Gizliliğiniz önemlidir. Konum verilerinizi asla paylaşmayız.',
  'location.feature1': 'Yakındaki yerleri bulun',
  'location.feature2': 'Yürüme mesafelerini hesaplayın',
  'location.feature3': 'Kişiselleştirilmiş öneriler alın',
  'location.refreshLocation': 'Konumu Yenile',
  'location.retryLocation': 'Konumu Tekrar Dene',
  'attraction.distance': 'Mesafe',
  'attraction.walkingTime': 'Yürüyerek',
  'attraction.publicTransport': 'Toplu Taşıma',
  'attraction.minutes': 'dk',
  'attraction.km': 'km',
  'attraction.viewDetails': 'Detayları Gör',
  'attraction.noAttractions': 'Yer Bulunamadı',
  'attraction.noAttractionsMessage': 'Bulunduğunuz bölgede yer yok. Farklı bir ilçeye gitmeyi deneyin.',
  'attraction.loading': 'Yakınınızdaki yerler bulunuyor...',
  'attraction.distanceFromYou': 'Sizden Uzaklık',
  'attraction.about': 'Hakkında',
  'attraction.address': 'Adres',
  'attraction.takeMeThere': 'Beni Götür',
  'attraction.notFound': 'Yer bulunamadı',
  'district.select': 'İlçe Seçin',
  'district.manual': 'Manuel Seçim',
  'district.gps': 'GPS Konumu',
  'district.detected': 'İlçe Tespit Edildi',
  'district.detectedMessage': 'Şu anda {district} bölgesindesiniz. Otomatik tespite geçmek ister misiniz?',
  'district.keepManual': 'Manuel Kalsın',
  'district.switchToAuto': 'Otomatiğe Geç',
  'district.chooseManually': 'İlçeyi Manuel Seç',
  'district.chooseDistrict': 'İlçe Seçin',
  'district.place': 'yer',
  'district.places': 'yer',
  'district.keyLandmarks': 'Önemli Yerler',
  'district.attractions': 'Yerler',
  'district.distancesFromCenter': 'İlçe merkezinden mesafeler',
  'district.noDistrictTitle': 'İlçenizi tespit edemedik',
  'district.noDistrictMessage': 'Kapsama alanımızın dışında olabilirsiniz. Yine de manuel olarak bir ilçe seçerek İstanbul\'u keşfedebilirsiniz.',
  'district.gpsTimeoutTitle': 'GPS çok uzun sürüyor',
  'district.gpsTimeoutMessage': 'Konumunuzu bulmaya çalışıyoruz. Biz denemeye devam ederken manuel olarak bir ilçe seçebilirsiniz.',
  'district.servicesDisabledTitle': 'Konum servisleri kapalı',
  'district.servicesDisabledMessage': 'Konum servisleri kapatılmış. Yine de manuel olarak bir ilçe seçerek keşfedebilirsiniz.',
  'district.permissionNeededTitle': 'Konum izni gerekli',
  'district.permissionNeededMessage': 'Otomatik tespit için konum izni gereklidir. Bu arada ilçelere manuel olarak göz atabilirsiniz.',
  'common.loading': 'Yükleniyor...',
  'common.error': 'Hata!',
  'common.retry': 'Tekrar Dene',
  'common.cancel': 'İptal',
  'common.ok': 'Tamam',
  'common.close': 'Kapat',
  'common.goBack': 'Geri Dön',
};
