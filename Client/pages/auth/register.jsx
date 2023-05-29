import React, { useState, useEffect } from "react";
import Link from "next/link";
import Select from 'react-select'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register_me } from "@/Services/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import NavBar from "@/components/NavBar";
import { UploadFile } from "@/Services/fileUpload";

export default function Register() {
    const router = useRouter();

    const [file, setFile] = useState(null);


    useEffect(() => {
        if (Cookies.get("token")) {
            router.push("/");
        }
    }, [router]);

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState({ email: "", password: "", name: "", profilePic:"",role:"" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            setError({ ...error, email: "Email Field is Required" });
            return;
        }
        if (!formData.password) {
            setError({ ...error, password: "Password Field is required" });
            return;
        }
        if (!formData.name) {
            setError({ ...error, name: "Name Field is required" });
            return;
        }
        if (!formData.role) {
            setError({ ...error, role: "Role Field is required" });
            return;
        }

        if (!file) {
            setError({ ...error, profilePic: "Please upload profile image" });
            return;
        }

        // Check if the file type is image
        if (file.type !== "image/png" && file.type !=="image/jpg" && file.type !== "image/jpeg") {
            setError({ ...error, profilePic: "Please Upload an image file" });
            return;
        }

        await UploadFile(file,'resume').then(res => {setFormData({
            ...formData,
            profilePic:res })})

        const data = await register_me(formData);
        if (data?.success) {
            toast.success(data?.message);
            router.push("/auth/login");
        } else {
            toast.error(data?.message);
        }
    };

    const options = [
        { value: 'STUDENT', label: 'Student' },
        { value: 'EMPLOYER', label: 'Employer' },
        { value: 'ADMIN', label: 'Admin' }
    ]

    return (
        <>
            <NavBar />
            <div className="w-full h-screen">
                <div className="flex flex-col text-center mt-8 items-center justify-center px-6 mx-auto h-screen lg:py-0 shadow-xl">
                    <div className="w-full bg-white rounded-2xl shadow-lg dark:border-2 text-black md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Register your account
                            </h1>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4 md:space-y-6"
                                action="#"
                            >
                                <div className="text-left">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        type="text"
                                        name="name"
                                        id="namw"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
                                        placeholder="Name"
                                        required=""
                                    />
                                    {error.name && (
                                        <p className="text-sm text-red-500">
                                            {error.name}
                                        </p>
                                    )}
                                </div>
                                <div className="text-left">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Your email
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
                                        placeholder="name@company.com"
                                        required=""
                                    />
                                    {error.email && (
                                        <p className="text-sm text-red-500">
                                            {error.email}
                                        </p>
                                    )}
                                </div>
                                <div className="text-left">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Password
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
                                        required=""
                                    />
                                    {error.password && (
                                        <p className="text-sm text-red-500">
                                            {error.password}
                                        </p>
                                    )}
                                </div>
                                <div className="text-left">
                        <label
                            htmlFor="file"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Upload Profile Image :
                        </label>
                        <input
                            accept="image/png, image/jpeg"
                            name="profilePic"
                            onChange={(e) => setFile(e.target.files[0])}
                            type="file"
                            id="file"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
                        />
                        {error.profilePic && (
                            <p className="text-sm text-red-500">{error.profilePic}</p>
                        )}
                    </div>
                    <div className="text-left">
                    <Select onChange={(e) => setFormData({ ...formData, role: e.value })} placeholder="Please Select your Role" options={options} />
                    </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-sky-900 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                >
                                    Sign Up
                                </button>
                                <p className="text-sm font-light text-gray-500 ">
                                    Already have an account{" "}
                                    <Link
                                        href="/auth/login"
                                        className="font-medium text-sky-900 hover:underline "
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                <ToastContainer />
            </div>
        </>
    );
}
