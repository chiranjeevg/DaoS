import React, { useState, useEffect } from "react";
import Modal from "react-modal";
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
    const [modalIsOpen, setModalIsOpen] = useState(false);
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

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#e5e7eb",
        },
    };

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const txb = new TransactionBlock();

        txb.moveCall({
            arguments: [
                txb.pure.string(event.target.walletName.value),
                txb.pure.string(event.target.walletDesc.value),
                txb.pure.u8(event.target.approvalThreshold.value),
                txb.pure.u8(event.target.cancellationThreshold.value),
                txb.pure.string(event.target.donationNftName.value),
                txb.pure.string(event.target.donationNftDesc.value),
                txb.pure.string(event.target.donationNftUrl.value),
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

    async function handleDonation(event) {
        event.preventDefault();
        const txb = new TransactionBlock();
        const [coin] = txb.splitCoins(txb.gas, [1]);
        const res = txb.transferObjects([coin], event.target.daoAddress.value);
        console.log(coin, res);

        txb.moveCall({
            arguments: [txb.object(event.target.daoAddress.value), [coin]],
            target: `${packageId}::${packageName}::donate`,
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
                            closeModal();
                        });
                },
            }
        );
    }

    return (
        <>
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
                                <div className="pt-3 mx-auto max-w-lg text-center">
                                    <h1 className="text-xl font-bold">
                                        Add Donation NFT Details
                                    </h1>
                                </div>
                                <input
                                    type="text"
                                    name="donationNftName"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter donation NFT name"
                                    required
                                />
                                <textarea
                                    rows={4}
                                    name="donationNftDesc"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter donation NFT description"
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
                                    {wallets.map((wallet_, index) => {
                                        return (
                                            <div key={index}>
                                                <WalletCard wallet={wallet_} />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <></>
                            )}
                            <div>
                                <button
                                    className="absolute bottom-12 right-28 flex items-center justify-center border-2 border-gray-500 rounded-md bg-emerald-300 px-4 py-1 text-green-800 shadow-md transition-all hover:scale-110 focus:outline-none"
                                    type="button"
                                    onClick={openModal}>
                                    <span className="font-mono text-sm font-bold text-gray-900">
                                        Donate
                                    </span>
                                </button>
                                <button
                                    className="absolute bottom-10 right-10 flex items-center justify-center rounded-full border-2 border-gray-900 bg-emerald-300 px-4 py-2 text-green-700 shadow-md transition-all hover:scale-110 focus:outline-none"
                                    type="button"
                                    onClick={() => {
                                        setToggleAdd((state) => !state);
                                    }}>
                                    <span className="font-mono text-2xl font-medium text-gray-900">
                                        +
                                    </span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}>
                <div className="min-w-[28rem] p-5">
                    <div className="mb-4 flex justify-between">
                        <h2 className="my-auto inline-block text-xl font-bold">
                            Make a Donation
                        </h2>
                        <button
                            className="inline-block rounded bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-gray-500 disabled:scale-100 disabled:bg-gray-500 disabled:hover:shadow-none"
                            onClick={closeModal}>
                            x
                        </button>
                    </div>

                    <form
                        className="flex h-full w-full flex-col items-center justify-center"
                        onSubmit={handleDonation}>
                        <input
                            type="text"
                            id="daoAddress"
                            required
                            className="w-full rounded border-0 p-3 text-sm text-gray-900 ring-gray-900 focus:ring-2 my-2 border-gray-800"
                            placeholder="DAO Address"
                        />

                        <input
                            type="number"
                            min={0}
                            required
                            id="amount"
                            className="w-full rounded border-0 p-3 text-sm text-gray-900 ring-gray-900 focus:ring-2 my-2"
                            placeholder="Amount"
                        />

                        <button
                            className="inline-block rounded bg-lime-600 px-8 py-3 text-base font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-lime-500 mt-5 w-full"
                            type="submit">
                            Donate SUI
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default HomepageWallets;
