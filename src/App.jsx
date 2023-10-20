import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import Temp from "./components/temp";

function App() {
    const account = useCurrentAccount();

    return (
        <>
            <div className="h-screen w-screen flex flex-col items-center justify-center">
                <ConnectButton />
                {account && (
                    <div>
                        <div>Address: {account.address}</div>
                        <Temp />
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
