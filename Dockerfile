FROM node:20-alpine AS build-stage
ARG VITE_API_BASE_URL
ARG VITE_USERNAME
ARG VITE_PAGE_DESCRIPTION
ENV VITE_API_BASE_URL="https://api.alexis-thierry.com"
ENV VITE_USERNAME="AlexThry"
ENV VITE_PAGE_DESCRIPTION="Étudiant ingénieur en data et développeur web sur des projets internes en entreprise, j’adore explorer la data science et développer des idées en code. Pas de projets extravagants ici, mais sur GitHub, c’est une collection de petits et grands projets qui reflètent ma curiosité et mon goût pour le travail bien fait."
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