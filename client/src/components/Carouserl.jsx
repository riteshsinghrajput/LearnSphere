import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import apj from "../assets/Images/QuotesPersonalityImage/apj.png";
import billGates from "../assets/Images/QuotesPersonalityImage/billGates.png";
import einstein from "../assets/Images/QuotesPersonalityImage/einstein.png";
import nelsonMandela from "../assets/Images/QuotesPersonalityImage/nelsonMandela.png";
import steveJobs from "../assets/Images/QuotesPersonalityImage/steveJobs.png";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Carouserl() {
  return (
    <Carousel responsive={responsive}>
      
      <div id="slide1" className="carousel-item relative w-full">
        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
          {/* for personality image */}
          <img
            className="w-40 rounded-full border-2 border-gray-400"
            src={nelsonMandela}
            alt="Nelson Mandela"
          />
          {/* for writting the quotes */}
          <p className="text-xl ">
            "Education is the most powerful tool you can use to change the
            world."
          </p>
          {/* for personality name */}
          <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
        </div>
      </div>

      <div id="slide2" className="carousel-item relative w-full">
        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
          {/* for personality image */}
          <img
            className="w-40 rounded-full border-2 border-gray-400"
            src={apj}
            alt="APJ Abdul Kalam"
          />
          {/* for writting the quotes */}
          <p className="text-xl ">
            "Learning gives creativity, creativity leads to thinking, thinking
            provides knowledge, knowledge makes you great."
          </p>
          {/* for personality name */}
          <h3 className="text-2xl font-semibold">A. P. J. Abdul Kalam</h3>
        </div>
      </div>

      <div id="slide3" className="carousel-item relative w-full">
        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
          {/* for personality image */}
          <img
            className="w-40 rounded-full border-2 border-gray-400"
            src={einstein}
            alt="einstein"
          />
          {/* for writting the quotes */}
          <p className="text-xl ">
            "Education is not the learning of facts, but the training of the
            mind to think."
          </p>
          {/* for personality name */}
          <h3 className="text-2xl font-semibold">Albert Einstein</h3>
        </div>
      </div>

      <div id="slide4" className="carousel-item relative w-full">
        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
          {/* for personality image */}
          <img
            className="w-40 rounded-full border-2 border-gray-400"
            src={steveJobs}
            alt="Steve Jobs"
          />
          {/* for writting the quotes */}
          <p className="text-xl">
            "Innovation distinguishes between a leader and a follower."
          </p>
          {/* for personality name */}
          <h3 className="text-2xl font-semibold">Steve Jobs</h3>
        </div>
      </div>

      <div id="slide5" className="carousel-item relative w-full">
        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
          {/* for personality image */}
          <img
            className="w-40 rounded-full border-2 border-gray-400"
            src={billGates}
            alt="Bill Gates"
          />
          {/* for writting the quotes */}
          <p className="text-xl">
            "Technology is just a tool. In terms of getting the kids working
            together and motivating them, the teacher is the most important."
          </p>
          {/* for personality name */}
          <h3 className="text-2xl font-semibold">Bill Gates</h3>
        </div>
      </div>
    </Carousel>
  );
}

export default Carouserl;
