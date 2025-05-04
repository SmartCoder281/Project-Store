"use client";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";

const Buscet = () => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart).map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCart(parsedCart);
    }
  }, []);

  const updateQuantity = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += delta;
    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleSave = () => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = { ...formData, cart, status: "start", id: Date.now() };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    setCart([]);
    setShowModal(false);
    localStorage.removeItem("cart");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white text-black p-10">
      <header className="flex items-center justify-between px-20 py-6">
        <h1 className="text-green-600 text-2xl font-bold">GREENSHOP</h1>
        <nav className="flex gap-10 font-medium">
          <button className="hover:text-green-600 transition">Home</button>
          <button className="hover:text-green-600 transition">Shop</button>
          <button className="hover:text-green-600 transition">Plant Care</button>
          <button className="hover:text-green-600 transition">Blogs</button>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/buscet">
            <CiShoppingCart className="text-2xl" />
          </Link>
          <div className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">
            <SignOutButton />
          </div>
        </div>
      </header>

      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length > 0 ? (
        <div>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Total</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.price}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => updateQuantity(index, -1)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700"
                      onClick={() => updateQuantity(index, 1)}
                    >
                      +
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => updateQuantity(index, -item.quantity)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-end items-end">
            <p className="text-lg font-bold">
              Total: $
              {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
      <div>
        <div className="flex justify-end">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={() => setShowModal(true)}
          >
            Save
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={formData.address}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={formData.phone}
                onChange={handleChange}
              />
              <textarea
                name="notes"
                placeholder="Notes"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buscet;
