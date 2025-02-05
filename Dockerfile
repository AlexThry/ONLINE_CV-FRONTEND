FROM node:20-alpine AS build-stage
ARG VITE_API_BASE_URL
ARG VITE_USERNAME
ARG VITE_PAGE_DESCRIPTION
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_USERNAME=$VITE_USERNAME
ENV VITE_PAGE_DESCRIPTION=$VITE_PAGE_DESCRIPTION
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM busybox:1.35
RUN adduser -D static
USER static
WORKDIR /home/static
COPY --from=build-stage /app/dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "8000"]