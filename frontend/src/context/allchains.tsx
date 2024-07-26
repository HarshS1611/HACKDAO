import AHackathonManager from "../artifacts/contracts/HackathonManager.sol/AHackathonManager.json"
import CHackathonManager from "../artifacts/contracts/HackathonManager.sol/CHackathonManager.json"
import MHackathonManager from "../artifacts/contracts/HackathonManager.sol/MHackathonManager.json"
import GHackathonManager from "../artifacts/contracts/HackathonManager.sol/GHackathonManager.json"
import FHackathonManager from "../artifacts/contracts/HackathonManager.sol/FHackathonManager.json"
import AvHackathonManager from "../artifacts/contracts/HackathonManager.sol/AvHackathonManager.json"

import { Acontract_add, Ccontract_add, Mcontract_add, Gcontract_add, Fcontract_add, Avcontract_add } from "../artifacts/config";

export const chainIdToContractMap = {
    421614: {
        abi: AHackathonManager.abi,
        address: Acontract_add,
    },
    1115: {
        abi: CHackathonManager.abi, // Assuming you have a different ABI for this chain
        address: Ccontract_add,
    },
    10200: {
        abi: GHackathonManager.abi, // Assuming you have a different ABI for this chain
        address: Gcontract_add,
    },
    2710: {
        abi: MHackathonManager.abi, // Assuming you have a different ABI for this chain
        address: Mcontract_add,
    },
    202402021700: {
        abi: AvHackathonManager.abi, // Assuming you have a different ABI for this chain
        address: Avcontract_add,
    },
    314159: {
        abi: FHackathonManager.abi, // Assuming you have a different ABI for this chain
        address: Fcontract_add,
    }
};