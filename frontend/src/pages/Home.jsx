import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import Feature from "../components/Feature";
import Faq from "../components/Faq";
import BookConsultation from "../components/BookConsultation";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="pb-6">
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Testimonials />
      <Banner />
      <BookConsultation />
      <Feature />
      <Faq />
    </div>
  );
};

export default Home;
