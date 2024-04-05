import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const RootLayout = ({ children }) => {
  return (
    <>
      <Header/>
      <div className="bg-chocobrown text-white min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
