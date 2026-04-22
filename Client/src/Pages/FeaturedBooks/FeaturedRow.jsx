import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FeaturedRow = ({ blog, serial }) => {
  const { id, title, name, image } = blog;

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-medium">{serial}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {image && (
            <img src={image} alt={title} className="w-10 h-12 object-cover rounded-md border border-gray-100 dark:border-dark-border flex-shrink-0" />
          )}
          <span className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{name || "Unknown"}</td>
      <td className="px-6 py-4">
        <Link to={`/blog-details/${id}`}>
          <button className="px-4 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors">
            View
          </button>
        </Link>
      </td>
    </tr>
  );
};

FeaturedRow.propTypes = {
  blog: PropTypes.object,
  serial: PropTypes.number,
};

export default FeaturedRow;
