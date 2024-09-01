import {  BsInstagram, BsLinkedin ,BsGithub} from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center border-t-2  w-[100vw] min-h-[5vh] space-y-6 py-4 md:space-y-0  text-black">
      {/* adding the footer */}
      <div className=" flex  w-[60vw] md:flex-1 items-center  justify-center ">
        <div className="space-y-3 pl-5">
          <div></div>
          <div className="text-purple-500 font-extrabold text-lg ">
            Contact Us
          </div>
          <div className="space-y-3">
            <div className="flex space-x-2 items-center text-black">
              <FaLocationDot className="text-black" />
              <p>Maharshi Dayanand University, Rohtak, Haryana, 124001</p>
            </div>
            <div className="flex space-x-2 items-center text-black">
              <CiMail className="text-black" />
              <a
                href="mailto:riteshsinghrajput0786@gmail.com"
                className="hover:underline cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-300"
              >
                riteshsinghrajput0786@gmail.com
              </a>
            </div>
            <div className="flex space-x-2 items-center text-black">
              <MdCall className="text-black" />
              <p className="hover:underline cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-300">
                +91 9939450296
              </p>
            </div>
            <div className="flex items-center  gap-5 text-2xl text-black">
              <a
                className="hover:text-purple-500 transition-all ease-in-out duration-300"
                href="https://www.instagram.com/_its_rsr_/"
                target="_blank"
                rel="noreferrer"
              >
                <BsInstagram />
              </a>
              <a
                className="hover:text-purple-500 transition-all ease-in-out duration-300"
                href="https://www.linkedin.com/in/ritesh-singh-rajput/"
              >
                <BsGithub />
              </a>
              <a
                className="hover:text-purple-500 transition-all ease-in-out duration-300"
                href="https://www.linkedin.com/in/ritesh-singh-rajput/"
              >
                <BsLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex  w-[60vw] md:flex-1 items-center  md:justify-center ">
        <div className="space-y-3 flex flex-col space-x-3">
          <div className="text-lg font-extrabold text-purple-500">Company</div>
          <div className="flex flex-col space-y-2">
            <Link
              to={"/term-condtion"}
              className="text-black hover:underline cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-300"
            >
              Terms & condtions
            </Link>
            <Link
              to={"/cancel-refund"}
              className="text-black hover:underline cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-300"
            >
              Cancel & Refund Policy
            </Link>
            <Link
              to={"/Privacy"}
              className="text-black hover:underline cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
