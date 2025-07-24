import { DeploymentInfoRequest } from './deploymentInfoRequest';

export class SimpiChangeRequest {
    title: string;
    description: string;
    iconColor: string;
    thumbnailId: string;
    deploymentInfo: DeploymentInfoRequest;
    deleted?: boolean;
    showInfoOverlay: boolean;
    groupName?: string;
}
