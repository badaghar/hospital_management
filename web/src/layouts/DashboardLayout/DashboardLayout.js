import { Link, routes } from "@redwoodjs/router"
import { useState } from "react";
import { useAuth } from "src/auth"
import { MdLocalPharmacy, MdPayments } from "react-icons/md";
import { TbReportMedical } from "react-icons/tb";
import { FaBed } from "react-icons/fa";
import { BsPersonFillAdd, BsFillArrowRightCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";
// import { FaPersonCirclePlus } from "react-icons/fi";
import { Toaster } from "@redwoodjs/web/toast";

const DashboardLayout = ({ children }) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
  const [dropDownOpen, setDropDownOpen] = useState('')
  const [prevtext, setPrevText] = useState('')
  const isAdmin = currentUser?.roles == 'admin'
  // console.log(currentUser.permissions)


  const toggleDropDown = (text) => {
    if (prevtext == text) {
      setDropDownOpen('')
      setPrevText('')
      return
    }
    setDropDownOpen(text)
    setPrevText(text)



  }



  return (
    <>
      <div x-data="setup()"
      //  :class="{'dark': isDark }"
      >

        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-700 text-white">
          {/* Header */}
          <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
            <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-gray-800 border-none">
              <img className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-full overflow-hidden" src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg" />
              <span className="hidden md:block"> {currentUser.email} </span>
              {/* <span className="hidden md:block"> {'hello'} </span> */}
            </div>
            <div className="flex justify-end items-center h-14 bg-gray-800 w-full">

              <ul className="flex items-center">

                <li>
                  <div className="block w-px h-6 mx-3 bg-gray-700" />
                </li>
                <li>
                  <button className="flex items-center mr-4 hover:text-blue-100" onClick={logOut}>
                    <span className="inline-flex mr-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </span>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* ./Header */}
          {/* Sidebar */}
          <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
            <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li>
                  <Link to={routes.home()} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate"


                    >Dashboard</span>
                  </Link>
                </li>

                {(currentUser.permissions?.pharmacy?.length > 0 || isAdmin) &&
                  <>
                    <li className="px-5 hidden md:block">
                      <div className="flex flex-row items-center h-8">
                        <div className="text-sm font-light tracking-wide text-gray-400 uppercase">Pharmacy</div>
                      </div>
                    </li>





                    <li className="relative">
                      <button
                        className="flex flex-row w-full items-center h-11 focus:outline-none  hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                        onClick={toggleDropDown.bind(this, 'pharmacy')}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <MdLocalPharmacy />

                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Pharmacy</span>
                        <span className="hidden md:block px-2 py-0.5 ml-auto  font-medium tracking-wide text-xl rounded-full">
                          {
                            dropDownOpen == 'pharmacy' ? <BsFillArrowDownCircleFill /> : <BsFillArrowRightCircleFill />

                          }
                        </span>

                      </button>


                      {dropDownOpen == 'pharmacy' && (
                        <ul className="relative left-0 z-10 py-2 mt-2 bg-gray-800 rounded-md shadow-lg">

                          {
                            (currentUser.permissions?.pharmacy?.includes('Distributers') || isAdmin) &&

                            <li>
                              <Link
                                to={routes.distributers()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Distributers</span>
                                <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
                                  New
                                </span>
                              </Link>
                            </li>

                          }


                          {
                            (currentUser.permissions?.pharmacy?.includes('Manufacturers') || isAdmin) &&

                            <li>
                              <Link
                                to={routes.manufacturers()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Manufacturers</span>
                                <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
                                  New
                                </span>
                              </Link>
                            </li>
                          }



                          {
                            (currentUser.permissions?.pharmacy?.includes('Compositions') || isAdmin) &&
                            <li>
                              <Link
                                to={routes.compositions()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Composition</span>
                                <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
                                  New
                                </span>
                              </Link>
                            </li>
                          }



                          {
                            (currentUser.permissions?.pharmacy?.includes('Products') || isAdmin) &&
                            <li>
                              <Link
                                to={routes.products()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Product</span>
                                <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
                                  New
                                </span>
                              </Link>
                            </li>
                          }


                          {
                            (currentUser.permissions?.pharmacy?.includes('PurchaseMedicines') || isAdmin) &&
                            <li>
                              <Link
                                to={routes.purchaseMedicines()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Purchase Medicine</span>
                                <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
                                  New
                                </span>
                              </Link>
                            </li>
                          }

                          {
                            (currentUser.permissions?.pharmacy?.includes('SaleMedicines') || isAdmin) &&
                            <li>
                              <Link
                                to={routes.saleMedicines()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Sale Medicine</span>
                                <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
                                  New
                                </span>
                              </Link>
                            </li>
                          }

                          {
                            (currentUser.permissions?.pharmacy?.includes('Return Medicines') || isAdmin) &&

                            <li>
                              <Link
                                to={routes.returnMedicines()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Return Medicine</span>
                                <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
                                  New
                                </span>
                              </Link>
                            </li>
                          }

                          {
                            (currentUser.permissions?.pharmacy?.includes('Medicines') || isAdmin) &&

                            <li>
                              <Link
                                to={routes.medicines()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Medicines</span>
                                <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
                                  New
                                </span>
                              </Link>
                            </li>
                          }


                        </ul>
                      )}
                    </li>
                  </>
                }


                {

                  (currentUser.permissions?.pharma || isAdmin) &&
                  <>

                    {/* <li className="relative">
                      <button
                        className="flex flex-row w-full items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                        onClick={toggleDropDown.bind(this, 'pharmacyPayment')}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <MdPayments />

                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Pharmacy Payment</span>

                      </button>
                      {dropDownOpen == 'pharmacyPayment' && (
                        <ul className="relative left-0 z-10 py-2 mt-2 bg-gray-800 rounded-md shadow-lg">

                          {
                            <li>
                              <Link
                                to={routes.medicinePayment()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Pay Bills</span>

                              </Link>
                            </li>}
                        </ul>
                      )}
                    </li> */}
                    <li onClick={toggleDropDown.bind(this, 'pharmacyPayment')}>
                      <Link to={routes.ipds({ type: 'IPD' })} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                          <MdPayments />
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Pharmacy Payment</span>

                      </Link>
                    </li>
                  </>
                }





                {(currentUser.permissions?.pharmacyReport?.length > 0 || isAdmin) &&

                  <>

                    <li className="relative">
                      <button
                        className="flex flex-row w-full items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                        onClick={toggleDropDown.bind(this, 'pharmacyReport')}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <TbReportMedical />

                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Pharmacy Report</span>
                        <span className="hidden md:block px-2 py-0.5 ml-auto  font-medium tracking-wide text-xl rounded-full">
                          {
                            dropDownOpen == 'pharmacyReport' ? <BsFillArrowDownCircleFill /> : <BsFillArrowRightCircleFill />

                          }
                        </span>

                      </button>
                      {dropDownOpen == 'pharmacyReport' && (
                        <ul className="relative left-0 z-10 py-2 mt-2 bg-gray-800 rounded-md shadow-lg">

                          {
                            (currentUser.permissions?.pharmacyReport?.includes('Distributers Reports') || isAdmin) &&
                            <li>
                              <Link
                                to={routes.pharmacyReport({ id: 1 })}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Distributers Reports</span>

                              </Link>
                            </li>

                          }

                          {
                            (currentUser.permissions?.pharmacyReport?.includes('Manufacturer Report') || isAdmin) &&
                            <li>
                              <Link
                                to={routes.pharmacyReport({ id: 12 })}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Manufacturer Reports</span>

                              </Link>
                            </li>
                          }

                          {
                            (currentUser.permissions?.pharmacyReport?.includes('PurchaseMedicines Report') || isAdmin) &&

                            <li>
                              <Link
                                to={routes.pharmacyReport({ id: 2 })}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Purchase Reports</span>

                              </Link>
                            </li>

                          }

                          {
                            (currentUser.permissions?.pharmacyReport?.includes('SaleMedicines Report') || isAdmin) &&


                            <li>
                              <Link
                                to={routes.pharmacyReport({ id: 3 })}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Sale Reports</span>

                              </Link>
                            </li>
                          }

                          {
                            (currentUser.permissions?.pharmacyReport?.includes('Return Medicines Report') || isAdmin) &&
                            <li>
                              <Link
                                to={routes.pharmacyReport({ id: 11 })}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Return Medicine Reports</span>

                              </Link>
                            </li>
                          }

                          {
                            (currentUser.permissions?.pharmacyReport?.includes('Payment Report') || isAdmin) &&
                            <li>
                              <Link
                                to={routes.pharmacyReport({ id: 4 })}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Payment Reports</span>

                              </Link>
                            </li>
                          }
                          {
                            (currentUser.permissions?.pharmacyReport?.includes('Near To Expiry Medicine Report') || isAdmin) &&

                            <li>
                              <Link
                                to={routes.pharmacyReport({ id: 13 })}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Near To Expiry Medicines</span>

                              </Link>
                            </li>
                          }
                          {
                            (isAdmin) &&

                            <li>
                              <Link
                                to={routes.returnExpiryMedicines()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Return Expiry Medicines</span>

                              </Link>
                            </li>
                          }




                        </ul>
                      )}
                    </li>


                  </>



                }




                <li>
                  <Link to={routes.patients()} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Patients</span>
                    <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">New</span>
                  </Link>
                </li>



                {/* {(currentUser.permissions?.charges?.length > 0 || isAdmin) && */}
                <>
                  <li className="px-5 hidden md:block">
                    <div className="flex flex-row items-center h-8">
                      <div className="text-sm font-light tracking-wide text-gray-400 uppercase">Hospital</div>
                    </div>
                  </li>

                  {(currentUser.permissions?.charges?.length > 0 || isAdmin) &&
                    <li className="relative">
                      <button
                        className="flex flex-row w-full items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                        onClick={toggleDropDown.bind(this, 'charges')}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <MdPayments />

                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Charges</span>
                        <span className="hidden md:block px-2 py-0.5 ml-auto  font-medium tracking-wide text-xl rounded-full">
                          {
                            dropDownOpen == 'charges' ? <BsFillArrowDownCircleFill /> : <BsFillArrowRightCircleFill />

                          }
                        </span>

                      </button>
                      {dropDownOpen == 'charges' && (
                        <ul className="relative left-0 z-10 py-2 mt-2 bg-gray-800 rounded-md shadow-lg">


                          {
                            (currentUser.permissions?.charges?.includes('DoctorFees') || isAdmin) &&

                            <li>
                              <Link
                                to={routes.doctorFees()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Add Doctor Fee</span>

                              </Link>
                            </li>
                          }


                          {
                            (currentUser.permissions?.charges?.includes('Chargeses') || isAdmin) &&


                            <li>
                              <Link
                                to={routes.chargeses()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Add Other Charges</span>

                              </Link>
                            </li>
                          }

                          {
                            (currentUser.permissions?.charges?.includes('LabChargeses') || isAdmin) &&

                            <li>
                              <Link
                                to={routes.labChargeses()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Add Lab Charges</span>

                              </Link>
                            </li>
                          }

                          {
                            (currentUser.permissions?.charges?.includes('operations') || isAdmin) &&

                            <li>
                              <Link
                                to={routes.operations()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Add Operations Name</span>

                              </Link>
                            </li>
                          }
                        </ul>
                      )}
                    </li>}


                  {
                    (currentUser.permissions?.patientType?.includes('IPD') || isAdmin) &&

                    <>
                      {/* <li className="relative">
                        <button
                          className="flex flex-row w-full items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                          onClick={toggleDropDown.bind(this, 'ipd')}
                        >
                          <span className="inline-flex justify-center items-center ml-4">
                            <FaBed />

                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">IPD - Patient</span>

                        </button>
                        {dropDownOpen == 'ipd' && (
                          <ul className="relative left-0 z-10 py-2 mt-2 bg-gray-800 rounded-md shadow-lg">
                            <li>
                              <Link
                                to={routes.ipds({ type: 'IPD' })}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Patients</span>

                              </Link>
                            </li>
                          </ul>
                        )}
                      </li> */}


                      <li onClick={toggleDropDown.bind(this, 'ipd')}>
                        <Link to={routes.ipds({ type: 'IPD' })} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6">
                          <span className="inline-flex justify-center items-center ml-4">
                            <FaBed />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">IPD - Patient</span>

                        </Link>
                      </li>
                    </>

                  }


                  {
                    (currentUser.permissions?.patientType?.includes('OPD') || isAdmin) &&

                    <>

                      {/* <li className="relative">
                        <button
                          className="flex flex-row w-full items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                          onClick={toggleDropDown.bind(this, 'opd')}
                        >
                          <span className="inline-flex justify-center items-center ml-4">
                            <BsPersonFillAdd />

                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">OPD - Patients</span>

                        </button>
                        {dropDownOpen == 'opd' && (
                          <ul className="relative left-0 z-10 py-2 mt-2 bg-gray-800 rounded-md shadow-lg">
                            <li>
                              <Link
                                to={routes.ipds({ type: 'OPD' })}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Patients</span>

                              </Link>
                            </li>
                          </ul>
                        )}
                      </li> */}

                      <li onClick={toggleDropDown.bind(this, 'opd')}>
                        <Link to={routes.ipds({ type: 'OPD' })} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6">
                          <span className="inline-flex justify-center items-center ml-4">
                            <BsPersonFillAdd />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">OPD - Patient</span>

                        </Link>
                      </li>
                    </>
                  }



                  {(currentUser.permissions?.bed?.length > 0 || isAdmin) &&
                    <li className="relative">
                      <button
                        className="flex flex-row w-full items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                        onClick={toggleDropDown.bind(this, 'bed')}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <FaBed />

                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">BED</span>
                        <span className="hidden md:block px-2 py-0.5 ml-auto  font-medium tracking-wide text-xl rounded-full">
                          {
                            dropDownOpen == 'bed' ? <BsFillArrowDownCircleFill /> : <BsFillArrowRightCircleFill />

                          }
                        </span>

                      </button>
                      {dropDownOpen == 'bed' && (
                        <ul className="relative left-0 z-10 py-2 mt-2 bg-gray-800 rounded-md shadow-lg">


                          {
                            (currentUser.permissions?.bed?.includes('floors') || isAdmin) &&
                            <li>
                              <Link
                                to={routes.floors()}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Add Floors</span>

                              </Link>
                            </li>
                          }


                          {
                            (currentUser.permissions?.bed?.includes('beds') || isAdmin) &&

                            <>
                              <li>
                                <Link
                                  to={routes.beds()}
                                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                                >
                                  <span className="inline-flex justify-center items-center ml-4">
                                    <svg
                                      className="w-5 h-5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                      />
                                    </svg>
                                  </span>
                                  <span className="ml-2 text-sm tracking-wide truncate">Add Beds</span>

                                </Link>
                              </li>
                              <li>
                                <Link
                                  to={routes.viewBed()}
                                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                                >
                                  <span className="inline-flex justify-center items-center ml-4">
                                    <svg
                                      className="w-5 h-5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                      />
                                    </svg>
                                  </span>
                                  <span className="ml-2 text-sm tracking-wide truncate">View Beds</span>

                                </Link>
                              </li>
                            </>
                          }
                        </ul>
                      )}
                    </li>
                  }
                  {/* <li className="relative">
                      <button
                        className="flex flex-row w-full items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                        onClick={toggleDropDown.bind(this, 'user')}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <MdPayments />

                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Users</span>

                      </button>
                      {dropDownOpen == 'user' && (
                        <ul className="relative left-0 z-10 py-2 mt-2 bg-gray-800 rounded-md shadow-lg">
                          <li>
                            <Link
                              to={routes.signup()}
                              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                            >
                              <span className="inline-flex justify-center items-center ml-4">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                  />
                                </svg>
                              </span>
                              <span className="ml-2 text-sm tracking-wide truncate">Add Users</span>

                            </Link>
                          </li>
                        </ul>
                      )}
                    </li> */}



                </>


                {(currentUser.permissions?.hospitalReport?.length > 0 || isAdmin) &&


                  <>
                    <li className="relative">
                      <button
                        className="flex flex-row w-full items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                        onClick={toggleDropDown.bind(this, 'hospitalReport')}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <TbReportMedical />

                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Hospital Report</span>
                        <span className="hidden md:block px-2 py-0.5 ml-auto  font-medium tracking-wide text-xl rounded-full">
                          {
                            dropDownOpen == 'hospitalReport' ? <BsFillArrowDownCircleFill /> : <BsFillArrowRightCircleFill />

                          }
                        </span>

                      </button>
                      {dropDownOpen == 'hospitalReport' && (
                        <ul className="relative left-0 z-10 py-2 mt-2 bg-gray-800 rounded-md shadow-lg">
                          {
                            (currentUser.permissions?.hospitalReport?.includes('IPD Reports') || isAdmin) &&

                            <li>
                              <Link
                                to={routes.pharmacyReport({ id: 5 })}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">IPD Report</span>

                              </Link>
                            </li>
                          }
                          {
                            (currentUser.permissions?.hospitalReport?.includes('OPD Report') || isAdmin) &&
                            <li>
                              <Link
                                to={routes.pharmacyReport({ id: 6 })}
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
                              >
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">OPD Report</span>

                              </Link>
                            </li>
                          }




                        </ul>
                      )}
                    </li>

                  </>
                }







                {
                  hasRole('admin') &&



                  <>

                    <li>
                      <Link to={routes.users()} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Users</span>

                      </Link>
                    </li>
                    <li className="px-5 hidden md:block">
                      <div className="flex flex-row items-center mt-5 h-8">
                        <div className="text-sm font-light tracking-wide text-gray-400 uppercase">Settings</div>
                      </div>
                    </li>

                    <li>
                      <Link to={routes.userRoles()} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Roles</span>
                      </Link>
                    </li>

                    {/* <li>
                  <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Settings</span>
                  </a>
                </li> */}
                  </>}
              </ul>
              <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2023</p>
            </div>
          </div>
          {/* ./Sidebar */}
          <div className="h-full ml-14 mt-14 mb-10 md:ml-64">

            {children}

          </div>
        </div>
      </div >
    </>
  )
}

export default DashboardLayout
