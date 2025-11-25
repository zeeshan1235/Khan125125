export default function Categories() {
  const categories = [
    { id: 1, name: "Fresh Produce" },
    { id: 2, name: "Bakery" },
    { id: 3, name: "Dairy & Eggs" },
    { id: 4, name: "Pantry" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
