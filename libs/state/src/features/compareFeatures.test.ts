import { Feature, FeatureStatus } from '@my-solution/shared';
import { compareFeatures } from './compareFeatures';

describe('compareFeatures', () => {
  it('should return true when comparing two identical features', () => {
    const featureA: Feature = getDefaultFeature();

    const featureB: Feature = getDefaultFeature();

    const result = compareFeatures(featureA, featureB);

    expect(result).toBe(true);
  });

  it('should return false when comparing two different features', () => {
    const featureA: Feature = getDefaultFeature();

    const featureB: Feature = getDefaultFeature();

    featureB.key = 'Feature 2';

    const result = compareFeatures(featureA, featureB);

    expect(result).toBe(false);
  });

  it('should return false when comparing a feature with undefined', () => {
    const featureA: Feature = getDefaultFeature();

    const featureB = undefined;

    const result = compareFeatures(featureA, featureB);

    expect(result).toBe(false);
  });

  it('should return false when each property is different', () => {
    // Run a test where each property is different between the two features
    const featureA: Feature = getDefaultFeature();
    let featureB: Feature = getDefaultFeature();

    featureB.id = '2';
    let result = compareFeatures(featureA, featureB);
    expect(result).toBe(false);

    featureB = getDefaultFeature();
    featureB.createdAt = 'Changed';
    result = compareFeatures(featureA, featureB);
    expect(result).toBe(false);

    featureB = getDefaultFeature();
    featureB.groups = ['Group 2'];
    result = compareFeatures(featureA, featureB);
    expect(result).toBe(false);

    featureB = getDefaultFeature();
    featureB.key = 'Feature 2';
    result = compareFeatures(featureA, featureB);
    expect(result).toBe(false);

    featureB = getDefaultFeature();
    featureB.serverId = '2';
    result = compareFeatures(featureA, featureB);
    expect(result).toBe(false);

    featureB = getDefaultFeature();
    featureB.status = FeatureStatus.INACTIVE;
    result = compareFeatures(featureA, featureB);
    expect(result).toBe(false);

    featureB = getDefaultFeature();
    featureB.updatedAt = 'Changed';
    result = compareFeatures(featureA, featureB);
    expect(result).toBe(false);

  });

  // Add more test cases as needed
});

function getDefaultFeature(): Feature {
  return {
    id: '1',
    status: FeatureStatus.ACTIVE,
    serverId: '1',
    key: 'Feature 1',
    groups: ['Group 1'],
    createdAt: '2022-01-01',
    updatedAt: '2022-01-02',
}
}
