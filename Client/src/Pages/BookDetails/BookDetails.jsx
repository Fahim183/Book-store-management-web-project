import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const BookDetails = () => {
  const loggedEmail = localStorage.getItem("userEmail");
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const blogId = blog?.id;

  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`)
      .then(res => res.json())
      .then(data => { setBlog(data); setLoading(false); });
  }, [id]);

  useEffect(() => {
    if (blogId) {
      fetch(`http://localhost:5000/comments/${blogId}`)
        .then(res => res.json())
        .then(data => setComments(data));
    }
  }, [blogId]);

  const handleComment = (e) => {
    e.preventDefault();
    const text = e.target.comment.value;
    if (!text.trim()) return;

    const newComment = { comment: text, blogId, userEmail: loggedEmail };

    fetch(`http://localhost:5000/comments`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newComment)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertId) {
          e.target.reset();
          setComments(prev => [...prev, { ...newComment, id: data.insertId }]);
        }
      });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Delete this book?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/blogs/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: loggedEmail })
        })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              Swal.fire("Error", data.error, "error");
            } else {
              Swal.fire("Deleted!", "Book removed.", "success");
              window.location.href = "/";
            }
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-10 px-4">
      <div className="max-w-3xl mx-auto">


        {blog.image && (
          <div className="rounded-2xl overflow-hidden mb-8 border border-gray-100 dark:border-dark-border shadow-sm h-72 sm:h-96">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}


        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap gap-2 items-start justify-between mb-4">
            <div className="flex-1">
              {blog.category && (
                <span className="inline-block px-2 py-1 text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full mb-2">
                  {blog.category}
                </span>
              )}
              <h1
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {blog.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-100 dark:border-dark-border">
            <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 text-xs font-bold">
              {blog.name ? blog.name[0].toUpperCase() : "?"}
            </div>
            <span>{blog.name || "Anonymous"}</span>
            {blog.email && <span className="text-gray-300 dark:text-gray-600">·</span>}
            {blog.email && <span>{blog.email}</span>}
          </div>

          {blog.short_description && (
            <p className="text-base text-gray-600 dark:text-gray-300 font-medium mb-4">
              {blog.short_description}
            </p>
          )}

          {blog.detailed_description && (
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {blog.detailed_description}
            </p>
          )}


          {loggedEmail === blog.userEmail && (
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-dark-border">
              <Link to={`/update-blog/${blog.id}`}>
                <button className="px-5 py-2 text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors">
                  Edit Book
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="px-5 py-2 text-sm font-semibold border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>


        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border p-6 sm:p-8">
          <h2
            className="text-xl font-bold text-gray-900 dark:text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Comments ({comments.length})
          </h2>

          {comments.length > 0 && (
            <div className="space-y-4 mb-6">
              {comments.map((c, i) => (
                <div key={c.id || i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 flex-shrink-0">
                    {c.userEmail ? c.userEmail[0].toUpperCase() : "?"}
                  </div>
                  <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{c.userEmail}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{c.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}


          {loggedEmail && loggedEmail !== blog.userEmail && (
            <form onSubmit={handleComment} className="space-y-3">
              <textarea
                name="comment"
                rows={3}
                placeholder="Write a comment…"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
              />
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Post Comment
              </button>
            </form>
          )}

          {!loggedEmail && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              <Link to="/login" className="text-amber-500 hover:text-amber-600 font-medium">
                Login
              </Link>{" "}
              to leave a comment.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookDetails;
