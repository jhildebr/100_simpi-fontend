export interface MediaResponse {
  assetId: string;
  type: "Video" | "Image" | "Audio" | "LegacyVideo";
  width: number;
  height: number;
}
