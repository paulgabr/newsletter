# Gamificação de Newsletter "The News"

Este projeto tem como objetivo gamificar a interação dos leitores com a newsletter "The News". Os usuários podem acompanhar seu streak e estatísticas, enquanto o administrador pode visualizar relatórios de engajamento.

## Tecnologias Utilizadas

- **Frontend**: React.js, TypeScript
- **Backend**: Node.js, TypeScript
- **Banco de Dados**: PostgreSQL


## Instruções de Execução

### Backend

1. Navegue até a pasta do backend:
```bash
   cd backend
```

2. Instale as dependências do backend:
```bash
    npm install
```

3. Crie o arquivo .env para definir as variáveis de ambiente, como configurações do banco de dados

4. Rode o backend em modo de desenvolvimento:
```bash
    npm run dev
```


### Frontend

1. Navegue até a pasta do frontend:
```bash
    cd backend
```

2. Instale as dependências do frontend:
```bash
    npm install
```

3. Rode o Frontend
```bash
    npm start
```


## Banco de Dados

O banco de dados utilizado é o PostgreSQL. Você precisa configurar o PostgreSQL na sua máquina ou usar um serviço de banco de dados remoto.

A conexão com o banco de dados é configurada através do arquivo .env no backend.


## Funcionalidades

*User Area:* Área logada onde os usuários podem acompanhar seu streak e estatísticas de engajamento com a newsletter.

*Admin Dashboard:* Área administrativa com ranking de usuários, filtros e gráficos para análise de engajamento.

*Gamificação:* Regras de streak, possíveis badges e níveis para os usuários.

*Webhook:* Implementação de webhook para registrar as aberturas de newsletters.
