import axios from "axios";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import type { Order } from "../types/order";
import { useNavigate } from "react-router-dom";

import styles from "./OrdersList.module.css";
import type { Item } from "../types/item";

export default function OrdersList() {
  const userId = useUserStore((state) => state.id)
  const navigate = useNavigate()

  const [, setOrders] = useState<Order[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get('/api/orders')
        setOrders(response.data.orders)
        setItems(response.data.items.models)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  async function addOrder(itemId: string) {
    if (!userId) {
      alert("You need to log in to add products.")
      return
    }

    try {
      await axios.post('/api/orders', {
        itemId,
        quantity: 1,
        userId
      })
      alert("Item added!")
      navigate('/my-orders')

    } catch (error) {
      if (error.response?.status === 400) {
        alert(error.response?.data.error)
      } else {
        alert("Generic error.");
      }
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Itens List</h1>
        <button onClick={() => navigate('/my-orders')}>My orders</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            Item: {item.id} - Stock: {item.stock}
            <button onClick={() => addOrder(item.id)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  )
}