import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";

function App() {
    const account = useCurrentAccount();

    return (
        <>
            <div className="mx-auto flex items-center justify-center">
                <ConnectButton className="w-1/2" />
                {account ? `Account : ${account}` : "Wallet Not Connected !"}
            </div>
        </>
    );
}

export default App;
