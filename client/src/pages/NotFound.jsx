import { useNavigate } from "react-router-dom";

import Footer from "../components/footer/Footer";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    // error page tailwind component is taken from the given link
    // https://freefrontend.com/tailwind-404-page-templates/
    <>
      <div className="h-screen w-screen bg-gray-100 flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md">
            <div className="text-5xl font-dark font-bold">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn&apos;t find this page.{" "}
            </p>
            <p className="mb-8">
              Oops! The page you are looking for does not exist. It might have
              been moved or deleted.
            </p>

            <button
              className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
            <button
              className="px-4 ml-8 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-green-600 active:bg-green-600 hover:bg-green-700"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
