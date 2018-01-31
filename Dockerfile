
FROM node:9.4

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package.json /app

# Install any needed packages specified in package.json
RUN  npm install

# Copy content 
COPY . /app

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run server when the container launches 
CMD npm start-search

