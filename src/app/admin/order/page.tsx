"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersFromLocalStorage = () => {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(storedOrders);
    };

    fetchOrdersFromLocalStorage();
  }, []);

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const deleteOrder = (id) => {
    const filteredOrders = orders.filter((order) => order.id !== id);
    setOrders(filteredOrders);
    localStorage.setItem("orders", JSON.stringify(filteredOrders));
  };

  const renderCard = (order) => (
    <div key={order.id} className="border rounded p-4 mb-4 shadow bg-white">
      <h3 className="font-bold text-lg">{order.name}</h3>
      {order.cart && order.cart.length > 0 ? (
        <ul>
          {order.cart.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>
                {item.quantity} x ${item.price}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Cart is empty.</p>
      )}
      <p className="font-bold mt-2">
        Total: $
        {order.cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0}
      </p>
      <div className="mt-4 flex gap-2">
        {order.status === "start" && (
          <button
            onClick={() => updateStatus(order.id, "incomplete")}
            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Move to Incomplete
          </button>
        )}
        {order.status === "incomplete" && (
          <button
            onClick={() => updateStatus(order.id, "close")}
            className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Mark as Close
          </button>
        )}
        {order.status === "close" && (
          <button
            onClick={() => deleteOrder(order.id)}
            className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">

      <div className="w-64 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-green-600 mb-6">Green Store</h1>
        <Link
          href="/admin/dashboard"
          className="bg-green-600 text-white py-2 rounded-lg text-center hover:bg-green-700 transition"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/categories"
          className="bg-green-600 text-white py-2 rounded-lg text-center hover:bg-green-700 transition"
        >
          Categories
        </Link>
        <Link
          href="/admin/products"
          className="bg-green-600 text-white py-2 rounded-lg text-center hover:bg-green-700 transition"
        >
          Products
        </Link>
        <Link
          href="/admin/order"
          className="bg-green-600 text-white py-2 rounded-lg text-center hover:bg-green-700 transition"
        >
          Orders
        </Link>
        <Link
          href="/admin/settings"
          className="bg-green-600 text-white py-2 rounded-lg text-center hover:bg-green-700 transition"
        >
          Settings
        </Link>
      </div>

      <div className="flex-1 p-10 bg-gray-100">
        <div className="grid grid-cols-3 gap-4">
          {["start", "incomplete", "close"].map((status) => (
            <div key={status} className="border rounded-lg p-4 bg-gray-50">
              <h2 className="text-xl font-bold capitalize mb-4">{status}</h2>
              {orders
                .filter((order) => order.status === status)
                .map((order) => renderCard(order))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
