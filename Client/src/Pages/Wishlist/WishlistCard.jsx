import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const WishlistCard = ({ oneWish, handleDelete }) => {
  const { id, title, image, short_description, category } = oneWish;

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
      <div className="relative h-44 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">📚</div>
        )}
        {category && (
          <span className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold bg-amber-500 text-white rounded-full">
            {category}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h2
          className="text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title || "Untitled"}
        </h2>
        {short_description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
            {short_description}
          </p>
        )}

        <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-dark-border">
          <Link to={`/blog-details/${id}`} className="flex-1">
            <button className="w-full px-3 py-2 text-sm font-medium rounded-lg bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
              View Details
            </button>
          </Link>
          <button
            onClick={() => handleDelete(id)}
            className="px-3 py-2 text-sm font-medium rounded-lg border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Remove from wishlist"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

WishlistCard.propTypes = {
  oneWish: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default WishlistCard;
