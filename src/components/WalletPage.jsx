import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import makeBlockie from "ethereum-blockies-base64";
import {
    useCurrentAccount,
    useSignAndExecuteTransactionBlock,
    useSuiClient,
} from "@mysten/dapp-kit";
import RightPane from "./RightPane";
import LeftPane from "./LeftPane";
import Navbar from "./Navbar";

const WalletPage = () => {
    const account = useCurrentAccount();
    const { walletObjId } = useParams();
    const { state } = useLocation();

    return (
        <div className="h-full w-full">
            <div className="flex items-center justify-start h-[80px] bg-stone-300 px-12 py-3 space-x-4">
                <div
                    className="h-12 w-12 cursor-pointer overflow-hidden rounded"
                    onClick={() => {
                        navigator.clipboard.writeText(account.address);
                    }}>
                    <img
                        src={makeBlockie(account.address)}
                        alt="Signer Blockie Image"
                    />
                </div>
                {account && <Navbar />}
            </div>
            {state ? <RightPane wallet={state} account={account} /> : <></>}
        </div>
    );
};

export default WalletPage;
