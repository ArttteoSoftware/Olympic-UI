# Use an official Node.js runtime as the base image
FROM node:18-alpine


# Set the environment to development
ENV NODE_ENV=development

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
RUN npm run build

# Change the exposed port to 4000
EXPOSE 4000

# Command to run the application
CMD ["npm", "start"]
