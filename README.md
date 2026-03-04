# ![Xylem Logo](public/icon.svg) Xylem



A highly responsive, serverless EVM blockchain explorer that operates entirely in the browser.

> **Just as xylem tissue transports nutrients directly from a plant's roots to its leaves, this application connects directly to JSON-RPC and WebSocket (WSS) endpoints, bypassing centralized indexers entirely.**

Xylem provides developers with a minimalist, clean, and unfiltered way to stream live blocks, inspect transactions, and monitor network health in real-time. It is designed as a **stateless, backendless EVM explorer**, ensuring privacy and direct interaction with the blockchain.

## Features

-   **Stateless & Backendless**: Connects directly to RPC nodes; no intermediary servers or databases.
-   **Real-time Updates**: Live streaming of blocks and transactions.
-   **Block Explorer**: View detailed block information, including gas usage, miner details, and transaction lists.
-   **Transaction Details**: Inspect transaction status, value, and gas fees.
-   **Address Details**: Check wallet balances, transaction counts, and contract bytecode.
-   **Multi-Network Support**: Easily switch between supported networks.
-   **Global Search**: Quickly find blocks, transactions, or addresses.
-   **Gas Tracker**: Monitor current gas prices.

## Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **Styling**: Tailwind CSS
-   **State Management**: Zustand
-   **Blockchain Interaction**: Viem, Wagmi
-   **Routing**: React Router
-   **Icons**: Lucide React

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Project Structure

-   `src/components`: Reusable UI components (BlockList, GasWidget, etc.)
-   `src/pages`: Application pages (Dashboard, BlockDetails, etc.)
-   `src/store`: Global state management (Zustand stores)
-   `src/hooks`: Custom React hooks for data fetching
-   `src/config`: Configuration files (Wagmi, Chain settings)

## License

MIT
