import { Dimensions } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from './metrics';

jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
  },
}));

describe('Metrics', () => {
  describe('horizontalScale', () => {
    it('should scale the size based on the width ratio', () => {
      expect(horizontalScale(100)).toBe(100);
      expect(horizontalScale(200)).toBe(200);
      expect(horizontalScale(50)).toBe(50);
    });
  });

  describe('verticalScale', () => {
    it('should scale the size based on the height ratio', () => {
      expect(verticalScale(100)).toBe(100);
      expect(verticalScale(200)).toBe(200);
      expect(verticalScale(50)).toBe(50);
    });
  });

  describe('moderateScale', () => {
    it('should scale the size based on the width ratio and factor', () => {
      expect(moderateScale(100)).toBe(100);
      expect(moderateScale(200)).toBe(200);
      expect(moderateScale(50)).toBe(50);
    });

    it('should apply the factor to the scaled size', () => {
      expect(moderateScale(100, 0.25)).toBe(100);
      expect(moderateScale(200, 0.5)).toBe(200);
      expect(moderateScale(50, 0.75)).toBe(50);
    });
  });
});