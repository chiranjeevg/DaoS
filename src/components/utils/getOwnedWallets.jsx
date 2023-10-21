import { useState, useEffect } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../../networkConfig";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

const GetOwnedWalletObjects = () => {
    const account = useCurrentAccount();
    const packageId = useNetworkVariable("daoWalletPackageId");
    const env = useNetworkVariable("env");
    const client = new SuiClient({ url: getFullnodeUrl(env) });

    const packageName = useNetworkVariable("daoWalletPackageName");
    const [memberWalletObjIds, setMemberWalletObjIds] = useState([]);
    const [walletObjs, setWalletObjs] = useState([]);

    useEffect(() => {
        client
            .getOwnedObjects({
                owner: account.address,
                filter: {
                    MatchAll: [
                        {
                            StructType: `${packageId}::${packageName}::Member`,
                        },
                    ],
                },
                options: {
                    showContent: true,
                },
            })
            .then((data) => {
                let tempArr = [];
                if (data.data) {
                    data.data.forEach((obj) => {
                        tempArr.push(obj.data?.content?.fields.wallet);
                    });
                    setMemberWalletObjIds(tempArr);
                }
            });
    }, []);

    useEffect(() => {
        client
            .multiGetObjects({
                ids: memberWalletObjIds,
                options: {
                    showContent: true,
                },
            })
            .then((data) => {
                if (data) {
                    let tempArr = [];
                    data.forEach((obj) => {
                        const tempProposals = [];
                        const fields = obj.data?.content?.fields;
                        const walletObj = {
                            id: fields.id.id,
                            approvalThreshold: fields.approval_threshold,
                            cancellationThreshold:
                                fields.cancellation_threshold,
                            description: fields.description,
                            name: fields.name,
                            owner: fields.owner,
                            suiBalance: fields.sui / 10 ** 9,
                            lockedBalance: fields.lockedbalance / 10 ** 9,
                            tokenProposals: [],
                            members: [],
                        };

                        fields.members.fields?.contents?.forEach((mem) => {
                            walletObj.members.push(mem.fields?.key);
                        });

                        fields.tokenProposals.forEach((obj) => {
                            const proposalObj = {
                                approvalVotes:
                                    obj.fields?.proposal?.fields
                                        ?.approval_votes,
                                cancellationVotes:
                                    obj.fields?.proposal?.fields
                                        ?.cancellation_votes,
                                creator: obj.fields?.proposal?.fields?.creator,
                                id: obj.fields?.proposal?.fields?.id.id,
                                status: obj.fields?.proposal?.fields?.status,
                                to: obj.fields?.to,
                                votes: [],
                            };
                            const votes =
                                obj.fields?.proposal?.fields?.votes.fields;
                            votes?.contents.forEach((obj) => {
                                const temp = {
                                    memberId: obj?.fields.key,
                                    approved: obj?.fields.value,
                                };
                                proposalObj.votes.push(temp);
                            });
                            tempProposals.push(proposalObj);
                        });
                        walletObj.tokenProposals = tempProposals;
                        tempArr.push(walletObj);
                    });
                    setWalletObjs(tempArr);
                }
            });
    }, [memberWalletObjIds]);

    return walletObjs;
};

export default GetOwnedWalletObjects;
