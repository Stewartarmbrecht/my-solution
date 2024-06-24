/* istanbul ignore file */
import { Feature } from "@my-solution/shared";
import { SerializedError } from "@reduxjs/toolkit";

export interface Features {
  ids: string[];
  entities: Record<string, Feature>;
  status: string;
  error: SerializedError | null;
}