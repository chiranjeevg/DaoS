import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import { useCurrentAccount } from "@mysten/dapp-kit";

const WalletCard = ({ wallet }) => {
    const account = useCurrentAccount();

    return (
        <div
            className="relative block cursor-pointer rounded border bg-blue-100 py-5 px-10"
            onClick={() => {
                //   router.push(`/wallet/${wallet.contractAddress}`);
            }}>
            <div className="flex w-full justify-between">
                <div
                    className="h-20 w-20 cursor-pointer overflow-hidden rounded"
                    onClick={() => {
                        navigator.clipboard.writeText(wallet.id);
                    }}>
                    <img
                        src={makeBlockie(wallet.id)}
                        alt="Signer Blockie Image"
                    />
                </div>
                <div className="flex flex-col space-y-1 text-right">
                    <span className="font-mono text-sm font-semibold italic">
                        {wallet.id}
                    </span>
                    {account &&
                    wallet.owner.address.toLowerCase() ==
                        account?.address.toLowerCase() ? (
                        <>
                            <span className="font-mono text-sm font-semibold">
                                #owner
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="font-mono text-sm font-medium">
                                #signer
                            </span>
                        </>
                    )}
                </div>
            </div>

            <h5 className="mt-4 text-xl font-bold text-gray-900 capitalize">
                {wallet.metadata.title}
            </h5>

            <p className="mt-2 hidden text-sm sm:block">
                {wallet.metadata.description.length > 150
                    ? wallet.metadata.description.substring(0, 150) + "..."
                    : wallet.metadata.description}
            </p>
        </div>
    );
};

export default WalletCard;
