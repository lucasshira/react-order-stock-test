import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import type { Order } from "../types/order";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from './MyOrders.module.css'

export default function MyOrders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true);

  const userId = useUserStore(state => state.id);
  const email = useUserStore(state => state.email)

  useEffect(() => {
    async function fetchMyOrders() {
      if (!userId) return;
      try {
        const res = await axios.get('/api/my-orders', { params: { userId } });
        setOrders(res.data.orders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMyOrders();
  }, [userId]);

  function handleBuy() {
    const completedOrders = orders.filter(order => order.status === "completed")

    if (completedOrders.length === 0) {
      alert("You don't have any completed orders.")
      return
    }

    const summary = completedOrders.map(order => `Order #${order.id} (Item ID: ${order.itemId}, Qty: ${order.quantity})`).join('\n')

    alert(`📧 Email sent to ${email} with the following completed orders:\n\n${summary}`)
  }

  if (!userId) return <div>You must be logged in to view this page.</div>;
  if (loading) return <div>Loading orders...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Orders</h1>
        <button onClick={() => navigate('/orders')}>Item List</button>
      </div>

      <span>
        {orders.length === 0 && <p>You don't have any orders yet.</p>}
      </span>

      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - Item ID: {order.itemId} - Quantity: {order.quantity} - Status: {order.status}
          </li>
        ))}
      </ul>

      {orders.length > 0 &&
      <div>
        <button className={styles.buyButton} onClick={handleBuy}>Buy items</button>
      </div>}
    </div>
  );
}