# # Pull Docker Hub base image
# FROM node:17-alpine3.14
# # Set working directory
# WORKDIR /usr/app
# # Install app dependencies
# COPY package*.json ./
# RUN npm install -qy
# # Copy app to container
# COPY . .
# # Run the "dev" script in package.json
# CMD ["npm", "run", "dev"]

# Pull Docker Hub base image
FROM node:17-alpine3.14 as build
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN npm install -qy
# Copy app to container
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build  /usr/app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]