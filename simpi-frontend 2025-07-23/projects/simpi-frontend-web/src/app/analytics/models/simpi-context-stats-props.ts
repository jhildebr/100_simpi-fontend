import { ProductUserInteractionStats } from "projects/simpi-frontend-common/src/lib/models/http/responses/productUserInteractionStats";
import { SimpiUserInteractionStats } from "projects/simpi-frontend-common/src/lib/models/http/responses/simpiUserInteractionStats";

export interface SimpiContextStatsProps {
    simpiUserInteractionStats: SimpiUserInteractionStats;
    productUserInteractionStats: ProductUserInteractionStats;
}
