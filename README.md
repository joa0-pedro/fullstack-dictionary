
# Dictionary App

Este é um projeto de dicionário que permite ao usuário buscar por palavras, visualizar suas definições, fonética e exemplos, além de adicionar palavras aos favoritos. O backend foi desenvolvido em **Laravel**, enquanto o frontend utiliza **Next.js** e **Shadcn UI** para a interface.

## Tecnologias Utilizadas

### Frontend:
- **Next.js** (utilizando a pasta `app`)
- **React**
- **Shadcn UI** para estilização de componentes
- **React Icons** para ícones

### Backend:
- **Laravel** 11
- **MySQL** como banco de dados

### Outros:
- **AdonisJS** (para outras funcionalidades relacionadas ao backend)
- **JWT** para autenticação e autorização
- **React Context API** para gerenciar estado

## Funcionalidades

- **Busca de Palavras**: Busca detalhada de palavras, exibindo definições, fonética e exemplos.
- **Favoritar Palavras**: Os usuários podem favoritar palavras através da rota `/entries/en/:word/favorite`. As palavras são salvas no banco de dados.
- **Autenticação JWT**: Utiliza JWT para autenticação segura de usuários.
- **Salvamento de Palavras Favoritas**: Ao favoritar uma palavra, ela é persistida no banco de dados MySQL.

## Como Rodar o Projeto

### Requisitos:

- **PHP** >= 8.1
- **Composer**
- **Node.js** >= 18
- **MySQL**
- **NPM** ou **Yarn**

### Backend (Laravel)

1. Clone o repositório.
2. Navegue até o diretório `/api` e instale as dependências com o Composer:

   ```
   composer install
   ```

3. Configure o arquivo `.env` com as credenciais do seu banco de dados e a chave JWT.
4. Execute as migrações para criar as tabelas no banco de dados:

   ```
   php artisan migrate
   ```

5. Gere a chave da aplicação:

   ```
   php artisan key:generate
   ```

6. Inicie o servidor local:

   ```
   php artisan serve
   ```

### Frontend (Next.js)

1. Navegue até o diretório `/web` e instale as dependências:

   ```
   yarn
   ```

2. Inicie o servidor de desenvolvimento:

   ```
   yarn dev
   ```

3. Acesse a aplicação no navegador em `http://localhost:3000`.

## Melhorias Futuras

- Adicionar testes unitários para validação de funcionalidades principais.
- Implementar cache.

>  This is a challenge by [Coodesh](https://coodesh.com/)
