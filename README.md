<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Project Structure
c:/Users/hp/Desktop/restaurant/
  ├─]dist/ (ignored)
  ├─]node_modules/ (ignored)
  ├─ src/
  │  ├─ auth/
  │  │  ├─ decorators/
  │  │  │  ├─ current-user.decerator.ts
  │  │  │  └─ roles.decorator.ts
  │  │  ├─ dto/
  │  │  │  ├─ login.dto.ts
  │  │  │  └─ signup.dto.ts
  │  │  ├─ gurads/
  │  │  │  └─ roles.gurad.ts
  │  │  ├─ schemas/
  │  │  │  └─ user.schema.ts
  │  │  ├─ attach-user.ts
  │  │  ├─ auth.controller.ts
  │  │  ├─ auth.module.ts
  │  │  ├─ auth.service.ts
  │  │  └─ jwt.strategy.ts
  │  ├─ cloudinary/
  │  │  ├─ cloudinary-response.ts
  │  │  ├─ cloudinary.module.ts
  │  │  ├─ cloudinary.service.ts
  │  │  └─ cloudinary.ts
  │  ├─ image/
  │  │  ├─ schemas/
  │  │  │  └─ image.schema.ts
  │  │  ├─ image.module.ts
  │  │  └─ image.service.ts
  │  ├─ menu/
  │  │  ├─ dto/
  │  │  │  ├─ add-menu.ts
  │  │  │  └─ edit-menu.ts
  │  │  ├─ schema/
  │  │  │  └─ menu.schema.ts
  │  │  ├─ menu.controller.ts
  │  │  ├─ menu.module.ts
  │  │  └─ menu.service.ts
  │  ├─ order/
  │  │  ├─ dto/
  │  │  │  └─ order.dto.ts
  │  │  ├─ schemas/
  │  │  │  └─ order.schema.ts
  │  │  ├─ order.controller.ts
  │  │  ├─ order.module.ts
  │  │  └─ order.service.ts
  │  ├─ restaurant/
  │  │  ├─ dto/
  │  │  │  ├─ add-restaurant.dto.ts
  │  │  │  └─ update-restaurant.dto.ts
  │  │  ├─ schemas/
  │  │  │  └─ restaurant.schema.ts
  │  │  ├─ restaurant.controller.ts
  │  │  ├─ restaurant.service.ts
  │  │  └─ restaurants.module.ts
  │  ├─ review/
  │  │  ├─ dto/
  │  │  │  └─ create-review.dto.ts
  │  │  ├─ schemas/
  │  │  │  └─ review.schema.ts
  │  │  ├─ review.controller.ts
  │  │  ├─ review.module.ts
  │  │  └─ review.service.ts
  │  ├─ utils/
  │  │  └─ apiFeatures.ts
  │  ├─ app.controller.spec.ts
  │  ├─ app.controller.ts
  │  ├─ app.module.ts
  │  ├─ app.service.ts
  │  └─ main.ts
  ├─].env (ignored)
  ├─ .env.example
  ├─ .eslintrc.js
  ├─ .gitignore
  ├─ .prettierrc
  ├─ nest-cli.json
  ├─ package-lock.json
  ├─ package.json
  ├─ README.md
  ├─ tsconfig.build.json
  └─ tsconfig.json

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
