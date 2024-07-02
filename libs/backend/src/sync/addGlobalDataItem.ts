import { Feature, logCall } from "@my-solution/shared";
import { GlobalDataItem } from "../models";
import { DataStore } from "@aws-amplify/datastore";

export function addGlobalDataItem(feature: Feature) {
  logCall('featuresSlice.addGlobalDataItem', feature);
  const globalDataItem = new GlobalDataItem({ 
    payload: JSON.stringify(feature)
   });
  DataStore.save(globalDataItem);
}
