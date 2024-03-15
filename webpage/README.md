# Forum Webpage

This folder have all the code related to the Forum webpage

## How to run

First of all, you need to understand how does the webpage works!

The webpage uses Vite as a development server (more on: [Vite](https://vitejs.dev)) with the default react template. Added to that we uses TailwindCSS as CSS library, and Typescript for coding. All of that works on top of nodejs runtime environment.

## Prerequisites 

- [nodejs](https://nodejs.org) 18.19.0 or above
- [npm](https://npmjs.com) _usually comes with node_
- [git](https://git-scm.com/) (optional)
- [python](https://python.org) (optional)

## Running!

After installing nodejs all you need is clone the repository 

```sh
$ git clone https://github.com/andre-sch/forum.git
```

Thus you can go to webpage folder

```sh
$ cd forum/webpage
```

Now you need to download all the dependencies of the application, to do so you can run:

```sh
$ npm install
# or just
$ npm i
```

After a while npm will download all the dependencies in ```node_modules``` folder.

With everything downloaded you can finally run the webpage

```sh
$ npm run dev
```

## Building

To build the application you can simply run the

```sh
$ npm run build
```

Aand Vite will generate a `/dist/` folder containing the built webpage to serve the webpage you can do the following commands

```sh
$ cd dist
$ python3 -m http.server
```