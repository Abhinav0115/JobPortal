import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import Image from "next/image";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import JobsCard from "./JobsCard";

export default function Intro() {
    const [search, setSearch] = useState("");
    const jobData = useSelector((state) => state.Job.JobData);
    const [filterJobs, setFilteredJobs] = useState([]);
    const [doneSearch, setDoneSearch] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredJobs = jobData?.filter((job) => {
            let x = job?.job_category;
            return x?.toUpperCase() === search?.toUpperCase().trim();
        });
        setFilteredJobs(filteredJobs);
        setDoneSearch(true);
    };

    return (
        <>
            <div className=" grid md:grid-cols-2 sm:grid-cols-1 items-center">
                <div>
                    <div className=" w-full sm:p-2 h-full my-2 flex items-center justify-center px-4 md:items-start md:justify-start md:p-20 md:pb-0 md:pt-0 flex-col ">
                        <h1
                            className="text-6xl sm:text-6xl font-extrabold mb-4 text-sky-900"
                        >
                            OPJU{" "}
                            <p
                                className=" text-amber-600"
                            >
                                Job Portal
                            </p>{" "}
                        </h1>
                        <p className="md:text-lg sm:text-sm text-xs mb-20 text-gray-400">
                            University of Steel Technology and Management!
                        </p>
                    </div>
                    <div className=" mx-10">
                        <div className="bg-white flex-col mb-2 md:px-4 border bottom-2 border-gray-400 rounded-xl py-2 flex sm:flex-row items-center justify-center">
                            <BiSearchAlt className="text-4xl text-sky-900 mr-1 sm:flex" />
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                value={search}
                                placeholder="Search Jobs with Job categories like marketing ..."
                                className="xs:w-full w-3/4 h-full px-2 text-base py-3 outline-none"
                            />
                            <button
                                onClick={handleSearch}
                                onkey
                                className="px-3 py-2 my-2 sm:my-0 border border-sky-900 rounded uppercase tracking-widest mr-1   text-white bg-sky-900 transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-sky-900"
                            >
                                Search
                            </button>
                        </div>
                        <div className=" px-2 pl-0 py-2 flex items-center justify-start flex-wrap">
                            <div className="flex items-center justify-center">
                                <BsFillBookmarkFill className="text-sky-900 text-xl mx-2" />
                                <h1 className="font-semibold text-lg">
                                    Suggest Tag :{" "}
                                </h1>
                            </div>
                            <div className="flex   items-center justify-center px-4 flex-wrap">
                                <p
                                    className="px-2  text-gray-600 cursor-pointer"
                                    onClick={() => setSearch("Software")}
                                >
                                    Software
                                </p>
                                <p
                                    className="px-2  text-gray-600 cursor-pointer"
                                    onClick={() => setSearch("Marketing")}
                                >
                                    Marketing
                                </p>
                                <p
                                    className="px-2  text-gray-600 cursor-pointer"
                                    onClick={() => setSearch("Human Resource")}
                                >
                                    Human Resource
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-2 h-full rounded-xl p-8 lg:flex">
                    <Image
                        width={600}
                        height={700}
                        src="/intro.svg"
                        alt="no-image-found"
                    />
                </div>
            </div>
            {/* ------------------------------------------------------------------ */}

            {/* ------------------------------------------------------------------ */}
            {doneSearch && (
                <div className="w-full flex flex-wrap items-center justify-center py-2 px-2 mb-10">
                    {Array.isArray(filterJobs) && filterJobs.length > 0 ? (
                        filterJobs?.map((job) => {
                            return <JobsCard job={job} key={job?._id} />;
                        })
                    ) : (
                        <p className="text-sm text-center font-semibold  text-red-500">
                            Sorry No such Categories Job Available Right Now
                        </p>
                    )}
                </div>
            )}
        </>
    );
}
