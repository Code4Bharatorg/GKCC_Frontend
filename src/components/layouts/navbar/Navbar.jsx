"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoMenu, IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileRoute, setProfileRoute] = useState("/profile");

  const router = useRouter();

   const handleManagement =() => {
     router.push('/managements');
   }

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("token");
    setIsLoggedIn(!!loggedInStatus);

    const userType = localStorage.getItem("user");
    if (userType === "member") {
      setProfileRoute("/member-profile");
    } else if (userType === "vendor") {
      setProfileRoute("/vendor-profile");
    } else {
      setProfileRoute("/profile");
    }
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleDesktopMenu = () => setIsDesktopMenuOpen((prev) => !prev);
  const toggleDropdown = (key) => {
    setDropdownState((prev) => (prev === key ? null : key)); // Toggle the same dropdown or open a new one
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="w-full h-[15%] fixed top-0 z-50 bg-white shadow-md">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center md:-mt-8 gap-2">
          <Link href="/">
            <Image
              src="/images/gkcclogo.png"
              alt="Logo"
              width={150}
              height={150}
              className="cursor-pointer"
            />
          </Link>
          <Link href="/">
            <span className="text-lg lg:text-2xl font-bold cursor-pointer">
              Global Kokani Committees&apos; Council
            </span>
          </Link>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:-mt-8 lg:flex items-center gap-6">
          <Link href="/" className="text-lg font-medium hover:text-blue-500">
            Home
          </Link>

          {/* About Us Dropdown */}
          <div className="relative">
          <button
  onClick={() => toggleDropdown("about")}
  className="text-lg font-medium hover:text-blue-500 flex items-center"
>
  About Us <IoIosArrowDown className="ml-1" />
</button>
{dropdownState === "about" && (
  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg">
    <Link
      href="/aboutus/vission"
      className="block px-4 py-2 text-sm hover:bg-blue-500 hover:text-white"
    >
      Vision/Mission
    </Link>
    <Link
      href="/aboutus/core-value"
      className="block px-4 py-2 text-sm hover:bg-blue-500 hover:text-white"
    >
      Core Values
    </Link>
    <Link
      href="/aboutus/what-we-do"
      className="block px-4 py-2 text-sm hover:bg-blue-500 hover:text-white"
    >
      What We Do
    </Link>
  </div>
)}

          </div>
          {/* register */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("register")}
              className="text-lg font-medium text-blue-500 flex items-center"
            >
              Register <IoIosArrowDown className="ml-1" />
            </button>
            {dropdownState === "register" &&(
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg">
                <Link
                        href="/association-form"
                        className="block px-4 py-2 text-black hover:bg-[#1A8FE3] hover:text-white"
                        >
                        Association Membership
                      </Link>
                      <Link
                        href="/vendor-form"
                        className="block px-4 py-2 text-black hover:bg-[#1A8FE3] hover:text-white"
                       >
                        Vendors Membership
                      </Link>
                      <Link
                        href="/membership-form"
                        className="block px-4 py-2 text-black hover:bg-[#1A8FE3] hover:texchangt-white"
                      >
                        Individual Membership
                      </Link>
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <Link
              href={profileRoute}
              className="text-lg font-medium border border-blue-500 text-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white"
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/login-form"
              className="text-lg font-medium  text-blue-500 px-1 py-1 rounded hover:bg-blue-500 hover:text-white"
            >
              Login
            </Link>
          )}

          {/* Hamburger for Other Menus */}
          <button
            onClick={toggleDesktopMenu}
            className="text-lg font-medium flex items-center hover:text-blue-500"
          >
            <IoMenu className="text-2xl" /> More
          </button>
        </div>

        {/* Mobile Navbar Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-3xl">
            {isMobileMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {/* Desktop Hamburger Menu */}
      {isDesktopMenuOpen && (
        <div className="hidden lg:block fixed top-[14vh] h-[100%] right-0 bg-white shadow-md border border-gray-200 rounded-md w-64 z-50">
          <ul className="flex flex-col gap-4 p-4">
            <div className="relative">
              
              <button
                onClick={handleManagement}
                className="text-lg font-medium hover:text-blue-500 flex items-center"
              >
                Management <IoIosArrowDown className="ml-1"
                onClick={() => toggleDropdown("management")} />
              </button>
              {dropdownState === "management" &&(
                <div className="pl-4">
                  <Link
                    href="/managements/office-bearers"
                    className="block py-2 text-sm text-center hover:bg-blue-500 hover:text-white"
                  >
                    Office Bearers
                  </Link>
                  <Link
                    href="/managements/executive-managers"
                    className="block py-2 text-sm text-center hover:bg-blue-500 hover:text-white"
                  >
                    Executive Council
                  </Link>
                  <Link
                    href="/managements/coordination-committees"
                    className="block py-2 text-sm text-center hover:bg-blue-500 hover:text-white"
                  >
                    Coordination Committees
                  </Link>
                  <Link
                    href="/managements/advisors"
                    className="block py-2 text-sm text-center hover:bg-blue-500 hover:text-white"
                  >
                    Patrons/Advisors
                  </Link>
                  <Link
                  href="/managements/#InternalCommittee"
                  className="block  py-2 text-sm  text-center hover:bg-blue-500 hover:text-white"
                >
                  Sub Committees
                </Link>
                </div>
              )}
            </div>
            <Link
              href="/member-association"
              className="text-lg font-medium hover:text-blue-500"
            >
              Member Associations
            </Link>
            <div className="relative">
              <button
                onClick={() => toggleDropdown("sponsors")}
                className="text-lg font-medium hover:text-blue-500 flex items-center"
              >
                Sponsors/Vendors <IoIosArrowDown className="ml-1" />
              </button>
              {dropdownState === "sponsors" &&  (
                <div className="pl-4">
                  <Link href="/our-sponsors" className="block py-2 text-sm text-center hover:bg-blue-500 hover:text-white">
                    Our Sponsors
                  </Link>
                  <Link href="/vendors" className="block py-2 text-sm text-center hover:bg-blue-500 hover:text-white">
                    Our Vendors
                  </Link>
                  <Link
                  href="/wellwisher"
                  className="block py-2 text-sm text-center hover:bg-blue-500 hover:text-white "
               >
                  Our Well Wishers
                </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => toggleDropdown("media")}
                className="text-lg font-medium hover:text-blue-500 flex items-center"
              >
                Media <IoIosArrowDown className="ml-1" />
              </button>
              {dropdownState === "media" && (
                <div className="pl-4">
                  <Link href="/newsletter" className="block py-2 text-sm text-center hover:bg-blue-500 hover:text-white">
                    Newsletters
                  </Link>
                  <Link href="/event-videos" className="block py-2 text-sm text-center hover:bg-blue-500 hover:text-white">
                     Videos Gallery
                  </Link>
                  <Link href="/event-photos" className="block py-2 text-sm text-center hover:bg-blue-500 hover:text-white">
                    Pictures Gallery
                  </Link>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-24 left-0 w-full bg-white shadow-md z-50 p-6">
          <ul className="space-y-4">
            <Link href="/" className="text-lg font-medium block">
              Home
            </Link>
            <div className="relative">
              <button
                onClick={() => toggleDropdown("mobileAbout")}
                className="text-lg font-medium flex  items-center"
              >
                About Us <IoIosArrowDown className="ml-1 " />
              </button>
              {dropdownState.mobileAbout && (
                <div className="pl-4 ">
                  <Link href="/aboutus/vission" className="block py-2  text-sm">
                    Vision/Mission
                  </Link>
                  <Link href="/aboutus/core-value" className="block py-2 text-sm">
                    Core Values
                  </Link>
                  <Link
                  href="/aboutus/what-we-do"
                  className="block py-2 text-sm hover:bg-blue-500 hover:text-white"
                >
                  What We Do
                </Link>
                </div>
              )}
            </div>
           
            <div className="relative">
              <button
                onClick={() => toggleDropdown("mobileManagement")}
                className="text-lg font-medium flex items-center"
              >
                Management <IoIosArrowDown className="ml-1" />
              </button>
              {dropdownState.mobileManagement && (
                <div className="pl-4">
                  <Link
                    href="/managements/office-bearers"
                    className="block py-2 text-sm"
                  >
                    Office Bearers
                  </Link>
                  <Link
                    href="/managements/executive-managers"
                    className="block py-2 text-sm"
                  >
                    Executive Council
                  </Link>
                  <Link
                    href="/managements/coordination-committees"
                    className="block py-2 text-sm  hover:bg-blue-500 hover:text-white"
                  >
                    Coordination Committees
                  </Link>
                  <Link
                    href="/managements/advisors"
                    className="block py-2 text-sm  hover:bg-blue-500 hover:text-white"
                  >
                    Patrons/Advisors
                  </Link>
                  <Link
                  href="/managements/#InternalCommittee"
                  className="block  py-2 text-sm  hover:bg-blue-500 hover:text-white"
                >
                  Sub Committees
                </Link>
                </div>
              )}
            </div>
            <Link
              href="/member-association"
              className="text-lg font-medium block"
            >
              Member Associations
            </Link>
            
            
            <div className="relative">
              <button
                onClick={() => toggleDropdown("mobileSponsors")}
                className="text-lg font-medium flex items-center"
              >
                Partners <IoIosArrowDown className="ml-1" />
              </button>
              {dropdownState.mobileSponsors && (
                <div className="pl-4">
                  <Link href="/our-sponsors" className="block py-2 text-sm">
                    Our Sponsors
                  </Link>
                  <Link href="/vendors" className="block py-2 text-sm">
                    Our Vendors
                  </Link>
                  <Link
                  href="/wellwisher"
                  className="block py-2 text-sm  hover:bg-blue-500 hover:text-white "
               >
                  Our Well Wishers
                </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => toggleDropdown("mobileMedia")}
                className="text-lg font-medium flex items-center"
              >
                Media <IoIosArrowDown className="ml-1" />
              </button>
              {dropdownState.mobileMedia && (
                <div className="pl-4">
                  <Link href="/newsletter" className="block py-2 text-sm">
                    Newsletters
                  </Link>
                  <Link href="/event-videos" className="block py-2 text-sm">
                    Videos Gallery
                  </Link>
                  <Link href="/event-photos" className="block py-2 text-sm  hover:bg-blue-500 hover:text-white">
                    Pictures Gallery
                  </Link>
                </div>
                
              )}
            </div>
            <div className="relative">
            <button
              onClick={() => toggleDropdown("mobileRegister")}
              className="text-lg font-medium text-blue-500 flex items-center"
            >
              Register <IoIosArrowDown className="ml-1" />
            </button>
            {dropdownState.mobileRegister && (
              <div className="pl-4">
                <Link
                        href="/association-form"
                        className="block px-4 py-2 text-black hover:bg-[#1A8FE3] hover:text-white"
                        >
                        Association Membership
                      </Link>
                      <Link
                        href="/vendor-form"
                        className="block px-4 py-2 text-black hover:bg-[#1A8FE3] hover:text-white"
                       >
                        Vendors Membership
                      </Link>
                      <Link
                        href="/membership-form"
                        className="block px-4 py-2 text-black hover:bg-[#1A8FE3] hover:texchangt-white"
                      >
                        Individual Membership
                      </Link>
              </div>
            )}
          </div>
            <Link
              href={isLoggedIn ? profileRoute : "/login-form"}
              className="text-lg text-blue-500 font-medium block"
            >
              {isLoggedIn ? "Profile" : "Login"}
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;



// // src/app/member-profile/page.jsx
// "use client";

// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation"; // For navigation and reload in mobile menu
// import { IoMenu, IoClose } from "react-icons/io5";
// import { IoIosArrowDown } from "react-icons/io";

// const Navbar = () => {
//   // State Management
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isManagementDropdownOpen, setIsManagementDropdownOpen] = useState(false);
//   const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
//   const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);
//   const [isSponsorsDropdownOpen, setIsSponsorsDropdownOpen] = useState(false); // New state for Sponsors/Vendors dropdown
//   const [activeTab, setActiveTab] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [profileRoute, setProfileRoute] = useState("/profile"); // State for profile route
//   const router = useRouter(); // Initialize router

//   // Toggle Functions
//   const toggleMenu = () => {
//     setIsOpen((prev) => !prev);
//     // Close all dropdowns when toggling mobile menu
//     setIsDropdownOpen(false);
//     setIsManagementDropdownOpen(false);
//     setIsAboutDropdownOpen(false);
//     setIsMediaDropdownOpen(false);
//     setIsSponsorsDropdownOpen(false); // Close Sponsors/Vendors dropdown
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//     setActiveTab(""); // Ensure the active ball is hidden when opening the dropdown
//     if (!isDropdownOpen) {
//       setIsManagementDropdownOpen(false);
//       setIsAboutDropdownOpen(false);
//       setIsMediaDropdownOpen(false);
//       setIsSponsorsDropdownOpen(false); // Close Sponsors/Vendors dropdown if another dropdown is opened
//     }
//   };

//   const toggleManagementDropdown = () => {
//     setIsManagementDropdownOpen((prev) => !prev);
//     setActiveTab("");
//     if (!isManagementDropdownOpen) {
//       setIsDropdownOpen(false);
//       setIsAboutDropdownOpen(false);
//       setIsMediaDropdownOpen(false);
//       setIsSponsorsDropdownOpen(false);
//     }
//   };

//   const toggleAboutDropdown = () => {
//     setIsAboutDropdownOpen((prev) => !prev);
//     setActiveTab("");
//     if (!isAboutDropdownOpen) {
//       setIsDropdownOpen(false);
//       setIsManagementDropdownOpen(false);
//       setIsMediaDropdownOpen(false);
//       setIsSponsorsDropdownOpen(false);
//     }
//   };

//   const toggleMediaDropdown = () => {
//     setIsMediaDropdownOpen((prev) => !prev);
//     setActiveTab("");
//     if (!isMediaDropdownOpen) {
//       setIsDropdownOpen(false);
//       setIsManagementDropdownOpen(false);
//       setIsAboutDropdownOpen(false);
//       setIsSponsorsDropdownOpen(false);
//     }
//   };

//   const toggleSponsorsDropdown = () => {
//     setIsSponsorsDropdownOpen((prev) => !prev);
//     setActiveTab("");
//     if (!isSponsorsDropdownOpen) {
//       setIsDropdownOpen(false);
//       setIsManagementDropdownOpen(false);
//       setIsAboutDropdownOpen(false);
//       setIsMediaDropdownOpen(false);
//     }
//   };

//   // Handle Tab Click
//   const handleTabClick = (tabName) => {
//     const tabsWithActiveBall = [
//       "Home",
//       "About GKCC",
//       "Management",
//       "Member Associations",
//       "Sponsors / Vendors",
//       "Our Vendors",
//       "Our Sponsors",
//       "Our Well Wisher",
//       "Media",
//       "Newsletter",
//       "Event Video",
//       "Event Photos",
//       "Register",
//       "Login",
//       "Profile",
//       "Logout",
//     ];
//     if (tabsWithActiveBall.includes(tabName)) {
//       setActiveTab(tabName);
//       localStorage.setItem("activeTab", tabName);
//     } else {
//       setActiveTab("");
//       localStorage.removeItem("activeTab");
//     }

//     // Close all dropdowns after clicking a tab
//     setIsManagementDropdownOpen(false);
//     setIsAboutDropdownOpen(false);
//     setIsMediaDropdownOpen(false);
//     setIsSponsorsDropdownOpen(false);
//   };

//   // Handle Mobile Link Click
//   const handleMobileLinkClick = (path, tabName) => {
//     handleTabClick(tabName);
//     router.push(path);
//     setIsOpen(false); // Close the mobile menu after navigation
//   };

//   // Effect to load initial state from localStorage
//   useEffect(() => {
//     const savedTab = localStorage.getItem("activeTab");
//     const tabsWithActiveBall = [
//       "Home",
//       "About GKCC",
//       "Management",
//       "Member Associations",
//       "Sponsors / Vendors",
//       "Our Vendors",
//       "Our Sponsors",
//       "Our Well Wisher",
//       "Media",
//       "Newsletter",
//       "Event Video",
//       "Event Photos",
//     ];
//     if (savedTab && tabsWithActiveBall.includes(savedTab)) {
//       setActiveTab(savedTab);
//     }
//     const loggedInStatus = localStorage.getItem("token");
//     if (loggedInStatus) {
//       setIsLoggedIn(true);
//     }

//     // Determine profile route based on user type
//     const userType = localStorage.getItem("user");
//     if (userType === "member") {
//       setProfileRoute("/member-profile");
//     } else if (userType === "vendor") {
//       setProfileRoute("/vendor-profile");
//     } else {
//       setProfileRoute("/profile");
//     }

//     // Click outside handler to close dropdowns
//     const handleClickOutside = (event) => {
//       if (
//         !event.target.closest(".nav-item") &&
//         !event.target.closest(".nav-button")
//       ) {
//         setIsDropdownOpen(false);
//         setIsManagementDropdownOpen(false);
//         setIsAboutDropdownOpen(false);
//         setIsMediaDropdownOpen(false);
//         setIsSponsorsDropdownOpen(false); // Close Sponsors/Vendors dropdown when clicking outside
//       }
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     handleTabClick("Logout");
//   };

//   return (
//     <>
//       <div className="w-full px-6 py-4 lg:px-6 lg:h-[14vh] flex justify-between items-center shadow-md fixed top-0 z-50 bg-white">
//         {/* Logo Section */}
//         <div className="flex md:-ml-6 items-center gap-2">
//           <Link href="/" onClick={() => handleTabClick("Home")}>
//             <Image
//               src="/images/gkcclogo.png"
//               alt="Logo"
//               width={160}
//               height={160}
//               className="nav-logo"
//             />
//           </Link>
//           <Link href="/" onClick={() => handleTabClick("Home")}>
//             <span className="text-sm lg:text-[1.3vw] font-bold cursor-pointer">
//               Global Kokani Committees&apos; Council
//             </span>
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="lg:hidden flex items-center ">
//           <button onClick={toggleMenu} className="text-3xl">
//             {isOpen ? <IoClose /> : <IoMenu />}
//           </button>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex flex-row gap-6 items-center">
//           {/* 1. Home */}
//           <Link
//             href="/"
//             onClick={() => handleTabClick("Home")}
//             className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
//           >
//             <h3
//               className={`font-medium text-base lg:text-[1vw] ${activeTab === "Home" ? "text-[#1A8FE3]" : ""
//                 }`}
//             >
//               Home
//             </h3>
//             {activeTab === "Home" && (
//               <div className="w-2 h-2 lg:w-[.5vw] lg:h-[.5vw] bg-[#1A8FE3] rounded-full absolute top-10 lg:top-8"></div>
//             )}
//           </Link>

//           {/* 2. About GKCC Dropdown */}
//           <div className="relative">
//             <div
//               onClick={toggleAboutDropdown}
//               className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
//             >
//               <h3 className="font-medium text-base lg:text-[1vw]">
//                 About GKCC <IoIosArrowDown className="inline ml-1" />
//               </h3>
//             </div>
//             {isAboutDropdownOpen && (
//               <div className="absolute top-[150%] left-0 mt-2 w-64 bg-white border border-black rounded-lg shadow-lg z-50 overflow-hidden">
//                 <Link
//                   href="/aboutus/vission"
//                   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                   onClick={() => handleTabClick("About GKCC")}
//                 >
//                   Vision/Mission
//                 </Link>
//                 <Link
//                   href="/aboutus/core-value"
//                   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                   onClick={() => handleTabClick("About GKCC")}
//                 >
//                   Core Values
//                 </Link>
//                 <Link
//                   href="/aboutus/what-we-do"
//                   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                   onClick={() => handleTabClick("About GKCC")}
//                 >
//                   What we do
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* 3. Management Dropdown */}
//           <div className="relative">
//             <div
//               onClick={toggleManagementDropdown}
//               className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
//             >
//               <h3 className="font-medium text-base lg:text-[1vw]">
//                 <Link href="/managements">Management</Link> <IoIosArrowDown className="inline ml-1" />
//               </h3>
//             </div>
//             {isManagementDropdownOpen && (
//               <div className="absolute top-[150%] left-0 mt-2 w-64 bg-white border border-black rounded-lg shadow-lg z-50 overflow-hidden">
//                 <Link
//                   href="/managements/#OfficeBearers"
//                   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                   onClick={() => handleTabClick("Management")}
//                 >
//                   Office Bearers
//                 </Link>
//                 <Link
//                   href="/managements/#ExecutiveManagers"
//                   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                   onClick={() => handleTabClick("Management")}
//                 >
//                   Executive Council
//                 </Link>
//                 <Link
//                   href="/managements/#CoordinationCommittees"
//                   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                   onClick={() => handleTabClick("Management")}
//                 >
//                   Coordination Council
//                 </Link>
//                 <Link
//                   href="/managements/#Advisors"
//                   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                   onClick={() => handleTabClick("Management")}
//                 >
//                   Patrons/Advisors
//                 </Link>
                // <Link
                //   href="/managements/#InternalCommittee"
                //   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                //   onClick={() => handleTabClick("Management")}
                // >
                //   Sub Committees
                // </Link>
//               </div>
//             )}
//           </div>

//           {/* 4. Member Associations */}
//           <Link
//             href="/member-association"
//             onClick={() => handleTabClick("Member Associations")}
//             className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
//           >
//             <h3
//               className={`font-medium text-base lg:text-[1vw] ${activeTab === "Member Associations" ? "text-[#1A8FE3]" : ""
//                 }`}
//             >
//               Member Associations
//             </h3>
//             {activeTab === "Member Associations" && (
//               <div className="w-2 h-2 lg:w-[.5vw] lg:h-[.5vw] bg-[#1A8FE3] rounded-full absolute top-10 lg:top-8"></div>
//             )}
//           </Link>

//           {/* 5. Sponsors / Vendors Dropdown */}
//           <div className="relative">
//             <div
//               onClick={toggleSponsorsDropdown}
//               className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
//             >
//               <h3 className="font-medium text-base lg:text-[1vw]">
//                 Partners <IoIosArrowDown className="inline ml-1" />
//               </h3>
//             </div>
//             {isSponsorsDropdownOpen && (
//               <div className="absolute top-[150%] left-0 mt-2 w-64 bg-white border border-black rounded-lg shadow-lg z-50 overflow-hidden">
//                 <Link
//                   href="/our-sponsors"
//                   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                   onClick={() => handleTabClick("Our Sponsors")}
//                 >
//                   Our Sponsors
//                 </Link>
//                 <Link
//                   href="/vendors"
//                   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                   onClick={() => handleTabClick("Our Vendors")}
//                 >
//                   Our Vendors
//                 </Link>
                
                // <Link
                //   href="/wellwisher"
                //   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                //   onClick={() => handleTabClick("Our Well Wisher")}
                // >
                //   Our Well Wishers
                // </Link>
//               </div>
//             )}
//           </div>

//           {/* 6. Media Dropdown */}
//           <div className="relative">
//             <div
//               onClick={toggleMediaDropdown}
//               className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
//             >
//               <h3 className="font-medium text-base lg:text-[1vw]">
//                 Media <IoIosArrowDown className="inline ml-1" />
//               </h3>
//             </div>
//             {isMediaDropdownOpen && (
//               <div className="absolute top-[150%] left-0 mt-2 w-64 bg-white border border-black rounded-lg shadow-lg z-50 overflow-hidden">
//                 <Link
//                   href="/newsletter"
//                   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                   onClick={() => handleTabClick("Newsletter")}
//                 >
//                   NewsLetters
//                 </Link>
//                 <Link
//                   href="/event-videos"
//                   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                   onClick={() => handleTabClick("Event Video")}
//                 >
//                   Event Videos
//                 </Link>
//                 <Link
//                   href="/event-photos"
//                   className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                   onClick={() => handleTabClick("Event Photos")}
//                 >
//                   Pictures Gallery
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* 7. Register */}
//           <div className="flex relative">
//             {isLoggedIn ? (
//               <>
//                 <Link
//                   href={profileRoute}
//                   className="px-5 py-1 lg:px-10 lg:py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-full hover:bg-[#1A8FE3] hover:text-white text-base lg:text-[1vw] nav-button"
//                   onClick={() => handleTabClick("Profile")}
//                 >
//                   Profile
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="px-5 py-1 lg:px-10 lg:py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-full hover:bg-[#1A8FE3] hover:text-white text-base lg:text-[1vw] nav-button"
//                 >
//                   Log out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div
//                   className="px-3 py-1 lg:px-2 lg:py-2  text-blue-500 rounded-full  text-base lg:text-[1vw] nav-button cursor-pointer relative"
//                   onClick={toggleDropdown}
//                 >
//                   Register <IoIosArrowDown className="inline ml-1" />
//                   {isDropdownOpen && (
//                     <div className="absolute top-[110%] right-2 mt-2 w-64 border border-black bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                      // <Link
                      //   href="/association-form"
                      //   className="block px-4 py-2 text-black hover:bg-[#1A8FE3] hover:text-white"
                      //   onClick={() => handleTabClick("Register")}
                      // >
                      //   Association Membership
                      // </Link>
                      // <Link
                      //   href="/vendor-form"
                      //   className="block px-4 py-2 text-black hover:bg-[#1A8FE3] hover:text-white"
                      //   onClick={() => handleTabClick("Register")}
                      // >
                      //   Vendors Membership
                      // </Link>
                      // <Link
                      //   href="/membership-form"
                      //   className="block px-4 py-2 text-black hover:bg-[#1A8FE3] hover:texchangt-white"
                      //   onClick={() => handleTabClick("Register")}
                      // >
                      //   Individual Membership
                      // </Link>
                      
//                     </div>
//                   )}
//                 </div>
//                 <Link
//                   href="/login-form"
//                   className="px-3 py-1 lg:px-4 lg:py-2 text-blue-500 rounded-full  text-base lg:text-[1vw] nav-button"
//                   onClick={() => handleTabClick("Login")}
//                 >
//                   Log in
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="lg:hidden flex flex-col items-start bg-white gap-5 top-0 left-0 px-10 fixed inset-0 z-50 overflow-y-auto">
//             {/* Menu Text and Close Button */}
//             <div className="flex justify-between items-center w-full py-4">
//               {/* Menu Text */}
//               <div className="text-lg font-bold">Menu</div>

//               {/* Close Button */}
//               <button onClick={toggleMenu} className="text-3xl">
//                 <IoClose />
//               </button>
//             </div>

//             {/* Mobile Menu Links */}
//             {/* 1. Home */}
//             <Link
//               href="/"
//               onClick={() => handleMobileLinkClick("/", "Home")}
//               className="nav-item"
//             >
//               <h3 className="font-medium text-lg">Home</h3>
//             </Link>

//             {/* 2. About GKCC Dropdown */}
//             <div className="relative w-full">
//               <div
//                 onClick={toggleAboutDropdown}
//                 className="nav-item flex flex-col relative cursor-pointer"
//               >
//                 <h3 className="font-medium text-lg">
//                   About GKCC <IoIosArrowDown className="inline ml-1" />
//                 </h3>
//               </div>
//               {isAboutDropdownOpen && (
//                 <div className="absolute top-[50%] left-0 mt-2 w-full bg-white border border-black rounded-lg shadow-lg z-50 overflow-hidden">
//                   <Link
//                     href="/aboutus/vission"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() => handleMobileLinkClick("/aboutus/vission", "About GKCC")}
//                   >
//                     Vision/Mission
//                   </Link>
//                   <Link
//                     href="/aboutus/core-value"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() => handleMobileLinkClick("/aboutus/core-value", "About GKCC")}
//                   >
//                     Core Values
//                   </Link>
//                   <Link
//                     href="/aboutus/what-we-do"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() => handleMobileLinkClick("/aboutus/what-we-do", "About GKCC")}
//                   >
//                     What we do
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* 3. Management Dropdown */}
//             <div className="relative w-full">
//               <div
//                 onClick={toggleManagementDropdown}
//                 className="nav-item flex flex-col relative cursor-pointer"
//               >
//                 <h3 className="font-medium text-lg">
//                   Management <IoIosArrowDown className="inline ml-1" />
//                 </h3>
//               </div>
//               {isManagementDropdownOpen && (
//                 <div className="absolute top-[50%] left-0 mt-2 w-full bg-white border border-black rounded-lg shadow-lg z-50 overflow-hidden">
//                   <Link
//                     href="/managements/office-bearers"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() =>
//                       handleMobileLinkClick("/managements/office-bearers", "Management")
//                     }
//                   >
//                     Office Bearers
//                   </Link>
//                   <Link
//                     href="/managements/executive-managers"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() =>
//                       handleMobileLinkClick("/managements/executive-managers", "Management")
//                     }
//                   >
//                     Executive Council
//                   </Link>
//                   <Link
//                     href="/managements/coordination-committees"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() =>
//                       handleMobileLinkClick("/managements/coordination-committees", "Management")
//                     }
//                   >
//                     Coordination Council
//                   </Link>
//                   <Link
//                     href="/managements/advisors"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() =>
//                       handleMobileLinkClick("/managements/advisors", "Management")
//                     }
//                   >
//                     Patrons/Advisors
//                   </Link>
//                   <Link
//                     href="/managements/internal-committee"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() =>
//                       handleMobileLinkClick("/managements/internal-committee", "Management")
//                     }
//                   >
//                     Sub Committees
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* 4. Member Associations */}
//             <Link
//               href="/member-association"
//               onClick={() => handleMobileLinkClick("/member-association", "Member Associations")}
//               className="nav-item"
//             >
//               <h3 className="font-medium text-lg">Member Associations</h3>
//             </Link>

//             {/* 5. Sponsors / Vendors Dropdown */}
//             <div className="relative w-full">
//               <div
//                 onClick={toggleSponsorsDropdown}
//                 className="nav-item flex flex-col relative cursor-pointer"
//               >
//                 <h3 className="font-medium text-lg">
//                   Partners <IoIosArrowDown className="inline ml-1" />
//                 </h3>
//               </div>
//               {isSponsorsDropdownOpen && (
//                 <div className="absolute top-[50%] left-0 mt-2 w-full bg-white border border-black rounded-lg shadow-lg z-50 overflow-hidden">
//                    <Link
//                     href="/our-sponsors"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() => handleMobileLinkClick("/sponsore", "Our Sponsors")}
//                   >
//                     Our Sponsors
//                   </Link>
//                   <Link
//                     href="/vendors"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() => handleMobileLinkClick("/vendors", "Our Vendors")}
//                   >
//                     Our Vendors
//                   </Link>
                 
//                   <Link
//                     href="/wellwisher"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() => handleMobileLinkClick("/wellwisher", "Our Well Wisher")}
//                   >
//                     Our Well Wishers
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* 6. Media Dropdown */}
//             <div className="relative w-full">
//               <div
//                 onClick={toggleMediaDropdown}
//                 className="nav-item flex flex-col relative cursor-pointer"
//               >
//                 <h3 className="font-medium text-lg">
//                   Media <IoIosArrowDown className="inline ml-1" />
//                 </h3>
//               </div>
//               {isMediaDropdownOpen && (
//                 <div className="absolute top-[50%] left-0 mt-2 w-full bg-white border border-black rounded-lg shadow-lg z-50 overflow-hidden">
//                   <Link
//                     href="/newsletter"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() => handleMobileLinkClick("/newsletter", "Newsletter")}
//                   >
//                     NewsLetters
//                   </Link>
//                   <Link
//                     href="/event-videos"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() => handleMobileLinkClick("/eventvi", "Event Video")}
//                   >
//                     Event Videos
//                   </Link>
//                   <Link
//                     href="/event-photos"
//                     className="block px-4 py-2 text-black hover:bg-black hover:text-white"
//                     onClick={() => handleMobileLinkClick("/eventph", "Event Photos")}
//                   >
//                     Pictures Gallery
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* 7. Register and 8. Login */}
//             <div className="flex flex-col gap-5 w-full">
//               {isLoggedIn ? (
//                 <>
//                   <Link
//                     href={profileRoute}
//                     className="block w-full text-center px-4 py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-lg hover:bg-[#1A8FE3] hover:text-white text-base"
//                     onClick={() =>
//                       handleMobileLinkClick(profileRoute, "Profile")
//                     }
//                   >
//                     Profile
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-center px-4 py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-lg hover:bg-[#1A8FE3] hover:text-white text-base"
//                   >
//                     Log out
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     href="/association-form"
//                     className="block w-full text-center px-4 py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-lg hover:bg-[#1A8FE3] hover:text-white text-base"
//                     onClick={() =>
//                       handleMobileLinkClick("/association-form", "Register")
//                     }
//                   >
//                     Association Membership
//                   </Link>
//                   <Link
//                     href="/vendor-form"
//                     className="block w-full text-center px-4 py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-lg hover:bg-[#1A8FE3] hover:text-white text-base"
//                     onClick={() =>
//                       handleMobileLinkClick("/vendor-form", "Register")
//                     }
//                   >
//                     Vendors Membership
//                   </Link>
//                   <Link
//                     href="/membership-form"
//                     className="block w-full text-center px-4 py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-lg hover:bg-[#1A8FE3] hover:text-white text-base"
//                     onClick={() =>
//                       handleMobileLinkClick("/membership-form", "Register")
//                     }
//                   >
//                     Individual Membership
//                   </Link>
                  
//                   <Link
//                     href="/login-form"
//                     className="block w-full text-center px-4 py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-lg hover:bg-[#1A8FE3] hover:text-white text-base"
//                     onClick={() =>
//                       handleMobileLinkClick("/login-form", "Login")
//                     }
//                   >
//                     Log in
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Navbar;

