# Pull Docker Hub base image
FROM node:17-alpine3.14
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN npm install nodemon
RUN npm install -qy
# Copy app to container
COPY . .
# Run the "dev" script in package.json
CMD ["npm", "run", "start"]