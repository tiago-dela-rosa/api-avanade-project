# api-avanade-project
API para o projeto proposto pela Avanade.

# Instalação

Configure o MongoDB, popule o banco com o arquivo de seed que está em {CAMINHO DO ARQUIVO DE SEED},
crie um arquivo .env na raiz do projeto com a seguinte linha: DB_CONNECT = "mongodb://localhost:27017/bitbank"

Clone o projeto em seu computador e execute os seguintes comandos: 

```
npm install
npm start
```

# Overview

A API do backend foi feita usando NodeJS, com o intuito de ter endpoints que possam servir a aplicação do bitbank no frontend em Angular. Dessa forma, ela permite fazer as interações com o banco de dados em MongoDB, para Cadastrar e fazer Login de usuários, além de buscar pelas informações relacionados a conta do usuário e proteger os endpoints caso o usuário não esteja logado no sistema. Contém também as verificações necessárias que obedeçam as regras de negócio estabelicida.

# Models

Esta é a estrutura do Model de usuários (UserSchema).

## Estrutura

```js
{
    "_id": "<ID único aleatório>",
    "cpf": "<Número de CPF do usuário>",
    "password": "<Senha com hash do usuário>",
    "fullName": "<Nome Completo>",
    "email": "<email do usuário>",
    "balance": "<saldo do usuário>",
    "numberAccount": "<Número da conta do usuário>",
    "transactions": "<Objeto com as transações do usuário>" {
        "transactionId": "<ID único da transação aleatório>",
        "transactionNumberAccount": "<Número de conta de quem está sendo realizada a transação>",
        "amountTransferred":  "<Quantia transferida>",
        "transactionDate":  "<Data da transação>",
    }
}
```

# Controllers
 
Aqui está a lista dos controllers da API da bitbank, organizados em uma tabela mostrando seus métodos, estruturas, ações, parâmetros e seus respectivos retornos.


## Users

Aqui estão os usuários do banco.

| Método  | Estrutura  | Ação | Parâmetros | Retorno |
| -------- | -------- | -------- | -------- | -------- |
| POST | `/api/register` | Cadastra um usuário no banco de dados | JSON/email, password, fullName, cpf | JSON/mensagem: Usuário cadastrado com sucesso. |
| POST | `/api/login` | Inicia a sessão do usuário | JSON/cpf, password | JSON/token de autenticação. |

# Exemplos

## Register

  ```http 
 POST /api/register
 ```

<details>
<summary><code>HTTP/1.1 200 OK</code></summary>

```json
{
  "msg": "Usuário cadastrado com sucesso."
}
```
</details>

## Login

 ```http 
 POST /api/login
 ```

<details>
<summary><code>HTTP/1.1 200 OK</code></summary>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNDMxYTY3Zjc3OTNiMjQyODc4MzdiZiIsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tLmJyIn0sImlhdCI6MTU4MTQ2MDU4Nn0.mFRchKmKvtRCE_ZkQetlW_iWgpd5F-K3UpGcWJIYT1c"
}
```
</details>

