# Stage 1: Build
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Angular project
RUN npm run build --prod

# Stage 2: Serve
FROM nginx:stable-alpine

# Copy the built Angular app from Stage 1 to Nginx's public directory
COPY --from=build /app/dist/sooq-al-shamel/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
