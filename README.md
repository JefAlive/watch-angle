# watch-angle

API que calcula o ângulo entre os ponteiros do relógio:
- Validação dos parâmetros da requisição
- Cache em memória de 10 segundos
- Suíte de testes
- Opção de rodar em Docker
- Parâmetros configuráveis

## Requisitos

- nodejs 10+
- npm 6+

## Build e run

### Rodando com npm

Build:

```sh
npm install
```

Run:
```sh
npm start
```

Suíte de testes:
```
npm test
```

### Rodando com docker

```
```

## API

```
GET
http://localhost:3000/v1/rest/clock/:hour/:minute
```

```
GET
http://localhost:3000/v1/rest/clock/:hour
(Neste caso, minuto é subentendido como sendo 0)
```

### Exemplos de uso

Ângulo entre os ponteiros às 6:00
```
REQUEST: http://localhost:3000/v1/rest/clock/6/0
RESULT: {"angle":180}
```

Ângulo entre os ponteiros às 3:45
```
REQUEST: http://localhost:3000/v1/rest/clock/3/45
RESULT: {"angle":180}
```

Ângulo entre os ponteiros às 3:00
```
REQUEST: http://localhost:3000/v1/rest/clock/3
RESULT: {"angle":90}
```

Ângulo entre os ponteiros às 9:00
```
REQUEST: http://localhost:3000/v1/rest/clock/9
RESULT: {"angle":90}
```

## Configurações

```
```
