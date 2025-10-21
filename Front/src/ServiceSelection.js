import React, { useState, useEffect } from 'react';
import { FaCamera, FaPaintBrush, FaVideo, FaTrashAlt, FaPlusCircle, FaCheckCircle } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import servicesData from './services.json';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import './Style.css'; 
const iconMap = {
    'Photography': FaCamera,
    'Graphic Design': FaPaintBrush,
    'Video Production': FaVideo,
};

function ServiceSelection({
    selectedServices,
    setSelectedServices,
    selectedVariations,
    setSelectedVariations,
}) {
    const [activeCategory, setActiveCategory] = useState(servicesData[0]);
    const [filterText, setFilterText] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [userId, setUserId] = useState(null); // State to store the user ID

    useEffect(() => {
        // Retrieve user ID from local storage
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleCategorySelection = (category) => {
        setActiveCategory(category);
        setFilterText('');
    };

    const handleVariationChange = (service, variation) => {
        const updatedService = {
            ...service,
            variation: variation,
            category: activeCategory.category,
        };

        setSelectedVariations({
            ...selectedVariations,
            [service.service]: updatedService,
        });

        if (!selectedServices.some((s) => s.service === service.service)) {
            setSelectedServices([...selectedServices, updatedService]);
            console.log('User ID:', userId); // Log user ID for debugging
        } else {
            const updatedServices = selectedServices.map((s) =>
                s.service === service.service ? updatedService : s
            );
            setSelectedServices(updatedServices);
        }
    };

    const handleServiceToggle = (service) => {
        if (selectedServices.some((s) => s.service === service.service)) {
            handleRemoveService(service.service);
        } else {
            const selectedVariation = service.variations[0];
            handleVariationChange(service, selectedVariation);
        }
    };

    const handleRemoveService = (serviceName) => {
        setSelectedServices(selectedServices.filter((s) => s.service !== serviceName));
        const updatedVariations = { ...selectedVariations };
        delete updatedVariations[serviceName];
        setSelectedVariations(updatedVariations);
    };

    const filteredServices = activeCategory.services.filter((service) =>
        service.service.toLowerCase().includes(filterText.toLowerCase())
    );

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
                {/* Categories Sidebar */}
                <div className="lg:w-1/4 w-full p-6 bg-white rounded-xl shadow-lg flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-6 title text-center">Categories</h3>
                        <ul className="space-y-6">
                            {servicesData.map((category, index) => {
                                const Icon = iconMap[category.category.trim()] || FaCamera;
                                return (
                                    <li
                                        key={index}
                                        className={`flex flex-col cursor-pointer transition-all text-base service-card ${activeCategory.category === category.category
                                            ? 'bg-gray-200 text-gray-800'
                                            : 'bg-white text-gray-700 hover:bg-gray-200'
                                            }`}
                                        onClick={() => handleCategorySelection(category)}
                                    >
                                        <div className="flex items-center mb-2">
                                            <Icon
                                                className={`mr-4 text-2xl transition-colors duration-300 ${activeCategory.category === category.category
                                                    ? 'text-custom-red'
                                                    : 'text-gray-700 hover:text-custom-red'
                                                    }`}
                                            />
                                            <span className="text-lg font-semibold">{category.category}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 ml-8">
                                            {category.category === 'Photography' && 'Professional photography services for all occasions.'}
                                            {category.category === 'Graphic Design' && 'Creative graphic design for print and digital media.'}
                                            {category.category === 'Video Production' && 'High-quality video production for any need.'}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-300">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="text-md font-semibold text-gray-700 mb-2">Need Help?</h4>
                            <p className="text-sm text-gray-600">Need help? <a href="mailto:khdouja19wiam@gmail.com" className="text-custom-red">Contact support</a>.</p>
                        </div>
                    </div>
                </div>

                {/* Services List */}
                <div className="lg:w-2/4 w-full p-6 bg-white rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-6 title text-center">
                        {activeCategory.category} Services
                    </h3>
                    <div className="relative mb-6">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-custom-red"
                        />
                        <input
                            type="text"
                            placeholder="Search for a service..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="w-full p-3 pr-14 border border-gray-300 rounded-lg focus:border-custom-red focus:ring-2 focus:ring-custom-red focus:outline-none"
                        />
                    </div>
                    {filteredServices.length > 0 ? (
                        <div className="space-y-4">
                            {filteredServices.map((service, index) => {
                                const isSelected = selectedServices.some((s) => s.service === service.service);

                                return (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg border cursor-pointer transition-all ${isSelected ? 'border-2 border-custom-red' : 'border-gray-200 bg-gray-50 hover:bg-gray-200'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-semibold">{service.service}</h3>
                                                <p className="text-sm">{service.description}</p>
                                            </div>
                                            <div className="text-center">
                                                <div
                                                    className="text-custom-red cursor-pointer"
                                                    onClick={() => handleServiceToggle(service)}
                                                    style={{ position: 'relative', top: '-5px' }}
                                                >
                                                    {isSelected ? <FaCheckCircle className="text-2xl" /> : <FaPlusCircle className="text-2xl" />}
                                                </div>
                                                <span className="text-xs text-gray-500">{isSelected ? 'Added' : 'Add'}</span>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="text-sm font-medium">Select Variation:</label>
                                            <select
                                                className="ml-2 p-2 border rounded-lg text-sm bg-white"
                                                value={selectedVariations[service.service]?.variation?.name || ''}
                                                onChange={(e) => {
                                                    const selectedVariation = service.variations.find(
                                                        (v) => v.name === e.target.value
                                                    );
                                                    handleVariationChange(service, selectedVariation);
                                                }}
                                            >
                                                <option value="">Select a variation</option>
                                                {service.variations.map((variation, varIndex) => (
                                                    <option key={varIndex} value={variation.name}>
                                                        {variation.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 mt-10">
                            <p className="text-lg font-semibold">No services found.</p>
                        </div>
                    )}
                </div>

                {/* Panier/Cart */}
                <div className="lg:w-1/3 w-full p-6 bg-white rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 title">Your Selected Services</h3>
                    <ul className="space-y-4">
                        {selectedServices.length > 0 ? (
                            selectedServices.map((service, index) => (
                                <li key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200 w-full">
                                    <div className="flex-grow">
                                        <p className="text-lg font-semibold flex items-center">
                                            {service.service}
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                                            {service.variation?.name} 
                                        </p>
                                        <div className="mt-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700 inline-block">
                                            {service.category}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveService(service.service)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <FaTrashAlt className="text-lg" />
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="text-sm text-gray-500 text-center">No services selected.</li>
                        )}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default ServiceSelection;