# 🚀 Sistema de Gestão de Ordens de Serviço e Indicadores

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node](https://img.shields.io/badge/node.js-backend-green)
![SQL Server](https://img.shields.io/badge/database-SQL%20Server-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 📌 Visão Geral

Sistema integrado para gerenciamento de **ordens de serviço** e registro de **indicadores de qualidade e produção**, com foco em centralização de dados, rastreabilidade operacional e suporte à tomada de decisão.

A aplicação simula um ambiente corporativo real, permitindo o controle completo das atividades operacionais e o monitoramento de desempenho por meio de indicadores (KPIs).

---

## ⚙️ Funcionalidades

### 🛠️ Ordens de Serviço
- Cadastro de ordens  
- Atualização de status  
- Registro de informações detalhadas  
- Histórico de atividades  

### 📊 Indicadores
- Registro de dados de produção e qualidade  
- Estrutura para KPIs  
- Base para dashboards  

### 🔍 Consulta
- Filtros e busca  
- Visualização de dados históricos  

---

## 🛠️ Stack Tecnológica

| Camada       | Tecnologia |
|-------------|-----------|
| Front-end   | HTML, CSS, JavaScript |
| Back-end    | Node.js (Express) |
| Banco       | Microsoft SQL Server |
| IDE         | VSCode |
| DB Tool     | SSMS |
| Versionamento | Git + GitHub |

---

## 🧱 Estrutura do Projeto

```
src/
├── app.js
└── database/
    └── connection.js
```

---


## 📡 Documentação da API

### 🔹 Criar Ordem

**POST** `/orders`

```json
{
  "sector": "Produção",
  "local": "Setor A",
  "requester": "Claudiney",
  "problem_description": "Máquina parada"
}
```

---

### 🔹 Status da API

**GET** `/`

```
API running 🚀
```

---

## 🧠 Arquitetura do Sistema

```
[ Cliente (Front-end) ]
          ↓
[ API Node.js (Express) ]
          ↓
[ SQL Server ]
```

---

## 🚀 Como Executar

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
npm install
node src/app.js
```

Acesse:
http://localhost:3000

---

## 📊 Roadmap

- [ ] Inserção de dados via API  
- [ ] Consulta de ordens (GET)  
- [ ] Atualização e exclusão  
- [ ] Dashboard de indicadores  
- [ ] Autenticação JWT  
- [ ] Swagger  

---

## 👨‍💻 Autor

**Claudiney**  

---

## 📄 Licença

MIT
