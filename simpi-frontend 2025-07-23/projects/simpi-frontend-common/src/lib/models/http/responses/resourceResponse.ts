import { ResourceTypeResponse } from "./resourceTypeResponse";

export interface ResourceResponse {
  resourceId: string;
  creationDate: string;
  title: string;
  alias: string;
  description: string;
  resourceType: ResourceTypeResponse;
  manufacturer: string;
  shoppingLink: string;
  thumbnailId: string;
  thumbnailUrl?: string;
  positionIndex: number;
  deleted: boolean;
  simpiCount: number;
  showOnStartPanel: boolean;
}
