export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  description?: string;
  material?: string;
  care?: string;
}

export interface Category {
  id: string;
  name: string;
  nameBn?: string;
  image: string;
  href: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
