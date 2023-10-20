import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

export async function getObject(objId, showContent) {
    const client = new SuiClient({ url: getFullnodeUrl("devnet") });
    const data = await client.getObject({
        id: objId,
        options: { showContent: showContent },
    });
    return data;
}
