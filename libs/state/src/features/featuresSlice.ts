import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Features } from "./Features";
import { RootState } from "../store";
import { compareFeatures } from "./compareFeatures";
import { 
  Feature, 
  compareStringArrays, 
  logCall, 
  featureAdded, 
  featureAddedOrUpdatedViaSync, 
  featureDeleted, 
  featureDeletedViaSync, 
  featuresLoadedViaSync, 
  FeatureStatus
} from "@my-solution/shared";

const featuresAdapter = createEntityAdapter<Feature>({
  sortComparer: (a, b) => {
    /*istanbul ignore next*/ 
    const aCreatedAt = a.createdAt ?? new Date().toISOString();
    /*istanbul ignore next*/ 
    const bCreatedAt = b.createdAt ?? new Date().toISOString();

    return bCreatedAt.localeCompare(aCreatedAt)
  },
});

const initialState: Features = featuresAdapter.getInitialState({
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
});

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(featureAdded, (state, action) => {
      logCall('featuresSlice.addFeature', action.payload);
      if (action.payload.createdAt === undefined) {
        action.payload.createdAt = new Date().toISOString();
      }
      featuresAdapter.addOne(state, action.payload);
      // state.entities[action.payload.id] = action.payload;
      // add new feature to the beginning of the array
      // state.ids.unshift(action.payload.id);
    })
    .addCase(featureDeleted, (state, action) => {
      logCall('featuresSlice.deleteFeature', action.payload);
      featuresAdapter.removeOne(state, action.payload.id);
    })
    .addCase(featureDeletedViaSync, (state, action) => {
      logCall('featuresSlice.featureDeletedViaSync', action.payload);
      featuresAdapter.removeOne(state, action.payload.id);
    })
    .addCase(featureAddedOrUpdatedViaSync, (state, action: PayloadAction<Feature>) => {
      logCall('featuresSlice.featureAddedOrUpdatedViaSync', action.payload);
      const feature = state.entities[action.payload.id];
      if (compareFeatures(feature, action.payload) === false) {
        logCall('featuresSlice.featureAddedOrUpdatedViaSync.upsertOne');
        featuresAdapter.upsertOne(state, action.payload);
      }
    })
    .addCase(featuresLoadedViaSync, (state, action) => {
      logCall('featuresSlice.featuresLoadedViaSync');
      const features = action.payload;
      const featureIds = features.map((feature) => feature.id);
      if (!compareStringArrays(state.ids, featureIds)) {
        const activityIdsToRemove = state.ids.filter((id) => featureIds.includes(id) === false);
        activityIdsToRemove.forEach((id) => {
          logCall('featuresSlice.featuresLoadedViaSync.delete', id);
          delete state.entities[id];
        });
        const activityIdsToAdd = featureIds.filter((id) => state.ids.includes(id) === false);
        activityIdsToAdd.forEach((id) => {
          const newFeature = features.find((feature) => feature.id === id);
          /* istanbul ignore else */
          if (newFeature !== undefined) {
            logCall('featuresSlice.featuresLoadedViaSync.add', newFeature);
            state.entities[id] = newFeature;
          }
        });
        state.ids = featureIds;
      }
      const activityIdsToUpdate = state.ids.filter((id) => featureIds.includes(id) === true);
      activityIdsToUpdate.forEach((id) => {
        const newFeature = features.find((feature) => feature.id === id);

        if (newFeature !== undefined && compareFeatures(state.entities[id], newFeature) === false) {
          logCall('featuresSlice.featuresLoadedViaSync.update', newFeature);
          state.entities[id] = newFeature;
        }
      });
    });
  },
});

export const featuresReducer = featuresSlice.reducer;

export const {
  selectAll: selectAllFeatures,
  selectById: selectFeatureById,
  selectIds: selectFeatureIds,
} = featuresAdapter.getSelectors<RootState>((state) => state.features);

export const selectFeatureByKey = (state: RootState, key: string): Feature | undefined => {
  const features = selectAllFeatures(state);
  return features.find((feature) => feature.key === key);
};