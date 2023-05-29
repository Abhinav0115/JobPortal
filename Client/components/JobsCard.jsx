import React from "react";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";

export default function JobsCard({ job, posted }) {
    const router = useRouter();
    return (
        <div
            key={job._id}
            className="w-full  dark:border-2 border-gray-300 rounded-xl shadow-xl  md:w-5/12 m-4 border px-4 "
        >
            <div className="mb-4 flex  items-center justify-center py-2 ">
                <Image
                    width={70}
                    height={70}
                    className="flex rounded-full "
                    src={job?.user?.profilePic || `https://ui-avatars.com/api/?name=${job?.user?.name}`}
                    alt={`${job?.user?.name}`}
                />
                <div className="flex flex-col mx-2 px-2">
                    <h1 className="text-xl md:text-2xl font-semibold">
                        {job?.user.name}
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-gray-800">
                        {job?.company}
                    </p>
                </div>
            </div>
            <div className="mb-4 flex   items-start justify-center py-2 flex-col">
                <div className="flex  px-2 py-2 items-center justify-center ">
                    <BsDot className="text-4xl font-extrabold text-sky-900" />
                    <h1 className="text-lg text-gray-900">Salary :</h1>
                    <p className="text-base  font-semibold">
                        {job?.salary} / Year
                    </p>
                </div>
                <div className="flex px-2 py-2 items-center  justify-center">
                    <BsDot className="text-4xl font-extrabold text-sky-900" />
                    <h1 className="text-lg text-gray-900">Deadline :</h1>
                    <p className="text-base  font-semibold">
                        {new Date(`${job?.job_deadline}`).toLocaleDateString(
                            "en-GB"
                        )}
                    </p>
                </div>
            </div>
            <div className="mb-4 flex flex-col md:flex-wrap md:flex-row w-full justify-between  items-center ">
                <div className="mb-4 flex  items-start justify-center py-2 flex-col">
                    <div className="flex px-6 rounded-2xl py-1 items-center justify-center bg-orange-200 text-orange-900  ">
                        <p>{job?.title} </p>
                    </div>
                </div>
                {posted ? (
                    <button
                        onClick={() =>
                            router.push(`/frontend/detailPostedJob/${job?._id}`)
                        }
                        className="my-2 py-2 px-4  border border-orange-600   rounded flex items-center justify-center transition-all duration-700 hover:bg-sky-900 hover:text-white text-sky-900 font-semibold"
                    >
                        View Applications{" "}
                        <AiOutlineArrowRight className="mx-2 text-xl" />
                    </button>
                ) : (
                    <button
                        onClick={() =>
                            router.push(`/frontend/jobDetails/${job?._id}`)
                        }
                        className="my-2 py-2 px-4  border border-orange-600   rounded flex items-center justify-center transition-all duration-700 hover:bg-sky-900 hover:text-white text-sky-900 font-semibold"
                    >
                        View Detail{" "}
                        <AiOutlineArrowRight className="mx-2 text-xl" />
                    </button>
                )}
            </div>
        </div>
    );
}
