import { createServer, Model, Response } from "miragejs";

interface Order {
  id: string;
  itemId: string;
  quantity: number;
  status: "pending" | "partial" | "completed";
  userId?: number
}

interface Item {
  id: string;
  name: string;
  stock: number;
}

export function makeServer() {
  return createServer({
    models: {
      order: Model.extend<Partial<Order>>({}),
      item: Model.extend<Partial<Item>>({}),
    },

    seeds(server) {
      server.create("item", { id: "1", name: "Item A", stock: 10 });
      server.create("item", { id: "2", name: "Item B", stock: 0 });
      server.create("item", { id: "3", name: "Item C", stock: 12 });
      server.create("item", { id: "4", name: "Item D", stock: 0 });
      server.create("item", { id: "5", name: "Item E", stock: 3 });

      server.create("order", {
        id: "o1",
        itemId: "1",
        quantity: 10,
        status: "completed",
        userId: 1,
      });
      server.create("order", {
        id: "o2",
        itemId: "2",
        quantity: 0,
        status: "completed",
        userId: 1,
      });
      server.create("order", {
        id: "o3",
        itemId: "3",
        quantity: 12,
        status: "pending",
        userId: 2,
      });
      server.create("order", {
        id: "o4",
        itemId: "4",
        quantity: 0,
        status: "pending",
        userId: 2,
      });
      server.create("order", {
        id: "o5",
        itemId: "5",
        quantity: 3,
        status: "pending",
        userId: 3,
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/orders", (schema) => {
        return { orders: schema.orders.all().models.map((m: any) => m.attrs) };
      });

      this.post("/orders", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        const item = schema.items.find(attrs.itemId);
        if (!item) {
          return new Response(404, {}, { error: "Item not found" });
        }

        const requestedQty = attrs.quantity;
        const availableQty = item.attrs.stock;

        if (availableQty === 0) {
          return new Response(400, {}, { error: "Stock unavailable for this item." });
        }

        let order = schema.orders.findBy({ itemId: attrs.itemId, userId: attrs.userId });

        let status: Order["status"];
        let fulfilledQty = 0;

        if (availableQty >= requestedQty) {
          status = "completed";
          fulfilledQty = requestedQty;
          item.update({ stock: availableQty - requestedQty });
        } else if (availableQty > 0) {
          status = "partial";
          fulfilledQty = availableQty;
          item.update({ stock: 0 });
        } else {
          status = "pending";
          fulfilledQty = 0;
        }

        if (order) {
          const newQuantity = order.attrs.quantity + fulfilledQty;
          order.update({
            quantity: newQuantity,
            status,
          });
        } else {
          order = schema.orders.create({
            itemId: attrs.itemId,
            quantity: fulfilledQty,
            status,
            userId: attrs.userId,
          });
        }

        return order;
      });

      this.get("/my-orders", (schema, request) => {
        const userId = request.queryParams.userId;

        const orders = schema.orders.all().models
          .filter(order => String(order.userId) === String(userId))
          .map(order => order.attrs);

        return { orders };
      });
    },
  });
}
