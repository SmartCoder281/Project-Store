"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

interface Todo {
  id: number;
  name: string;
  desc: string;
  price: number;
  image?: string;
}

const Page = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const storedData = localStorage.getItem("todoData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const saveToLocalStorage = (items: Todo[]) => {
    localStorage.setItem("todoData", JSON.stringify(items));
  };

  const addItem = () => {
    if (!name.trim() || !desc.trim() || price === "" || !image) return;

    const newItem: Todo = {
      id: Date.now(),
      name,
      desc,
      price: Number(price),
      image,
    };

    const updatedData = [...data, newItem];
    setData(updatedData);
    saveToLocalStorage(updatedData);

    setName("");
    setDesc("");
    setPrice("");
    setImage("");
  };

  const delItem = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    saveToLocalStorage(updatedData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="d-flex gap-2">
      <div className="h-screen flex items-start p-6 bg-gray-50">
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
            href="/admin/users"
            className="bg-green-600 text-white py-2 rounded-lg text-center hover:bg-green-700 transition"
          >
            Users
          </Link>

          <Link
            href="/admin/order"
            className="bg-green-600 text-white py-2 rounded-lg text-center hover:bg-green-700 transition"
          >
            Orders
          </Link>

          <Link
            href="/admin/settingss"
            className="bg-green-600 text-white py-2 rounded-lg text-center hover:bg-green-700 transition"
          >
            Settings
          </Link>
        </div>
      </div>
      <div className="flex-grow-1 p-4">
        <div className="card w-100 p-4">
          <h2 className="text-center mb-4">Admin / Products</h2>

          <div className="card p-4 mb-4 shadow w-50">
            <h4 className="mb-3">Add Product</h4>
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Price..."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="file"
              className="form-control mb-2"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button className="btn btn-success w-100" onClick={addItem}>
              Add
            </button>
          </div>

          <div className="d-flex flex-wrap gap-3">
            {data.map((item) => (
              <div
                key={item.id}
                className="card p-3 shadow-sm border border-secondary-subtle"
                style={{ width: "calc(33.333% - 1rem)", maxWidth: "300px" }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt="Product"
                    className="rounded mb-3"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <h5>{item.name}</h5>
                <p>{item.desc}</p>
                <p>
                  <strong>Price:</strong> ${item.price}
                </p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => delItem(item.id)}
                  >
                    <MdDelete />
                  </button>
                  <button className="btn btn-warning btn-sm">
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
