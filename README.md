# 🚀 Sistema de Gestão de Ordens de Serviço e Indicadores

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node](https://img.shields.io/badge/node.js-backend-green)
![SQL Server](https://img.shields.io/badge/database-SQL%20Server-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 📌 Visão Geral

Sistema integrado para gerenciamento de **ordens de serviço** e registro de **indicadores de qualidade e produção**, com foco em centralização de dados, rastreabilidade operacional e suporte à tomada de decisão baseada em dados.

A aplicação simula um ambiente corporativo real, permitindo o controle completo das atividades operacionais e o monitoramento de desempenho por meio de indicadores (KPIs).

Projeto baseado em uma necessidade real do ambiente de trabalho, desenvolvido como solução prática e evolutiva.

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
- Filtros por query params  
- Ordenação por query params  
- Expansão do modelo com `status`, `priority`, `type` e `request_date`
- Validação de campos obrigatórios via middleware  
- Validação do parâmetro `id` nas rotas  
- Separação da lógica de negócio em camada de services  
- Padronização das respostas da API em JSON  
- Tratamento global para rotas não encontradas  
- Estrutura preparada para tratamento centralizado de erros  
- Registro de informações detalhadas  

### 📊 Indicadores
- Estrutura preparada para futura implementação  
- Base para cálculo de KPIs  

### 🔍 Consulta e Análise
- Consulta de dados via API  
- Filtros por setor, solicitante, local, status e prioridade  
- Ordenação por ID e data de solicitação  
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
- nodemon (dev)  

---

## 🧱 Estrutura do Projeto

```text
src/
│
├── app.js
├── controllers/
│   └── ordersController.js
├── routes/
│   └── ordersRoutes.js
├── middlewares/
│   ├── orderValidationMiddleware.js
│   ├── validateIdMiddleware.js
│   ├── notFoundMiddleware.js
│   └── errorHandlerMiddleware.js
├── services/
│   └── ordersService.js
├── database/
│   └── connection.js
└── utils/
    └── validateOrder.js
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DB_SERVER=localhost
DB_DATABASE=hatchery_control
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Csld72k/hatchery-control.git
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar banco de dados

- Criar o banco no SQL Server  
- Atualizar as credenciais no `.env`

### 4. Executar o projeto

Modo padrão:

```bash
npm start
```

Modo desenvolvimento:

```bash
npm run dev
```

---

## 📡 Endpoints da API

### 🔹 Status da API
**GET** `/`

### 🔹 Criar ordem de serviço
**POST** `/orders`

### 🔹 Listar ordens de serviço
**GET** `/orders`

### 🔹 Listar ordens com filtros e ordenação
**GET** `/orders?sector=Maintenance&status=Open&sortBy=request_date&order=desc`

### 🔹 Buscar por ID
**GET** `/orders/:id`

### 🔹 Atualizar ordem de serviço
**PUT** `/orders/:id`

### 🔹 Deletar ordem de serviço
**DELETE** `/orders/:id`

---

## 📝 Exemplo de payload

### POST /orders

```json
{
  "sector": "Maintenance",
  "local": "Room 1",
  "requester": "Claudiney",
  "problem_description": "Fix lamp",
  "status": "Open",
  "priority": "High",
  "type": "Electrical",
  "request_date": "2026-04-11"
}
```

---

## ✅ Regras de Validação

### Campos obrigatórios:
- `sector`
- `local`
- `requester`
- `problem_description`

### Campos opcionais:
- `status`
- `priority`
- `type`
- `request_date`

### Regras atuais:
- campos obrigatórios devem existir  
- campos de texto devem ser strings válidas  
- nenhum campo obrigatório pode estar vazio ou conter apenas espaços  
- `request_date`, quando enviada, deve estar no formato `YYYY-MM-DD`  
- o parâmetro `id` deve ser um número inteiro positivo  

---

## 🔎 Filtros disponíveis

Na rota `GET /orders`, você pode usar:

- `sector`
- `requester`
- `local`
- `status`
- `priority`
- `type`

Exemplo:

```bash
/orders?sector=Maintenance
/orders?requester=Claudiney
/orders?local=Room 1
/orders?status=Open&priority=High
/orders?type=Electrical
```

---

## ↕️ Ordenação disponível

Na rota `GET /orders`, você pode usar:

- `sortBy=id`
- `sortBy=request_date`
- `order=asc`
- `order=desc`

Exemplo:

```bash
/orders?sortBy=id&order=desc
/orders?sortBy=request_date&order=asc
```

---

## 🧠 Arquitetura do Sistema

```text
Route → ID Validation Middleware → Body Validation Middleware → Controller → Service → Database
                                                    ↓
                                          Not Found / Error Handler
```

---

## 📊 Padrão de Resposta da API

### Sucesso simples
```json
{
  "message": "Order saved successfully."
}
```

### Sucesso com dados
```json
{
  "message": "Orders fetched successfully.",
  "data": []
}
```

### Erro
```json
{
  "message": "Order not found."
}
```

---

## 🗄️ Melhorias no Banco de Dados

### Evolução da tabela

```sql
ALTER TABLE service_orders ADD status VARCHAR(50) NULL;
ALTER TABLE service_orders ADD priority VARCHAR(50) NULL;
ALTER TABLE service_orders ADD type VARCHAR(50) NULL;
ALTER TABLE service_orders ADD request_date DATE NULL;
```

### Índices recomendados

```sql
CREATE INDEX idx_service_orders_sector ON service_orders(sector);
CREATE INDEX idx_service_orders_requester ON service_orders(requester);
CREATE INDEX idx_service_orders_local ON service_orders(local);
CREATE INDEX idx_service_orders_status ON service_orders(status);
CREATE INDEX idx_service_orders_priority ON service_orders(priority);
CREATE INDEX idx_service_orders_type ON service_orders(type);
CREATE INDEX idx_service_orders_request_date ON service_orders(request_date);
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
- [x] Refatoração para camada de services
- [x] Padronização das respostas em JSON
- [x] Tratamento global para rotas não encontradas
- [x] Estrutura inicial para tratamento centralizado de erros
- [x] Validação do parâmetro ID nas rotas
- [x] Filtros via query params
- [x] Ordenação via query params
- [x] Expansão do modelo de ordens
- [ ] Implementação de indicadores
- [ ] Autenticação (JWT)
- [ ] Documentação com Swagger

---

## 👨‍💻 Autor

Desenvolvido por **Claudiney**  
Projeto focado em evolução prática em desenvolvimento backend  

---

## 📄 Licença

Este projeto está sob a licença MIT.
