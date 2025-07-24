import { DeploymentState } from './deploymentState';

export class Product {
    productId: string;
    brandId: string;
    creatorId: string;
    brandName: string;
    productName: string;
    simpiCount: number;
    creationDate: Date;
    lastUpdated: Date;
    productImageId: string;
    productImageUrl: string;
    productPageImageId: string;
    productPageImageUrl: string;
    deploymentState: DeploymentState;
    // REMOVE
    title?: string;
    favorite?: boolean;
}
