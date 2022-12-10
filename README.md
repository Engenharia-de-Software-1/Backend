<br/>

<p align="center"><a href="https://agroi9incubadora.com.br/" target="_blank"><img src="https://github.com/Engenharia-de-Software-1/Frontend/blob/main/public/images/logoAgroi9.png" height="70"></a></p>

<br/>

<p align="center">
    <img src="https://img.shields.io/badge/nest.js-black?style=for-the-badge&logo=nestjs&logoColor=ED1543" alt="NestJS" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript" />
    <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
    <img src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white" alt="Heroku"/>
</p>

# AgroI9: Backend

## Sobre
A AgroI9 é uma incubadora especializada em oferecer apoio gerencial, jurídico, logístico e tecnológico para negócios inovadores focados no agronegócio sustentável.

Tal incubadora tem o objetivo de promover a inovação aberta conectando startups, empresas, cooperativas e instituições de ensino e de ciência, tecnologia e inovação, para o desenvolvimento de novos negócios de base tecnológica. 

Esse repositório, foi feito para a disciplina de Engenharia de Software do segundo semestre de 2022 onde uma plataforma que abrange as funcionalidades de um MVP para a incubadora devem ser implementados, tem o objetivo de armazenar o código Backend da AgroI9.

-----

## Arquitetura
Este código usará Clean Architecture para trabalhar. A diferência é que as entidades não são anêmicas, ou seja, também guardam os métodos que precisam executar. Pode-se ver mais sobre no livro do Uncle Bob.

-----

## Arquivo .env
Para rodar adequadamente o back-end, crie um arquivo *.env.local* com base no arquivo *.env.example* e mude para os valores que mais se adequam a situação.  

Esse arquivo deve estar na pasta raiz do projeto e conter obrigatóriamente as váriaveis de desenvolvimento abaixo:

```.env
PORT=PORTA_ESCOLHIDA

# Database
DB_TYPE=TIPO_DO_BANCO (mysql, postgresql, etc)
DB_HOST=localhost
DB_NAME=NOME_DO_BANCO
DB_USER=USUARIO_DO_BANCO
DB_PORT=PORTA_DO_BANCO
DB_PASSWORD=SENHA_DO_BANCO

# JWT
JWT_SECRET=secret
JWT_EXPIRARTION_TIME=tempoemsegundos
```
A parte do e-mail não é obrigatória, mas sem ela os serviços que utilizam o e-mail não vão funcionar.

-----

## Executando

### Requisitos

- [X] Banco de dados MySQL
- [x] Configurar .env ou .env.local
- [x] Configurar frontend AgroI9 para testes finais
- [x] Instalar dependências com `yarn` ou `npm install`

### Rodando o backend

Instale as dependências com
```sh
yarn 
```
Execute o backend com
```sh
yarn start:dev
```

-----

## Limite arquitetural
Na documentação do Nest e na maioria do casos, para que haja a conexão entre um useCase e um repositório (no caso da C.A) deve se adicionar o decorator *@injectable*. Nesse back-end, para preservar nosso domínio e aplicação e levar en conta a Clean Architecture, vamos fazer uma inversão de dependências. Essas inversões podem ser vistas em arquivos chamados de **.module.ts*.

-----

## Contato
| Nome                          | Contato                                |
| ----------------------------- |:--------------------------------------:|
| Gabriela Marangoni Radigonda  | gabrielaradigonda@alunos.utfpr.edu.br   |
| Getulio Coimbra Regis         | getulioregis@alunos.utfpr.edu.br        |
| Gustavo Sengling Favaro       | gusfav@alunos.utfpr.edu.br              |
| Igor de Lara Oliveira         | igooli@alunos.utfpr.edu.br              |
| Yuri Baza                     | yuribaza@alunos.utfpr.edu.br            |
-----
## Referências
[Clean Code](https://www.amazon.com.br/C%C3%B3digo-limpo-Robert-C-Martin/dp/8576082675/ref=asc_df_8576082675/?tag=googleshopp00-20&linkCode=df0&hvadid=379792215563&hvpos=&hvnetw=g&hvrand=8907773929385633557&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9102202&hvtargid=pla-398225630878&psc=1); Martin, Robert (Uncle Bob); 2009;  
[The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html); Martin, Robert (Uncle Bob);  
[NestJS](https://docs.nestjs.com/); Documentation; 