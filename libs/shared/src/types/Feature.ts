/* istanbul ignore file */
import { FeatureStatus } from "./FeatureStatus";

export interface Feature {
  id: string;
  serverId?: string;
  title: string;
  status: FeatureStatus | keyof typeof FeatureStatus;
  rating?: number | null;
  content?: string | null;
  author?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

