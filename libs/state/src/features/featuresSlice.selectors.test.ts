import { FeatureStatus } from "@my-solution/shared";
import { RootState } from "../store";
import { selectFeatureByKey, selectAllFeatures, selectFeatureById, selectFeatureIds } from "./featuresSlice";

describe('featuresSlice selectors', () => {
  let state: RootState;

  beforeEach(() => {
    state = {
      features: {
        ids: ['1', '2'],
        entities: {
          '1': {
            id: '1',
            key: 'Feature 1',
            groups: [],
            status: FeatureStatus.ACTIVE,
          },
          '2': {
            id: '2',
            key: 'Feature 2',
            groups: [],
            status: FeatureStatus.ACTIVE,
          },
        },
        status: 'idle',
        error: null,
      },
      sync: [],
      user: {},
      posts: {
        ids: [],
        entities: {},
        status: 'idle',
        error: null,
      },
    };
  });

  it('should select all features', () => {

    const selectedFeatures = selectAllFeatures(state);

    expect(selectedFeatures.length).toBe(2);
    expect(selectedFeatures[0]).toEqual(state.features.entities['1']);
    expect(selectedFeatures[1]).toEqual(state.features.entities['2']);
  });

  it('should select a feature by id', () => {
    const selectedFeature = selectFeatureById(state, '1');

    expect(selectedFeature).toEqual(state.features.entities['1']);
  });

  it('should select feature ids', () => {
    const selectedFeatureIds = selectFeatureIds(state);

    expect(selectedFeatureIds.length).toBe(2);
    expect(selectedFeatureIds[0]).toBe('1');
    expect(selectedFeatureIds[1]).toBe('2');
  });

  it('should select feature by key', () => {
    const selectedFeature = selectFeatureByKey(state, 'Feature 1');

    expect(selectedFeature).toEqual(state.features.entities['1']);
  });
})