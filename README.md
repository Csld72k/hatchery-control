# 🚀 Sistema de Gestão de Ordens de Serviço

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node](https://img.shields.io/badge/node.js-backend-green)
![SQL Server](https://img.shields.io/badge/database-SQL%20Server-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 📌 Visão Geral

Sistema para gerenciamento de **ordens de serviço** com foco em centralização de dados, rastreabilidade operacional e evolução para uso real na empresa.

O projeto começou a partir de uma necessidade real do ambiente de trabalho e está sendo evoluído de forma prática, saindo de um CRUD simples para um modelo mais próximo de um fluxo operacional de manutenção.

> **Prioridade atual:** concluir o módulo de **ordens de serviço** e colocá-lo em uso real na empresa antes de iniciar o desenvolvimento do módulo de indicadores.

---

## 🎯 Objetivos

- Centralizar informações operacionais
- Melhorar o controle e a rastreabilidade das atividades
- Apoiar decisões baseadas em dados
- Aplicar conceitos reais de desenvolvimento full stack
- Evoluir o módulo de ordens de serviço para um fluxo operacional real com múltiplos perfis de usuário

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
- Validação de campos obrigatórios via middleware
- Validação do parâmetro `id` nas rotas
- Separação da lógica de negócio em camada de services
- Padronização das respostas da API em JSON
- Tratamento global para rotas não encontradas
- Estrutura preparada para tratamento centralizado de erros
- Base criada para suportar usuários, papéis e setores
- Modelo relacional consolidado para ordens de serviço

### 📊 Indicadores
- Estrutura pausada temporariamente
- Evolução futura após a conclusão do módulo de ordens de serviço

### 🔍 Consulta e Análise
- Consulta de dados via API
- Filtros por setor, solicitante, mantenedor, local, status, prioridade e tipo
- Ordenação por ID, data da solicitação, data prevista, data de conclusão e data de criação

---

## 👥 Perfis de Usuário Planejados

O sistema está sendo remodelado para suportar 4 perfis principais:

1. **Solicitante (Requester)**  
   Usuário que abre a ordem de serviço.

2. **Encarregado de Manutenção (Maintenance Coordinator)**  
   Responsável por direcionar a ordem ao mantenedor, definir previsão, alterar prioridade e acompanhar o fluxo.

3. **Mantenedor (Maintainer)**  
   Usuário que executa o serviço, registra solução, horários e andamento.

4. **Supervisão / Gerência (Manager / Supervisor)**  
   Perfil com acesso somente para consulta.

---

## 🔄 Fluxo Planejado da Ordem de Serviço

Fluxo principal previsto para o processo operacional:

- `Aguardando resposta`
- `Direcionado`
- `Em execução`
- `Pausado`
- `Aguardando validação`
- `Concluído`
- `Cancelado`

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

database/
└── scripts/
    ├── step23_users_roles_sector.sql
    ├── step24_service_orders_remodel.sql
    ├── step25_service_orders_cleanup.sql
    ├── step25_reset_and_seed.sql
    ├── step25_26_full_reset.sql
    └── step26_seed_initial_date.sql
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

#### Opção recomendada para ambiente limpo
Executar o script:

```sql
database/scripts/step25_26_full_reset.sql
```

Esse script:
- remove as tabelas atuais do módulo
- recria toda a estrutura principal
- cria índices e constraints
- insere os dados modelo iniciais

#### Scripts históricos de evolução
Os scripts `step23` e `step24` foram mantidos no projeto como histórico de evolução da modelagem.

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
**GET** `/orders?sector=Sala%20de%20ovos&status=Direcionado&sortBy=request_date&order=desc`

### 🔹 Buscar por ID
**GET** `/orders/:id`

### 🔹 Atualizar ordem de serviço
**PUT** `/orders/:id`

### 🔹 Deletar ordem de serviço
**DELETE** `/orders/:id`

---

## 📝 Exemplos de payload

### POST /orders

```json
{
  "sector_id": 2,
  "requester_user_id": 3,
  "location": "Máquina de classificação",
  "service_description": "Troca de correia do equipamento",
  "priority": "Alta"
}
```

### PUT /orders/:id

```json
{
  "sector_id": 2,
  "requester_user_id": 3,
  "current_maintainer_user_id": 11,
  "location": "Máquina de classificação",
  "service_description": "Troca de correia do equipamento",
  "solution_description": "Correia substituída e equipamento testado.",
  "type": "Corretiva",
  "priority": "Alta",
  "status": "Em execução",
  "expected_date": "2026-04-15",
  "completion_date": null
}
```

---

## ✅ Regras de Validação

### Campos obrigatórios no payload atual
- `sector_id`
- `requester_user_id`
- `location`
- `service_description`
- `priority`

### Campos opcionais
- `current_maintainer_user_id`
- `solution_description`
- `type`
- `status`
- `expected_date`
- `completion_date`

### Regras atuais
- `sector_id` e `requester_user_id` devem ser inteiros positivos
- `current_maintainer_user_id`, quando informado, deve ser inteiro positivo
- `location` e `service_description` devem ser textos válidos
- `priority` deve ser `Baixa`, `Média` ou `Alta`
- `type`, quando informado, deve ser `Corretiva` ou `Preventiva`
- `status`, quando informado, deve seguir os status permitidos do fluxo
- `expected_date` e `completion_date`, quando informadas, devem estar no formato `YYYY-MM-DD`
- o parâmetro `id` deve ser um número inteiro positivo

---

## 🔎 Filtros disponíveis

Na rota `GET /orders`, você pode usar:

- `sector`
- `requester`
- `maintainer`
- `location`
- `status`
- `priority`
- `type`

Exemplo:

```bash
/orders?sector=Sala de ovos
/orders?requester=Esmeralda
/orders?maintainer=Gesiel
/orders?location=Máquina
/orders?status=Em execução&priority=Alta
/orders?type=Corretiva
```

---

## ↕️ Ordenação disponível

Na rota `GET /orders`, você pode usar:

- `sortBy=id`
- `sortBy=request_date`
- `sortBy=expected_date`
- `sortBy=completion_date`
- `sortBy=created_at`
- `order=asc`
- `order=desc`

Exemplo:

```bash
/orders?sortBy=id&order=desc
/orders?sortBy=request_date&order=asc
/orders?sortBy=expected_date&order=asc
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

## 🗄️ Banco de Dados

### Estrutura de usuários e permissões

```sql
CREATE TABLE sectors (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NULL,
    sector_id INT NULL,
    is_active BIT NOT NULL DEFAULT 1,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT FK_users_sector FOREIGN KEY (sector_id) REFERENCES sectors(id)
);

CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT FK_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT FK_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

### Modelo atual da tabela `service_orders`

Campos principais:
- `id`
- `sector_id`
- `requester_user_id`
- `current_maintainer_user_id`
- `location`
- `request_date`
- `service_description`
- `solution_description`
- `type`
- `priority`
- `status`
- `expected_date`
- `completion_date`
- `service_start_at`
- `service_end_at`
- `created_at`
- `updated_at`

### Estratégia adotada
- colunas legadas removidas
- backend adaptado para o novo modelo
- dados modelo reinseridos já no padrão novo
- IDs relacionais agora fazem parte da estrutura principal das ordens

---

## 🧭 Próxima Evolução de Modelagem

O módulo de ordens será expandido com tabelas de histórico / auditoria:

- `service_order_status_history`
- `service_order_assignments`
- `service_order_reschedules`
- `service_order_pauses`
- `service_order_comments`

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
- [x] Criação da base de usuários, papéis e setores no banco
- [x] Remodelagem da tabela principal `service_orders`
- [x] Remoção de colunas legadas e adaptação do backend
- [x] Reinserção de dados modelo coerentes com a nova modelagem
- [ ] Criação das tabelas de histórico
- [ ] Regras de negócio por perfil
- [ ] Interface do módulo de ordens
- [ ] Colocar o módulo em uso real na empresa
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
