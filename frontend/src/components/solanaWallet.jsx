"use client";
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import {
    CoinbaseWalletAdapter,
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';


import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useCallback, useState } from 'react';




import '@solana/wallet-adapter-react-ui/styles.css';
let thelamports = 0;
let theWallet = "9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9"
function getWallet() {


}
const Wallet = () => {


    return (
        <Context>
            <Content />
        </Context>
    );
};


export default Wallet;

const Context = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new UnsafeBurnerWalletAdapter(),
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter()
        ],
        [network]
    );



    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content = () => {
    let [lamports, setLamports] = useState(.1);
    let [wallet, setWallet] = useState("9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9");




    // const { connection } = useConnection();
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();




    const onClick = useCallback(async () => {

        if (!publicKey) throw new WalletNotConnectedError();
        connection.getBalance(publicKey).then((bal) => {
            console.log(bal / LAMPORTS_PER_SOL);

        });

        let lamportsI = LAMPORTS_PER_SOL * lamports;
        console.log(publicKey.toBase58());
        console.log("lamports sending: {}", thelamports)
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(theWallet),
                lamports: lamportsI,
            })
        );

        const signature = await sendTransaction(transaction, connection);

        await connection.confirmTransaction(signature, 'processed');
    }, [publicKey, sendTransaction, connection]);


    function setTheLamports(e) {
        console.log(Number(e.target.value));
        setLamports(Number(e.target.value));
        lamports = e.target.value;
        thelamports = lamports;
    }
    function setTheWallet(e) {
        setWallet(e.target.value)
        theWallet = e.target.value;
    }
    return (


        <div className="">
           <WalletMultiButton className='w-80' />
            </div>
     


    );
};