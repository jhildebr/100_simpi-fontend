import { DeploymentStateResponse } from "./deploymentStateResponse";
import { SimpiUserInteractionStats } from "./simpiUserInteractionStats";

export interface ProductUserInteractionStats {
  productName: string;
  productId: string;
  productAlias: string;
  privacySettings: DeploymentStateResponse;
  views: number;
  lastAccess: Date;
  simpiStats: SimpiUserInteractionStats[];
}
