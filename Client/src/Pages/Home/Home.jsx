import Newsletter from "./Newsletter";
import { useEffect, useState } from 'react';
import BlogCard from '../../Shared/BlogCard';
import Swal from 'sweetalert2';
import AuthorCard from './AuthorCard';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const wishEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetch('http://localhost:5000/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  const handleWishlist = (id) => {
    if (!wishEmail) {
      return Swal.fire('Login Required', 'Please login to add to wishlist', 'warning');
    }
    fetch(`http://localhost:5000/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        const updatedWish = { blogId: data.id, wishReq: wishEmail };
        fetch(`http://localhost:5000/wishlist`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(updatedWish)
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertId) {
              Swal.fire('Success', 'Added to wishlist', 'success');
            }
          });
      });
  };

  return (
    <div className="dark:bg-dark-bg min-h-screen">


      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-dark-bg">

        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 dark:bg-amber-900/20 rounded-full opacity-30 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200 dark:bg-orange-900/20 rounded-full opacity-20 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">


            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full mb-4">
                Your Reading Companion
              </span>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Discover &amp; Share
                <span className="block text-amber-500">Great Books</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
                Explore a curated collection of books, share your favorites, and connect with fellow readers in our growing community.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="/all-blogs"
                  className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-center"
                >
                  Browse Books
                </a>
                <a
                  href="/add-blog"
                  className="px-8 py-3 border-2 border-gray-900 dark:border-gray-300 text-gray-900 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 transition-all duration-200 text-center"
                >
                  Add a Book
                </a>
              </div>


              <div className="flex gap-8 mt-10 justify-center lg:justify-start">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {blogs.length}+
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Books Listed</div>
                </div>
                <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Free</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Forever</div>
                </div>
                <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Open</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Community</div>
                </div>
              </div>
            </div>


            <div className="flex-1 flex justify-center items-center">
              <div className="relative w-72 h-72 lg:w-80 lg:h-80">

                <div className="absolute inset-0 bg-amber-300 dark:bg-amber-700 rounded-full opacity-20 blur-3xl"></div>

                <div className="absolute top-6 left-6 w-52 h-64 rounded-2xl shadow-xl rotate-[-8deg] bg-gradient-to-br from-amber-400 to-orange-500 flex items-end p-4">
                  <div>
                    <div className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>The Great Library</div>
                    <div className="text-amber-100 text-xs">Community Picks</div>
                  </div>
                </div>
                <div className="absolute top-4 left-14 w-52 h-64 rounded-2xl shadow-xl rotate-[2deg] bg-gradient-to-br from-gray-800 to-gray-900 flex items-end p-4">
                  <div>
                    <div className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>BookStore</div>
                    <div className="text-gray-400 text-xs">Management System</div>
                  </div>
                </div>
                <div className="absolute top-10 left-8 w-52 h-64 rounded-2xl shadow-2xl rotate-[6deg] bg-gradient-to-br from-amber-500 to-yellow-600 flex items-end p-4 bg-cover" style={{ backgroundImage: 'url(image.png)' }}>
                  <div>
                    <div className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Your Next Read</div>
                    <div className="text-amber-100 text-xs">Awaits inside →</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      <section className="bg-white dark:bg-dark-card border-y border-gray-100 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: "📚", title: "Curated Collections", desc: "Handpicked books across every genre" },
              { icon: "❤️", title: "Save to Wishlist", desc: "Build your personal reading list" },
              { icon: "✍️", title: "Share Your Finds", desc: "Add books and help the community" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-3xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Recent Books
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Latest additions from the community</p>
          </div>
          <a href="/all-blogs" className="text-sm font-medium text-amber-500 hover:text-amber-600 hidden sm:block">
            View all →
          </a>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <div className="text-5xl mb-3">📖</div>
            <p className="text-lg">No books yet. Be the first to add one!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <BlogCard
                key={blog.id}
                blog={blog}
                handleWishlist={handleWishlist}
              />
            ))}
          </div>
        )}
      </section>


      <section className="bg-amber-50 dark:bg-dark-card py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Meet the Authors
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-8">Follow your favorite book contributors</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <AuthorCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
