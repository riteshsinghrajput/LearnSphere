import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaBars, FaChevronDown, FaTimes, FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import {Menu ,MenuItem,Sidebar,SubMenu } from 'react-pro-sidebar'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from '../../assets/Learn_Sphere_logo/logo-no-background.png'
import { logout } from "../../Redux/slices/authSlice";
const Navbar = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const { data, isLoggedIn } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleOverflow = () => {
      if (isMobileMenuOpen && isMobileView) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
        document.body.style.background = "";
      }
    };

    handleOverflow();

    return () => {
      document.body.style.overflow = "";
      document.body.style.background = "";
    };
  }, [isMobileMenuOpen, isMobileView]);

  const logOutHandler = async () => {
    const res = await dispatch(logout());
    // redirect to home page if true
    if (res?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <header
      className={` shadow-lg flex relative justify-center   ${
        scrollY > 240 ? "sticky top-0" : ""
      } transition duration-300 ease-in-out z-50 bg-white`}
    >
      <nav className="container mx-auto p-4 flex justify-between items-center w-[90vw]">
        {/* Logo and large screen menu */}
        <div className=" absolute left-8 h-[100%] flex  items-center">
            <img src={Logo} alt="learn sphere logo" className="  h-[80%]" />
          </div>
        <div className="flex items-center ml-[8rem]  xl:ml-[16rem] ">
          {!isMobileView && (
            <div className="hidden lg:flex space-x-4 pl-4">
              <Link
                to="/"
                className={`text-gray-600 hover:text-gray-800  ${
                  location.pathname == "/"
                    ? "underline decoration-purple-500 underline-offset-8"
                    : " hover:underline decoration-purple-500 underline-offset-8"
                } `}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className={`text-gray-600 hover:text-gray-800 ${
                  location.pathname.includes("/courses")
                    ? "underline decoration-purple-500 underline-offset-8"
                    : " hover:underline decoration-purple-500 underline-offset-8"
                } `}
              >
                Courses
              </Link>
              <Link
                to="/about"
                className={`text-gray-600 hover:text-gray-800 ${
                  location.pathname == "/about"
                    ? "underline decoration-purple-500 underline-offset-8"
                    : " hover:underline decoration-purple-500 underline-offset-8"
                }`}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className={`text-gray-600 hover:text-gray-800 ${
                  location.pathname == "/contact"
                    ? "underline decoration-purple-500 underline-offset-8"
                    : " hover:underline decoration-purple-500 underline-offset-8"
                }`}
              >
                Contact Us
              </Link>
              {(data?.role === "ADMIN" || data?.role === "INST") && (
                <Link
                  to="/admin/dashboard"
                  className={`text-gray-600 hover:text-gray-800 ${
                    location.pathname == "/admin/dashboard"
                      ? "underline decoration-purple-500 underline-offset-8"
                      : " hover:underline decoration-purple-500 underline-offset-8"
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Search and Contact Info */}
        {!isMobileView && (
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <>
                <div className="relative">
                  <button
                    className="text-gray-600 flex items-center hover:bg-black hover:text-white rounded-md transition ease-in-out delay-100 duration-300 border border-black "
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="px-4 py-2 font-bold">{data.fullName} </div>
                    <span className="bg-black h-full px-4 py-3 rounded-l-md text-white">
                      <FaChevronDown className="ml-1" />
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl z-50">
                      <Link
                        to="/user/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Profile
                      </Link>

                      <Link
                        to="/mycourse"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        My Course
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}

            {isLoggedIn ? (
              <>
                <div
                  className="bg-purple-500 text-white px-4 py-2 rounded-md cursor-pointer"
                  onClick={() => logOutHandler()}
                >
                  Log out
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <div className="bg-purple-500 text-white px-4 py-2 rounded-md cursor-pointer">
                    Login
                  </div>
                </Link>
                <Link to="/signup">
                  <div className="bg-white text-purple-500 border border-purple-500 px-4 py-2 rounded-md cursor-pointer">
                    Signup
                  </div>
                </Link>
              </>
            )}
          </div>
        )}

        {/* Mobile menu button */}
        {isMobileView && (
          <div className=" flex items-center">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <FaBars className="text-gray-600 text-2xl" />
            </button>
          </div>
        )}
      </nav>

      {/* Mobile menu sidebar */}
      {isMobileView && isMobileMenuOpen && (
        <div className="absolute right-0 top-0 w-80 max-w-[100vw] bg-white focus:border  h-[100vh] overflow-hidden overflow-y-scroll shadow-lg z-[4000]">
          <div className=" max-h-[100%] w-[100%]">
            <div className="flex justify-end p-4 border-b ">
              <button
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  e.stopPropagation();
                }}
              >
                <FaTimes className="text-gray-600 text-2xl font-thin" />
              </button>
            </div>
            <div className="p-4 space-y-2 flex flex-col  ">
              <Link
                to="/"
                className={`text-gray-600 hover:text-gray-800 mb-2 pl-2 border-purple-500 ${
                  location.pathname == "/" ? "border-l-4" : " hover:border-l-4"
                }`}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className={`text-gray-600 hover:text-gray-800 mb-2 pl-2 border-purple-500 ${
                  location.pathname.includes("/courses")
                    ? "border-l-4"
                    : " hover:border-l-4"
                }`}
              >
                Courses
              </Link>
              <Link
                to="/myCourse"
                className={`text-gray-600 hover:text-gray-800 mb-2 pl-2 border-purple-500 ${
                  location.pathname == "/myCourse"
                    ? "border-l-4"
                    : " hover:border-l-4"
                }`}
              >
                My Course
              </Link>
              <Link
                to="/about"
                className={`text-gray-600 hover:text-gray-800 mb-2 pl-2 border-purple-500 ${
                  location.pathname == "/about"
                    ? "border-l-4"
                    : " hover:border-l-4"
                }`}
              >
                About Us
              </Link>
              {(data?.role === "ADMIN" || data?.role === "INST") && (
                <Link
                  to="/admin/dashboard"
                  className={`text-gray-600 hover:text-gray-800 mb-2 pl-2 border-purple-500 ${
                    location.pathname == "/admin/dashboard"
                      ? "border-l-4"
                      : " hover:border-l-4"
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>
            <div className="border-t p-4 space-y-1 w-[100%]">
            {isLoggedIn &&  <button
                className="bg-white flex space-x-6 items-center text-black w-full text-center py-2 rounded-md pb-4"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center w-[100%]">
                  {/* <FaUser />{" "} */}
                  <Sidebar width="100%">
        
                  <Menu >
                   <SubMenu  icon ={<FaUser className="text-xl"/>} label = {data.fullName} className="font-bold">
                    <MenuItem icon = {<CgProfile className="text-xl"/>} component={<Link to="/user/profile" />}>Profile</MenuItem>
                    <MenuItem icon = {<TbLogout className="text-black font-extrabold text-xl"/>} onClick={()=> logOutHandler()}>Logout</MenuItem>
                   </SubMenu>
                </Menu>
                </Sidebar>
                </div>

               
              </button>}

              {!isLoggedIn ? (
                <>
                  <div className="flex space-x-6 ">
                    <Link to="/login">
                      <button className="bg-purple-500 px-8 text-white w-full text-center py-2 rounded-md mt-6">
                        Login
                      </button>
                    </Link>
                    <Link>
                      <button className="bg-white px-8 border border-purple-500 text-purple-500 w-full text-center py-2 rounded-md mt-6">
                        Signup
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <button className="bg-purple-500 text-white w-full text-center py-2 rounded-md mt-auto" onClick={()=> navigate('/contact')}>
                    Contact Us
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
