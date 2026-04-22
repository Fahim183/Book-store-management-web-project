import { useEffect, useState } from "react";
import WishlistCard from "./WishlistCard";
import Swal from "sweetalert2";

const Wishlist = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [wish, setWish] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:5000/wishlist/${userEmail}`)
        .then(res => res.json())
        .then(data => { setWish(data); setLoading(false); });
    }
  }, [userEmail]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Remove from Wishlist?',
      text: 'This will remove the book from your wishlist.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
    });
    if (result.isConfirmed) {
      fetch(`http://localhost:5000/wishlist/id/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          if (data.affectedRows > 0) {
            Swal.fire('Removed!', '', 'success');
            setWish(wish.filter(w => w.id !== id));
          }
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My Wishlist
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {loading ? "Loading…" : `${wish.length} saved books`}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : wish.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <div className="text-5xl mb-3">♡</div>
            <p className="text-lg">Your wishlist is empty.</p>
            <a href="/all-blogs" className="mt-4 inline-block text-amber-500 hover:text-amber-600 text-sm font-medium">
              Browse books to add →
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wish.map(oneWish => (
              <WishlistCard
                key={oneWish.id}
                oneWish={oneWish}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
