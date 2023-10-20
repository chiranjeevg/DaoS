import React, { useState, useEffect } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import WalletCard from "./WalletCard";

const tempWallets = [
    {
        id: "0x570ea94d8a94b16ecc60a7c042cc17d380635b04",
        createdOn: "1684133713",
        owner: {
            address: "0x536876370a55b9b333b120b3ac67faf22579c4d1",
        },
        metadata: {
            title: "test wallet",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
    },
    {
        id: "0xec4aab9897859abbc4fba866a5f98366517d9fb8",
        createdOn: "1679297205",
        owner: {
            address: "0x7ddb03275288b2545f49d2e0a1a45d6b44461336",
        },
        metadata: {
            title: "walllet",
            description: "gregfdvrfr",
        },
    },
    {
        id: "0xc86fe19b03280d0611e732c4cfc24b88d378d39f",
        createdOn: "1669781230",
        owner: {
            address: "0xb8cd57fa4e1e1cbc4e5fb961b5f551987d1e34cc",
        },
        metadata: {
            title: "Test Wallet 2",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
    },
    {
        id: "0x75d976071b15504f60cc04d1310578ef1788fa0e",
        createdOn: "1669746727",
        owner: {
            address: "0xba5499261078989158c76a53bdffaba60ab1bbda",
        },
        metadata: {
            title: "Test Wallet 1",
            description:
                "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
        },
    },
];

const HomepageWallets = () => {
    const [wallets, setWallets] = useState([]);
    const [toggleAdd, setToggleAdd] = useState(false);
    const account = useCurrentAccount();

    useEffect(() => {
        if (account)
            //TODO
            setWallets(tempWallets);
    }, [account]);

    function handleSubmit(e) {}

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
                                    Add Wallet Details
                                </h1>
                            </div>
                            <input
                                type="text"
                                name="walletTitle"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter Wallet Title"
                                required
                            />
                            <textarea
                                rows={4}
                                name="walletDesc"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter Wallet Description"
                            />

                            <div className="mx-auto max-w-lg text-center">
                                <h1 className="text-2xl font-bold">
                                    Add Owner Details
                                </h1>
                            </div>
                            <input
                                type="text"
                                name="ownerName"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter Owner Name"
                                required
                            />
                            <input
                                type="email"
                                name="ownerEmail"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter Owner E-mail"
                                required
                            />
                            <input
                                type="tel"
                                name="ownerContactNo"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter Owner Contact No"
                                required
                            />
                            <input
                                type="text"
                                name="ownerWalletAddr"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter Owner Wallet Address"
                                required
                            />
                            <input
                                type="text"
                                name="ownerRole"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter Owner Role"
                                required
                            />
                            <textarea
                                rows={3}
                                name="ownerRemarks"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                placeholder="Enter Remarks"
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
                                        <WalletCard
                                            key={wallet_.id}
                                            wallet={wallet_}
                                        />
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
