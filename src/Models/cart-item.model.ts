export interface CartItem {
    id: string; // أو استخدم productId حسب البيانات الفعلية
    bookDetails?: {
      title: string;
      price: number;
    };
    quantity: number;
  }
  