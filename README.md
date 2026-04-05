# 🚀 Sistema de Gestão de Ordens de Serviço e Indicadores

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node](https://img.shields.io/badge/node.js-backend-green)
![SQL Server](https://img.shields.io/badge/database-SQL%20Server-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 📌 Visão Geral

Sistema integrado para gerenciamento de **ordens de serviço** e registro de **indicadores de qualidade e produção**, com foco em centralização de dados, rastreabilidade operacional e suporte à tomada de decisão baseada em dados.

A aplicação simula um ambiente corporativo real, permitindo o controle completo das atividades operacionais e o monitoramento de desempenho por meio de indicadores (KPIs).

Baseado em uma necessidade real do ambiente de trabalho.

---

## 🎯 Objetivos

- Centralizar informações operacionais  
- Melhorar o controle e rastreabilidade das atividades  
- Apoiar decisões baseadas em dados  
- Aplicar conceitos reais de desenvolvimento full stack  

---

## ⚙️ Funcionalidades

### 🛠️ Ordens de Serviço
- Cadastro de ordens via API  
- Listagem de ordens  
- Consulta por ID  
- Atualização de ordens  
- Exclusão de ordens  
- Validação de campos obrigatórios via middleware  
- Registro de informações detalhadas  

### 📊 Indicadores
- Estrutura preparada para futura implementação  
- Base para cálculo de KPIs 

### 🔍 Consulta e Análise
- Consulta de dados via API  
- Base para filtros e análises futuras  

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Front-end | HTML, CSS, JavaScript |
| Back-end | Node.js (Express) |
| Banco | Microsoft SQL Server |
| IDE | Visual Studio Code |
| DB Tool | SQL Server Management Studio (SSMS) |
| Versionamento | Git + GitHub |

---

## 📦 Dependências Principais

- express  
- mssql  
- dotenv  
- cors  

---

## 🧱 Estrutura do Projeto

```
src/
│
├── app.js
├── controllers/
│   └── ordersController.js
├── routes/
│   └── ordersRoutes.js
├── middlewares/
│   └── orderValidationMiddleware.js
├── database/
│   └── connection.js
└── utils/
    └── validateOrder.js
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```
PORT=3000
DB_SERVER=localhost
DB_DATABASE=hatchery_control
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```
git clone https://github.com/Csld72k/hatchery-control.git
```

---

### 2. Instalar dependências

```
npm install
```

---

### 3. Configurar banco de dados

- Criar o banco no SQL Server  
- Atualizar as credenciais no `.env` ou no `connection.js`

---

### 4. Executar o projeto

Modo padrão:

```
npm start
```

Modo desenvolvimento (auto-reload):

```
npm run dev
```

---

## 📡 Endpoints da API

### 🔹 Status da API
**GET** `/`

---

### 🔹 Criar ordem de serviço
**POST** `/orders`

---

### 🔹 Listar ordens de serviço
**GET** `/orders`

---

### 🔹 Busca por ID
**GET** `/orders/:id`

---

### 🔹 Atualizar ordem de serviço
**PUT** `/orders/:id`

---

### 🔹 Deletar ordem de serviço
**DELETE** `/orders/:id`

---

### ✅ Regras de Validação

#### Campos obrigatórios para criação e atualização de ordens:

* Sector
* Local
* Requester
* Problem_description

#### Regras atuais:

* Todos devem existir
* Todos devem ser texto
* Nenhum pode estar vazio ou conter apenas espaços

---

## 🧠 Arquitetura do Sistema

Fluxo atual da aplicação:

```
Route → Validation Middleware → Controller → Database
```

---

## 📊 Roadmap

- [x] Estrutura inicial do projeto
- [x] Separação em camadas (Routes + Controllers)
- [x] Conexão com banco de dados
- [x] Inserção de dados via API
- [x] Listagem de dados via API
- [x] Consulta por ID
- [x] Atualização de registros (PUT)
- [x] Exclusão de registros (DELETE)
- [x] Validação manual de dados
- [x] Variáveis de ambiente no código
- [x] Refatoração da validação para middleware
- [ ] Implementação de indicadores
- [ ] Refatoração para camada de services
- [ ] Autenticação (JWT)
- [ ] Documentação com Swagger

---

## 👨‍💻 Autor

Desenvolvido por **Claudiney**  
Projeto focado em evolução prática em desenvolvimento backend  

---

## 📄 Licença

Este projeto está sob a licença MIT.
