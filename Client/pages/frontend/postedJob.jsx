/* eslint-disable react-hooks/exhaustive-deps */
import { get_my_posted_job } from "@/Services/job";
import { setMyJobs } from "@/Utils/JobSlice";
import JobsCard from "@/components/JobsCard";
import NavBar from "@/components/NavBar";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function PostedJobs() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.User?.userData);
    const myJobs = useSelector((state) => state?.Job?.myJobs);
    const id = user?._id;

    useEffect(() => {
        if (!id || !Cookies.get("token")) {
            router.push("/auth/login");
        }
    }, [user, id, Cookies]);

    const { data, error, isLoading } = useSWR("/getMyPostedJobs", () =>
        get_my_posted_job(id)
    );

    useEffect(() => {
        if (data) dispatch(setMyJobs(data?.data));
    }, [data, dispatch]);

    if (error) toast.error(error);

    return (
        <>
            {isLoading ? (
                <div className="bg-gray w-full h-screen flex items-center flex-col justify-center">
                    <InfinitySpin width="200" color="#4f46e5" />
                    <p className="text-xs uppercase">
                        Loading Resources Hold Tight...
                    </p>
                </div>
            ) : (
                <>
                    <NavBar />
                    <div className="w-full pt-20 min-h-screen flex items-center justify-center flex-col">
                        <h1 className="px-4 mx-2 py-2 mt-5 uppercase tracking-wider border-b-2 border-b-orange-600 text-3xl font-semibold relative top-0">
                            Posted Jobs
                        </h1>
                        <div className="w-full h-full px-4 py-4 flex  overflow-y-auto  items-start justify-center flex-wrap">
                            {myJobs?.length > 0 ? (
                                myJobs?.map((job, index) => (
                                    <JobsCard
                                        key={index}
                                        job={job}
                                        posted={true}
                                    />
                                ))
                            ) : (
                                <div>
                                    <div className="my-2 h-full rounded-xl p-8 lg:flex">
                                        <Image
                                            width={300}
                                            height={300}
                                            src="/blank.svg"
                                            alt="no-image-found"
                                        />
                                    </div>
                                    <p className=" text-center text-2xl">
                                        No Job Posted
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
