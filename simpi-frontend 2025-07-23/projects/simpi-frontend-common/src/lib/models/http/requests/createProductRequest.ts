import { DeploymentStateRequest } from './deploymentStateRequest';

export interface CreateProductRequest {
    productId?: string;
    brandId: string;
    brandAlias?: string;
    brandName?: string;
    creatorId: string;
    productName: string;
    productImageId: string;
    productPageImageId: string;
    deploymentState?: DeploymentStateRequest;
}
