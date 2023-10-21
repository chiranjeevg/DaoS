import React, { useState } from "react";
import Modal from "react-modal";
import TopSectionPage from "./TopSectionPage";
import {
    useCurrentAccount,
    useSignAndExecuteTransactionBlock,
    useSuiClient,
} from "@mysten/dapp-kit";
import { useNetworkVariable } from "../networkConfig";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import TransactionsHistoryPage from "./TransactionHistoryPage";

const RightPane = ({ wallet, account }) => {
    const [showAddSignerBox, setShowAddSignerBox] = useState(false);
    const [showCreateProposalBox, setShowCreateProposalBox] = useState(false);
    const client = useSuiClient();
    const packageId = useNetworkVariable("daoWalletPackageId");
    const packageName = useNetworkVariable("daoWalletPackageName");

    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

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

    function openSignerModal() {
        setShowAddSignerBox(true);
    }

    function closeSignerModal() {
        setShowAddSignerBox(false);
    }

    function openProposalModal() {
        setShowCreateProposalBox(true);
    }

    function closeProposalModal() {
        setShowCreateProposalBox(false);
    }

    async function handleAddNewMember(event) {
        event.preventDefault();
        const txb = new TransactionBlock();

        txb.moveCall({
            arguments: [
                txb.object(event.target.daoAddress.value),
                txb.pure.address(event.target.memberAddress.value),
            ],
            target: `${packageId}::${packageName}::add_member`,
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
                                wallet.members.push(
                                    event.target.memberAddress.value
                                );
                                closeSignerModal();
                            }, 1000);
                        });
                },
            }
        );
    }

    async function handleNewProposal(event) {
        event.preventDefault();
        const toAddress = event.target.toAddress.value;
        const amount = parseInt(
            parseFloat(event.target.amount.value) * 10 ** 9
        );

        const txb = new TransactionBlock();

        txb.moveCall({
            arguments: [
                txb.object(event.target.daoAddress.value),
                txb.pure.address(toAddress),
                txb.pure.u64(amount),
            ],
            target: `${packageId}::${packageName}::create_token_praposal`,
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
                                closeProposalModal();
                            }, 1000);
                        });
                },
            }
        );
    }

    return wallet ? (
        <>
            <TopSectionPage
                setShowAddSignerBox={setShowAddSignerBox}
                setShowCreateProposalBox={setShowCreateProposalBox}
                account={account}
                wallet={wallet}
            />
            <Modal
                isOpen={showAddSignerBox}
                onRequestClose={closeSignerModal}
                contentLabel="Example Modal"
                style={customStyles}>
                <div className="min-w-[28rem] p-5">
                    <div className="mb-4 flex justify-between">
                        <h2 className="my-auto inline-block text-xl font-bold">
                            Add New Member
                        </h2>
                        <button
                            className="inline-block rounded bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-gray-500 disabled:scale-100 disabled:bg-gray-500 disabled:hover:shadow-none"
                            onClick={closeSignerModal}>
                            x
                        </button>
                    </div>

                    <form
                        className="flex h-full w-full flex-col items-center justify-center"
                        onSubmit={handleAddNewMember}>
                        <input
                            type="text"
                            id="daoAddress"
                            required
                            disabled
                            value={wallet.id}
                            className="w-full rounded border-0 p-3 text-sm text-gray-900 ring-gray-900 focus:ring-2 my-2 border-gray-800"
                            placeholder="DAO Address"
                        />

                        <input
                            type="text"
                            required
                            id="memberAddress"
                            className="w-full rounded border-0 p-3 text-sm text-gray-900 ring-gray-900 focus:ring-2 my-2"
                            placeholder="Member Address"
                        />

                        <button
                            className="inline-block rounded bg-lime-600 px-8 py-3 text-base font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-lime-500 mt-5 w-full"
                            type="submit">
                            Add Member
                        </button>
                    </form>
                </div>
            </Modal>
            <Modal
                isOpen={showCreateProposalBox}
                onRequestClose={closeProposalModal}
                contentLabel="Example Modal"
                style={customStyles}>
                <div className="min-w-[28rem] p-5">
                    <div className="mb-4 flex justify-between">
                        <h2 className="my-auto inline-block text-xl font-bold">
                            Add New Proposal
                        </h2>
                        <button
                            className="inline-block rounded bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-gray-500 disabled:scale-100 disabled:bg-gray-500 disabled:hover:shadow-none"
                            onClick={closeProposalModal}>
                            x
                        </button>
                    </div>

                    <form
                        className="flex h-full w-full flex-col items-center justify-center"
                        onSubmit={handleNewProposal}>
                        <input
                            type="text"
                            id="daoAddress"
                            required
                            disabled
                            value={wallet.id}
                            className="w-full rounded border-0 p-3 text-sm text-gray-900 ring-gray-900 focus:ring-2 my-2 border-gray-800"
                            placeholder="DAO Address"
                        />

                        <input
                            type="text"
                            required
                            id="toAddress"
                            className="w-full rounded border-0 p-3 text-sm text-gray-900 ring-gray-900 focus:ring-2 my-2"
                            placeholder="Address to receive SUI tokens"
                        />

                        <input
                            type="text"
                            required
                            id="amount"
                            className="w-full rounded border-0 p-3 text-sm text-gray-900 ring-gray-900 focus:ring-2 my-2"
                            placeholder="Amount of SUI tokens"
                        />

                        <button
                            className="inline-block rounded bg-lime-600 px-8 py-3 text-base font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-lime-500 mt-5 w-full"
                            type="submit">
                            Create Proposal
                        </button>
                    </form>
                </div>
            </Modal>
            <div>
                <TransactionsHistoryPage account={account} wallet={wallet} />
            </div>
        </>
    ) : (
        <></>
    );
};

export default RightPane;
