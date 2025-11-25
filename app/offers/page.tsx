"use client";

import { useState, useEffect } from "react";

interface Offer {
  id: number;
  title: string;
  description: string;
}

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const res = await fetch("/api/offers");
      const data = await res.json();
      setOffers(data);
    };
    fetchOffers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Special Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-blue-500 mb-2">{offer.title}</h2>
            <p className="text-gray-600">{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
