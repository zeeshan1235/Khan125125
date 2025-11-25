export default function Home() {
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Prime Grocery Store</h1>
        <p className="text-lg text-gray-600 mb-8">Your one-stop shop for fresh, high-quality groceries.</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full">
          Shop Now
        </button>
      </div>
    </section>
  );
}
