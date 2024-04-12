/* istanbul ignore file */
import { PostStatus } from "./PostStatus";

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

