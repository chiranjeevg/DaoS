import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import Navbar from "./components/Navbar";
import Count from "./components/Count";

function App() {
    const account = useCurrentAccount();

    return (
        <>
            <div className="h-screen w-screen">
                <div className="flex items-center justify-between h-[80px] bg-stone-300 px-12 py-3">
                    <ConnectButton />
                    {account && <Navbar />}
                </div>
                {account && (
                    <div>
                        <Count />
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
