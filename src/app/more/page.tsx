"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";
import { SignOutButton } from "@clerk/nextjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  image?: string;
}

const More = () => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const selectedProduct = localStorage.getItem("selectedProduct");
    if (selectedProduct) {
      setProduct(JSON.parse(selectedProduct));
    }
  }, []);

  const addToCart = () => {
    if (product) {
      const storedCart = localStorage.getItem("cart");
      const cart = storedCart ? JSON.parse(storedCart) : [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product successfully added to the cart!");
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

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
          <Link href={"/buscet"}>
            <CiShoppingCart className="text-2xl" />
          </Link>
          <div className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">
            <SignOutButton />
          </div>
        </div>
      </header>
      <h1 className="text-3xl font-bold mb-6">Product Details</h1>
      <div className="flex p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="w-1/2 flex justify-center items-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg shadow-lg"
              style={{ maxWidth: "600px", maxHeight: "300px" }}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div className="w-1/2 pl-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
          <p className="text-lg text-gray-700 mb-4">{product.desc}</p>
          <strong className="text-lg text-green-600">${product.price}</strong>
          <div className="flex space-x-4">
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
              Buy Now
            </button>
            <button
              onClick={addToCart}
              className="border border-green-500 text-green-500 font-bold py-2 px-4 rounded hover:bg-green-100"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default More;
