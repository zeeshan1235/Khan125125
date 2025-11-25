"use client";

import { useState, useEffect } from "react";

export default function Panel() {
  const [productCount, setProductCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [offerCount, setOfferCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, galleryRes, offersRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/gallery"),
        fetch("/api/offers"),
      ]);

      const productsData = await productsRes.json();
      const galleryData = await galleryRes.json();
      const offersData = await offersRes.json();

      setProductCount(productsData.length);
      setGalleryCount(galleryData.length);
      setOfferCount(offersData.length);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold">{productCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Gallery Images</h2>
          <p className="text-3xl font-bold">{galleryCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Offers</h2>
          <p className="text-3xl font-bold">{offerCount}</p>
        </div>
      </div>
    </div>
  );
}
