"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/Modal";

interface Offer {
  id: number;
  title: string;
  description: string;
}

export default function AdminOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      const res = await fetch("/api/offers");
      const data = await res.json();
      setOffers(data);
    };
    fetchOffers();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/offers/${id}`, {
      method: "DELETE",
    });
    setOffers(offers.filter((o) => o.id !== id));
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setTitle(offer.title);
    setDescription(offer.description);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingOffer) {
      // Update existing offer
      const res = await fetch(`/api/offers/${editingOffer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const updatedOffer = await res.json();
      setOffers(offers.map((o) => o.id === updatedOffer.id ? updatedOffer : o));
    } else {
      // Add new offer
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const newOffer = await res.json();
      setOffers([...offers, newOffer]);
    }

    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setEditingOffer(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Offers</h1>
        <button onClick={() => { setEditingOffer(null); setTitle(""); setDescription(""); setIsModalOpen(true); }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add Offer
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Offer Title</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{offer.title}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{offer.description}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200">
                  <button onClick={() => handleEdit(offer)} className="text-blue-500 hover:text-blue-700 mr-4">Edit</button>
                  <button onClick={() => handleDelete(offer.id)} className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">{editingOffer ? "Edit Offer" : "Add Offer"}</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Offer Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            {editingOffer ? "Update Offer" : "Add Offer"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
