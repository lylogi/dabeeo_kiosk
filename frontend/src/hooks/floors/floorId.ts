export interface Floor {
  id: string;
  mapFloorId: string;
  subject: {
    [key: string]: string
  };
  order: number;
  title: string;
}
export interface IFloorsResponse {
  data: Floor[]
}
export interface FloorGetParams {
  id?: string;
}