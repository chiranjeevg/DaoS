import React from "react";
import { Link } from "react-router-dom";
import makeBlockie from "ethereum-blockies-base64";
import { useCurrentAccount } from "@mysten/dapp-kit";

const WalletCard = ({ wallet }) => {
    const account = useCurrentAccount();

    return (
        <Link to={`/wallet/${wallet.id}`} state={wallet}>
            <div className="relative block cursor-pointer rounded border bg-blue-100 py-5 px-10">
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
                    <div className="flex flex-col text-right space-y-0.5">
                        <span className="font-mono text-sm font-semibold italic">
                            {wallet.id}
                        </span>
                        <span className="font-mono text-sm font-semibold">
                            <span className="font-sans font-normal">
                                Total Members : &nbsp;
                            </span>
                            {wallet.members.length}
                        </span>
                        {account &&
                        wallet.owner.toLowerCase() ==
                            account?.address.toLowerCase() ? (
                            <>
                                <span className="font-mono text-sm font-semibold">
                                    #owner
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="font-mono text-sm font-medium">
                                    #member
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <h5 className="mt-4 text-xl font-bold text-gray-900 capitalize">
                    {wallet.name}
                </h5>

                <p className="mt-2 hidden text-sm sm:block">
                    {wallet.description.length > 150
                        ? wallet.description.substring(0, 150) + "..."
                        : wallet.description}
                </p>
            </div>
        </Link>
    );
};

export default WalletCard;
