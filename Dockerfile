# Container base image
FROM node:16-slim

# Set to a non-root built-in user `node`
USER root

# Install necessary build tools
RUN apt-get update
RUN apt-get install -y make gcc g++

# Set to a non-root built-in user `node`
USER node

# Create worker directory (with user `node`)
RUN mkdir -p /home/node/worker
WORKDIR /home/node/worker

# Install app dependencies
COPY --chown=node package*.json ./
RUN npm install

# Copy app resources
COPY --chown=node . .

# Build the app
RUN npm run rebuild

# Remove source code and build configuration
RUN rm -rf src tsconfig.json tsconfig.tsbuildinfo

CMD [ "node", "." ]
