import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-bg px-4 text-center">
      <div className="text-8xl mb-6">📚</div>
      <h1
        className="text-6xl font-bold text-gray-900 dark:text-white mb-2"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        404
      </h1>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-sm"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
