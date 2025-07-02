export interface Order {
  id: string;
  itemId: string;
  quantity: number;
  userId: number;
  status: "pending" | "partial" | "completed";
}