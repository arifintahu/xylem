# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Add build arguments for environment variables
ARG VITE_CHAIN_ID
ARG VITE_CHAIN_NAME
ARG VITE_CHAIN_RPC_URL
ARG VITE_CHAIN_WS_URL
ARG VITE_CHAIN_SYMBOL
ARG VITE_CHAIN_BLOCK_EXPLORER_URL

# Set environment variables from build arguments
ENV VITE_CHAIN_ID=$VITE_CHAIN_ID
ENV VITE_CHAIN_NAME=$VITE_CHAIN_NAME
ENV VITE_CHAIN_RPC_URL=$VITE_CHAIN_RPC_URL
ENV VITE_CHAIN_WS_URL=$VITE_CHAIN_WS_URL
ENV VITE_CHAIN_SYMBOL=$VITE_CHAIN_SYMBOL
ENV VITE_CHAIN_BLOCK_EXPLORER_URL=$VITE_CHAIN_BLOCK_EXPLORER_URL

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
