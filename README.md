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

## Configuration

Xylem uses environment variables to configure the blockchain connection. Create a `.env` file in the root directory (copy from `.env.example`):

| Variable | Description | Default (Sepolia) |
|----------|-------------|-------------------|
| `VITE_CHAIN_ID` | The Chain ID of the network | `11155111` |
| `VITE_CHAIN_NAME` | The display name of the network | `Sepolia` |
| `VITE_CHAIN_RPC_URL` | The HTTP JSON-RPC endpoint | `https://rpc.sepolia.org` |
| `VITE_CHAIN_WS_URL` | The WebSocket (WSS) endpoint | `wss://rpc.sepolia.org` |
| `VITE_CHAIN_SYMBOL` | The native currency symbol | `ETH` |
| `VITE_CHAIN_BLOCK_EXPLORER_URL` | URL to an external block explorer (optional) | `https://sepolia.etherscan.io` |

**Note**: Since Xylem is a client-side application, these variables are embedded into the build. You must provide them at build time.

## Deployment

<details>
<summary><strong>Docker</strong></summary>

Build and run the application in a container. You can pass environment variables as build arguments.

```bash
# Build the Docker image with custom RPC (example: Mainnet)
docker build \
  --build-arg VITE_CHAIN_ID=1 \
  --build-arg VITE_CHAIN_NAME="Ethereum Mainnet" \
  --build-arg VITE_CHAIN_RPC_URL="https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY" \
  --build-arg VITE_CHAIN_WS_URL="wss://eth-mainnet.g.alchemy.com/v2/YOUR_KEY" \
  --build-arg VITE_CHAIN_SYMBOL="ETH" \
  -t xylem-explorer .

# Run the container
docker run -p 8080:80 xylem-explorer
```

The application will be available at `http://localhost:8080`.

</details>

<details>
<summary><strong>Vercel</strong></summary>

Xylem is optimized for Vercel deployment.

1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```

2.  **Deploy**:
    Set the environment variables in the Vercel Dashboard or `vercel.json` (not recommended for secrets) before deploying.
    ```bash
    vercel --env VITE_CHAIN_RPC_URL="https://..." --env VITE_CHAIN_ID=1 ...
    ```

Alternatively, push to GitHub and connect your repository to Vercel for automatic deployments. A `vercel.json` is included for configuration.

</details>

<details>
<summary><strong>Nginx</strong></summary>

To deploy manually with Nginx:

1.  **Build the project**:
    ```bash
    npm run build
    ```

2.  **Configure Nginx**:
    Use the provided `nginx.conf` as a template. Copy it to `/etc/nginx/sites-available/xylem` and symlink to `sites-enabled`.

3.  **Copy files**:
    Copy the contents of the `dist` folder to your Nginx root (e.g., `/var/www/xylem`).

</details>

## License

MIT
