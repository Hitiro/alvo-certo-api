FROM node:fermium-buster
WORKDIR /app
COPY ["package.json", "package-lock.json*", ".git", "./"]
RUN npm install
COPY . /app
CMD ["npm", "run", "dev"]
