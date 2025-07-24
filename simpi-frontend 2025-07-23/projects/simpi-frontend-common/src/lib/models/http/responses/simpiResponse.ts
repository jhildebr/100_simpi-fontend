import { DeploymentInfoResponse } from './deploymentInfoResponse';

export interface SimpiResponse {
    simpiId: string;
    productId: string;
    creatorId: string;
    creationDate: Date;
    lastUpdated: Date;
    title: string;
    alias: string;
    description: string;
    iconColor: string;
    thumbnailId: string;
    stepCount: number;
    positionIndex: number;
    deploymentInfo: DeploymentInfoResponse;
    deleted: boolean;
    resourceIds: string[];
    showInfoOverlay: boolean;
    thumbnailUrl?: string;
    brandLogoImageId: string;
    groupName?: string;
}
