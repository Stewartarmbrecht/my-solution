/* istanbul ignore file */
import { SerializedError } from "@reduxjs/toolkit";
import { StateObject } from "@my-solution/shared";

export interface StateObjectCollection<T extends StateObject> {
  ids: string[];
  entities: Record<string, T>;
  status: string;
  error: SerializedError | null;
}