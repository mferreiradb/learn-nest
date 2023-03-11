<h1 align="center">NEST JS</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

- Instalação ClI

        npm i -g @nestjs/cli

- Instalando versões específicas da CLI

        npm install -g @nestjs/cli@7.6.0

- Iniciar projeto

        nest new <project-name>

**Estrutura do projeto**

*nest-cli.json*

- Mantém meta dados para organizar, construir e implantar projetos estruturados com Nest

- Normalmente não precisamos lidar com este arquivo diretamente, pois ele é gerenciado pelo próprio Nest

*/src*

- Pasta raiz onde ficará o código

*/src/main.ts*

- Arquivo principal do projeto

- Responsável por criar a aplicação a partir da instrução `NestFactory.create(AppModule);`

- Este método recebe como parâmetro o `AppModule`, que é o módulo principal da aplicação

- Todos os demais modules serão inseridos em `AppModule`. Normalmente esta inserção é feita automaticamente pelo próprio Nest

*app.module.ts*

- Módulo principal da aplicação

- Classe que recebe o decorator `@Module()`, responsável por passar todas as configurações necessárias para que a classe se comporte como um módulo

                import { Module } from '@nestjs/common';
                import { AppController } from './app.controller';
                import { AppService } from './app.service';

                @Module({
                imports: [],
                controllers: [AppController],
                providers: [AppService],
                })
                export class AppModule {}

- Neste utiliza muito o recurso de decorators, de forma que podemos passar decorators para métodos, atributos, e tudo que precisarmos atribuir determinadas funcionalidades

- Muitos recursos já são atribuidos pelo Nest com o uso da cli

- Caso optemos por criar determinados recursos manualmente, sem o uso da cli, as configurações deverão ser passadas manualmente

*app.controller.ts*

- Controller principal da aplicação

- Os controllers são responsáveis por lidar com as requisições que chegam ma aplicação

- Para que uma classe seja um controller, ela deve ser decorada pelo decorator `@Controller()`

- Nos controllers, declaramos as rotas através dos decorators de cada método: `@Get()`, `@Post()`, `@Put()`, `@Patch()`, `@Delete()`

- Para cada rota, deve ser informada uma função e seu retorno

- As funções decoradas retornam serviços e seus métodos

- Os serviços devem ser injetados por `injeção de dependencia` nos seus respectivos controllers

                import { Controller, Get } from '@nestjs/common';
                import { AppService } from './app.service';

                @Controller()
                export class AppController {
                constructor(private readonly appService: AppService) {}

                @Get()
                getHello(): string {
                return this.appService.getHello();
                }
                }

- Podemos gerar um controller pela cli

                nest g controller <nome do controller>


*app.service.ts*

- Serviço principal da aplicação

- Para que um serviço possa ser injetado em um controller, isto é, para que uma classe possa ser um serviço, ele deve ser decorado com o decorator `@Injectable()`

- No Nest, os serviços são considerados `Providers` ou `Provedores`, que podem injetar dependencias em outras classes

- Os serviços possuem lógica da camada de negócio, onde iremos efetivamente implementar o código que será o nucleo da aplicação

                import { Injectable } from '@nestjs/common';

                @Injectable()
                export class AppService {
                getHello(): string {
                return 'Hello World!';
                }
                }

- Podemos gerar um serviço pela cli

                nest g service <nome do serviço>

**Trabalhando com controllers**

- Criamos um controller

                nest g controller courses

- O Nest cria uma pasta em `src` com o arquivo do controller, um arquivo para teste e atualiza o arquivo `app.module.ts`

- Para que não seja criado o arquivo de testes, devemos passar o parametro `--no-spec`

                nest g controller courses --no-spec

- Podemos criar a pasta em um diretorio diferente, passando na instrução o caminho desejado

                nest g controller modules/courses

- No controller, podemos definir os endpoints, passando os dados nos parametros das funções, de forma que o valor passado no controller, será a rota principal e os valores passados em cada método serão as rotas filhas

- Representamos o endpoint `/courses/hello` da seguinte forma

                import { Controller, Get } from '@nestjs/common';

                @Controller('courses')
                export class CoursesController {
                constructor() {}

                @Get('hello')
                getUsers(): string {
                return 'Hello, course';
                }
                }

- Para que estejamos fazendo da forma correta, devemos 

*Parametros de rotas*

- Passamos o parametro no parametro do decorator da rota da forma tradicional `:parametro`

- Para que seja possível pegarmos o parâmetro para o uso no método, precisaremos do decorator `@Param()`, que decora um objeto, que será uma lista com todos os parametros que desejarmos obter.

                @Get(':idCourse')
                findOne(@Param() params): string {
                const { idCourse } = params;
                return `Curso número ${idCourse}`;
                }

*Trabalhando com dados de Payload (corpo da requisição)*

- Para que seja possível pegarmos os dados do corpo da requisição, precisaremos utilizar o decorator `@Body()`, ue decora um objeto, que será uma lista com todos os dados que desejarmos obter.

                @Post()
                createCourse(@Body() body) {
                const { name, description, price } = body;
                return body;
                }

- Também podemos fazer com que o body recebido no backend trabalhe apenas com valores determinados, não sendo obrigadtório trabalharmos com todos. Neste caso, passamos o atributo que desejamos trabalhar como parâmetro do decorator

                @Post()
                createCourse(@Body('name') body) {
                return body;
                }

*Trabalhando com HTTP Status Code*

- O Nest já envia automaticamente os status code padrões para as requisiçõe. 200 para Get, 201 para Post, etc.

- Para manipular o status code, utilizamos o decorator `@HTTPCode`

- Basta decorar o método post com o decorator, passando como valor o status desejado

                @Post()
                @HttpCode(204)
                createCourse(@Body('name') body) {
                return body;
                }

- Caso o status seja o referente a `sem conteúdo`, como mostrado acima, mesmo que informemos o `return`, nada será retornado para o front

- Podemos checar a lista de status http disponível no Nest através do enum `HttpStatus`. Basta chamar este enum e digitar um pontao, que será mostarada a lista com os status disponíveis


                @Post()
                @HttpCode(HttpStatus.NO_CONTENT)
                createCourse(@Body('name') body) {
                return body;
                }

- O decorator `@HTTPCode` é extremamente útil quando o status de retorno é estático, porém para condições lógicas, como tratativas de erros, outros métodos devem ser utilizados, incluindo os métodos do próprio `express`, que estão disponíveis no Nest, visto que o Nest utiliza o express internamente

- Para o melhor tratamento da resposta, podemos utilizar o decorator `@Res`. Assim, teremos disponívels as funcionalidades do express

- `@Res` decora um parâmetro, que será o objeto response da aplicação

                @Get()
                listAllCourses(@Res() res): string {
                return res.status(200).json({ msg: 'Lista com todos os cursos' });
                }

*Lidando com os demais métodos HTTP*

- Patch

                @Patch(':idCourse')
                updateSomeDataCourses(@Body() body, @Param() params) {
                const { name, description, price } = body;
                const { idCourse } = params;
                return body;
                }

- Put

                @Put(':idCourse')
                updateAllDataCourses(@Body() body, @Param() params) {
                const { name, description, price } = body;
                const { idCourse } = params;
                return body;
                }

- Delete

                @Delete(':idCourse')
                deleteCourse(@Param() params, @Res() res) {
                const { idCourse } = params;
                return res.json(params);
                }

**Trabalhando com Services**

- Utilizados para isolar a lógica de negócio dos controllers

- Facilmente reutilizados no código, bastando injetar na classe desejada

- Criamos um service

                nest g service courses --no-spec

- O Nest cria uma pasta em `src` com o arquivo do service e atualiza o arquivo `app.module.ts`

- No controller desejado, injetamos a instancia do serviço no construtor (injeção de dependencias). Essa instancia segue o `padrão singleton` e recebe o decorator `@Injectable()`

                import { Injectable } from '@nestjs/common';

                @Injectable()
                export class CoursesService {}


- Como normalmente não precisamos redefinir nada nos serviços, ao injetá-lo no controller, definimos como `readonly`

                @Controller('courses')
                export class CoursesController {
                constructor(private readonly CoursesService: CoursesService) {}
                }

- Dessa forma, podemos utilizar todos os métodos criados no serviço

- `courses.service.ts`

                import { Injectable } from '@nestjs/common';
                import { Course } from './entities/course.entity';

                @Injectable()
                export class CoursesService {
                private courses: Course[] = [
                {
                id: 1,
                name: 'Fundamentos do Nest',
                description: 'Fundamentos do Nest',
                tags: ['nest', 'node', 'typescript'],
                },
                ];

                findAll(): Course[] {
                return this.courses;
                }

                findOne(id: string): Course {
                const course = this.courses.find((course) => course.id == Number(id));
                return course;
                }

                create({ name, description, tags }: Course): void {
                const lastCourse = this.courses[this.courses.length - 1];
                const id = lastCourse.id + 1;
                this.courses.push({ id, name, description, tags });
                }

                someDataUpdate(id: string, { name, description }: Course): Course {
                const course = this.courses.find((course) => course.id == Number(id));
                course.name = name;
                course.description = description;
                return course;
                }

                delete(id: string) {
                const idexCourse = this.courses.findIndex(
                (course) => course.id == Number(id),
                );
                this.courses.splice(idexCourse, 1);
                }
                }

- `courses.controller.ts`

                import {
                Body,
                Controller,
                Get,
                Param,
                Post,
                HttpCode,
                HttpStatus,
                Res,
                Patch,
                Put,
                Delete,
                } from '@nestjs/common';
                import { CoursesService } from './courses.service';
                import { Course } from './entities/course.entity';

                @Controller('courses')
                export class CoursesController {
                constructor(private readonly CoursesService: CoursesService) {}

                @Get()
                listAllCourses(@Res() res): Course[] {
                return res.json(this.CoursesService.findAll());
                }

                @Get(':idCourse')
                findOne(@Param() params): Course {
                const { idCourse } = params;
                const course = this.CoursesService.findOne(idCourse);
                console.log(course);
                return course;
                }

                @Post()
                @HttpCode(HttpStatus.NO_CONTENT)
                createCourse(@Body() body, @Res() res) {
                const { name, description, tags } = body;
                this.CoursesService.create({ name, description, tags });
                return res.json();
                }

                @Patch(':idCourse')
                updateSomeDataCourses(@Body() body, @Param() params, @Res() res) {
                const { name, description } = body;
                const { idCourse } = params;
                const course = this.CoursesService.someDataUpdate(idCourse, {
                name,
                description,
                });
                return res.json(course);
                }

                @Delete(':idCourse')
                deleteCourse(@Param() params, @Res() res) {
                const { idCourse } = params;
                this.CoursesService.delete(idCourse);
                return res.json();
                }
                }

**Métodos para tratamento de erros**

- O Nest fornece uma série de formas de tratamento de erros

*Lista de exceptions para uso*

- BadRequestException

- UnauthorizedException

- NotFoundException

- ForbiddenException

- NotAcceptableException

- RequestTimeoutException

- ConflictException

- GoneException

- HttpVersionNotSupportedException

- PayloadTooLargeException

- UnsupportedMediaTypeException

- UnprocessableEntityException

- InternalServerErrorException

- NotImplementedException

- ImATeapotException

- MethodNotAllowedException

- BadGatewayException

- ServiceUnavailableException

- GatewayTimeoutException

- PreconditionFailedException


*HttpException*

- Recebe dois parâmetros: `response`, que é a mensagem que queremos informar, podendo ser uma string ou um objeto, e o segundo será o `status`, que é o status de resposta da requisição

- Por padrão, o corpo da resposta JSON contém duas propriedades: `statusCode`, o qual o padrão é o código de status HTTP fornecido no argumento status, e `message`, que é uma breve descrição do erro HTTP com base no status

- Para substituir apenas a parte da mensagem do corpo da resposta JSON, forneça uma string no argumento response. Para substituir todo o corpo da resposta JSON, passe um objeto no argumento response. O Nest serializará o objeto e o retornará como o corpo da resposta JSON.

- O segundo argumento do construtor - `status` - deve ser um código de status HTTP válido. A melhor prática é usar o HttpStatusenum importado de @nestjs/common.

- Há um terceiro argumento do construtor (opcional) - `options` - que pode ser usado para fornecer uma causa de erro. Esse objeto `cause` não é serializado no objeto de resposta, mas pode ser útil para fins de registro, fornecendo informações valiosas sobre o erro interno que causou o lançamento HttpException.

- `HttpException`

                findOne(id: string): Course {
                const course = this.courses.find((course) => course.id == Number(id));

                if (!course) {
                throw new HttpException('Curso não encontrado!', HttpStatus.NOT_FOUND);
                }

                return course;
                }

- `HttpException com cause`

                @Get()
                async findAll() {
                try {
                await this.service.findAll()
                } catch (error) { 
                throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
                }, HttpStatus.FORBIDDEN, {
                cause: error
                });
                }
                }

- Podemos utilizar as demais exceptions da seguinte forma

                if (!course) {
                throw new NotFoundException({
                        statusCode: HttpStatus.NOT_FOUND,
                        error: 'Curso não encontrado!',
                });
                }

- O construtor padrão das exceptions é (consultar a classe caso necessário):

                constructor(objectOrError?: string | object | any, description?: string);

**Trabalhando com modules**

- Maneira eficaz de organizar os componentes, proporcionando manter uma arquitetura ideal que possui vários módulos, cada um encapsulando um conjunto de recursos

- Criamos um module

                nest g module courses --no-spec

- O Nest cria uma pasta em `src` com o arquivo do module e atualiza o arquivo `app.module.ts`

- Com isso, não precisamos mais passar as dependencias para AppModule, podendo passar os services e controllers para CoursesModule e passando apenas CoursesModule para AppModule

- `app.module.ts`

        import { Module } from '@nestjs/common';
        import { AppController } from './app.controller';
        import { AppService } from './app.service';
        import { CoursesModule } from './courses/courses.module';

        @Module({
          imports: [CoursesModule],
          controllers: [AppController],
          providers: [AppService],
        })
        export class AppModule {}

- `courses.module.ts`

        import { Module } from '@nestjs/common';
        import { CoursesController } from './courses.controller';
        import { CoursesService } from './courses.service';

        @Module({
          imports: [],
          controllers: [CoursesController],
          providers: [CoursesService],
        })
        export class CoursesModule {}

**DTO**

- Data Transfer Object

- Objeteto usado para encapsular dados a serem enviados de uma aplicação para outra

- Nos ajudam a definir as interfaces ou quais informações são recebidas pela aplicação

- Forma de lidar com informações que veem do frontend para o backend

- Pode ser criado através de uma classe ou interface

- Define os atributos ou campos que devem ser considerados para o nosso serviço lidar

        nest g class courses/dto/create-courses.dto --no-spec

- Com os DTOs, podemos separar os dados das entities do que esperamos receber numa requisição

- Como os DTOs servem apenas para tiparmos o que esperamos receber, podemos definid suas propriedades como `readonly`

- `CreateCoursesDto`

        export class CreateCoursesDto {
          readonly name: string;
          readonly description: string;
          readonly tags?: string[];
        }

- `CoursesController`

          @Post()
          @HttpCode(HttpStatus.NO_CONTENT)
          createCourse(@Body() body: CreateCoursesDto, @Res() res) {
            const { name, description, tags } = body;
            this.CoursesService.create({ name, description, tags });
            return res.json();
          }

- Assim, faremos um DTO para cada caso necessário

**Validação de dados / Validation Pipe**

- Fornece uma maneira conveniente de aplicar regras de validação para todas as requisições que recebemos na nossa API

- Para utilizarmos o recursos, precisaremos configurá-lo na nossa aplicação, chamando o método `useGlobalPipes()` no nosso arquivo `main`

- Passamos como valor do método, a instanciação da classe `ValidationPipe()`

- Além disso, precisaremos realizar uma instalação extra de dois pacotes adicionais

        npm i class-validator class-transformer

- Após a instalação dos pacotes, utilizamos os validadores nos nossos DTOs

- Realizamos essas verifgicações através de decorators

- É importante salientar que o módulo `class-decorators` só pode ser aplicado a classes

import { IsString } from 'class-validator';

        export class CreateCoursesDto {
          @IsString()
          readonly name: string;

          @IsString()
          readonly description: string;

          @IsString({ each: true })
          readonly tags: string[];
        }

- Por padrão, caso alguma das informaçõe snão estivar na requisição, o Neste retornará um objeto do sistema de validação, vindo do `class-validator`, com status 400 e detalhes sobre o erro

- Muitas vezes, algumas informações de determinados DTOs serão parecidas. Para que não haja a necessidade de refazer todo um código, podemos utilizar o módulo do Nest `mapped-types`

        npm i @nestjs/mapped-types

- Após a instalação, podemos extender um DTO com um `PartialType()` e passar como parametro o DTO pai, o qual queremos pegar as informações

        import { PartialType } from '@nestjs/mapped-types';
        import { CreateCoursesDto } from './create-courses.dto';

        export class UpdateCoursesDto extends PartialType(CreateCoursesDto) {}

- Dessa forma, informamos que os campos vindos da classe pai são opcionais ma classe estendida

*Whitelist*

- Podemos filtrar propriedades que devem ser bloqueadas a partir da definição de uma lista, onde definimos quais propriedades são aceitaveis. Qualquer outra que seja enviada, será eliminada da requisição. Podemos fazer essas e outras definições atavés da passagem de configurações passadas no parâmetro da instanciação do ValidationPipe no arquivo main.ts

        import { ValidationPipe } from '@nestjs/common';
        import { NestFactory } from '@nestjs/core';
        import { AppModule } from './app.module';

        async function bootstrap() {
          const app = await NestFactory.create(AppModule);
          app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
          await app.listen(3000);
        }
        bootstrap();

- Dessa forma, garantimos que apenas os dados listados nos DTOs serão utilizados, de forma que os demais dados que vierem do frontend serão retirados do objeto de requisição

*ForbidNonWhitelisted*

- Apesar da whitelist removeer os itens inesperados, ela ainda permite que os itens cheguem ao nosso backend, aprenas removendo-os da requisição e utilizando os dados esperados, o que pode acabar ainda assim sendo perigoso

- Podemos atiavar a opção forbidNonWhitelisted para que ao ser identificado um item inesperado, a requisição seja recusada, com um erro 400 (bad request)

                app.useGlobalPipes(
                new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
                );

- Assim, garantimos que a nossa aplicação não receberá informações indevidas

*transform*

- Podemos utilizar este parâmetro para que o nosso backend determine automaticamente o tipo dos dados da requisição como sendo do tipo do DTO

*Comandos CLI*

- Comandos `generate` podem ser abreviados para `g`

                nest g module courses

- Criar módulo

                nest generate module <nome do modulo>

- Gerar um controller

                nest g controller <nome do controller>

- Gerar um serviço

                nest g service <nome do serviço>

- Para gerar os arquivos sem o arquivo de teste, passar o parametro `--no-spec`

                nest g controller courses --no-spec

- Criar a pasta em um diretorio diferente, passando na instrução o caminho desejado

                nest g controller modules/courses

- Para visualizar como ficaria a estrutura se fizermos um terderminado comando sem que seja executado, basta passar a flag `--dry-run`

                nest g controller modules/courses --dry-run