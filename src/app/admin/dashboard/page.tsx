"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../products/supabaseClient";

const Dashboard = () => {
  const [categoryCount, setCategoryCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const { count: categoryCount, error: categoryError } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true });
      if (categoryError) {
        console.error("Error fetching categories count:", categoryError);
      } else {
        setCategoryCount(categoryCount || 0);
      }

      const { count: productCount, error: productError } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });
      if (productError) {
        console.error("Error fetching products count:", productError);
      } else {
        setProductCount(productCount || 0);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <div className="d-flex gap-2">
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
        <div className="w-full p-6">
          <h1 className="text-3xl font-bold mb-4">Hi Admin 👋</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h2 className="text-2xl font-semibold text-green-600 mb-2">
                Categories
              </h2>
              <p className="text-xl">{categoryCount} categories</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h2 className="text-2xl font-semibold text-green-600 mb-2">
                Products
              </h2>
              <p className="text-xl">{productCount} products</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

  