import { useState } from "react";
import PropTypes from "prop-types";

const AuthorCard = ({ blog }) => {
  const { name, userImg } = blog;
  const [subscribed, setSubscribed] = useState(false);

  const handleClick = () => {
    setSubscribed(!subscribed);
  };

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">

      {userImg ? (
        <img src={userImg} className="w-20 h-20 rounded-full object-cover border-2 border-amber-200 dark:border-amber-700" alt={name} />
      ) : (
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl font-bold shadow-sm">
          {initials}
        </div>
      )}

      <h3 className="mt-4 font-semibold text-gray-900 dark:text-white text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
        {name || "Anonymous"}
      </h3>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Book Contributor</p>

      <button
        onClick={handleClick}
        className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors ${
          subscribed
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
        }`}
      >
        {subscribed ? "Unsubscribe" : "Subscribe"}
      </button>
    </div>
  );
};

AuthorCard.propTypes = {
  blog: PropTypes.shape({
    name: PropTypes.string,
    userImg: PropTypes.string,
  }).isRequired,
};

export default AuthorCard;
