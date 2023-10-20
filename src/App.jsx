import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import Navbar from "./components/Navbar";
import Count from "./components/Count";
import HomepageWallets from "./components/HomepageWallets";

function App() {
    const account = useCurrentAccount();

    return (
        <>
            <div className="h-full w-full">
                <div className="flex items-center justify-between h-[80px] bg-stone-300 px-12 py-3">
                    <ConnectButton />
                    {account && <Navbar />}
                </div>
                {account && (
                    <div>
                        {/* <Count /> */}
                        <HomepageWallets />
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
