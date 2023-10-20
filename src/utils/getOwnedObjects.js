import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

export async function getOwnedObjects(address, packageId, packageName) {
    const client = new SuiClient({ url: getFullnodeUrl("devnet") });
    const data = await client.getOwnedObjects({
        owner: address,
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
    console.log(data);
}
