
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Layout from '../../Layout/Layout';

const PaymentSuccess = () => {
  const [iconVisible, setIconVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIconVisible(true);
  }, []);

  const handleMyCoursesClick = () => {
    navigate('/mycourse');
  };

  return (
    <Layout>
 
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <AiOutlineCheckCircle 
          className={`text-green-500 text-6xl mx-auto mb-4 transform transition-transform duration-1000 ${iconVisible ? 'rotate' : 'rotate-initial'}`}
        />
        <h1 className="text-3xl font-bold mb-4">Purchase Successful!</h1>
        <p className="text-lg mb-6">Your course purchase is successful.</p>
        <button
          onClick={handleMyCoursesClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          My Courses
        </button>
      </div>
    </div>

           
    </Layout>
  );
};

export default PaymentSuccess;
