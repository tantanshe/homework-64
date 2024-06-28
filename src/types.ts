export interface Post {
  id?: string;
  title: string;
  text: string;
  timeCreated: string;
}

export interface ApiPost {
  title: string;
  text: string;
  timeCreated: string;
}