"use client";

// components/Card.js
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AHackathonManager from "../artifacts/contracts/HackathonManager.sol/AHackathonManager.json";
import CHackathonManager from "../artifacts/contracts/HackathonManager.sol/CHackathonManager.json";
import { Acontract_add, Ccontract_add } from "../artifacts/config";
import { ethers } from "ethers";
import { FaArrowLeft } from "react-icons/fa";

const GoBackbtn = () => {
    // useEffect(() => {
    //     const fetchAccountBalance = async () => {
    //         const web3Modal = new Web3Modal();
    //         const connection = await web3Modal.connect();
    //         const web3 = new Web3(connection);
    //         const accounts = await web3.eth.getAccounts();
    //         const account = accounts[0]; // Assuming you want the first account

    //         const provider = new ethers.providers.Web3Provider(connection);
    //         const resp = new ethers.Contract(contract_add, HackathonManager.abi, provider);

    //         const balance = await resp.balanceOf(account);
    //         console.log(balance)
    //         console.log(parseInt(balance._hex, 16) / 1000000000000000000);
    //         setBal(balance._hex);
    //     };
    //     fetchAccountBalance();
    // }, []);
    return (
        <Link href="/">
            <div className="flex items-center justify-between text-white w-full text-lg  py-2 rounded-xl mt-5">
                <div className="flex items-center gap-2">
                    <div className="inline-block  text-white">
                        <FaArrowLeft />
                    </div>
                    <div>Go Back</div>
                </div>

            </div>
        </Link>
    );
};

export default GoBackbtn;