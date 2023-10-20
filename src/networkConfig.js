import { getFullnodeUrl } from "@mysten/sui.js/client";
import {
    DEVNET_COUNTER_PACKAGE_ID,
    DEVNET_DAO_WALLET_PACKAGE_ID,
    DEVNET_DAO_WALLET_PACKAGE_NAME,
    MAINNET_COUNTER_PACKAGE_ID,
} from "./constants.js";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
    createNetworkConfig({
        devnet: {
            url: getFullnodeUrl("devnet"),
            variables: {
                counterPackageId: DEVNET_COUNTER_PACKAGE_ID,
                daoWalletPackageId: DEVNET_DAO_WALLET_PACKAGE_ID,
                daoWalletPackageName: DEVNET_DAO_WALLET_PACKAGE_NAME,
                env: "devnet",
            },
        },
        mainnet: {
            url: getFullnodeUrl("mainnet"),
            variables: {
                counterPackageId: MAINNET_COUNTER_PACKAGE_ID,
                env: "mainnet",
            },
        },
    });

export { useNetworkVariable, useNetworkVariables, networkConfig };
