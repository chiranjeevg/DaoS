import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@mysten/dapp-kit/dist/index.css";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { networkConfig } from "./networkConfig.js";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
            <WalletProvider autoConnect={true}>
                <App />
            </WalletProvider>
        </SuiClientProvider>
    </QueryClientProvider>
);
