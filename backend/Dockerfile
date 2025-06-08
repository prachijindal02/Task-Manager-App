# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY src/ ./src/

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]