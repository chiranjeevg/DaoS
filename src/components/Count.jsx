import React, { useState, useEffect } from "react";
import { useNetworkVariable } from "../networkConfig";
import {
    useSignAndExecuteTransactionBlock,
    useSuiClient,
    useSuiClientQuery,
} from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";

const Count = () => {
    const counterObjId =
        "0xba3219970df451e981ea67f870d7629f4254767ef15338ed696508c6d9016ce6";
    const [countValue, setCountValue] = useState(0);

    const client = useSuiClient();
    const counterPackageId = useNetworkVariable("counterPackageId");
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
    const { data, refetch } = useSuiClientQuery("getObject", {
        id: counterObjId,
        options: {
            showContent: true,
            showOwner: true,
        },
    });

    useEffect(() => {
        if (data) {
            data.data?.content &&
                setCountValue(data.data?.content?.fields.value);
        }
    }, [data]);

    function callIncrementFunction() {
        const txb = new TransactionBlock();

        txb.moveCall({
            arguments: [txb.object(counterObjId)],
            target: `${counterPackageId}::counter::increment`,
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
                            refetch();
                        });
                },
            }
        );
    }
    return (
        <div>
            <div className="p-40 flex space-x-5 items-center justify-center">
                <div> Current Counter Value : {countValue} </div>
                <button
                    className="py-4 px-10 border-2 bg-slate-200 rounded"
                    onClick={callIncrementFunction}>
                    Increment
                </button>
            </div>
        </div>
    );
};

export default Count;
