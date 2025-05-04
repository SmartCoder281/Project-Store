"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  image?: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const storedData = localStorage.getItem("todoData");
    if (storedData) {
      setProducts(JSON.parse(storedData));
    }
  }, []);
  const handleProductClick = (product: Product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <header className="flex items-center justify-between px-6 py-4 md:px-20 md:py-6">
        <h1 className="text-green-600 text-xl md:text-2xl font-bold">GREENSHOP</h1>
        <nav className="hidden md:flex gap-6 lg:gap-10 font-medium">
          <button className="hover:text-green-600 transition">Home</button>
          <button className="hover:text-green-600 transition">Shop</button>
          <button className="hover:text-green-600 transition">Plant Care</button>
          <button className="hover:text-green-600 transition">Blogs</button>
        </nav>
        <div className="flex items-center gap-2 md:gap-4">
          <Link href={"/buscet"}>
            <CiShoppingCart className="text-xl md:text-2xl" />
          </Link>
          <div className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm md:text-base">
            <SignInButton />
          </div>
          <div className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm md:text-base">
            <SignUpButton />
          </div>
        </div>
      </header>

      <section className="w-full max-w-6xl mx-auto px-4 md:px-0">
        <Image
          src="/Main Banner.png"
          alt="Main Banner"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
      </section>

      <section className="px-4 py-8 md:px-20 md:py-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-green-600">Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                href="/more"
                onClick={() => handleProductClick(product)}
                passHref
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 md:p-6 flex flex-col justify-between h-full cursor-pointer">
                  <div>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt="Product Image"
                        className="rounded-lg shadow-lg mb-4 w-full h-48 object-cover"
                      />
                    ) : (
                      <div
                        className="bg-gray-200 rounded-lg shadow-lg mb-4 w-full h-48"
                      ></div>
                    )}
                    <h5 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
                      {product.name}
                    </h5>
                    <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
                      {product.desc}
                    </p>
                    <strong className="text-black-500 text-sm md:text-base">
                      ${product.price}
                    </strong>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No products available</p>
          )}
        </div>
      </section>

      <footer className="w-full max-w-6xl mx-auto px-4 md:px-0 mt-10">
        <Image
          src="/Footer.png"
          alt="Main Banner"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
      </footer>
    </div>
  );
};

export default Home;
