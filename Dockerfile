FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --production

# Copy build output and required files
COPY .next .next
COPY public public


EXPOSE 3000

CMD ["npm", "start"]
