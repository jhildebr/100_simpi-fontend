import { DeploymentStateRequest } from './deploymentStateRequest';

export interface DeploymentInfoRequest {
    releaseDate: Date;
    deletionDate: Date;
    deploymentState: DeploymentStateRequest;
}