import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup: React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Partial<SignupFormData>>({});
    const [loading, setLoading] = useState(false); // <-- loading state

    const validate = () => {
        const newErrors: Partial<SignupFormData> = {};

        if (!formData.name || formData.name.trim().length < 3) {
            newErrors.name = 'Name must be at least 3 characters.';
        }

        if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
            newErrors.email = 'Enter a valid email.';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            // Simulate async signup
            setTimeout(() => {
                setLoading(false);
                navigate('/');
            }, 1500);
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex w-full flex-col justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-12">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://baitussalam.org/images/logo.svg"
                        alt="Baitussalam"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign up for your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    disabled={loading}
                                />
                                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    disabled={loading}
                                />
                                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    disabled={loading}
                                />
                                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    disabled={loading}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 items-center ${
                                    loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 mr-2 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            ></path>
                                        </svg>
                                        Signing up...
                                    </>
                                ) : (
                                    'Sign up'
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            {' '}
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            <div className="hidden items-center justify-center bg-indigo-100 lg:flex lg:w-1/2">
                <div className="p-8 text-center">
                    <h3 className="mb-6 text-2xl font-bold text-gray-900">Why Join Us?</h3>
                    <p className="mb-4 text-lg text-gray-700">
                        Experience the best ecommerce app for all your needs.
                    </p>
                    <p className="mb-4 text-lg text-gray-700">
                        Get exclusive discounts and offers on your favorite products.
                    </p>
                    <p className="mb-4 text-lg text-gray-700">
                        Fast and secure checkout process tailored for you.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
