import axios from "axios";

const { SignProtocolClient, SpMode, EvmChains } = require("@ethsign/sp-sdk");
const { privateKeyToAccount } = require("viem/accounts");

const privateKey =
	"0x5d103af35d23716147530f88a1c4cc88502a38709ceae990dc8ee383a3fa9678";
const client = new SignProtocolClient(SpMode.OnChain, {
	chain: EvmChains.Sepolia,
	account: privateKeyToAccount(privateKey), // optional
});

interface ProfileData {
	name: string;
	mobileNo: string;
	identityProof: string;
}

async function test() {
	const res = await client.createSchema({
		name: "Premium User",
		data: [
			{ name: "name", type: "string" },
			{ name: "mobileNo", type: "string" },
			{ name: "indentityProof", type: "string" },
			{ name: "signer", type: "address" },
		],
	});
	console.log(res);
}

export async function createNotaryAttestation(
	profileData: ProfileData,
	signer: string | undefined
) {
	if (!signer) return new Error();
	const res = await client.createAttestation({
		schemaId: "0x53",
		data: {
			name: profileData.name,
			mobileNo: profileData.mobileNo,
			identityProof: profileData.identityProof,
			signer: signer,
		},
		indexingValue: signer.toLowerCase(),
	});

	console.log(res);
}

// Generate a function for making requests to the Sign Protocol Indexing Service
async function makeAttestationRequest(endpoint: string, options: any) {
	const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
	const res = await axios.request({
		url,
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
		...options,
	});
	// throw API errors
	if (res.status !== 200) {
		throw new Error(JSON.stringify(res));
	}
	// return original response
	return res.data;
}

export async function queryAttestations(searchSigner: string | undefined) {
	if (!searchSigner) throw new Error();
	const response = await makeAttestationRequest("index/attestations", {
		method: "GET",
		params: {
			mode: "onchain", // Data storage location
			schemaId: "onchain_evm_11155111_0x53", // Your full schema's ID
			attester: "0x4E75698009d9F66E17Dd667165Bb96fdCbC0F1d6", // DAO Admin's address
			indexingValue: searchSigner.toLowerCase(), // Bob's address
		},
	});

	// Make sure the request was successfully processed.
	if (!response.success) {
		return {
			success: false,
			message: response?.message ?? "Attestation query failed.",
		};
	}

	// Return a message if no attestations are found.
	if (response.data?.total === 0) {
		return {
			success: false,
			message: "No attestation for this address found.",
		};
	}

	// Return all attestations that match our query.
	return {
		success: true,
		attestations: response.data.rows,
	};
}