import React from "react";
import { FC } from "react";
import Link from "next/link";

const ReferralCard: FC = () => {
  return (
    <div className="relative bg-[#282828] w-max xl:w-full h-max rounded-lg shadow-xl mt-10 py-5">
      <div className="flex flex-col">
        <div className="flex items-center justify-start mx-5 gap-x-5">
          <div className="flex flex-col">
            <h4 className={`text-base font-medium mt-2 text-[#B2B4C6]`}>Refer to your friends to get incentives</h4>
          </div>
        </div>
        <hr className="border-[#2B2F3D] xl:mx-5" />
        <div className="bg-[#1E1E1E] p-2 rounded-md mt-3 mx-5">
          <p className="text-[#B2B4C6] text-xs xl:text-sm px-5">https://www.abc.com/invite/1234567890</p>
        </div>
      </div>
      {/* <Link
        href={`/details/1`}
        //   onClick={() => {
        //     router.push(`/models/${model._id}`);
        //   }}
        className="flex text-sm text-white bg-[#0284c7] hover:bg-blue-600 font-medium px-4 py-1.5 rounded-lg w-max m-5"
      >
        View more
      </Link> */}
    </div>
  );
};

export default ReferralCard;