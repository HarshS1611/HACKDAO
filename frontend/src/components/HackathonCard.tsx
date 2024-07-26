import React from "react";
import { FC } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { GoOrganization } from "react-icons/go";
import { PiHexagonDuotone } from "react-icons/pi";
import { BsFillHexagonFill } from "react-icons/bs";

// import Image from "next/image";

// import { useRouter } from "next/router";

// const ModelCard: FC<{ model: any }> = ({ model }) => {
const HackathonCard = ({ index, props }: any) => {
  const [status, setStatus] = useState("registration");

  useEffect(() => {
    if (index === 0) {
      setStatus("registration");
    } else if (index === 1) {
      setStatus("voting");
    } else {
      setStatus("result");
    }
  }, [index]);
  // console.log(props);

  console.log(props[0]);

  return (
    <>
      <Link
        key={props.id}
        href={
          status === "registration"
            ? `/details/${index}`
            : status === "voting"
            ? `/vote/${index}`
            : `/dashboard`
        }
        className="relative bg-[#282828] border-2 border-[#3E3E3E] w-96 h-44 rounded-lg"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-start w-full mx-5 mt-1.5 gap-x-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-5">
                <h4
                  className={`text-2xl font-thunder tracking-widest font-bold mt-2 text-white`}
                >
                  {props.name}
                </h4>
                {status === "registration" ? (
                  <span className="bg-[#E9C500] dm-mono-regular bg-opacity-40 text-xs mt-2 font-medium text-[#F0CA00] px-3 py-1 rounded-md">
                    Registration
                  </span>
                ) : status === "voting" ? (
                  <span className=" bg-[#03EF1B] dm-mono-regular bg-opacity-40 text-xs mt-2 font-medium text-[#03EF1B] px-3 py-1 rounded-md">
                    Voting
                  </span>
                ) : (
                  <span className="bg-[#297FFF26] dm-mono-regular bg-opacity-40 text-xs mt-2 font-medium text-[#297FFF] px-3 py-1 rounded-md">
                    Results
                  </span>
                )}
              </div>
              <p className="flex items-center gap-x-2 text-[#C3C3C3] text-xs my-1.5">
                by
                <GoOrganization className="bg-[#FF6624] text-white p-1 w-6 h-6 rounded-sm" />
                <span className="text-white dm-mono-regular">
                  {props.organisedby}
                </span>
              </p>
            </div>
          </div>
          <hr className="border-[#696969] my-4 mx-5" />
          {/* <p className="text-[#B2B4C6] text-sm px-5">{props.description}</p>
                <div className="flex items-center gap-x-3.5 mx-5">
                    <p className="flex gap-x-1 text-[#B2B4C6] text-xs">Voters: {props.length}</p>
                </div> */}
        </div>
        {/* <Link
                href={
                    status === "registration" ? `/details/${index}` : status === "voting" ? `/vote/${index}` : `/dashboard`
                }
                //   onClick={() => {
                //     router.push(`/models/${model._id}`);
                //   }}
                className="flex text-sm text-white bg-[#0284c7] hover:bg-blue-600 font-medium px-4 py-1.5 rounded-lg w-max m-5"
            >
                View more
            </Link> */}
        <div className="flex justify-between items-center gap-x-2 mx-5 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center relative ">
              <BsFillHexagonFill className="absolute left-0 w-5 h-6 text-[#1458DC]" />
              <BsFillHexagonFill className="absolute w-5 left-4 h-6 text-[#1458DC]" />
              <BsFillHexagonFill className="absolute w-5 h-6 left-8 text-[#1458DC]" />
            </div>
            <p className="ml-12 text-xs dm-mono-regular"> +100 Hackers</p>
          </div>
          <span
            className={`text-xs font-medium dm-mono-regular text-white bg-[#45464D] px-3 py-1 rounded-md`}
          >
            {props.category}
          </span>
          {/* <Image src="/assets/demo-icon.svg" width={15} height={15} alt="demo" /> */}
        </div>
      </Link>
    </>
  );
};

export default HackathonCard;
