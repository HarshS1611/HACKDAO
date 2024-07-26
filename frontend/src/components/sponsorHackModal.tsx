"use client";

import { FC } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AHackathonManager from "../artifacts/contracts/HackathonManager.sol/AHackathonManager.json";
import CHackathonManager from "../artifacts/contracts/HackathonManager.sol/CHackathonManager.json";
import { Acontract_add, Ccontract_add } from "../artifacts/config";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits, parseEther } from "ethers";
import { chainIdToContractMap } from "@/context/allchains";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SponsorHackModal: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const initialData = {
    hackId: "",
    name: "",
    threshold: "",
    price: "",
  };

  const [sponsorData, setSponsorData] = useState(initialData);
  const { id } = useParams();
  console.log(id);
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  //@ts-ignore
  const contractDetails = chainIdToContractMap[chainId];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(sponsorData);
    if (!walletProvider) {
      console.log("Wallet provider is not available.");
      return;
    }
    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    const resp = new Contract( contractDetails?.address,
      contractDetails?.abi, signer);
    const tx = await resp.sponsorHackathon(
      id,
      sponsorData.name,
      sponsorData.threshold,
      {
        value: parseEther(sponsorData.price),
      }
    );
    await tx.wait();



    // Example of using ethers.js to interact with the smart contract
    // console.log("Project created!", resp);
  };

  if (!isOpen) return null;
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-filter backdrop-blur-sm ">
      <div className="relative my-6 mx-auto">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-[600px] w-[600px] bg-[#282828] outline-none focus:outline-none ">
          <div className="flex items-start justify-between pt-5 px-5">
            <h3 className="text-4xl px-5 font-semibold font-thunder text-white">
              SPONSOR THIS HACKATHON
            </h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={onClose}
            >
              <span className="text-black opacity-7 h-8 w-8 text-xl block bg-gray-400 py-0 rounded-full">
                x
              </span>
            </button>
          </div>
          <div className="relative p-3 flex-auto">
            <form
              className="bg-transparent rounded px-8 pt-3 pb-8 w-full"
              onSubmit={handleSubmit}
            >
              <label className="block text-white text-sm font-semibold mb-1">
                Sponsor Name *
              </label>
              <input
                type="text"
                className="w-full h-14 block bg-[#1A1A1A] placeholder:text-[#838383] text-white rounded-md px-2 py-5 mt-2 mb-2 mr-10 text-sm focus:outline-none transition transform duration-100 ease-out"
                required
                value={sponsorData.name}
                placeholder="Enter your name here"
                onChange={(e) =>
                  setSponsorData({ ...sponsorData, name: e.target.value })
                }
              />
              <label className="block text-white my-5 text-sm font-semibold">
                Threshold for participants *
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={sponsorData.threshold}
                onChange={(e) =>
                  setSponsorData({ ...sponsorData, threshold: e.target.value })
                }
                className="w-full custom-progress-bar h-14 block bg-[#1A1A1A] placeholder:text-[#838383] text-white rounded-md px-2 py-5 mt-2 mb-2 mr-10 text-sm focus:outline-none transition transform duration-100 ease-out"
                required
              />
              <div className="flex items-center p-3.5 rounded-md bg-[#4C76FD] bg-opacity-10 text-xs text-[#4C76FD]">
                If threshold value is not met, your tokens would not be invested
              </div>
              <label className="block mt-5 mb-3 text-white text-sm font-semibold">
                Amount*
              </label>
              <div className="flex items-center h-14 bg-[#1A1A1A] rounded-md justify-between">
                <div className="bg-[#282828] rounded-md text-white mx-2 p-3">
                  ETH
                </div>
                <input
                  type="text"
                  className="w-full bg-[#1A1A1A] h-14 placeholder:text-[#838383] text-white rounded-md px-2 py-5 mt-2 mb-2 mr-10 text-sm focus:outline-none transition transform duration-100 ease-out"
                  value={sponsorData.price}
                  onChange={(e) =>
                    setSponsorData({ ...sponsorData, price: e.target.value })
                  }
                  placeholder="Enter the price here"
                  required
                  min={0}
                  max={100}
                />
              </div>
              <button
                className="text-black w-full mt-10 bg-white font-medium uppercase text-base px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="submit"
                // onClick={handleAddTask}
              >
                SUBMIT DETAILS
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default SponsorHackModal;
