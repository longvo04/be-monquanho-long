
import React from "react";
import BannerSection from "./Banner/BannerSection";
import SearchBar from "./SearchFilter/SearchBar";
// Import FilterBar from the product directory instead
import HowItWorks from "./HowItWorks/HowItWorks";
import WhyUs from "./WhyUs/WhyUs";
import CustomerReviews from "./CustomerReviews/CustomerReviews";
import CallToAction from "./CallToAction/CallToAction";



const FullHome = () => {
    return (
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col items-center">
            <BannerSection />
            <SearchBar />
            <HowItWorks />
            <WhyUs />
            <CustomerReviews />
            <CallToAction />
        </div>
    );
};

export default FullHome;
