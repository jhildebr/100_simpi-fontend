import { DeploymentStateResponse } from "./deploymentStateResponse";

export interface DeploymentInfoResponse {
    releaseDate: Date;
    deletionDate: Date;
    deploymentState: DeploymentStateResponse;
}