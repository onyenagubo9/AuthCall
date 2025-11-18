import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Login from "@/components/Login";


import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      <Loader /> {/* 👈 FULL SCREEN LOADER */}
      <Navbar />
       
       <Login/>

      
    </>
  );
}
