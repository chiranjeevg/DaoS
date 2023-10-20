import React, { useState, useEffect } from "react";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

const Navbar = () => {
    const account = useCurrentAccount();
    const [suiAccountBalance, setSuiAccountBalance] = useState(0);
    const { data } = useSuiClientQuery("getAllCoins", {
        owner: account.address,
    });

    useEffect(() => {
        if (data) {
            let totalSuiBalance = 0;
            data.data.forEach((obj) => {
                totalSuiBalance += obj.balance / 10 ** 9;
            });

            setSuiAccountBalance(totalSuiBalance);
        }
    }, [data]);

    return (
        <div className="flex flex-col">
            <div className="text-sm font-medium">
                Address : &nbsp;
                <span
                    className="italic tracking-wider cursor-pointer"
                    onClick={() => {
                        navigator.clipboard.writeText(account.address);
                    }}>
                    {account.address}
                </span>
            </div>
            <div className="text-xs font-medium">
                Balance : &nbsp;
                <span className="italic tracking-wider">
                    {suiAccountBalance} SUI
                </span>
            </div>
        </div>
    );
};

export default Navbar;
