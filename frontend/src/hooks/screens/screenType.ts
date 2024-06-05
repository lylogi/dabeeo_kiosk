export interface Screen {
    title: string;
    originalname: string;
    type: string;
    mime_type: string;
    duration: number;
  }
  
  export interface ScreenGetParams {
    type?: string;
  }