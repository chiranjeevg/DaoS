import { useEffect, useState } from "react";
import TransactionCard from "./TransactionCard";

const TransactionsHistoryPage = ({ account, wallet }) => {
    const [proposals, setProposals] = useState([]);
    useEffect(() => {
        setProposals(wallet.tokenProposals);
    }, [wallet]);

    return (
        <section className="flex flex-col space-y-3 px-28 py-10">
            {proposals == null || proposals.length == 0 ? (
                <div className="col-span-4">
                    <p className="text-center text-lg">No Proposals Found</p>
                </div>
            ) : (
                proposals.map((transaction) => {
                    const approvedBy = [];
                    const disapprovedBy = [];
                    transaction.votes.forEach((obj) => {
                        if (obj?.approved) {
                            approvedBy.push(obj?.memberId);
                        } else {
                            disapprovedBy.push(obj?.memberId);
                        }
                    });
                    return (
                        <TransactionCard
                            key={transaction.id}
                            id={transaction.id}
                            creator={transaction.creator}
                            amount={transaction.amount}
                            toAddr={transaction.to}
                            account={account}
                            tokenName={"SUI"}
                            approvalVotes={transaction.approvalVotes}
                            disapprovalVotes={transaction.disapprovalVotes}
                            approvedBy={approvedBy}
                            disapprovedBy={disapprovedBy}
                            status={transaction.status}
                        />
                    );
                })
            )}
        </section>
    );
};

export default TransactionsHistoryPage;
