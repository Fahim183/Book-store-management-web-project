import BlogCard from "../../Shared/BlogCard";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllBooks = () => {
  const email = localStorage.getItem("userEmail");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/blogs')
      .then(res => res.json())
      .then(data => { setBlogs(data); setLoading(false); });
  }, []);

  const handleWishlist = (id) => {
    if (!email) {
      return Swal.fire('Login Required', 'Please login to add to wishlist', 'warning');
    }
    fetch(`http://localhost:5000/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        const updatedWish = { blogId: data.id, wishReq: email };
        fetch(`http://localhost:5000/wishlist`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(updatedWish)
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertId) Swal.fire('Success', 'Added to wishlist', 'success');
          });
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const title = e.target.search.value;
    fetch(`http://localhost:5000/blogs/searched/${title}`)
      .then(res => res.json())
      .then(data => setBlogs(data));
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this book?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
    });
    if (result.isConfirmed) {
      fetch(`http://localhost:5000/blogs/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          if (data.affectedRows > 0) {
            Swal.fire('Deleted!', 'Book removed successfully', 'success');
            setBlogs(blogs.filter(blog => blog.id !== id));
          }
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-10 px-4">
      <div className="max-w-7xl mx-auto">


        <div className="mb-8 text-center">
          <h1
            className="text-3xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            All Books
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {loading ? "Loading…" : `${blogs.length} books in the collection`}
          </p>
        </div>


        <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto mb-10">
          <input
            type="search"
            name="search"
            placeholder="Search by title…"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors shadow-sm"
          >
            Search
          </button>
        </form>


        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-lg">No books found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <BlogCard
                key={blog.id}
                blog={blog}
                handleDelete={handleDelete}
                handleWishlist={handleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
