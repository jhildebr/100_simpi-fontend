import { ProductUserInteractionStats } from './productUserInteractionStats';

export interface UserInteractionStatsResponse {
  brandId: string;
  brandName: string;
  brandAlias: string;
  since: Date;
  productStats: ProductUserInteractionStats;
}
