import React, { useEffect, useState } from "react";
import BannerSection from "./Banner/BannerSection";
import SearchBar from "./SearchFilter/SearchBar";
import PopularProducts from "./ProductSection/PopularProducts";
import CategoryProducts from "./ProductSection/CategoryProducts";
import ProductCategories from "./ProductSection/ProductCategories";
import HowItWorks from "./HowItWorks/HowItWorks";
import WhyUs from "./WhyUs/WhyUs";
import CustomerReviews from "./CustomerReviews/CustomerReviews";
import CallToAction from "./CallToAction/CallToAction";
import { getAllCategories } from "../../../api/categoryApi"; // thêm dòng này

const FullHome = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Lấy danh mục từ DB khi mount
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getAllCategories();
            setCategories(res);

            // Chọn danh mục đầu tiên nếu có
            if (res.length > 0) {
                setSelectedCategory({ id: res[0]._id, name: res[0].name });
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col items-center">
            <BannerSection />
            <SearchBar />
            <CategoryProducts category={selectedCategory} />
            <ProductCategories categories={categories} />
            <PopularProducts />
            <HowItWorks />
            <WhyUs />
            <CustomerReviews />
            <CallToAction />
        </div>
    );
};

export default FullHome;
