# Базовый образ
FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Копируем зависимости
COPY package*.json ./

# Устанавливаем зависимости (включая devDependencies)
RUN npm install

# Копируем весь проект
COPY . .

# Порт, который использует фронтенд (часто 3000, 8080 или 5173)
EXPOSE 8000

# Запускаем фронтенд
CMD ["npm", "start"]
