import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import Feature from "../components/Feature";
import Faq from "../components/Faq";
import BookConsultation from "../components/BookConsultation";

const Home = () => {
  return (
    <div className="pb-6">
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
      <BookConsultation />
      <Feature />
      <Faq />
    </div>
  );
};

export default Home;
