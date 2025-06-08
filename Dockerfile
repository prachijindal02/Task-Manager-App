# Stage 1: Build the React application
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Set the environment variable for the backend API URL during build time
# This is crucial for the frontend to know where to send requests when running in Docker Compose
ENV REACT_APP_API_BASE_URL=http://backend:5000

RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the build output from the previous stage to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration to handle routing for React (e.g., client-side routing)
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]