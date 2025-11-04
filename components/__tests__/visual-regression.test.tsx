/**
 * Visual Regression Testing Suite
 * 
 * Tests layout consistency across different screen sizes and breakpoints
 * Requirements: 1.1, 4.3, 4.4, 6.1, 6.2
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Dimensions } from 'react-native';
import HomeScreen from '@/app/(tabs)/index';
import ExploreScreen from '@/app/(tabs)/explore';
import AttractionDetailScreen from '@/app/attraction/[id]';
import DistrictDetailView from '@/components/district/DistrictDetailView';

// Mock dependencies
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
  useLocalSearchParams: () => ({ id: '1' }),
}));

jest.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    language: 'en',
  }),
}));

jest.mock('@/context/ManualSelectionContext', () => ({
  useManualSelection: () => ({
    onClearTriggered: jest.fn(() => jest.fn()),
  }),
}));

jest.mock('@/hooks/useLocation', () => ({
  useLocation: () => ({
    location: { latitude: 41.0082, longitude: 28.9784 },
    district: 'Beyoğlu',
    loading: false,
    error: null,
    permissionGranted: true,
    refreshLocation: jest.fn(),
    manuallySelectedDistrict: null,
    isManualSelection: false,
    lastAutoDetectedDistrict: null,
    setManualDistrict: jest.fn(),
    clearManualSelection: jest.fn(),
  }),
}));

jest.mock('@/hooks/useAttractions', () => ({
  useAttractions: () => ({
    attractions: [],
    loading: false,
    error: null,
    refresh: jest.fn(),
  }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: any) => children,
}));

jest.mock('@/components/ads/BannerAd', () => 'BannerAd');

// Breakpoint configurations for testing
const BREAKPOINTS = {
  smallPhone: { width: 320, height: 568 },
  mediumPhone: { width: 375, height: 667 },
  largePhone: { width: 414, height: 896 },
  tablet: { width: 768, height: 1024 },
};

// Helper to mock screen dimensions
const mockDimensions = (width: number, height: number) => {
  jest.spyOn(Dimensions, 'get').mockReturnValue({
    width,
    height,
    scale: 2,
    fontScale: 1,
  });
};

describe('Visual Regression Testing', () => {
  describe('Home Screen Layout Consistency', () => {
    it('should render consistently on small phone (320px)', () => {
      mockDimensions(BREAKPOINTS.smallPhone.width, BREAKPOINTS.smallPhone.height);
      const { toJSON } = render(<HomeScreen />);
      expect(toJSON()).toMatchSnapshot('home-small-phone-portrait');
    });

    it('should render consistently on medium phone (375px)', () => {
      mockDimensions(BREAKPOINTS.mediumPhone.width, BREAKPOINTS.mediumPhone.height);
      const { toJSON } = render(<HomeScreen />);
      expect(toJSON()).toMatchSnapshot('home-medium-phone-portrait');
    });

    it('should render consistently on large phone (414px)', () => {
      mockDimensions(BREAKPOINTS.largePhone.width, BREAKPOINTS.largePhone.height);
      const { toJSON } = render(<HomeScreen />);
      expect(toJSON()).toMatchSnapshot('home-large-phone-portrait');
    });

    it('should render consistently on tablet (768px)', () => {
      mockDimensions(BREAKPOINTS.tablet.width, BREAKPOINTS.tablet.height);
      const { toJSON } = render(<HomeScreen />);
      expect(toJSON()).toMatchSnapshot('home-tablet-portrait');
    });

    it('should render consistently on small phone landscape', () => {
      mockDimensions(BREAKPOINTS.smallPhone.height, BREAKPOINTS.smallPhone.width);
      const { toJSON } = render(<HomeScreen />);
      expect(toJSON()).toMatchSnapshot('home-small-phone-landscape');
    });

    it('should render consistently on tablet landscape', () => {
      mockDimensions(BREAKPOINTS.tablet.height, BREAKPOINTS.tablet.width);
      const { toJSON } = render(<HomeScreen />);
      expect(toJSON()).toMatchSnapshot('home-tablet-landscape');
    });
  });

  describe('Explore Screen Layout Consistency', () => {
    it('should render consistently on small phone (320px)', () => {
      mockDimensions(BREAKPOINTS.smallPhone.width, BREAKPOINTS.smallPhone.height);
      const { toJSON } = render(<ExploreScreen />);
      expect(toJSON()).toMatchSnapshot('explore-small-phone-portrait');
    });

    it('should render consistently on medium phone (375px)', () => {
      mockDimensions(BREAKPOINTS.mediumPhone.width, BREAKPOINTS.mediumPhone.height);
      const { toJSON } = render(<ExploreScreen />);
      expect(toJSON()).toMatchSnapshot('explore-medium-phone-portrait');
    });

    it('should render consistently on large phone (414px)', () => {
      mockDimensions(BREAKPOINTS.largePhone.width, BREAKPOINTS.largePhone.height);
      const { toJSON } = render(<ExploreScreen />);
      expect(toJSON()).toMatchSnapshot('explore-large-phone-portrait');
    });

    it('should render consistently on tablet (768px)', () => {
      mockDimensions(BREAKPOINTS.tablet.width, BREAKPOINTS.tablet.height);
      const { toJSON } = render(<ExploreScreen />);
      expect(toJSON()).toMatchSnapshot('explore-tablet-portrait');
    });

    it('should render consistently on medium phone landscape', () => {
      mockDimensions(BREAKPOINTS.mediumPhone.height, BREAKPOINTS.mediumPhone.width);
      const { toJSON } = render(<ExploreScreen />);
      expect(toJSON()).toMatchSnapshot('explore-medium-phone-landscape');
    });

    it('should render consistently on tablet landscape', () => {
      mockDimensions(BREAKPOINTS.tablet.height, BREAKPOINTS.tablet.width);
      const { toJSON } = render(<ExploreScreen />);
      expect(toJSON()).toMatchSnapshot('explore-tablet-landscape');
    });
  });

  describe('Attraction Detail Layout Consistency', () => {
    it('should render consistently on small phone (320px)', () => {
      mockDimensions(BREAKPOINTS.smallPhone.width, BREAKPOINTS.smallPhone.height);
      const { toJSON } = render(<AttractionDetailScreen />);
      expect(toJSON()).toMatchSnapshot('attraction-detail-small-phone-portrait');
    });

    it('should render consistently on medium phone (375px)', () => {
      mockDimensions(BREAKPOINTS.mediumPhone.width, BREAKPOINTS.mediumPhone.height);
      const { toJSON } = render(<AttractionDetailScreen />);
      expect(toJSON()).toMatchSnapshot('attraction-detail-medium-phone-portrait');
    });

    it('should render consistently on large phone (414px)', () => {
      mockDimensions(BREAKPOINTS.largePhone.width, BREAKPOINTS.largePhone.height);
      const { toJSON } = render(<AttractionDetailScreen />);
      expect(toJSON()).toMatchSnapshot('attraction-detail-large-phone-portrait');
    });

    it('should render consistently on tablet (768px)', () => {
      mockDimensions(BREAKPOINTS.tablet.width, BREAKPOINTS.tablet.height);
      const { toJSON } = render(<AttractionDetailScreen />);
      expect(toJSON()).toMatchSnapshot('attraction-detail-tablet-portrait');
    });

    it('should render consistently on large phone landscape', () => {
      mockDimensions(BREAKPOINTS.largePhone.height, BREAKPOINTS.largePhone.width);
      const { toJSON } = render(<AttractionDetailScreen />);
      expect(toJSON()).toMatchSnapshot('attraction-detail-large-phone-landscape');
    });
  });

  describe('District Detail Layout Consistency', () => {
    const mockDistrict = 'Beyoğlu';
    const mockOnBack = jest.fn();

    it('should render consistently on small phone (320px)', () => {
      mockDimensions(BREAKPOINTS.smallPhone.width, BREAKPOINTS.smallPhone.height);
      const { toJSON } = render(
        <DistrictDetailView district={mockDistrict} onBack={mockOnBack} />
      );
      expect(toJSON()).toMatchSnapshot('district-detail-small-phone-portrait');
    });

    it('should render consistently on medium phone (375px)', () => {
      mockDimensions(BREAKPOINTS.mediumPhone.width, BREAKPOINTS.mediumPhone.height);
      const { toJSON } = render(
        <DistrictDetailView district={mockDistrict} onBack={mockOnBack} />
      );
      expect(toJSON()).toMatchSnapshot('district-detail-medium-phone-portrait');
    });

    it('should render consistently on large phone (414px)', () => {
      mockDimensions(BREAKPOINTS.largePhone.width, BREAKPOINTS.largePhone.height);
      const { toJSON } = render(
        <DistrictDetailView district={mockDistrict} onBack={mockOnBack} />
      );
      expect(toJSON()).toMatchSnapshot('district-detail-large-phone-portrait');
    });

    it('should render consistently on tablet (768px)', () => {
      mockDimensions(BREAKPOINTS.tablet.width, BREAKPOINTS.tablet.height);
      const { toJSON } = render(
        <DistrictDetailView district={mockDistrict} onBack={mockOnBack} />
      );
      expect(toJSON()).toMatchSnapshot('district-detail-tablet-portrait');
    });

    it('should render consistently on tablet landscape', () => {
      mockDimensions(BREAKPOINTS.tablet.height, BREAKPOINTS.tablet.width);
      const { toJSON } = render(
        <DistrictDetailView district={mockDistrict} onBack={mockOnBack} />
      );
      expect(toJSON()).toMatchSnapshot('district-detail-tablet-landscape');
    });
  });

  describe('Layout Measurements Validation', () => {
    beforeEach(() => {
      mockDimensions(BREAKPOINTS.mediumPhone.width, BREAKPOINTS.mediumPhone.height);
    });

    it('should maintain proper header structure on home screen', () => {
      const { getByText } = render(<HomeScreen />);
      const header = getByText('home.nearbyAttractions');
      expect(header).toBeTruthy();
    });

    it('should maintain proper header structure on explore screen', () => {
      const { getByText } = render(<ExploreScreen />);
      const title = getByText('explore.title');
      const subtitle = getByText('explore.subtitle');
      expect(title).toBeTruthy();
      expect(subtitle).toBeTruthy();
    });

    it('should render district detail with proper structure', () => {
      const { getByText } = render(
        <DistrictDetailView district="Beyoğlu" onBack={jest.fn()} />
      );
      expect(getByText('Beyoğlu')).toBeTruthy();
    });
  });

  describe('Responsive Behavior Validation', () => {
    it('should apply landscape styles when width > height', () => {
      mockDimensions(667, 375); // Landscape orientation
      const { toJSON } = render(<HomeScreen />);
      const tree = toJSON();
      expect(tree).toBeTruthy();
      // Snapshot will capture landscape-specific styles
      expect(tree).toMatchSnapshot('home-landscape-styles');
    });

    it('should apply tablet styles when width >= 768', () => {
      mockDimensions(768, 1024);
      const { toJSON } = render(<ExploreScreen />);
      const tree = toJSON();
      expect(tree).toBeTruthy();
      // Snapshot will capture tablet-specific styles
      expect(tree).toMatchSnapshot('explore-tablet-styles');
    });

    it('should handle orientation changes gracefully', () => {
      // Portrait
      mockDimensions(375, 667);
      const { toJSON: portraitJSON, rerender } = render(<HomeScreen />);
      expect(portraitJSON()).toMatchSnapshot('home-portrait-before-rotation');

      // Landscape
      mockDimensions(667, 375);
      rerender(<HomeScreen />);
      expect(portraitJSON()).toMatchSnapshot('home-landscape-after-rotation');
    });
  });
});
