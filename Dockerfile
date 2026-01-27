# Build stage
FROM oven/bun:1 AS builder

ARG DOKPLOY_URL
ARG DOKPLOY_API_TOKEN
ARG DOKPLOY_DEV_URL
ARG SOURCE_PROJECT_ID
ARG AZURE_WEBHOOK_SECRET

ENV DOKPLOY_URL=$DOKPLOY_URL
ENV DOKPLOY_API_TOKEN=$DOKPLOY_API_TOKEN
ENV DOKPLOY_DEV_URL=$DOKPLOY_DEV_URL
ENV SOURCE_PROJECT_ID=$SOURCE_PROJECT_ID
ENV AZURE_WEBHOOK_SECRET=$AZURE_WEBHOOK_SECRET

WORKDIR /app

# Copy package files first for better caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy rest of the files
COPY . ./

# Build the binary
RUN bun build src/index.ts --compile --outfile server

# Final stage
FROM debian:bookworm-slim

WORKDIR /app

# Copy only the compiled binary
COPY --from=builder /app/server ./server

# Run the binary
CMD ["./server"]
