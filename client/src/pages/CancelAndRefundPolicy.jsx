

import Layout from '../Layout/Layout';

const CancelAndRefundPolicy = () => {
  return (
    <Layout>
    
    <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold  mb-6 border-b pb-4 text-purple-500">Cancel & Refund Policy</h1>
        <h2 className="text-2xl font-semibold  mb-4 text-black">Cancellation Policy</h2>
        <p className=" mb-6 text-black">
          If you are not satisfied with our learning management system, you have the right to cancel your subscription within 7 days of your purchase. To cancel your subscription,you can do by going your subscription option or  please contact our support team at <a href="mailto:mohitnehra895@gmail.com" className="text-purple-300 hover:underline">mohitnehra895@gmail.com</a>.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-black">Refund Policy</h2>
        <p className=" mb-6 text-black">
          Once your cancellation request is received, we will process your refund within 4-5 working days. The refund will be credit back to your original method of payment. Please note that it may take some time for the refund to reflect in your account, depending on your bank or credit card provider.
        </p>
        <h2 className="text-2xl font-semibold  mb-4 text-black">Contact Us</h2>
        <p className=" mb-6">
          If you have any questions about our <span className=' text-purple-200'>Cancel & Refund Policy</span>, please contact us at <a href="mailto:mohitnehra895@gmail.com" className=" hover:underline text-purple-300 bold">mohitnehra895@gmail.com</a>.
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default CancelAndRefundPolicy;
