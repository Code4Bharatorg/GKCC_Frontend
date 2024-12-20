import Footer from "@/components/layouts/footer/Footer";
import InternalCommittee from "@/components/managementPages/Internal-Committee";
import React from "react";

const page = () => {
  return (
    <div className="w-screen mt-12 md:mt-0 h-screen overflow-x-hidden">
      <InternalCommittee />

      <div className="mt-[150%] md:mt-[10%] lg:mt-[0%]">
        <Footer />
      </div>
    </div>
  );
};

export default page;
