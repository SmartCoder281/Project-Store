import React from "react";
import Link from "next/link";

const settings = () => {
  return (
    <>
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
        <div className="card w-100">
          <h1>Settings</h1>
        </div>
      </div>
    </>
  );
};

export default settings;
