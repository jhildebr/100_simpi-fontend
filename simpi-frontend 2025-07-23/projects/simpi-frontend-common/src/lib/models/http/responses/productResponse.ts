import { DeploymentStateResponse } from './deploymentStateResponse';

export interface ProductResponse {
    productId: string;
    brandId: string;
    brandAlias: string;
    brandName: string;
    brandLogoImageId: string;
    brandPrimaryColor?: string;
    creatorId: string;
    productName: string;
    productAlias: string;
    simpiCount: number;
    productImageId: string;
    productImageUrl?: string;
    productPageImageId: string;
    productPageImageUrl?: string;
    creationDate: string;
    lastUpdated: string;
    deleted: boolean;
    deploymentState: DeploymentStateResponse;
    hideTitle: boolean;
}
