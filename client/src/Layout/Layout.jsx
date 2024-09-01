import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import ScrollToTop from "../components/ScrollToTop";

function Layout({ children }) {
  return (
    <div >
      <ScrollToTop />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
