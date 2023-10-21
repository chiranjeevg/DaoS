/* eslint-disable @next/next/no-img-element */
import makeBlockie from "ethereum-blockies-base64";
import {
    useSignAndExecuteTransactionBlock,
    useSuiClient,
} from "@mysten/dapp-kit";
import { useNetworkVariable } from "../networkConfig";
import { TransactionBlock } from "@mysten/sui.js/transactions";

const TransactionCard = ({
    id,
    wallet,
    creator,
    amount,
    toAddr,
    account,
    tokenName,
    approvalVotes,
    disapprovalVotes,
    approvedBy,
    disapprovedBy,
    status,
}) => {
    const approved = approvedBy.includes(account.address);
    const disapproved = disapprovedBy.includes(account.address);
    const client = useSuiClient();
    const packageId = useNetworkVariable("daoWalletPackageId");
    const packageName = useNetworkVariable("daoWalletPackageName");
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

    async function handleApprove(event) {
        event.preventDefault();
        const txb = new TransactionBlock();
        console.log(wallet.id, id);

        txb.moveCall({
            arguments: [txb.object(wallet.id), txb.pure.u64(id)],
            target: `${packageId}::${packageName}::approve_token_proposal`,
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
                            alert("APPROVED");
                        });
                },
            }
        );
    }

    async function handleDisapprove(event) {
        event.preventDefault();
        const txb = new TransactionBlock();

        txb.moveCall({
            arguments: [txb.object(wallet.id), txb.pure.u64(id)],
            target: `${packageId}::${packageName}::reject_token_proposal`,
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
                            alert("DIS-APPROVED");
                        });
                },
            }
        );
    }

    return account ? (
        <div
            className={`group flex items-center justify-start rounded p-5 ${
                status == 2
                    ? "bg-emerald-100"
                    : status == 3
                    ? "bg-red-100"
                    : "bg-yellow-100"
            }`}>
            <div className="flex w-min items-center space-x-4 pr-2">
                <span className="min-w-max px-2 font-mono text-sm font-medium">
                    # {id}
                </span>
                <div className="flex min-w-min flex-col">
                    <span className="font-mono font-semibold">{toAddr}</span>
                    <p className="font-mono font-semibold">
                        {amount}
                        <span className="text-sm font-medium">{tokenName}</span>
                    </p>
                </div>
            </div>

            {(() => {
                if (status == 2)
                    return (
                        <div className="flex w-full justify-center">
                            <span className="inline-block rounded bg-lime-600 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-lime-500 w-min px-6 py-2.5 opacity-0 group-hover:opacity-100">
                                Executed
                            </span>
                        </div>
                    );
                else if (status == 3)
                    return (
                        <div className="flex w-full justify-center">
                            <span className="inline-block rounded bg-rose-600 text-sm font-medium text-white transition hover:shadow-xl focus:outline-none focus:ring active:bg-rose-600 w-min px-6 py-2.5 opacity-0 hover:scale-100 group-hover:opacity-100">
                                Cancelled
                            </span>
                        </div>
                    );
                else if (approved)
                    return (
                        <div className="flex w-full justify-center">
                            <span className="inline-block rounded bg-yellow-600 text-sm font-medium text-white transition hover:shadow-xl focus:outline-none focus:ring active:bg-yellow-500 w-min px-6 py-2.5 opacity-0 hover:scale-100 group-hover:opacity-100">
                                Approved
                            </span>
                        </div>
                    );
                else if (disapproved)
                    return (
                        <div className="flex w-full justify-center">
                            <span className="inline-block rounded bg-rose-600 text-sm font-medium text-white transition hover:shadow-xl focus:outline-none focus:ring active:bg-rose-600 w-min px-6 py-2.5 opacity-0 hover:scale-100 group-hover:opacity-100">
                                Disapproved
                            </span>
                        </div>
                    );
                else {
                    return (
                        <div className="flex w-full justify-center gap-2 px-3">
                            <button
                                className="inline-block rounded bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-gray-500 disabled:scale-100 disabled:bg-gray-500 disabled:hover:shadow-none min-w-max opacity-0 group-hover:opacity-100"
                                type="button"
                                onClick={handleApprove}>
                                Approve
                            </button>

                            <button
                                className="inline-block rounded bg-rose-600 px-8 py-2.5 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-rose-600 min-w-max opacity-0 group-hover:opacity-100"
                                type="button"
                                onClick={handleDisapprove}>
                                Decline
                            </button>
                        </div>
                    );
                }
            })()}
            <div className="flex min-w-max max-w-full items-center justify-center space-x-2 overflow-auto px-4">
                {approvedBy.map((signer_, index) => {
                    return (
                        <div
                            key={index}
                            className="h-8 w-8 cursor-pointer overflow-hidden rounded">
                            <img
                                src={makeBlockie(signer_)}
                                alt="Approver blockie image"
                                data-tip={signer_}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    ) : (
        <></>
    );
};

export default TransactionCard;
