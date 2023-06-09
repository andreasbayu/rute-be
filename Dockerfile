FROM node:lts AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:lts

# ENV DATABASE_URL="mongodb+srv://samtron:sandalcepit@proyekinformatika.tkatqm7.mongodb.net/ptik?retryWrites=true&w=majority"

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/modules ./modules

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
