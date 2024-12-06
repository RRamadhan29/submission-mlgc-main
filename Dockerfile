FROM node:18

WORKDIR /app
ENV PORT 8080
ENV HOST 0.0.0.0
ENV MODEL_URL https://storage.googleapis.com/submission-ml-ramadhan/ml-prod/model.json

COPY . .
RUN npm install
EXPOSE 8080
CMD [ "npm", "run", "start"]