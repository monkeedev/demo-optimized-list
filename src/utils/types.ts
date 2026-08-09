type ProductItemStatus = "In Stock" | "Low Stock" | "Out of Stock";
type ProductItemDimensions = Record<"depth" | "height" | "width", number>;

type ProductItemReview = any[];
type ProductItemMeta = {
  barcode: string;
  qrCode: string;
  updatedAt: Date;
  createdAt: Date;
};

export type ProductResponse = {
  products: ProductItemDto[];
  skip: number;
  total: number;
  limit: number;
};

export type ProductItemDto = {
  availabilityStatus: ProductItemStatus;
  brand: string;
  category: string;
  description: string;
  dimensions?: ProductItemDimensions;
  discountPercentage: number;
  id: number;
  images?: string[];
  meta?: ProductItemMeta;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews?: ProductItemReview[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags?: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
};

export type OptimizedProductItemDto = Pick<
  ProductItemDto,
  "thumbnail" | "title" | "rating" | "price" | "availabilityStatus" | "id"
>;

export type ProductItemProps<T> = T & {
  isInCart: boolean;
  onAddToCart: (id: number) => void;
};
