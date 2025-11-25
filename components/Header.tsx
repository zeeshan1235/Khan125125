import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Prime Grocery Store
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/products" className="text-gray-600 hover:text-gray-800">Products</Link></li>
            <li><Link href="/categories" className="text-gray-600 hover:text-gray-800">Categories</Link></li>
            <li><Link href="/offers" className="text-gray-600 hover:text-gray-800">Offers</Link></li>
            <li><Link href="/gallery" className="text-gray-600 hover:text-gray-800">Gallery</Link></li>
            <li><Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link></li>
            <li><Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
