"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/Modal";

interface Category {
  id: number;
  name: string;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      // Update existing category
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const updatedCategory = await res.json();
      setCategories(categories.map((c) => c.id === updatedCategory.id ? updatedCategory : c));
    } else {
      // Add new category
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const newCategory = await res.json();
      setCategories([...categories, newCategory]);
    }

    setIsModalOpen(false);
    setName("");
    setEditingCategory(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <button onClick={() => { setEditingCategory(null); setName(""); setIsModalOpen(true); }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add Category
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Category Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{category.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200">
                  <button onClick={() => handleEdit(category)} className="text-blue-500 hover:text-blue-700 mr-4">Edit</button>
                  <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">{editingCategory ? "Edit Category" : "Add Category"}</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Category Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            {editingCategory ? "Update Category" : "Add Category"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
