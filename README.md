# Instruções de como utilizar a API

### Fazer cópia do repositório na sua máquina local

1. Inicie o git em uma pasta: `git init`
2. Faça um clone na sua máquina local: `git clone https://github.com/MatheusNunes133/Projeto-Neo4J`

### Baixar dependências necessárias

3. No terminal utilize este comando: `npm i`

### Configurando arquivo de configurações

4. Crie um arquivo na raiz chamada de `.env`
5. Dentro do arquivo deve ser colocado as seguintes configurações:
```
NEO4J_HOST = {Seu host (localhost)}
NEO4J_PORT = 7687 (A poarta do neo4j)
NEO4J_USER = {Nome do seu usuário no neo4j}
NEO4J_PASSWORD = {Sua senha do neo4j}
```

### Iniciando a API

6. No terminal escreva esse comando: `npm start`
7. Pronto a API já em execução
