import { getAddressCoins } from "../utils/getAddressCoins";
import React, { useState, useEffect } from "react";
import { useNetworkVariable } from "../networkConfig";
import {
    useCurrentAccount,
    useSignAndExecuteTransactionBlock,
    useSuiClient,
    useSuiClientQuery,
} from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";

const Count = () => {
    const counterObjId =
        "0xba3219970df451e981ea67f870d7629f4254767ef15338ed696508c6d9016ce6";
    const account = useCurrentAccount();
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

    const data1 = useSuiClientQuery("getOwnedObjects", {
        owner: account.address,
        filter: {
            MatchAll: [
                {
                    StructType: `${packageId}}::${packageName}::Wallet>`,
                },
                {
                    AddressOwner: address,
                },
            ],
        },
        options: {
            showType: true,
            showOwner: true,
            showPreviousTransaction: true,
            showDisplay: false,
            showContent: false,
            showBcs: false,
            showStorageRebate: false,
        },
    });
    useEffect(() => {
        if (data1.data) {
            console.log("DATATATATAT : ", data1.data);
        }
    }, [data1.data]);

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
