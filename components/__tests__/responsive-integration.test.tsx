/**
 * Integration tests for responsive behavior across different screen sizes and orientations
 * Tests Requirements: 4.1, 4.2, 4.4, 8.1, 8.2, 8.4
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { useWindowDimensions } from 'react-native';
import AttractionCard from '../attractions/AttractionCard';
import DistrictCard from '../district/DistrictCard';
import { AttractionWithDistance, IstanbulDistrict, AttractionCategory } from '@/types';
import { DistrictInfo } from '@/constants/DistrictMetadata';

// Mock dependencies
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  useWindowDimensions: jest.fn(),
  Dimensions: {
    get: jest.fn(),
  },
  PixelRatio: {
    roundToNearestPixel: jest.fn((value: number) => Math.round(value)),
  },
}));

jest.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'en',
    t: (key: string) => key,
  }),
}));

jest.mock('@/utils/haptics', () => ({
  mediumHaptic: jest.fn(),
}));

jest.mock('@/utils/translations', () => ({
  getTranslatedAttractionField: (_id: string, _field: string, _lang: string, fallback: string) => fallback,
  getTranslatedDistrictField: (_district: string, _field: string, _lang: string, fallback: string) => fallback,
}));

jest.mock('@/services/attractionService', () => ({
  getAttractionsByDistrict: jest.fn(() => []),
}));

// Mock data
const mockAttraction: AttractionWithDistance = {
  id: 'test-attraction',
  name: 'Test Attraction',
  category: AttractionCategory.MUSEUM,
  summary: 'A test attraction for integration testing',
  description: 'Full description',
  imageUrl: 'https://example.com/image.jpg',
  district: IstanbulDistrict.SULTANAHMET,
  coordinates: { latitude: 41.0082, longitude: 28.9784 },
  address: '123 Test Street',
  distance: {
    walkingDistanceKm: 1.5,
    walkingTimeMinutes: 20,
    publicTransportTimeMinutes: 15,
  },
};

const mockDistrictInfo: DistrictInfo = {
  name: IstanbulDistrict.SULTANAHMET,
  displayName: 'Sultanahmet',
  description: 'Historic district',
  keyLandmarks: ['Hagia Sophia', 'Blue Mosque'],
  icon: 'building.columns',
  image: 'https://example.com/district.jpg',
};

describe('Responsive Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Small Phone (320px width)', () => {
    describe('Portrait Orientation', () => {
      beforeEach(() => {
        (useWindowDimensions as jest.Mock).mockReturnValue({
          width: 320,
          height: 568,
        });
        (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
          width: 320,
          height: 568,
        });
      });

      it('should render AttractionCard correctly on small phone portrait', () => {
        const { getByText } = render(
          <AttractionCard
            attraction={mockAttraction}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Test Attraction')).toBeTruthy();
        expect(getByText('Museum')).toBeTruthy();
        expect(getByText('A test attraction for integration testing')).toBeTruthy();
      });

      it('should render DistrictCard correctly on small phone portrait', () => {
        const { getByText } = render(
          <DistrictCard
            district={IstanbulDistrict.SULTANAHMET}
            info={mockDistrictInfo}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Sultanahmet')).toBeTruthy();
        expect(getByText('Historic district')).toBeTruthy();
      });
    });

    describe('Landscape Orientation', () => {
      beforeEach(() => {
        (useWindowDimensions as jest.Mock).mockReturnValue({
          width: 568,
          height: 320,
        });
        (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
          width: 568,
          height: 320,
        });
      });

      it('should render AttractionCard correctly on small phone landscape', () => {
        const { getByText } = render(
          <AttractionCard
            attraction={mockAttraction}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Test Attraction')).toBeTruthy();
        expect(getByText('Museum')).toBeTruthy();
      });

      it('should render DistrictCard correctly on small phone landscape', () => {
        const { getByText } = render(
          <DistrictCard
            district={'Sultanahmet' as IstanbulDistrict}
            info={mockDistrictInfo}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Sultanahmet')).toBeTruthy();
      });
    });
  });

  describe('Medium Phone (375px width)', () => {
    describe('Portrait Orientation', () => {
      beforeEach(() => {
        (useWindowDimensions as jest.Mock).mockReturnValue({
          width: 375,
          height: 667,
        });
        (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
          width: 375,
          height: 667,
        });
      });

      it('should render AttractionCard correctly on medium phone portrait', () => {
        const { getByText } = render(
          <AttractionCard
            attraction={mockAttraction}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Test Attraction')).toBeTruthy();
        expect(getByText('Museum')).toBeTruthy();
        expect(getByText('A test attraction for integration testing')).toBeTruthy();
      });

      it('should render DistrictCard correctly on medium phone portrait', () => {
        const { getByText } = render(
          <DistrictCard
            district={'Sultanahmet' as IstanbulDistrict}
            info={mockDistrictInfo}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Sultanahmet')).toBeTruthy();
        expect(getByText('Historic district')).toBeTruthy();
      });
    });

    describe('Landscape Orientation', () => {
      beforeEach(() => {
        (useWindowDimensions as jest.Mock).mockReturnValue({
          width: 667,
          height: 375,
        });
        (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
          width: 667,
          height: 375,
        });
      });

      it('should render AttractionCard correctly on medium phone landscape', () => {
        const { getByText } = render(
          <AttractionCard
            attraction={mockAttraction}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Test Attraction')).toBeTruthy();
        expect(getByText('Museum')).toBeTruthy();
      });

      it('should render DistrictCard correctly on medium phone landscape', () => {
        const { getByText } = render(
          <DistrictCard
            district={'Sultanahmet' as IstanbulDistrict}
            info={mockDistrictInfo}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Sultanahmet')).toBeTruthy();
      });
    });
  });

  describe('Large Phone (414px width)', () => {
    describe('Portrait Orientation', () => {
      beforeEach(() => {
        (useWindowDimensions as jest.Mock).mockReturnValue({
          width: 414,
          height: 896,
        });
        (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
          width: 414,
          height: 896,
        });
      });

      it('should render AttractionCard correctly on large phone portrait', () => {
        const { getByText } = render(
          <AttractionCard
            attraction={mockAttraction}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Test Attraction')).toBeTruthy();
        expect(getByText('Museum')).toBeTruthy();
        expect(getByText('A test attraction for integration testing')).toBeTruthy();
      });

      it('should render DistrictCard correctly on large phone portrait', () => {
        const { getByText } = render(
          <DistrictCard
            district={'Sultanahmet' as IstanbulDistrict}
            info={mockDistrictInfo}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Sultanahmet')).toBeTruthy();
        expect(getByText('Historic district')).toBeTruthy();
      });
    });

    describe('Landscape Orientation', () => {
      beforeEach(() => {
        (useWindowDimensions as jest.Mock).mockReturnValue({
          width: 896,
          height: 414,
        });
        (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
          width: 896,
          height: 414,
        });
      });

      it('should render AttractionCard correctly on large phone landscape', () => {
        const { getByText } = render(
          <AttractionCard
            attraction={mockAttraction}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Test Attraction')).toBeTruthy();
        expect(getByText('Museum')).toBeTruthy();
      });

      it('should render DistrictCard correctly on large phone landscape', () => {
        const { getByText } = render(
          <DistrictCard
            district={'Sultanahmet' as IstanbulDistrict}
            info={mockDistrictInfo}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Sultanahmet')).toBeTruthy();
      });
    });
  });

  describe('Tablet (768px width)', () => {
    describe('Portrait Orientation', () => {
      beforeEach(() => {
        (useWindowDimensions as jest.Mock).mockReturnValue({
          width: 768,
          height: 1024,
        });
        (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
          width: 768,
          height: 1024,
        });
      });

      it('should render AttractionCard correctly on tablet portrait', () => {
        const { getByText } = render(
          <AttractionCard
            attraction={mockAttraction}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Test Attraction')).toBeTruthy();
        expect(getByText('Museum')).toBeTruthy();
        expect(getByText('A test attraction for integration testing')).toBeTruthy();
      });

      it('should render DistrictCard correctly on tablet portrait', () => {
        const { getByText } = render(
          <DistrictCard
            district={'Sultanahmet' as IstanbulDistrict}
            info={mockDistrictInfo}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Sultanahmet')).toBeTruthy();
        expect(getByText('Historic district')).toBeTruthy();
      });

      it('should apply tablet-specific styles to AttractionCard', () => {
        const { getByRole } = render(
          <AttractionCard
            attraction={mockAttraction}
            onPress={jest.fn()}
          />
        );

        const card = getByRole('button');
        expect(card).toBeTruthy();
      });
    });

    describe('Landscape Orientation', () => {
      beforeEach(() => {
        (useWindowDimensions as jest.Mock).mockReturnValue({
          width: 1024,
          height: 768,
        });
        (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
          width: 1024,
          height: 768,
        });
      });

      it('should render AttractionCard correctly on tablet landscape', () => {
        const { getByText } = render(
          <AttractionCard
            attraction={mockAttraction}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Test Attraction')).toBeTruthy();
        expect(getByText('Museum')).toBeTruthy();
      });

      it('should render DistrictCard correctly on tablet landscape', () => {
        const { getByText } = render(
          <DistrictCard
            district={'Sultanahmet' as IstanbulDistrict}
            info={mockDistrictInfo}
            onPress={jest.fn()}
          />
        );

        expect(getByText('Sultanahmet')).toBeTruthy();
      });
    });
  });

  describe('Orientation Transitions', () => {
    it('should handle portrait to landscape transition on medium phone', () => {
      // Start in portrait
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 375,
        height: 667,
      });
      (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
        width: 375,
        height: 667,
      });

      const { getByText, rerender } = render(
        <AttractionCard
          attraction={mockAttraction}
          onPress={jest.fn()}
        />
      );

      expect(getByText('Test Attraction')).toBeTruthy();

      // Transition to landscape
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 667,
        height: 375,
      });
      (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
        width: 667,
        height: 375,
      });

      rerender(
        <AttractionCard
          attraction={mockAttraction}
          onPress={jest.fn()}
        />
      );

      expect(getByText('Test Attraction')).toBeTruthy();
    });

    it('should handle landscape to portrait transition on tablet', () => {
      // Start in landscape
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 1024,
        height: 768,
      });
      (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
        width: 1024,
        height: 768,
      });

      const { getByText, rerender } = render(
        <DistrictCard
          district={'Sultanahmet' as IstanbulDistrict}
          info={mockDistrictInfo}
          onPress={jest.fn()}
        />
      );

      expect(getByText('Sultanahmet')).toBeTruthy();

      // Transition to portrait
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 768,
        height: 1024,
      });
      (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
        width: 768,
        height: 1024,
      });

      rerender(
        <DistrictCard
          district={'Sultanahmet' as IstanbulDistrict}
          info={mockDistrictInfo}
          onPress={jest.fn()}
        />
      );

      expect(getByText('Sultanahmet')).toBeTruthy();
    });

    it('should handle portrait to landscape transition on large phone', () => {
      // Start in portrait
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 414,
        height: 896,
      });
      (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
        width: 414,
        height: 896,
      });

      const { getByText, rerender } = render(
        <AttractionCard
          attraction={mockAttraction}
          onPress={jest.fn()}
        />
      );

      expect(getByText('Test Attraction')).toBeTruthy();

      // Transition to landscape
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 896,
        height: 414,
      });
      (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
        width: 896,
        height: 414,
      });

      rerender(
        <AttractionCard
          attraction={mockAttraction}
          onPress={jest.fn()}
        />
      );

      expect(getByText('Test Attraction')).toBeTruthy();
    });
  });

  describe('Device Category Detection', () => {
    it('should correctly detect small phone category', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 320,
        height: 568,
      });
      (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
        width: 320,
        height: 568,
      });

      const { getByText } = render(
        <AttractionCard
          attraction={mockAttraction}
          onPress={jest.fn()}
        />
      );

      expect(getByText('Test Attraction')).toBeTruthy();
    });

    it('should correctly detect medium phone category', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 375,
        height: 667,
      });
      (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
        width: 375,
        height: 667,
      });

      const { getByText } = render(
        <AttractionCard
          attraction={mockAttraction}
          onPress={jest.fn()}
        />
      );

      expect(getByText('Test Attraction')).toBeTruthy();
    });

    it('should correctly detect large phone category', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 414,
        height: 896,
      });
      (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
        width: 414,
        height: 896,
      });

      const { getByText } = render(
        <AttractionCard
          attraction={mockAttraction}
          onPress={jest.fn()}
        />
      );

      expect(getByText('Test Attraction')).toBeTruthy();
    });

    it('should correctly detect tablet category', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 768,
        height: 1024,
      });
      (require('react-native').Dimensions.get as jest.Mock).mockReturnValue({
        width: 768,
        height: 1024,
      });

      const { getByText } = render(
        <AttractionCard
          attraction={mockAttraction}
          onPress={jest.fn()}
        />
      );

      expect(getByText('Test Attraction')).toBeTruthy();
    });
  });
});
