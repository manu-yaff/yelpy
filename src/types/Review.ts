export interface Review {
  id: string;
  rating: number;
  text: string;
  user: {
    name: string;
    image_url: string;
  }
}