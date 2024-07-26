"use client";

/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Image from "next/image";
import AHackathonManager from "../artifacts/contracts/HackathonManager.sol/AHackathonManager.json";
import CHackathonManager from "../artifacts/contracts/HackathonManager.sol/CHackathonManager.json";
import { Acontract_add, Ccontract_add } from "../artifacts/config";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import HackathonCard from "@/components/HackathonCard";
import ProfileSidbar from "@/components/profileSidebar";
import { chainIdToContractMap } from "@/context/allchains";

export default function Home() {
  const [hackathons, setHackathons] = useState<
    {
      name: string;
      type: string;
      hackers: number;
      organizer: string;
      status?: string;
    }[]
  >([]);
  const [xHackToken, setXHackToken] = useState(0);
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  //@ts-ignore
  const contractDetails = chainIdToContractMap[chainId];
  console.log(contractDetails)

  useEffect(() => {
    const fetchHackathons = async () => {
      if (!walletProvider) {
        console.log("Wallet provider is not available.");
        return;
      }
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const resp = new Contract(
        contractDetails?.address,
        contractDetails?.abi,
        ethersProvider
      );
      const tx = await resp.getAllHackathons();
      setHackathons(tx);
      const balance = await resp.balanceOf(address);
      console.log(formatUnits(balance, 18));
      setXHackToken(parseFloat(formatUnits(balance, 18)));

    };

    fetchHackathons();
  }, [walletProvider, chainId]);

  return (
    <main className="">
      <Navbar balance={(xHackToken).toString()} />
      <div className="flex">
        <div className="flex flex-col w-[75%]">
          <h1 className="text-white mx-20 text-4xl font-thunder tracking-wider font-black mt-5 mb-0.5">
            ALL HACKATHONS
          </h1>
          <div className="mx-20 my-5 flex gap-6">
            <button
              className={`px-5 py-2 rounded-lg text-base my-5 bg-white text-black`}
            >
              All
            </button>
            <button
              className={`px-5 py-2 rounded-lg dm-mono-regular text-base my-5 bg-neutral-700 text-[#C3C3C3]`}
            >
              Registration
            </button>
            <button
              className={`px-5 py-2 rounded-lg dm-mono-regular text-base my-5  bg-neutral-700 text-[#C3C3C3]`}
            >
              Voting
            </button>
            <button
              className={`px-5 py-2 rounded-lg dm-mono-regular text-base my-5 bg-neutral-700 text-[#C3C3C3]`}
            >
              Results
            </button>
          </div>
          <div className="flex flex-wrap justify-start mx-20 w-full gap-x-5 items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:w-[90%] xl:grid-cols-3 gap-6 xl:gap-10 my-2">
              {hackathons.map((hackathon, index) => (
                <HackathonCard index={index} props={hackathon} />
              ))}
              {hackathons.map((hackathon, index) => (
                <HackathonCard index={index} props={hackathon} />
              ))}
            </div>
          </div>
        </div>
        <ProfileSidbar balance={xHackToken} />
      </div>
    </main>
  );
}
