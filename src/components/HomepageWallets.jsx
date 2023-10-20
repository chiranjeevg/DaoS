import React, { useState, useEffect } from "react";
import {
    useCurrentAccount,
    useSignAndExecuteTransactionBlock,
    useSuiClient,
} from "@mysten/dapp-kit";
import WalletCard from "./WalletCard";
import GetOwnedWalletObjects from "./utils/getOwnedWallets";
import { useNetworkVariable } from "../networkConfig";
import { TransactionBlock } from "@mysten/sui.js/transactions";

const HomepageWallets = () => {
    const [wallets, setWallets] = useState([]);
    const [toggleAdd, setToggleAdd] = useState(false);
    const account = useCurrentAccount();
    const client = useSuiClient();
    const packageId = useNetworkVariable("daoWalletPackageId");
    const packageName = useNetworkVariable("daoWalletPackageName");

    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
    let walletsData = GetOwnedWalletObjects();

    useEffect(() => {
        if (account) {
            setWallets(walletsData);
        }
    }, [account, walletsData]);

    async function handleSubmit(event) {
        event.preventDefault();
        const txb = new TransactionBlock();

        txb.moveCall({
            arguments: [
                txb.pure.string(event.target.walletName.value),
                txb.pure.string(event.target.walletDesc.value),
                txb.pure.u8(event.target.approvalThreshold.value),
                txb.pure.u8(event.target.cancellationThreshold.value),
            ],
            target: `${packageId}::${packageName}::create_wallet`,
        });

        signAndExecute(
            {
                transactionBlock: txb,
                options: {
                    showEffects: true,
                    showObjectChanges: true,
                },
            },
            {
                onSuccess: (tx) => {
                    client
                        .waitForTransactionBlock({ digest: tx.digest })
                        .then(() => {
                            setTimeout(() => {
                                setToggleAdd(false);
                                window.location.reload();
                            }, 1000);
                        });
                },
            }
        );
    }

    return (
        <div className="h-full">
            <div className="h-full w-full">
                {toggleAdd ? (
                    <div className="relative mx-auto max-w-screen-md p-4 px-8">
                        <p
                            className="top-10 right-10 w-full cursor-pointer text-right font-mono text-3xl"
                            onClick={() => {
                                setToggleAdd((state) => !state);
                            }}>
                            x
                        </p>
                        <form
                            action="submit"
                            className="mx-auto mb-0 max-w-lg space-y-4"
                            onSubmit={handleSubmit}>
                            <div className="mx-auto max-w-lg text-center">
                                <h1 className="text-2xl font-bold">
                                    Add DAO Wallet Details
                                </h1>
                            </div>
                            <input
                                type="text"
                                name="walletName"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter wallet name"
                                required
                            />
                            <textarea
                                rows={4}
                                name="walletDesc"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter wallet description"
                            />
                            <input
                                type="text"
                                name="ownerWalletAddr"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter owner wallet address"
                                required
                                disabled
                                value={account.address}
                            />
                            <input
                                type="number"
                                min={0}
                                max={100}
                                name="approvalThreshold"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter approval threshold [ 0 - 100 ]"
                                required
                            />
                            <input
                                type="number"
                                min={0}
                                max={100}
                                name="cancellationThreshold"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter cancellation threshold [ 0 - 100 ]"
                                required
                            />
                            <input
                                type="text"
                                name="donationNftUrl"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter donation NFT URL"
                                required
                            />
                            <div className="flex w-full items-center justify-center">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded bg-blue-500 px-5 py-3  font-semibold text-white">
                                    Create Wallet
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <>
                        {wallets.length >= 0 ? (
                            <div className="grid grid-cols-2 gap-5 px-36 py-20">
                                {wallets.map((wallet_) => {
                                    return (
                                        <>
                                            <WalletCard
                                                key={wallet_.id}
                                                wallet={wallet_}
                                            />
                                        </>
                                    );
                                })}
                            </div>
                        ) : (
                            <></>
                        )}
                        <button
                            className="absolute bottom-10 right-10 z-10 flex items-center justify-center rounded-full border-2 border-gray-900 bg-emerald-300 px-4 py-2 text-green-700 shadow-md transition-all hover:scale-110 focus:outline-none"
                            type="button"
                            onClick={() => {
                                setToggleAdd((state) => !state);
                            }}>
                            <span className="font-mono text-2xl font-medium text-gray-900">
                                +
                            </span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomepageWallets;
