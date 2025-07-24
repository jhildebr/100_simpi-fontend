import { DeploymentStateResponse } from "./deploymentStateResponse";

export interface SimpiUserInteractionStats {
  simpiTitle: string;
  simpiId: string;
  simpiAlias: string;
  privacySettings: DeploymentStateResponse;
  views: number;
  lastAccess: Date;
}
