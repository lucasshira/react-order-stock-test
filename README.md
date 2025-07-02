# React Order Stock Test

## Description

This is a frontend application built with React and TypeScript that manages client's orders.  
When a logged user places an order, the system attempts to fulfill it immediately based on available stock. If the stock is insufficient, the order cannot be added to your order personal list.  
Users receive notifications (simulated emails) when their orders are completed.

---

## Features

- Login page that persists across all application pages with Zustand
- List all orders with their current completion status (`pending`, `partial`, or `completed`)
- Create new orders
- List all items in stock
- User feedback via alerts for important actions and errors
- Basic navigation between orders and items views

---

## Technologies Used

- React with TypeScript
- MirageJS (mock API server)
- Axios (for HTTP requests)
- React Router (for routing)
- React Hook Form
- Zod
- Zustand
- CSS Modules for scoped styling

---

## Project Structure

- /src/pages — Page views and routing
- /src/store — Zustand global state management
- /src/mocks — Axios API calls and mocks (MirageJS)
- /src/types — TypeScript types and interfaces

---

## Setup & Run Instructions

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open the app**

Go to your browser and open: http://localhost:5173/

---

## Assumptions & Decisions

The backend API is simulated with MirageJS within the frontend project — no real backend server is required.
Orders are associated with users by userId managed via global state.
User notifications are simulated via alert pop-ups.
The UI is minimalistic, focusing on functional interactions rather than design details.
