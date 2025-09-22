import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface LoginFormData {
    email: string;
    password: string;
}

const DUMMY_EMAIL = "user@example.com";
const DUMMY_PASSWORD = "password123";

const Login: React.FC = () => {
    const authContext = useContext(AuthContext);
    const login = authContext?.login;
    const user = authContext?.user;
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<LoginFormData>>({});
    const [authError, setAuthError] = useState<string>("");
    

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const validate = () => {
        const newErrors: Partial<LoginFormData> = {};

        if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
            newErrors.email = 'Please enter a valid email.';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setAuthError("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            if (
                formData.email === DUMMY_EMAIL &&
                formData.password === DUMMY_PASSWORD
            ) {
                if (login) login();
                navigate('/');
            } else {
                setAuthError("Invalid email or password.");
            }
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
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>

                        {authError && (
                            <div className="text-sm text-red-600 text-center">{authError}</div>
                        )}

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
                                />
                                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Log in
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?
                        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                            {' '}
                            Sign up
                        </Link>
                    </p>
                    <div className="mt-6 text-center text-xs text-gray-400">
                        Demo credentials: <br />
                        Email: <span className="font-mono">{DUMMY_EMAIL}</span> <br />
                        Password: <span className="font-mono">{DUMMY_PASSWORD}</span>
                    </div>
                </div>
            </div>

            <div className="hidden items-center justify-center bg-indigo-100 lg:flex lg:w-1/2">
                <div className="p-8 text-center">
                    <h3 className="mb-6 text-2xl font-bold text-gray-900">Why Join Us?</h3>
                    <p className="mb-4 text-lg text-gray-700">
                        Experience the best E-commerce app for all your needs.
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

export default Login;
