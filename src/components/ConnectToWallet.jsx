import React from "react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";

const ConnectToWallet = () => {
    const account = useCurrentAccount();

    return (
        <div>
            <ConnectButton
                connectText={"Connect Wallet"}
                connectedText={`Connected: ${account.address}`}
            />
        </div>
    );
};

export default ConnectToWallet;
