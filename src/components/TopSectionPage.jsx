import makeBlockie from "ethereum-blockies-base64";
import { Link } from "react-router-dom";

const TopSectionPage = ({
    wallet,
    account,
    setShowAddSignerBox,
    setShowCreateProposalBox,
}) => {
    return (
        <section className="flex items-center justify-center h-56 w-full bg-purple-800 px-32 text-white">
            <div className="absolute top-4 right-4">
                <Link to={"/"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3.5}
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer text-black">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </Link>
            </div>
            <div className="flex items-center justify-center space-x-10">
                <div
                    className=" self-start overflow-hidden rounded"
                    onClick={() => {
                        // handleUpdateSigner(null);
                    }}>
                    <img
                        src={makeBlockie(wallet.id ? wallet.id : "")}
                        alt="Wallet Contract Blockie Image"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm">{wallet.name}</span>
                    <span className="font-mono text-lg font-bold">
                        {wallet.id}
                    </span>
                    <span className="font-mono text-xs font-bold">
                        Owner : {wallet.owner}
                    </span>
                    <div className="mt-3 flex items-center justify-evenly space-x-16 px-4">
                        <div className="flex flex-col items-center tracking-tighter">
                            <p className="font-mono text-lg font-semibold">
                                {wallet.suiBalance}
                                <span className="italic text-xs"> SUI</span>
                            </p>
                            <p className="text-base font-medium">Balance</p>
                        </div>
                        <div className="flex flex-col items-center tracking-tighter">
                            <p className="font-mono text-lg font-semibold">
                                {wallet.lockedBalance}
                                <span className="italic text-xs"> SUI</span>
                            </p>
                            <p className="text-base font-medium">
                                Locked Balance
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-xs font-medium">
                                Total Members : &nbsp;
                                <span className="italic text-sm tracking-wider cursor-pointer">
                                    {wallet.members.length}
                                </span>
                            </div>
                            <div className="text-xs font-medium">
                                Approval threshold : &nbsp;
                                <span className="italic text-sm tracking-wider cursor-pointer">
                                    {wallet.approvalThreshold}
                                </span>
                            </div>
                            <div className="text-xs font-medium">
                                Cancellation threshold : &nbsp;
                                <span className="italic text-sm tracking-wider cursor-pointer">
                                    {wallet.cancellationThreshold}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    {account &&
                        account.address.toLowerCase() ===
                            wallet.owner.toLowerCase() && (
                            <button
                                className="inline-block rounded bg-indigo-200 px-8 py-3 text-sm font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 min-w-[16rem] text-black"
                                onClick={() => {
                                    setShowAddSignerBox(true);
                                }}>
                                Add Member
                            </button>
                        )}
                    {wallet && (
                        <button
                            className="inline-block rounded bg-indigo-200 px-8 py-3 text-sm font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 min-w-[16rem] text-black"
                            onClick={() => {
                                setShowCreateProposalBox(true);
                            }}>
                            Create Proposal
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TopSectionPage;
