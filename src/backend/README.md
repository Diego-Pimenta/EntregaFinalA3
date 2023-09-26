Após puxar o project do GitHub, é preciso instalar as dependências indicadas no package.json
### npm install

Para rodar o servidor no modo de testes basta usar o nodemon, útil por fazer atualizações em tempo de exec
### npm run dev

Para iniciar o servidor basta usar o comando npm
### npm start

Sobre o banco de dados, utilizaremos o Sequelize, uma biblioteca JS para facilitar o gerenciamento
### npm i sequelize --save

Depois o driver do db precisa ser instalado
### npm i pg pg-hstore --save # Postgres
### npm i sqlite3 --save