import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

// create a client connected to devnet
const client = new SuiClient({ url: getFullnodeUrl("devnet") });

export default client;
