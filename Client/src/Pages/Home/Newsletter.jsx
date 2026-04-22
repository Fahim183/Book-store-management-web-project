import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 p-8 sm:p-12 text-center overflow-hidden relative">

      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-28 h-28 bg-amber-400 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="relative">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-amber-500/20 text-amber-400 rounded-full mb-4">
          Newsletter
        </span>
        <h2
          className="text-2xl sm:text-3xl font-bold text-white mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Stay in the Loop
        </h2>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
          Get notified about new book additions, community highlights, and reading recommendations.
        </p>

        {status === 'success' ? (
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 px-6 py-3 rounded-xl text-sm font-medium">
            <span>✓</span> Thanks for subscribing!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={`flex-1 px-4 py-3 rounded-xl bg-white/10 border ${
                status === 'error' ? 'border-red-500' : 'border-white/10'
              } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition`}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-400 text-xs mt-2">Please enter a valid email address.</p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
