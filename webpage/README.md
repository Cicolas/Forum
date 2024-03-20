# Webpage Forum

Esta pasta contém todo o código relacionado com a webpage do Forum

## Como Executar

A webpage usa Vite como o servidor de desenvolvimento (mais em: [Vite](https://vitejs.dev))
utilizando a configuração padrão para React. Acima disso usamos TailwindCSS como biblioteca
de CSS e Typescript para fazer o código. Tudo isso é executado com o ambiente de execução
nodejs.

## Prerequisitos

- [nodejs](https://nodejs.org) 18.19.0 or acima
- [npm](https://npmjs.com) _geralmente instalado com o node_
- [git](https://git-scm.com/) (opcional)
- [python](https://python.org) (opcional)

## Execcutando!

Após a instalação do nodejs, é necessário clonar o repositorio

```sh
$ git clone https://github.com/andre-sch/forum.git
```

Depois disso você pode ir para a pagina da webpage

```sh
$ cd forum/webpage
```

Agora você precisa instalar todas as depencias da aplicação, para isso execute:

```sh
$ npm install
# ou
$ npm i
```

Após um tmepo o npm irá _baixar_ todas as dependências na pasta `node_modules`.

Com tudo configurado você poderá finalmente executar a webpage em modo desenvolvimento

```sh
$ npm run dev
```

Geralmente o Vite irá abrir a página em http://localhost:5173/

## Compilando

Para Compilar a aplicação em uma página estática, você pode executar:

```sh
$ npm run build
```

O Vite irá gerar uma pasta `/dist/` contendo a paginá compilada

Para servir a página, há diversas maneiras, mas uma delas é executando um 
http server com python. Como segue:

```sh
$ cd dist
$ python3 -m http.server
```
