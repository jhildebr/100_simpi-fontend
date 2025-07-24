import { DeploymentStateRequest } from './deploymentStateRequest';

export class ProductChangeRequest {
    productName: string;
    productImageId: string;
    productPageImageId: string;
    deploymentState: DeploymentStateRequest;
    deleted?: boolean;
}