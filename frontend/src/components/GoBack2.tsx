"use client";

// components/Card.js
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const GoBackbtn = () => {

  return (
    <Link href="/">
      <div className="flex items-center justify-between text-white w-full text-lg mx-3 px-5 py-2 rounded-xl mt-5">
        <div className="flex items-center gap-2">
          <div className="inline-block mr-2 text-white">
            <FaArrowLeft />
          </div>
          <div>Go Back</div>
        </div>
      </div>
    </Link>
  );
};

export default GoBackbtn;
