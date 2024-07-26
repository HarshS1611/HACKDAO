"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    useWeb3ModalProvider,
    useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import GoBackbtn from "../../components/GoBack";
import Navbar from "@/components/navbar";
import { createNotaryAttestation } from "../../utils/ethSign"

export default function Profile() {

    const initialData = {
        name: "",
        mobileNo: "",
        identityProof: "",
    };

    const { address } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const [xHackToken, setXHackToken] = useState(0);
    const [profileData, setProfileData] = useState(initialData)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Attesting");
        await createNotaryAttestation(profileData, address)
        console.log("User Attested")
    }

    return (
        <>
            <Navbar balance={(xHackToken).toString()} />
            <div className="flex dm-mono-regular">
                <div className="flex flex-col gap-5 w-[30%] ml-10 xl:ml-20">
                    <GoBackbtn />
                    <div className="flex flex-col gap-2 mb-5 h-max rounded-xl">
                        <div className="flex flex-col md:flex-row my-2">
                            {/* <h3 className="text-lg font-semibold md:ml-2">Name:</h3> */}

                            <p className="text-4xl font-bold md:ml-2 mt-1">Apply for Premium</p>
                        </div>
                        <div className="flex flex-col md:flex-row my-2">
                            {/* <h3 className="text-lg font-semibold md:ml-2">Description:</h3> */}

                            <p className="text-md md:ml-2 mt-1"> Unlock the Premium Membership for unparalleled credibility and advantages on our DAO. Verified status sets you apart, offering an edge over others with enhanced visibility, exclusive features, and priority support. Elevate your profile, stand out, and maximize your impact with Premium Membership today!</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 items-center rounded-lg bg-[#4C76FD] bg-opacity-15 p-2 px-4 md:flex-row mx-2 my-2">
                                Exclusive Features
                            </div>
                            <div className="flex flex-col gap-2 items-center rounded-lg bg-[#4C76FD] bg-opacity-15 p-2 px-4 md:flex-row mx-2 my-2">
                                Priority Support
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-center w-max rounded-lg bg-[#4C76FD] bg-opacity-15 p-2 px-4 md:flex-row mx-2 my-2">
                            Enhanced Profile
                        </div>
                        {/* <div className="flex flex-col md:flex-row my-2">
                            <h3 className="text-lg font-semibold md:ml-2">Min level:</h3>

                            <p className="text-sm md:ml-2 mt-1">{hackDetails.category}</p>
                        </div> */}
                    </div>

                </div>
                <div className="bg-[#282828] mt-20 w-[60%] mx-10 xl:mx-20 rounded-lg">
                    <div className="m-4 ">
                        <form className="bg-transparent shadow-md rounded px-8 pt-3 pb-8 w-full" onSubmit={handleSubmit}>
                            <label className="block text-white text-sm font-semibold mb-1">Name *</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full text-white
                                       block h-10 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-2 mb-2 mr-10 text-sm w-full focus:outline-none
                                        transition transform duration-100 ease-out"
                                required
                                value={profileData.name}
                                onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                            />
                            <label className="block text-white text-sm font-semibold">Mobile No *</label>
                            <textarea
                                value={profileData.mobileNo}
                                onChange={e =>
                                    setProfileData({
                                        ...profileData,
                                        mobileNo: e.target.value,
                                    })
                                }
                                id="description"
                                className="
                                            shadow appearance-none border rounded w-full text-white
                                            block h-fit bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-2 mt-3 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out resize-none 
                            "
                                required
                            />
                            <label className="block text-white text-sm font-semibold mb-1">Identity Proof (Adhaar/ PAN No)*</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full text-white
                                       block h-10 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-2 mb-2 mr-10 text-sm w-full focus:outline-none
                                        transition transform duration-100 ease-out"
                                value={profileData.identityProof}
                                onChange={e => setProfileData({ ...profileData, identityProof: e.target.value })}
                                required
                                min={0}
                                max={100}
                            />
                            <button
                                className="block w-full px-5 py-2 mt-5 bg-white text-black hover:text-white rounded-lg shadow hover:bg-[#4C76FD]"
                                type="submit"
                            >
                                <h5 className=" text-md tracking-tight">Apply</h5>
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};