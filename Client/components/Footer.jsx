import React from "react";
import { TbWorld } from "react-icons/tb";
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import { FaGripLinesVertical } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
    return (
        <>
            <footer className="bg-gray-900/80">
                <div className="max-w-screen-xl px-4 py-6 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                    {/* <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                        <div className="px-3 py-2">
                            <Link
                                href={"/"}
                                className="text-base leading-6 text-gray-400 hover:text-white"
                            >
                                Home
                            </Link>
                        </div>
                        <div className="px-3 py-2">
                            <Link
                                href={"/frontend/displayJobs"}
                                className="text-base leading-6 text-gray-400 hover:text-white"
                            >
                                View Jobs
                            </Link>
                        </div>

                        <div className="px-3 py-2">
                            <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={"https://www.opju.ac.in/contact-us"}
                                className="text-base leading-6 text-gray-400 hover:text-white"
                            >
                                Contact
                            </Link>
                        </div>
                        <div className=" mt-2 px-2 text-gray-500 pt-1">
                            <FaGripLinesVertical  />
                        </div>
                        <div className="px-3 py-2">
                            <Link
                                href={"/auth/login"}
                                className="text-base leading-6 text-gray-400 hover:text-white"
                            >
                                Login
                            </Link>
                        </div>
                        <div className="px-3 py-2">
                            <Link
                                href={"/auth/register"}
                                className="text-base leading-6 text-gray-400 hover:text-white"
                            >
                                Register
                            </Link>
                        </div>
                    </nav> */}
                    <div className="flex justify-center mt-2 space-x-6">
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.facebook.com/OPJURaigarh/"
                            className="text-gray-400 hover:text-white"
                        >
                            <span className="sr-only">Facebook</span>
                            <BsFacebook className="w-6 h-6" />
                        </Link>
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.instagram.com/opjindaluniversity/"
                            className="text-gray-400 hover:text-white"
                        >
                            <span className="sr-only">Instagram</span>
                            <BsInstagram className="w-6 h-6" />
                        </Link>
                        <Link
                            rel="noopener noreferrer"
                            href="https://twitter.com/OPJUniversity"
                            className="text-gray-400 hover:text-white"
                        >
                            <span className="sr-only">Twitter</span>
                            <BsTwitter className="w-6 h-6" />
                        </Link>
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/opjindaluniversity/"
                            className="text-gray-400 hover:text-white"
                        >
                            <span className="sr-only">GitHub</span>
                            <BsLinkedin className="w-6 h-6" />
                        </Link>
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.opju.ac.in/"
                            className="text-gray-400 hover:text-white"
                        >
                            <span className="sr-only">Website</span>

                            <TbWorld className="w-6 h-6" />
                        </Link>
                    </div>
                    <p className="mt-8 text-base leading-6 text-center text-gray-300">
                        © 2023 OPJU-JobPortal, Inc. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
