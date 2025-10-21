import React from 'react';
import { MailOutlined, PhoneOutlined, GlobalOutlined, EnvironmentOutlined, DownloadOutlined } from '@ant-design/icons';

const CardComponent = ({ logo, name, description, website, email, phone, location, excelFile }) => {

  const downloadExcel = () => {
    const link = document.createElement('a');
    link.href = excelFile;
    link.download = `${name.replace(/\s+/g, '_')}_info.xlsx`;
    link.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto transition-transform duration-300 hover:shadow-xl flex flex-col">
      <div className="h-56 w-full bg-gray-100 flex justify-center items-center">
        <img src={logo} alt={`${name} logo`} className="object-contain h-full w-full" />
      </div>

      <div className="p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">{name}</h1>
        <p className="text-gray-600 text-base mb-6">{description}</p>

        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <GlobalOutlined className="text-lg mr-3 text-gray-700" />
            <a href={website} className="text-blue-500 underline">{website}</a>
          </div>
          <div className="flex items-center text-sm">
            <MailOutlined className="text-lg mr-3 text-gray-700" />
            <a href={`mailto:${email}`} className="text-blue-500 underline">{email}</a>
          </div>
          <div className="flex items-center text-sm">
            <PhoneOutlined className="text-lg mr-3 text-gray-700" />
            {phone}
          </div>
          <div className="flex items-center text-sm">
            <EnvironmentOutlined className="text-lg mr-3 text-gray-700" />
            {location}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 mb-6 px-6">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800"
          onClick={downloadExcel}
        >
          <DownloadOutlined className="mr-2" />
          Download Excel
        </button>
      </div>
    </div>
  );
};

const RedirectedOptions = () => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* First Card */}
        <div className="flex justify-center">
          <CardComponent
            logo="/redirectedOptions/109Agency.png"
            name="109 Agency"
            description="Nous sommes 109 Agency. Une agence de communication nouvelle génération qui crée et vous engage dans des expériences de marque."
            website="http://www.109.ma/"
            email="contact@109.ma"
            phone="+212 522 36 76 17"
            location="Rue Bâb Chellah, Quartier Racine Résidence les Champs d’Anfa D, 4e étage 20050 Casablanca, Grand Casablanca, MA"
            excelFile="/Excel/Bordereau de Prix-109 Agency.xlsx"
          />
        </div>

        {/* Second Card */}
        <div className="flex justify-center">
          <CardComponent
            logo="/redirectedOptions/BullsandLions.png"
            name="Bulls and Lions"
            description="We are a Brand Innovation Company. We help leaders to create impact through innovation and creativity."
            website="http://www.bullsandlions.com"
            email="contact@bullsandlions.com"
            phone="+212-05222-20470"
            location="36, bd. Anfa, résidence Anafé - entrée A, 5ème étage - N°57 20200 Casablanca, Grand Casablanca, MA"
            excelFile="/Excel/Bordereau de Prix-Bulls & Lions.xlsx"
          />
        </div>
      </div>
    </div>
  );
};

export default RedirectedOptions;
