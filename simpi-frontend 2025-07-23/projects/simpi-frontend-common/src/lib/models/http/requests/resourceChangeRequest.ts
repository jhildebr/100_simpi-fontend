import { ResourceTypeRequest } from './resourceTypeRequest';

export class ResourceChangeRequest {
    title: string;
    resourceType: ResourceTypeRequest;
    manufacturer: string;
    shoppingLink: string;
    thumbnailId: string;
    deleted?: boolean;
}