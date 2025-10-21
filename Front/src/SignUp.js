import React, { useState } from 'react';
import { message } from 'antd'; // For notifications
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const SignUp = ({ onSignUp, closeModal, openSignInModal, customRed = "#D4451E" }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        department: '',
        password: '',
        confirmPassword: '',
    });
    const [focusedField, setFocusedField] = useState(''); // Track the focused field
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);  // Flag to track if OTP was sent
    const [isOtpVerified, setIsOtpVerified] = useState(false);  // Flag to track if OTP is verified
    const [passwordStrength, setPasswordStrength] = useState({
        hasUpperCase: false,
        hasNumber: false,
        minLength: false,
    });

    // Function to handle redirecting to the sign-in modal
    const redirectToSignIn = () => {
        closeModal();  // Close the SignUp modal
        openSignInModal();  // Open the SignIn modal
    };

    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [emailValid, setEmailValid] = useState(true);  // Email validation state
    const [error, setError] = useState('');  // General error messages
    const [agreedToTerms, setAgreedToTerms] = useState(false);  // Checkbox for agreement
    const [showPasswordStrength, setShowPasswordStrength] = useState(false);  // Show strength check only when typing
    const [loading, setLoading] = useState(false); // For "Verify Email" button
    const [accountCreationLoading, setAccountCreationLoading] = useState(false); // For "Create Account" button
    const [emailVerificationLoading, setEmailVerificationLoading] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'password') {
            checkPasswordStrength(value);
        }

        if (name === 'confirmPassword') {
            checkPasswordsMatch(formData.password, value);
        }

        if (name === 'email') {
            validateEmail(value);
        }
    };

    // Email validation logic for @um6p.ma 
    const validateEmail = (email) => {
        const lowerCaseEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@(um6p\.ma)$/;  // Correct domain validation
        setEmailValid(emailRegex.test(lowerCaseEmail));
    };

    // Check password strength only when typing and hide when field is not focused
    const checkPasswordStrength = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const minLength = password.length >= 8;

        setPasswordStrength({
            hasUpperCase,
            hasNumber,
            minLength,
        });
    };

    // Check if passwords match
    const checkPasswordsMatch = (password, confirmPassword) => {
        setPasswordsMatch(password === confirmPassword && confirmPassword.length > 0);
    };

    // Send the user data to the backend to register and send OTP
    const sendVerificationCode = async () => {
        setEmailVerificationLoading(true);
        if (!formData.email || !emailValid) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true); // Start the loading spinner

        try {
            const response = await fetch('https://comm6-0-1.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setIsOtpSent(true);  // Mark that OTP has been sent
                message.success('OTP has been sent to your email.', 3);
            } else if (response.status === 409) {
                setError('This email is already registered. Please use a different email.');
            } else if (response.status === 400) {
                setError('Invalid email format or data. Please check the form.');
            } else {
                setError('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            setError('Failed to send OTP. Please try again later.');
        } finally {
            setEmailVerificationLoading(true);
        }
    };
const verifyOtpAndCreateAccount = async () => {
    setAccountCreationLoading(true);

    if (!otp) {
        setError('Please enter the OTP sent to your email.');
        return;
    }

    if (!agreedToTerms) {
        setError('You must agree to the Conditions of Use.');
        return;
    }

    try {
        // Verify OTP and create account
        const otpResponse = await fetch('https://comm6-0-1.onrender.com/api/auth/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                otp: otp,
            }),
        });

        if (otpResponse.ok) {
            setIsOtpVerified(true); // Mark OTP as verified
            message.success('OTP verified successfully! Your account has been created.', 3);

            // Close modal after OTP verification
            closeModal();  // Close the sign-up modal
            openSignInModal();  // Open the sign-in modal

            // Save user info in localStorage if necessary
            const userInfo = {
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                department: formData.department,
            };
            localStorage.setItem('user', JSON.stringify(userInfo));
        } else {
            const errorData = await otpResponse.json();
            setError(errorData.message || 'Failed to verify OTP. Please try again later.');
        }
    } catch (error) {
        setError('An error occurred during OTP verification. Please try again later.');
    } finally {
        setLoading(false);  // Stop the spinner once done
    }
    setAccountCreationLoading(false);
};


    // Function to handle redirecting to the sign-in modal



    return (
        <div className="relative max-w-md mx-auto p-6 bg-white rounded shadow-lg">

            <button className="absolute top-3 right-3 text-custom-red" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            {error && <p className="text-red-500">{error}</p>}

            {!isOtpSent ? (
                <>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-custom-red">Your name</label>
                        <div className={`flex items-center border ${focusedField === 'username' ? 'border-custom-red' : 'border-gray-300'} rounded-md`}>
                            <span className="px-2 text-gray-500">
                                <i className="fas fa-user"></i>
                            </span>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('username')}
                                onBlur={() => setFocusedField('')}
                                className="w-full p-2 mt-1 rounded-md focus:border-none focus:outline-none"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-custom-red">Email</label>
                        <div className={`flex items-center border ${focusedField === 'email' ? 'border-custom-red' : 'border-gray-300'} rounded-md`}>
                            <span className="px-2 text-gray-500">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField('')}
                                className="w-full p-2 mt-1 rounded-md focus:border-none focus:outline-none"
                                placeholder="Enter a valid email"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-custom-red">Phone Number</label>
                        <div className={`flex items-center border ${focusedField === 'phone' ? 'border-custom-red' : 'border-gray-300'} rounded-md`}>
                            <span className="px-2 text-gray-500">
                                <i className="fas fa-phone"></i>
                            </span>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('phone')}
                                onBlur={() => setFocusedField('')}
                                className="w-full p-2 mt-1 rounded-md focus:border-none focus:outline-none"
                                placeholder="Enter a valid phone number"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="department" className="block text-custom-red">Department</label>
                        <div className={`flex items-center border ${focusedField === 'department' ? 'border-custom-red' : 'border-gray-300'} rounded-md`}>
                            <span className="px-2 text-gray-500">
                                <i className="fas fa-building"></i>
                            </span>
                            <input
                                type="text"
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('department')}
                                onBlur={() => setFocusedField('')}
                                className="w-full p-2 mt-1 rounded-md focus:border-none focus:outline-none"
                                placeholder="Enter your department"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-custom-red">Password</label>
                        <div className={`flex items-center border ${focusedField === 'password' ? 'border-custom-red' : 'border-gray-300'} rounded-md relative`}>
                            <span className="px-2 text-gray-500">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onFocus={() => { setFocusedField('password'); setShowPasswordStrength(true); }}
                                onBlur={() => { setFocusedField(''); setShowPasswordStrength(false); }}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 rounded-md focus:border-none focus:outline-none"
                                placeholder="At least 8 characters"
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
                        {showPasswordStrength && (
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center">
                                    <FontAwesomeIcon
                                        icon={passwordStrength.hasUpperCase ? faCheck : faTimes}
                                        className={`mr-2 ${passwordStrength.hasUpperCase ? 'text-green-500' : 'text-red-500'}`}
                                    />
                                    <span className={passwordStrength.hasUpperCase ? 'text-green-500' : 'text-red-500'}>
                                        Must contain an uppercase letter
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon
                                        icon={passwordStrength.hasNumber ? faCheck : faTimes}
                                        className={`mr-2 ${passwordStrength.hasNumber ? 'text-green-500' : 'text-red-500'}`}
                                    />
                                    <span className={passwordStrength.hasNumber ? 'text-green-500' : 'text-red-500'}>
                                        Must contain a number
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon
                                        icon={passwordStrength.minLength ? faCheck : faTimes}
                                        className={`mr-2 ${passwordStrength.minLength ? 'text-green-500' : 'text-red-500'}`}
                                    />
                                    <span className={passwordStrength.minLength ? 'text-green-500' : 'text-red-500'}>
                                        Must be at least 8 characters long
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-custom-red">Re-enter Password</label>
                        <div className={`flex items-center border ${focusedField === 'confirmPassword' ? 'border-custom-red' : 'border-gray-300'} rounded-md relative`}>
                            <span className="px-2 text-gray-500">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('confirmPassword')}
                                onBlur={() => setFocusedField('')}
                                className="w-full p-2 mt-1 rounded-md focus:border-none focus:outline-none"
                                placeholder="Re-enter your password"
                                required
                            />
                            <span
                                className="absolute right-2 text-gray-500 cursor-pointer"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </span>
                        </div>
                        {formData.confirmPassword && (
                            <div className="mt-2 flex items-center">
                                <FontAwesomeIcon
                                    icon={passwordsMatch ? faCheck : faTimes}
                                    className={`mr-2 ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}
                                />
                                <span className={passwordsMatch ? 'text-green-500' : 'text-red-500'}>
                                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Checkbox for Terms and Conditions */}
                    <div className="mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="mr-2 form-checkbox text-custom-red focus:ring-custom-red" // Adjusted the checkbox styling
                            />
                            <span className="text-lm text-black">
                                By creating an account, you agree to our{" "}
                                <a href="#" className="text-custom-red underline">Conditions of Use</a>
                            </span>
                        </label>
                    </div>

                    <br></br>
                    <button
                        type="button"
                        onClick={sendVerificationCode}
                        className="w-full py-2 text-white rounded-md hover:bg-red-700"
                        style={{ backgroundColor: customRed }}
                        disabled={emailVerificationLoading}
                    >
                        {emailVerificationLoading ? 'Verifying Email...' : 'Verify Email'}
                    </button>




                    <p className="mt-4 text-center">
                        Already have an account ?{' '}
                        <button onClick={openSignInModal} className="text-custom-red hover:underline">
                            Sign in
                        </button>
                    </p>

                </>
            ) : (
                <>
                    <h2 className="text-lg font-bold mb-4 text-black text-center">Verify email address</h2>
                    <p className="mb-4 text-black">
                        To verify your email, we've sent a One Time Password (OTP) to {formData.email}.
                    </p>

                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-sm font-medium text-custom-red">Enter OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:border-custom-red focus:outline-none" // Added focus:border-custom-red
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={verifyOtpAndCreateAccount}
                        className="w-full py-2 text-white rounded-md hover:bg-red-700"
                        style={{ backgroundColor: customRed }}
                        disabled={accountCreationLoading}
                    >
                        {accountCreationLoading ? 'Creating Account...' : 'Create Your Account'}
                    </button>
                </>
            )
            }
        </div >
    );
};

export default SignUp;
