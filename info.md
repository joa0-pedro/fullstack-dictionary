
# Checklist do Projeto Fullstack - Dictionary

## Preparação do Projeto

- [x] Criar um repositório no GitHub (público).
- [x] Copiar conteúdo do repositório de base ou fazer fork.
- [x] Adicionar referência ao desafio no README.

### Configuração Inicial

- Escolher tecnologias para Front-End:
  - [x] Framework (React)
  - [ ] Estilização (Material UI, Styled Components, etc.)
  - [ ] Implementar CSS Flexbox + Grid.
  - [ ] Adotar Design Mobile First.
  - [ ] Implementar gestão de dados (Redux, Context API, etc.)
  - [ ] Usar conceitos de Programação Funcional (.map, .filter, .reduce).

- Escolher tecnologias para Back-End:
  - [x] API (PHP)
  - [x] Banco de dados (MySQL).

#### Desenvolvimento Back-End

- Implementar autenticação:
  - [x] [POST] /auth/signUp
  - [x] [POST] /auth/signIn
- Criar endpoints para dicionário:
  - [x] [GET] /entries/en
  - [x] [GET] /entries/en/:word
  - [x] [POST] /entries/en/:word/favorite
  - [x] [DELETE] /entries/en/:word/unfavorite
  - [ ] [GET] /user/me
  - [x] [GET] /user/me/history
  - [x] [GET] /user/me/favorites
- [x] Implementar lógica para salvar histórico.
- [x] Implementar lógica para salvar favoritos.
- [x] Implementar proxy para a Free Dictionary API.
- [x] Adicionar scripts para importar palavras do repositório.

#### Desenvolvimento Front-End

- [ ] Implementar login de usuário.
- [ ] Listar palavras com rolagem infinita.
- [ ] Exibir detalhes de cada palavra (significados, fonética).
- [ ] Implementar funcionalidades para salvar e remover favoritos.
- [ ] Criar página para o histórico de palavras visualizadas.

#### Documentação

- [ ] Documentar o processo de desenvolvimento no README.
- [ ] Criar documentação da API usando Open API 3.0 (diferencial).

#### Testes

- [ ] Escrever Unit Tests para endpoints da API (diferencial).
- [ ] Escrever testes para o Front-End (Unit ou E2E) (diferencial).

#### Deploy e Finalização

- [ ] Configurar Docker para o projeto (diferencial).
- [ ] Fazer o deploy em um servidor (com ou sem CI) (diferencial).
- [ ] Implementar cache com Redis/MongoDB (diferencial).
- [ ] Adicionar suporte a PWA (diferencial).

#### Revisão Final

- [ ] Verificar se todos os endpoints estão funcionando corretamente.
- [ ] Garantir que a interface é amigável e responsiva.
- [ ] Realizar testes de usabilidade.
