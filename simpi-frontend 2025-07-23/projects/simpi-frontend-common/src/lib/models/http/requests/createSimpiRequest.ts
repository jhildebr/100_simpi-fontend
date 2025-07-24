import { DeploymentInfoRequest } from './deploymentInfoRequest';

export interface CreateSimpiRequest {
    simpiId?: string;
    productId: string;
    creatorId: string;
    title: string;
    description: string;
    iconColor?: string;
    thumbnailId?: string;
    showInfoOverlay: boolean;
    deploymentInfo: DeploymentInfoRequest;
    groupName?: string;
}
