export interface Settings {
  blur: boolean | number; // Migrating from boolean -> number
  darken: boolean | number; // Migrating from boolean -> number
  timeout: number;
}

export interface Image {
  data: Blob;
  image_link: string;
}
