import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

export async function getAddressCoins(address) {
    const client = new SuiClient({ url: getFullnodeUrl("devnet") });
    let totalSuiBalance = 0;
    const data = await client.getAllCoins({ owner: address });

    data.data.forEach((obj) => {
        totalSuiBalance += obj.balance / 10 ** 9;
    });
    return totalSuiBalance;
}
