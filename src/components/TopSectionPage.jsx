import makeBlockie from "ethereum-blockies-base64";
import { Link } from "react-router-dom";

const TopSectionPage = ({
    wallet,
    account,
    setShowAddSignerBox,
    showAddSignerBox,
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
                        className="h-5 w-5 cursor-pointer">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </Link>
            </div>
            <div className="flex items-center space-x-10">
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
                    <span className="text-base">DAO Wallet Contract</span>
                    <span className="font-mono text-lg font-bold">
                        {wallet.id}
                    </span>
                    <div className="mt-8 flex items-center justify-between space-x-16 px-4">
                        <div className="flex flex-col items-center tracking-tighter">
                            <p className="font-mono text-lg font-semibold">
                                {wallet.members.length}
                            </p>
                            <p className="text-xs">Members</p>
                        </div>
                        <div className="flex flex-col">
                            Approval threshold : {wallet.approvalThreshold}
                        </div>
                        {account &&
                            account.address.toLowerCase() ===
                                wallet.owner.toLowerCase() &&
                            !showAddSignerBox && (
                                <button
                                    className="inline-block rounded bg-indigo-200 px-8 py-3 text-sm font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 min-w-[16rem] text-black"
                                    onClick={() => {
                                        setShowAddSignerBox(true);
                                    }}>
                                    Add Member
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopSectionPage;
