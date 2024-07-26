"use client";
import { BiSolidEditAlt } from "react-icons/bi";
import Image from "next/image";
import { IoTicketSharp } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { AiFillTrophy } from "react-icons/ai";
import { SiSecurityscorecard } from "react-icons/si";
import {
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { queryAttestations } from "../utils/ethSign";
import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function ProfileSidbar({ balance }: { balance: number }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { address } = useWeb3ModalAccount();
  async function getPremiumBool() {
    const resp = await queryAttestations(address)
    if (resp.success)
      setPremium(true);
  }

  const [premium, setPremium] = useState(false);

  useEffect(() => {
    getPremiumBool();
  })
  return (
    <div className="bg-[#282828] min-h-screen w-[25%]">
      <div className="flex items-center mx-10 my-5 justify-end text-white">
        <div
          onClick={() => setEditModalOpen(!editModalOpen)}
          className="bg-white cursor-pointer text-black dm-mono-regular flex gap-2 p-4 rounded-md items-center"
        >
          <BiSolidEditAlt className="h-6 w-6" /> EDIT PROFILE
        </div>
        <div></div>
      </div>
      <div className="flex items-center mx-10 my-10 gap-10 justify-between text-white">
        <div className="text-4xl font-thunder font-bold capitalize tracking-wider">
          <p>HELLO,</p>
          <p>HARSH</p>
          <div className="text-2xl font-thunder font-bold capitalize tracking-wider text-amber-300">

            {premium && "Premium"}
          </div>
        </div>
        <div>
        {premium && <Image src="/premium.png" alt="Profile" width={200} height={150} />}
          {!premium && <Image src="/profile.png" alt="Profile" width={200} height={150} />}
                  </div>
      </div>
      <div className="mx-10 flex flex-col gap-5">
        <div className="flex flex-col gap-5 bg-[#1E1E1E] rounded-md py-5 px-5">
          <div className="text-sm dm-mono-regular">
            Hackathons Stacked in :{" "}
          </div>
          <p className="flex justify-end gap-4 font-thunder items-center text-5xl">
            <IoTicketSharp className="h-10 w-10 text-[#1B52D2]" />
            43{" "}
          </p>
        </div>
        <div className="flex flex-col xl:flex-row gap-5 justify-between">
          <div className="flex flex-col gap-5 dm-mono-regular bg-[#1E1E1E] rounded-md py-5 px-5 w-full">
            <div className="text-sm">Hackathons Attended : </div>
            <p className="flex justify-end gap-4 font-thunder items-center text-5xl">
              <FaMapLocationDot className="h-10 w-10 text-[#1ECB59]" />
              83{" "}
            </p>
          </div>

          <div className="flex flex-col gap-5 bg-[#1E1E1E] rounded-md py-5 px-5 w-full">
            <div className="text-sm dm-mono-regular">Achievements : </div>
            <p className="flex justify-end gap-4 font-thunder items-center text-5xl">
              <AiFillTrophy className="h-10 w-10 text-[#F6AE42]" />
              27{" "}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 bg-[#1E1E1E] rounded-md py-5 px-5">
          <div className="text-sm dm-mono-regular">Reputation Score : </div>
          <p className="flex justify-end gap-4 items-center font-thunder text-5xl">
            <SiSecurityscorecard className="h-10 w-10 text-[#B948FF]" />
            2034{" "}
          </p>
        </div>
      </div>
      {editModalOpen && (
        <EditProfileModal
          modalOpen={editModalOpen}
          setModalOpen={setEditModalOpen}
        />
      )}
    </div>
  );
}
