"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav>
          <ul>
            <li><Link href="/admin/panel" className="block p-4 hover:bg-gray-700">Dashboard</Link></li>
            <li><Link href="/admin/products" className="block p-4 hover:bg-gray-700">Products</Link></li>
            <li><Link href="/admin/categories" className="block p-4 hover:bg-gray-700">Categories</Link></li>
            <li><Link href="/admin/gallery" className="block p-4 hover:bg-gray-700">Gallery</Link></li>
            <li><Link href="/admin/offers" className="block p-4 hover:bg-gray-700">Offers</Link></li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={() => signOut()}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
