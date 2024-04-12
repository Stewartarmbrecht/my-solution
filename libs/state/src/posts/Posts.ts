/* istanbul ignore file */
import { Post } from "@my-solution/shared";
import { SerializedError } from "@reduxjs/toolkit";

export interface Posts {
  ids: string[];
  entities: Record<string, Post>;
  status: string;
  error: SerializedError | null;
}