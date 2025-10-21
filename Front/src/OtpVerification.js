import React, { useState } from 'react';
import { message } from 'antd';

const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const verifyOtp = async () => {
        // Implement your OTP verification logic here
        try {
            const response = await fetch('https://comm6-0-1.onrender.com/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp }),
            });

            if (response.ok) {
                message.success('OTP verified successfully!');
            } else {
                setError('Failed to verify OTP. Please try again.');
            }
        } catch (error) {
            setError('Error verifying OTP. Please try again later.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded" style={{ boxShadow: 'none' }}>
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="text-lg font-bold mb-4 text-black text-center">Verify OTP</h2>
            <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium text-black">Enter OTP</label>
                <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className="mt-6">
                <button
                    type="button"
                    onClick={verifyOtp}
                    className="w-full py-2 bg-custom-red text-white rounded-md"
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
};

export default OtpVerification;
