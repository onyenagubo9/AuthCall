import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sign from "@/components/Sign";


import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      <Loader /> {/* 👈 FULL SCREEN LOADER */}
      <Navbar />
       
       <Sign/>

      
    </>
  );
}
