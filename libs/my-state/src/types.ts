import { SerializedError } from "@reduxjs/toolkit";

export enum PostStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export interface Post {
  id: string;
  serverId?: string;
  title: string;
  status: PostStatus | keyof typeof PostStatus;
  rating?: number | null;
  content?: string | null;
  author?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface Posts {
  ids: string[];
  entities: Record<string, Post>;
  status: string;
  error: SerializedError | null;
}