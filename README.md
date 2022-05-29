# ClickSoftChallenge

### Ferramentas

- Banco de dados Postgres, através do [Docker](https://hub.docker.com/)
- FrameWork [AdonisJS](https://adonisjs.com/)


### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone https://github.com/1MaaaaaacK/ClickSoftChallenge

# Instale as dependências
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

### 🎲 Configuração Banco de Dados Postgres (servidor)

```bash
# Crie o arquivo .env na raiz do projeto
# Adicione as seguintes informações a esse arquivo

PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=wofubeoL7QKrLAlbcPYYQvBl3fIVMkAI
DRIVE_DISK=local
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=docker
PG_DB_NAME=postgres

#Ligue seu banco de dados

# Execute o comando a seguir dentro da pasta do projeto para criar as tabelas
$ yarn ace migration:run
```

### 🎲 Rotas da Aplicação

```bash
# Lista todos os alunos
GET|HEAD     /api/students

# Cria um novo aluno
POST         /api/students

# Procura um aluno pelo ID 
GET|HEAD     /api/students/:id

# Edita os dados de um aluno
PUT|PATCH    /api/students/:id

# Deleta um aluno pelo ID
DELETE       /api/students/:id

# Lista todos os professores
GET|HEAD     /api/teachers

# Cria um novo professor
POST         /api/teachers

# Procura um professor pelo ID
GET|HEAD     /api/teachers/:id

# Edita os dados de um professor
PUT|PATCH    /api/teachers/:id

# Deleta um professor pelo ID
DELETE       /api/teachers/:id

# Lista todas as salas
GET|HEAD     /api/classroom

# Cria uma nova sala
POST         /api/classroom

# Procura uma sala pelo ID
GET|HEAD     /api/classroom/:id

# Edita os dados de uma sala
PUT|PATCH    /api/classroom/:id

# Deleta uma sala pelo ID
DELETE       /api/classroom/:id

# Adiciona um aluno a uma sala
POST         /api/classroom/students

# Mostra todas as salas de um aluno específico
GET|HEAD     /api/classroom/students/:id

# Mostra todos os alunos da sala especificada
GET|HEAD     /api/classroom/teacher/:id

# Remove um aluno de uma sala
DELETE       /api/classroom/students/:student_id/:class_id
```
