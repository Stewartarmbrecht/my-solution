/* istanbul ignore file */
import { FeatureStatus } from "./FeatureStatus";

export interface Feature extends StateObject {
  id: string;
  serverId?: string;
  status: FeatureStatus | keyof typeof FeatureStatus;
  groups: string[];
  createdAt?: string | null;
  updatedAt?: string | null;
}

