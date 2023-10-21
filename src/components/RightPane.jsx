import React, { useState } from "react";
import Modal from "react-modal";
import TopSectionPage from "./TopSectionPage";

const RightPane = ({ wallet, account }) => {
    const [showAddSignerBox, setShowAddSignerBox] = useState(false);
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
        setShowAddSignerBox(true);
    }

    function closeModal() {
        setShowAddSignerBox(false);
    }

    async function handleAddNewMember(event) {
        event.preventDefault();
    }

    return wallet ? (
        <>
            <TopSectionPage
                setShowAddSignerBox={setShowAddSignerBox}
                showAddSignerBox={showAddSignerBox}
                account={account}
                wallet={wallet}
            />
            <Modal
                isOpen={showAddSignerBox}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}>
                <div className="min-w-[28rem] p-5">
                    <div className="mb-4 flex justify-between">
                        <h2 className="my-auto inline-block text-xl font-bold">
                            Add New Member
                        </h2>
                        <button
                            className="inline-block rounded bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-gray-500 disabled:scale-100 disabled:bg-gray-500 disabled:hover:shadow-none"
                            onClick={closeModal}>
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
            <div className={showAddSignerBox ? " hidden " : ""}>
                {/* <TransactionsHistoryPage account={account} wallet={wallet} /> */}
            </div>
        </>
    ) : (
        <></>
    );
};

export default RightPane;
