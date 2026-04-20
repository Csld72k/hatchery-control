# 🚀 Sistema de Gestão de Ordens de Serviço

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node](https://img.shields.io/badge/node.js-backend-green)
![SQL Server](https://img.shields.io/badge/database-SQL%20Server-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 📌 Visão Geral

Sistema para gerenciamento de **ordens de serviço** com foco em centralização de dados, rastreabilidade operacional e evolução para uso real na empresa.

> **Prioridade atual:** concluir o módulo de **ordens de serviço** e colocá-lo em uso real na empresa antes de iniciar o desenvolvimento do módulo de indicadores.

---

## 🎯 Objetivos

- Centralizar informações operacionais
- Melhorar o controle e a rastreabilidade das atividades
- Apoiar decisões baseadas em dados
- Aplicar conceitos reais de desenvolvimento full stack
- Evoluir o módulo de ordens para um fluxo operacional real com múltiplos perfis de usuário

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
- Estrutura de histórico/auditoria para status, atribuições, remarcações, pausas e comentários
- Integração inicial do backend com histórico/auditoria

### 📊 Indicadores
- Estrutura pausada temporariamente
- Evolução futura após a conclusão do módulo de ordens de serviço

---

## 👥 Perfis de Usuário Planejados

1. **Solicitante (Requester)** — abre a ordem de serviço.
2. **Encarregado de Manutenção (Maintenance Coordinator)** — direciona a ordem, define previsão, altera prioridade e acompanha o fluxo.
3. **Mantenedor (Maintainer)** — executa o serviço, registra solução, horários e andamento.
4. **Supervisão / Gerência (Manager / Supervisor)** — consulta as ordens sem editar.

---

## 🔄 Fluxo Planejado da Ordem de Serviço

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
    ├── step25_26_full_reset.sql
    └── step27_service_order_history_tables.sql
```

---

## ⚙️ Variáveis de Ambiente

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

Para ambiente limpo, execute:

```sql
database/scripts/step25_26_full_reset.sql
database/scripts/step27_service_order_history_tables.sql
```

### 4. Executar o projeto

```bash
npm run dev
```

---

## 📡 Endpoints da API

- **GET** `/`
- **POST** `/orders`
- **GET** `/orders`
- **GET** `/orders/:id`
- **PUT** `/orders/:id`
- **DELETE** `/orders/:id`

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
  "action_user_id": 2,
  "sector_id": 2,
  "requester_user_id": 3,
  "current_maintainer_user_id": 11,
  "assignment_change_reason": "Direcionamento inicial da manutenção.",
  "location": "Máquina de classificação",
  "service_description": "Troca de correia do equipamento",
  "solution_description": "Correia substituída e equipamento testado.",
  "type": "Corretiva",
  "priority": "Alta",
  "status": "Em execução",
  "status_change_reason": "Serviço iniciado pelo mantenedor.",
  "expected_date": "2026-04-15",
  "reschedule_reason": "Aguardando liberação da linha.",
  "completion_date": null,
  "comment_type": "Encarregado",
  "comment_text": "Prioridade mantida como alta."
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

### Campo obrigatório para atualização com auditoria

- `action_user_id`

### Campos opcionais

- `current_maintainer_user_id`
- `solution_description`
- `type`
- `status`
- `expected_date`
- `completion_date`
- `status_change_reason`
- `assignment_change_reason`
- `reschedule_reason`
- `pause_reason`
- `comment_type`
- `comment_text`

### Regras atuais

- `sector_id`, `requester_user_id`, `current_maintainer_user_id` e `action_user_id` devem ser inteiros positivos quando informados
- `priority` deve ser `Baixa`, `Média` ou `Alta`
- `type`, quando informado, deve ser `Corretiva` ou `Preventiva`
- `status`, quando informado, deve seguir os status permitidos do fluxo
- `expected_date` e `completion_date`, quando informadas, devem estar no formato `YYYY-MM-DD`
- se `expected_date` for alterada, deve ser enviada uma `reschedule_reason`
- se o status mudar para `Pausado`, deve ser enviada uma `pause_reason`

---

## 🔎 Filtros disponíveis

- `sector`
- `requester`
- `maintainer`
- `location`
- `status`
- `priority`
- `type`

---

## ↕️ Ordenação disponível

- `sortBy=id`
- `sortBy=request_date`
- `sortBy=expected_date`
- `sortBy=completion_date`
- `sortBy=created_at`
- `order=asc`
- `order=desc`

---

## 🗄️ Banco de Dados

### Estrutura principal

- `sectors`
- `roles`
- `users`
- `user_roles`
- `service_orders`

### Tabelas de histórico/auditoria

- `service_order_status_history`
- `service_order_assignments`
- `service_order_reschedules`
- `service_order_pauses`
- `service_order_comments`

---

## 🕓 Histórico e Auditoria

A partir desta etapa, o backend começa a preparar o registro automático de eventos:

- criação da ordem → registra status inicial
- alteração de status → registra histórico de status
- troca de mantenedor → registra atribuição
- remarcação de data prevista → registra remarcação
- pausa → registra pausa com justificativa
- comentário → registra comentário vinculado à ordem

---

## 📊 Roadmap

- [x] Estrutura inicial do projeto
- [x] Separação em camadas
- [x] Conexão com banco de dados
- [x] CRUD de ordens de serviço
- [x] Validações com middleware
- [x] Camada de services
- [x] Respostas em JSON
- [x] Filtros e ordenação
- [x] Base de usuários, papéis e setores
- [x] Modelo relacional de ordens
- [x] Full reset do banco
- [x] Tabelas de histórico/auditoria
- [x] Integração inicial do backend com histórico/auditoria
- [ ] Melhorar consistência com transações SQL
- [ ] Regras de negócio por perfil
- [ ] Interface do módulo de ordens
- [ ] Colocar o módulo em uso real na empresa
- [ ] Indicadores
- [ ] Autenticação JWT
- [ ] Swagger

---

## 👨‍💻 Autor

Desenvolvido por **Claudiney**  
Projeto focado em evolução prática em desenvolvimento backend.

---

## 📄 Licença

MIT
