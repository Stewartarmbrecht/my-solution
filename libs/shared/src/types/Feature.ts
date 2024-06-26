/* istanbul ignore file */
import { FeatureStatus } from "./FeatureStatus";

export interface Feature {
  id: string;
  serverId?: string;
  key: string;
  status: FeatureStatus | keyof typeof FeatureStatus;
  groups: string[];
  createdAt?: string | null;
  updatedAt?: string | null;
}

