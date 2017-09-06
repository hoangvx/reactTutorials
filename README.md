This project is all about tutorials for reatjs that i play with. (Server site will play ruby on rails)

## Start reactjs with webpack and babel

Create new project directory and start git, npm

```bash
rails new tutorials && cd tutorials
npm init -y
```

Create directory that will contain your raw and complied code

```bash
# raw code folder
mkdir -p client/app

# complied code
mkdir app/assets/javascripts/clients
```

#### Babel and webpack install

`-D` options: install packages in dev environments

```bash
npm i -D babel-core babel-loader babel-preset-es2015 babel-preset-react
```

create babel setting file:

```bash
touch .babelrc

# ES6 settings
{
  "presets": [
    "es2015", "react"
  ]
}
```

next, we will install webpack

```bash
npm i -D webpack
```

create webpack setting files.

```bash
touch webpack.config.js
```

add some config for webpack

```js
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'app/assets/javascripts/clients');
var APP_DIR = path.resolve(__dirname, 'client/app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'web.bundle.js'
  }
};

module.exports = config;
```

#### Create rails controller for client react app

create `client` controller

```bash
rails g controller client index
```

change rails root page to client controller index action

```rb
Rails.application.routes.draw do
  root 'client#index'
end
```

Change rails default layout and client#index view

```rb
# views/layout/application.html.erb
<!DOCTYPE html>
<html>
  <head>
    <title>Tutorials</title>
    <%= csrf_meta_tags %>
  </head>

  <body>
    <%= yield %>
    <%= javascript_include_tag 'clients/web.bundle'%>
  </body>
</html>


# views/client/index.html.erb
<div id="App"></div>
```

Add some script to `client/app/index.jsx`

```js
console.log('hello world!');
```

Add webpack script to `package.json` and run it

```js
  "scripts": {
    "build": "$(npm bin)/webpack"
  },
```

```bash
npm run build
```

Finally let add precomplie for rails `config/initializers/assets.rb`

```rb
Rails.application.config.assets.precompile += %w( clients/web.bundle.js )
```

Ok, at this point your project should work. Run rails server and browser to [http://localhost:3000](http://localhost:3000) to check out your work.

```bash
rails server
```

#### setting babel loader

open `webpack.config.js` and update like below

```js
// Existing Code ....
var config = {
  // Existing Code ....
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
}
```

#### Install and add reactjs to project

User npm to install react and react-dom

```bash
npm i react react-dom -S
```

replace `client/app/index.jsx` with below code

```js
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return <p> Hello React!</p>;
  }
}

render(<App />, document.getElementById('App'));
```

rebuild your bundle file

```bash
npm run build
```


#### using foreman to run rails server and watch javascript

install foreman

```sh
gem install foreman
```

add npm task to watch js change

```json
//package.json
  "scripts": {
    "build": "$(npm bin)/webpack",
    "dev": "$(npm bin)/webpack -d --watch --progress --color"
  },
```

add `Profile` for config foreman

```sh
# Profile
web: rails s -b 0.0.0.0 -p 3000
webpack: npm run dev
```

Finally, run foreman and check the work

```bash
foreman start
```

# Table of Contents

+ [Using redux](docs/tutorial1.md)
