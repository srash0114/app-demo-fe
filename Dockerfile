# Sử dụng Node.js bản nhẹ
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package và cài dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build ứng dụng Next.js (.next)
RUN npm run build

# Tạo thư mục logs và cấp quyền (nếu app frontend có ghi log server-side)
RUN mkdir -p /app/logs && chown -R node:node /app/logs

# Chạy dưới quyền user node
USER node

# Expose cổng 3000 (Mặc định của Nextjs)
EXPOSE 3000

# Start ứng dụng
CMD ["npm", "start"]