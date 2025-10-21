import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceSelection from './ServiceSelection';
import PersonalData from './PersonalData';
import Summary from './Summary';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { ProgressBar } from './ProgressBar';
import Navbar from './Navbar';

function Photography() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedVariations, setSelectedVariations] = useState({});
    const [joinDocument, setJoinDocument] = useState(null);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);  // For error handling

    // Load user data from localStorage with enhanced error handling
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                
                // Validate if all necessary fields are present
                if (!parsedUser.username || !parsedUser.email || !parsedUser.phone || !parsedUser.department) {
                    setError('Some user details are missing. Please complete your profile.');
                    console.error('Missing user details:', parsedUser);
                } else {
                    setUserData(parsedUser);
                }
            } else {
                // Redirect to login if no user data is available
                setError('User not logged in. Redirecting to login.');
                console.error('No user data found in localStorage.');
                navigate('/signin');
            }
        } catch (err) {
            // Handle JSON parsing errors or other unexpected issues
            setError('An error occurred while retrieving your details. Please try again later.');
            console.error('Error parsing user data from localStorage:', err);
        }
    }, [navigate]);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    return (
        <div>
            <Navbar theme="theme2" />
            <div className="pt-24">
                <div className="p-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-4">Book Your  Services</h1>
                        <ProgressBar step={step} />
                    </div>

                    {/* Show error message if there's an error */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Only render the step sections if there's no error */}
                    {!error && (
                        <div>
                            {step === 1 && (
                                <ServiceSelection
                                    selectedServices={selectedServices}
                                    setSelectedServices={setSelectedServices}
                                    selectedVariations={selectedVariations}
                                    setSelectedVariations={setSelectedVariations}
                                />
                            )}
                            {step === 2 && (
                                <PersonalData
                                    fullName={userData?.username || 'Full Name Not Provided'}
                                    email={userData?.email || 'Email Not Provided'}
                                    phoneNumber={userData?.phone || 'Phone Not Provided'}
                                    department={userData?.department || 'Department Not Provided'}
                                    joinDocument={joinDocument}
                                    setJoinDocument={setJoinDocument}
                                />
                            )}
                            {step === 3 && (
                                <Summary
                                    selectedServices={selectedServices}
                                    selectedVariations={selectedVariations}
                                    fullName={userData?.username}
                                    email={userData?.email}
                                    phone={userData?.phone}
                                    department={userData?.department}
                                    joinDocument={joinDocument}
                                    handleBooking={() => console.log('Booking confirmed')}
                                />
                            )}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-6 flex justify-between">
                        {step > 1 && (
                            <button
                                onClick={handlePreviousStep}
                                className="bg-gray-200 p-3 rounded-lg flex items-center text-gray-700 hover:bg-gray-300"
                            >
                                <FaArrowLeft className="mr-2" /> Previous
                            </button>
                        )}
                        {step < 3 && (
                            <button
                                onClick={handleNextStep}
                                className="bg-custom-red text-white p-3 rounded-lg flex items-center hover:bg-red-600 ml-auto"
                            >
                                Next <FaArrowRight className="ml-2" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Photography;
