"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../products/supabaseClient";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Category {
  id: number;
  title: string;
  desc: string;
}

const Categories = () => {
  const [data, setData] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error("Fetch error:", error);
      } else {
        setData(data || []);
      }
    };

    fetchData();
  }, []);


  const addItem = async () => {
    if (!title.trim() || !desc.trim()) {
      console.error("Title or Description is empty");
      return;
    }

    const { data: newItem, error } = await supabase
      .from("categories")
      .insert([{ title, desc }])
      .select();

    if (error) {
      console.error("Insert error:", error);
    } else if (newItem && newItem.length > 0) {
      setData((prev) => [...prev, newItem[0]]);
      setTitle("");
      setDesc("");
    }
  };

  const delItem = async (id: number) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
    } else {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <div className="d-flex gap-2">
      {/* Left Panel */}

      <div className="h-screen flex items-start p-6 bg-gray-50">
          {/* Left panel */}
          <div className="w-64 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-green-600 mb-6">
              Green Store
            </h1>
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
        </div>

        {/* Right panel */}
        <div className="card w-100">
          <h1>Categories</h1>
          <div className="card p-4 mb-4 shadow w-50">
            <h4 className="mb-3">Add Category</h4>
            <input
              className="form-control mb-2 w-100"
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="form-control mb-3 w-100"
              type="text"
              placeholder="Description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button className="btn btn-success w-100" onClick={addItem}>
              Add
            </button>
          </div>

          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.desc}</td>
                  <td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Categories;

