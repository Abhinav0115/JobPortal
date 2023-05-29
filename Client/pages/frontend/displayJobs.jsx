import NavBar from "@/components/NavBar";
import React from "react";
import { useSelector } from "react-redux";

import JobsCard from "@/components/JobsCard";
import Image from "next/image";

export default function DisplayJobs() {
    const JobData = useSelector((state) => state?.Job?.JobData) || [];
    return (
        <>
            <NavBar />
            <div className="w-full min-h-screen py-20 flex items-center md:px-8 px-2  justify-center flex-col">
                <h1 className="px-4 mx-2 py-2 mt-6 uppercase tracking-wider border-b-2 border-b-orange-600 text-3xl font-semibold">
                    Available Jobs
                </h1>
                <div className="w-full h-full py-4 flex  overflow-y-auto  items-center justify-center flex-wrap">
                    {/* map */}
                    {Array.isArray(JobData) && JobData.length > 0 ? (
                        JobData?.map((job) => {
                            return <JobsCard job={job} key={job?._id} />;
                        })
                    ) : (
                        <div>
                            <div className="my-2 h-full rounded-xl p-8 lg:flex">
                                <Image
                                    width={300}
                                    height={300}
                                    src="/empty.svg"
                                    alt="no-image-found"
                                />
                            </div>
                            <p className=" text-center text-2xl">
                                No Job Found
                            </p>
                        </div>
                    )}

                    {/* map */}
                </div>
            </div>
        </>
    );
}
