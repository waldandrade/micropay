# Etapa 1: Build da aplicação
FROM node:22 AS builder

WORKDIR /app

# Instala apenas dependências necessárias para build
COPY package*.json ./
RUN npm install --only=production

# Copia os arquivos da aplicação
COPY . .

# Generate swagger-output.json
RUN npm run swagger

# Compila o TypeScript (se aplicável)
RUN npm run build

# Etapa 2: Imagem final para produção
FROM node:20-alpine AS production

WORKDIR /app

# Cria um usuário não-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copia apenas os arquivos necessários
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Define variáveis de ambiente
ENV NODE_ENV=production

# Usa usuário não-root
USER appuser

# Expõe a porta da API
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]