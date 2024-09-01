import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Layout from '../../Layout/Layout';

const PaymentFailure = () => {
  const [iconVisible, setIconVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIconVisible(true);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Layout>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <AiOutlineCloseCircle 
          className={`text-red-500 text-6xl mx-auto mb-4 transform transition-transform duration-1000 ${iconVisible ? 'rotate' : 'rotate-initial'}`}
        />
        <h1 className="text-3xl font-bold mb-4">Payment Failed!</h1>
        <p className="text-lg mb-6">There was an issue with your payment.</p>
        <button
          onClick={handleBackClick}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Go Back
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default PaymentFailure;
