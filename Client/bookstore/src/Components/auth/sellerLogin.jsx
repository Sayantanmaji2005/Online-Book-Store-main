import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/authContext';

export const SellerLogin = ({ onLoginSuccess, onBackToStore }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login, isLoading: authLoading } = useAuth();
    const [localLoading, setLocalLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalLoading(true);

        const result = await login(credentials.email, credentials.password);

        if (result.success) {
            // Check if user is admin
            if (result.user.role === 'admin') {
                toast.success('Seller Portal Accessed!');
                onLoginSuccess();
            } else {
                toast.error('Access Denied: Not an admin account');
            }
        } else {
            toast.error(result.error || 'Invalid Seller Credentials');
        }

        setLocalLoading(false);
    };

    const isLoading = authLoading || localLoading;

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-50">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-100">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Seller <span className="text-indigo-600">Portal</span></h2>
                    <p className="text-slate-500 mt-2 font-medium">Authorized Access Only</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Admin Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                            placeholder="Enter admin email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                            placeholder="••••••••"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 ${isLoading ? 'opacity-70' : 'hover:bg-indigo-600'}`}
                    >
                        {isLoading ? 'Verifying...' : 'Login to Dashboard'}
                    </button>
                </form>

                <button
                    onClick={onBackToStore}
                    className="w-full mt-6 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors"
                >
                    ← Back to Marketplace
                </button>

                <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Demo Access</p>
                        <button
                            onClick={() => setCredentials({ email: 'admin@gmail.com', password: 'admin' })}
                            className="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded-md hover:bg-indigo-700 transition-colors font-bold uppercase"
                        >
                            Auto Fill
                        </button>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-indigo-800 font-bold flex justify-between">
                            <span>Email:</span>
                            <span className="text-indigo-600">admin@gmail.com</span>
                        </p>
                        <p className="text-xs text-indigo-800 font-bold flex justify-between">
                            <span>Password:</span>
                            <span className="text-indigo-600">admin</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

