import { ResourceTypeRequest } from "./resourceTypeRequest";

export interface CreateResourceRequest {
  resourceId?: string;
  title: string;
  creationDate: Date;
  description: string;
  resourceType: ResourceTypeRequest;
  manufacturer: string;
  shoppingLink: string;
  thumbnailId: string;
  showOnStartPanel: boolean;
}
