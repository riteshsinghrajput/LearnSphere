

import aboutMainImage from "../assets/Images/aboutMainImage.png";
import Carouserl from "../components/Carouserl";
import Layout from "../Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="lg:pl-20 pt-10 flex flex-col text-black">
        {/* creating the about page main section */}
        <div className="flex flex-wrap-reverse items-center  mx-10">
          {/* out moto section */}
          <section className="w-full md:w-1/2 space-y-10">
            <h1 className="text-5xl text-purple-500 font-semibold">
              Affordable and Quality Education
            </h1>
            <p className="text-xl ">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their creativity, skills and knowledge to each
              other to empower and contribute in the growth and wellness of the
              mankind.
            </p>
          </section>

          {/* our moto image section */}
          <div className=" w-full md:w-1/2">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0, 0, 0))",
              }}
              className="drop-shadow-2xl "
              src={aboutMainImage}
              alt="aboutMainImage"
            />
          </div>
        </div>

        {/* top personalities quotes section */}
        <div className=" w-full carousel m-auto md:w-1/2 my-16">
        <Carouserl />
    
        </div>

      </div>
    </Layout>
  );
};

export default About;
