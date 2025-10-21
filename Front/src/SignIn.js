import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { notification } from 'antd'; // Ant Design notification
import { useUser } from './context/UserContext'; // Import the context to set role

const SignIn = ({ closeModal, openSignUpModal, handleSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(''); // Track the focused field
    const { setRole } = useUser()
    // Function to show notification
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (email === '' || password === '') {
            openNotificationWithIcon('error', 'Please fill in both fields');
            return;
        }

        try {
            // Send POST request to backend for authentication
            const response = await axios.post('https://comm6-0-1.onrender.com/api/auth/signin', {
                email,
                password,
            });

            // Handle successful response (e.g., store user info, redirect, etc.)
            if (response.data) {
                const { userId,role, ...userInfo } = response.data; // Assuming the response contains userId
                localStorage.setItem('userId', userId); // Store user ID username
                localStorage.setItem('username', userId); // Store user ID username
                localStorage.setItem('role', role);

                localStorage.setItem('user', JSON.stringify(userInfo)); 
                setRole(role);
                // Store other user info
                closeModal();
                handleSignIn(userInfo);
                 // Call the handler from the parent component (Navbar)
            }
        } catch (error) {
            // Handle errors (e.g., invalid credentials)
            if (error.response && error.response.status === 401) {
                openNotificationWithIcon('error', 'Invalid email or password');
            } else {
                openNotificationWithIcon('error', 'An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style={{ height: '100vh' }}>
            <div
                className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-lg"
                style={{
                    paddingTop: '30px',  // Space for the close icon
                    paddingBottom: '30px', // Equal space below
                }}
            >
                {/* Close Button */}
                <button className="absolute top-3 right-3 text-custom-red" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>

                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <label className="block text-custom-red mb-2">Email</label>
                    <div className={`flex items-center border ${focusedField === 'email' ? 'border-custom-red' : 'border-gray-300'} rounded-md mb-4`}>
                        <span className="px-2 text-gray-500">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField('')} // Reset field focus on blur
                            className="w-full p-2 focus:outline-none focus:border-custom-red"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <label className="block text-custom-red mb-2">Password</label>
                    <div className={`flex items-center border ${focusedField === 'password' ? 'border-custom-red' : 'border-gray-300'} rounded-md mb-6`}>
                        <span className="px-2 text-gray-500">
                            <i className="fas fa-lock"></i>
                        </span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField('')} // Reset field focus on blur
                            className="w-full p-2 focus:outline-none focus:border-custom-red"
                            required
                        />
                        <button
                            type="button"
                            className="px-2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOutlined className="text-gray-500" />
                            ) : (
                                <EyeInvisibleOutlined className="text-gray-500" />
                            )}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-custom-red text-white py-2 rounded-md"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <button onClick={openSignUpModal} className="text-custom-red hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
