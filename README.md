# 🚀 Sistema de Gestão de Ordens de Serviço e Indicadores

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node](https://img.shields.io/badge/node.js-backend-green)
![SQL Server](https://img.shields.io/badge/database-SQL%20Server-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 📌 Visão Geral

Sistema integrado para gerenciamento de **ordens de serviço** e registro de **indicadores de qualidade e produção**, com foco em centralização de dados, rastreabilidade operacional e suporte à tomada de decisão baseada em dados.

A aplicação simula um ambiente corporativo real, permitindo o controle completo das atividades operacionais e o monitoramento de desempenho por meio de indicadores (KPIs).

---

## 🎯 Objetivos

- Centralizar informações operacionais  
- Melhorar o controle e rastreabilidade das atividades  
- Apoiar decisões baseadas em dados  
- Aplicar conceitos reais de desenvolvimento full stack  

---

## ⚙️ Funcionalidades

### 🛠️ Ordens de Serviço
- Cadastro de ordens  
- Atualização de status  
- Registro de informações detalhadas  
- Histórico de atividades  

### 📊 Indicadores
- Registro de dados de produção e qualidade  
- Estrutura para cálculo de KPIs  
- Base para dashboards  

### 🔍 Consulta e Análise
- Filtros por status, setor e período  
- Visualização de dados históricos  

---

## 🛠️ Stack Tecnológica

| Camada       | Tecnologia |
|-------------|-----------|
| Front-end   | HTML, CSS, JavaScript |
| Back-end    | Node.js (Express) |
| Banco       | Microsoft SQL Server |
| IDE         | Visual Studio Code |
| DB Tool     | SQL Server Management Studio (SSMS) |
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
├── routes/
└── database/
    └── connection.js
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

```
npm start
```

ou (modo desenvolvimento com auto-reload):

```
npx nodemon src/app.js
```

---

## 📡 Endpoints da API

### 🔹 Status da API

**GET** `/`

```
API running 🚀
```

---

### 🔹 Criar ordem de serviço

**POST** `/orders`

```
{
  "sector": "Produção",
  "local": "Setor A",
  "requester": "Claudiney",
  "problem_description": "Máquina parada"
}
```

---

### 🔹 Listar ordens de serviço

**GET** `/orders`

---

## 🧠 Arquitetura do Sistema

```
[ Front-end ]
      ↓
[ API Node.js (Express) ]
      ↓
[ SQL Server ]
```

---

## 📊 Roadmap

- [x] Estrutura inicial do projeto  
- [x] Conexão com banco de dados  
- [x] Inserção de dados via API  
- [ ] Consulta avançada  
- [ ] Atualização e exclusão de registros  
- [ ] Dashboard de indicadores  
- [ ] Autenticação (JWT)  
- [ ] Documentação com Swagger  

---

## 👨‍💻 Autor

Desenvolvido por **Claudiney**  
Projeto focado em evolução prática em desenvolvimento backend  

---

## 📄 Licença

Este projeto está sob a licença MIT.
