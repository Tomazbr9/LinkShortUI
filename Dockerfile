FROM node:22-alpine

FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm run build 

FROM nginxinc/nginx-unprivileged:latest AS runner

USER nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY --chown=nginx:nginx --from=builder /app/dist/*/browser /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]