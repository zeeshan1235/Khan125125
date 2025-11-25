"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/Modal";

export default function AdminGallery() {
  const [images, setImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setImages(data);
    };
    fetchImages();
  }, []);

  const handleDelete = async (imageUrl: string) => {
    await fetch(`/api/gallery`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });
    setImages(images.filter((img) => img !== imageUrl));
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });
    const newImage = await res.json();
    setImages([...images, newImage]);
    setIsModalOpen(false);
    setImageUrl("");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Gallery</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Upload Image
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-md" />
            <button onClick={() => handleDelete(image)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
              Delete
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleAddImage}>
          <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
              Image URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Upload
          </button>
        </form>
      </Modal>
    </div>
  );
}
