import React, { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <div className="flex">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <button 
          type="submit"
          disabled={status === 'loading'}
          className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {status === 'success' && (
        <p className="text-green-400 text-sm">Successfully subscribed!</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}