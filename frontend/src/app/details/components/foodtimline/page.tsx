"use strict";
"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa6";



const FoodTimeline = ({ hackers }: any) => {
  const [glowClasses1, setGlowClasses1] = useState(false);
  const [glowClasses2, setGlowClasses2] = useState(false);

  const [glowClasses3, setGlowClasses3] = useState(false);

  const [foodVotes, setFoodVotes] = useState(0);

  const progressPercentage = (hackers / 10) * 100;

  useEffect(() => {
    try {
      fetch("/api/getvotes")
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setFoodVotes(data.foodVotes);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleAddVote = async () => {
    //call backend api to add vote
    try {
      const response = await fetch("/api/addvote", {
        method: "POST",
        body: JSON.stringify({ type: "food" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Vote added successfully");
        alert("Vote added successfully");
        //reload the page to update the votes
        window.location.reload();
      } else {
        console.error("Failed to add vote");
      }
    } catch (err) {
      console.error("Failed to add vote");
    }
  };

  useEffect(() => {
    // Apply the glow class based on the number of hackers
    if (hackers >= 20) {
      setGlowClasses3(true);
      setGlowClasses2(false);
      setGlowClasses1(false);
    } else if (hackers >= 4) {
      setGlowClasses3(false);
      setGlowClasses2(true);
      setGlowClasses1(false);
    } else if (hackers >= 1) {
      setGlowClasses3(false);
      setGlowClasses2(false);
      setGlowClasses1(true);
    }
  }, [hackers]);

  return (
    <div className=" w-full rounded-lg bg-[#1A1A1A] px-10 py-5">
      <div className="flex gap-4 text-white text-xl mb-5 -ml-5">Food
        <div className="flex items-center px-2 rounded-md bg-[#4C76FD] bg-opacity-10 text-xs text-[#4C76FD]">The more the number of registered hackers, the more you are entitled to better caterer </div></div>
      <ol className="relative border-s-[0.4px] border-gray-200  border-dashed">
        <li className="flex items-center mb-5 ms-6 w-full">
          <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -start-5">
            <div className={glowClasses3 ? `bg-white bg-opacity-40 w-20 rounded-full p-1` : `bg-[#3E3E3E] bg-opacity-20 w-20 rounded-full p-1`}>
              <div className={glowClasses3 ? `bg-white bg-opacity-45 rounded-full p-1` : `g-[#3E3E3E] bg-opacity-30 rounded-full p-1`}>
                <div
                  className={
                    glowClasses3
                      ? `bg-white text-center text-sm text-white font-medium rounded-full py-1 p-[0.8px] w-5 h-5 ml-[2px]`
                      : `bg-[#3E3E3E] text-center text-sm text-white font-medium rounded-full py-1 p-[0.8px] w-5 h-5 ml-[2px]`
                  }
                >
                  3
                </div>
              </div>
            </div>
          </span>
          <div
            className={
              glowClasses3
                ? "ml-4 p-4 py-5 w-full rounded-lg border-gray-700 border-[0.5px] shadow-sm bg-[#282828]  text-white "
                : "text-white ml-4 p-4  rounded-lg shadow-sm bg-[#111115] text-opacity-25"
            }
          >
            <div className="flex gap-2 items-center w-full justify-between">
              <div>                <FaStar className={glowClasses3 ? "text-[#FBC741] h-5 w-5" : "bg-[#111115] h-5 w-5"} />

              </div>
              <div className="w-full">Best Caterer - Up to 1000 Hackers</div>

            </div>

          </div>
        </li>
        <li className="mb-5 ms-6 w-full">
          <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -start-5">
            <div className={glowClasses2 ? `bg-white bg-opacity-40 w-20 rounded-full p-1` : `bg-[#3E3E3E] bg-opacity-20 w-20 rounded-full p-1`}>
              <div className={glowClasses2 ? `bg-white bg-opacity-45 rounded-full p-1` : `bg-[#3E3E3E] bg-opacity-30 rounded-full p-1`}>
                <div
                  className={
                    glowClasses2
                      ? `bg-white text-center text-sm text-white font-medium rounded-full py-1 p-[0.8px] w-5 h-5 ml-[2px]`
                      : `bg-[#3E3E3E] text-[#3E3E3E] text-center text-sm  font-medium rounded-full py-1 p-[0.8px] w-5 h-5 ml-[2px]`
                  }
                >
                  2
                </div>
              </div>
            </div>
          </span>
          <div
            className={
              glowClasses2
                ? "ml-4 p-3 py-5 w-full rounded-lg  bg-[#282828]  text-white "
                : "text-white ml-4 p-4 py-5 rounded-lg bg-[#111115] text-opacity-25"
            }
          >
            <div className="flex gap-2 items-center w-full justify-between">
              <div>                <FaStar className={glowClasses2 ? "text-[#FBC741] h-5 w-5" : "bg-[#111115] h-5 w-5"} />

              </div>
              <div className="w-full">Good Caterer - Up to 500 Hackers</div>

            </div>

          </div>
        </li>
        <li className="ms-6 w-full">
          <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -start-5">
            <div className={glowClasses1 ? `bg-white bg-opacity-40 w-20 rounded-full p-1` : `bg-[#3E3E3E] bg-opacity-20 w-20 rounded-full p-1`}>
              <div className={glowClasses1 ? `bg-white bg-opacity-45 rounded-full p-1` : `bg-[#3E3E3E] bg-opacity-30 rounded-full p-1`}>
                <div
                  className={
                    glowClasses1
                      ? `bg-white text-center text-sm text-white font-medium rounded-full py-1 p-[0.8px] w-5 h-5 ml-[2px]`
                      : `bg-[#3E3E3E] text-[#3E3E3E] text-center text-sm  font-medium rounded-full py-1 p-[0.8px] w-5 h-5 ml-[2px]`
                  }
                >
                  1
                </div>
              </div>
            </div>
          </span>
          <div
            className={
              glowClasses1
                ? "ml-4 p-4 py-5 w-full rounded-lg shadow-sm bg-[#282828]  text-white "
                : "text-white ml-4 p-4 py-5  rounded-lg shadow-sm bg-[#111115] text-opacity-25"
            }
          >
            <div className="flex gap-2 items-center w-full justify-between">
              <div>                <FaStar className={glowClasses1 ? "text-[#FBC741] h-5 w-5" : "bg-[#111115] h-5 w-5"} />

              </div>
              <div className="w-full">Average Caterer - Up to 200 Hackers</div>

            </div>

          </div>
        </li>
      </ol>

    </div>
  );
};

export default FoodTimeline;