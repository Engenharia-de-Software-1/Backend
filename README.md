# AgroI9: Backend
Esse repositório tem o objetivo de armazenar o código Backend da AgroI9.  

-----

#### Arquitetura
Este código usará Clean Architecture para trabalhar. A diferência é que as entidades não são anêmicas, ou seja, também guardam os métodos que precisam executar. Pode-se ver mais sobre no livro do Uncle Bob.

#### Arquivo .env
Para rodar adequadamente o back-end, crie um arquivo *.env.local* com base no arquivo *.env.example* e mude para os valores que mais se adequam a situação.  

#### Limite arquitetural
Na documentação do Nest e na maioria do casos, para que haja a conexão entre um useCase e um repositório (no caso da C.A) deve se adicionar o decorator *@injectable*. Nesse back-end, para preservar nosso domínio e aplicação e levar en conta a Clean Architecture, vamos fazer uma inversão de dependências. Essas inversões podem ser vistas em arquivos chamados de **.module.ts*.

--------------------
#### Referências
[Clean Code](https://www.amazon.com.br/C%C3%B3digo-limpo-Robert-C-Martin/dp/8576082675/ref=asc_df_8576082675/?tag=googleshopp00-20&linkCode=df0&hvadid=379792215563&hvpos=&hvnetw=g&hvrand=8907773929385633557&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9102202&hvtargid=pla-398225630878&psc=1); Martin, Robert (Uncle Bob); 2009;  
[The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html); Martin, Robert (Uncle Bob);  
[NestJS](https://docs.nestjs.com/); Documentation; 