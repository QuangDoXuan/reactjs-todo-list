# Use official Node.js image as the base image
FROM node:18.19.0-alpine as development

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose port 3000 for development server
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]