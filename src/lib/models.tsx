export interface Book {
  id: number;
  title: string;
  author: string;
  descripion: string;
  type: string;
  synopsis: string;
  picture: string;
  year: number;
  is_published: boolean;
}

export interface Menu{
  menu_id: number;
  menu_name: string;
  menu_price: string;
  menu_type: string;
  menu_picture: string;
}

export interface Order{
  id: number;
  order_name: string;
  order_status: string;
}