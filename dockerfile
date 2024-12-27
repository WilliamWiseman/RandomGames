# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install -g --save-dep nodemon
RUN npm install -G
RUN npm install -g

# Copy the rest of the application code
COPY . .

# Expose the port the app will listen on
EXPOSE 3000

# Start the application
CMD ["nodemon", "app.js"]