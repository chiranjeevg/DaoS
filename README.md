## DAO for a Cause

Welcome to the DAO for a Causeas a Service repository! We've developed a decentralized autonomous organization (DAO) with a strong focus on charitable causes, powered by the Sui network. Our platform empowers users to create and manage DAO wallets, accept public donations, and reward donors with NFTs as tokens of appreciation. This unique feature enhances virality and encourages contributions.

With our DAO as a service, anyone can easily create a DAO wallet, enabling others to contribute to their chosen causes. Donors receive NFTs as tokens of appreciation for their support.

## Getting Started

To begin with this project, follow these steps to set up the development environment and deploy the smart contracts on the Sui network:

### Prerequisites

Before you start, ensure that you have the following tools and dependencies:

- [Sui Network Installation](https://docs.sui.io/build/install)
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the front-end
- [npm/yarn](https://www.npmjs.com/) (recommended for package management)
- [Sui wallet](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil) (for testing on Sui network)

### Steps

Now, let's walk through the setup process:

1. Clone this repository to your local machine:
   ```bash
    git clone https://github.com/NonitMittal/DaoS.git
    cd DaoS
    # Move to the project directory
    cd contract
    # Build the contract
    sui move build
    # Publish the contract (adjust the gas budget as needed)
    sui client publish --gas-budget <gas value>
    # Move to the root directory
    cd ../
    # Install dependencies
    npm install
    # Start the development server
    npm run preview/dev
Now, your project should be up and running, and you can explore your DAO as a Service application.


## Features

- **User Wallet Creation**: Users can easily create DAO wallets for charitable causes.
- **Adding Members**: Users can invite members to join their cause and participate in decision-making.
- **Proposal Submissions**: Members can submit proposals, including token transfers to preferred NGOs or spending for specific charitable endeavors.
- **Voting System**: Members can cast their votes on proposals.
- **Transaction Execution**: When a proposal is approved, transactions are executed, furthering the chosen causes.

## Virality Features
- **NFT as Appreciation**: Donors are rewarded with NFTs as tokens of appreciation for their contributions, fostering a sense of recognition and gratitude.

## Contributing

We welcome contributions! If you'd like to contribute to this project, please open an issue first to discuss what you would like to change and raise PR.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## Contact

For any questions or support, feel free to contact our team Black Coffee
