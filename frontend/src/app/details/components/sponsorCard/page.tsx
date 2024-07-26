import React, { useEffect, useState } from "react";
import { FC } from "react";
import Link from "next/link";
import { formatUnits } from "ethers";


import { useParams } from "next/navigation";

const SponsorCard = ({ index, props }: any) => {
//    console.log(props)
    return (
        <div className="relative bg-[#1A1A1A] w-[1000px] sm:w-auto rounded-lg shadow-xl">
            {props && <div className="flex flex-col">
                <div className="flex items-center justify-start mx-5 mt-1.5 gap-x-5">
                    <div className="flex items-center justify-between w-full gap-10 flex-row">
                        <h4 className={`text-xs xl:text-lg font-medium text-white`}> {(props.name).toUpperCase()}</h4>
                        <div className="flex items-center gap-x-2 my-1.5">
                          
                            <div className={`text-xs font-medium text-white bg-[#282828] px-3 rounded-md p-2`}>
                                <div className="flex gap-x-2 items-center">
                                    {/* <Image src="/assets/demo-icon.svg" width={15} height={15} alt="demo" /> */}
                                    <p className="text-xs hidden xl:block">{(props[0]).substring(0,20)}....</p>
                                    <p className="text-xs xl:hidden">{(props[0]).substring(0,10)}....</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-[#2B2F3D] xl:mx-5" />
                <p className="text-[#B2B4C6] text-xs xl:text-sm px-5">{props.description}</p>
                <div className="flex items-center gap-x-3.5 my-5 xl:my-10 mx-5">
                    <p className="flex gap-x-1 text-white text-xs xl:text-lg">I will be giving {parseFloat(formatUnits(props.lockedAmount, 18))} ETH if we achieve {parseInt(props.threshold._hex,16)} active participants.</p>
                </div>
               
            </div>
           }
        </div>
    );
};

export default SponsorCard;