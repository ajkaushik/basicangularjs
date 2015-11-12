# basicangularjs
## This repo has simple examples of angular components like Module, Services, Providers and Controllers. And also shows usage of ui routing using state based angular-ui-router.

**Pre-Read topics. Please go through these concepts before starting with examples**

1. [Modules](https://docs.angularjs.org/guide/module)
2. [Services(Provider/Factory/Service/Constant/Value)](https://docs.angularjs.org/guide/providers)
3. [Controller](https://docs.angularjs.org/guide/controller)
4. [Scope](https://docs.angularjs.org/guide/scope)
5. [Data Binding](https://docs.angularjs.org/guide/databinding)
6. [Dependency Injection](https://docs.angularjs.org/guide/di)
7. [Directives](https://docs.angularjs.org/guide/directive)

**Samples of basic Angular components and example for all type of services(providers)**
- [Plunk showing basic module/service/controller at work](http://plnkr.co/edit/T9srpUU7gmfKda0bhnvh?p=preview)
- [Plunk showing all type of providers and their subtle differences](http://plnkr.co/edit/JAVeweDD1AW4H0IiJ5kh?p=preview)

## Setup to run the examples
1. Install Node (go to [Node Install](https://nodejs.org/en/download/)), if you do not have that installed. Our Angular example code do not have any dependency on nodejs, we will be using node for starting a local web server(Alternatively, you can use [Brackets IDE](http://brackets.io/), which comes with a built in static web server).
2. Clone this repo (If you do not have git installed on your machine, just download zip and unzip in your machine). Copy this command in your shell (cmd in windows) : 
  - `git clone https://github.com/ajkaushik/basicangularjs.git`
3. If you chose to install node, Go to root of the app directory in a shell window(cmd prompt) and run : `npm i`. This will install [live-server](https://github.com/tapio/live-server).
4. Run `npm start` in shell (cmd prompt) and it should open a browser tab with our angular app loaded in it.
5. If you have downloaded [Brackets IDE](http://brackets.io/) :
  * Open root folder with Brackets
  * Open Index.html in editor pane
  * Click on Live Preview button (top button in right side panel), it will start a local web server with live reload.

## Description of Examples in Repo
**This repo has two different examples, one is UserModule which display basic CRUD opertaions using angular services (No backend is used, it uses simple javascript arrays to hold the data for demo purpose). And other examaple is basically a github repo explorer which uses `$http` service of angular to get repo details from github api and also shows various basic usages of ui-routing and `$stateparams` service.**
- Directories in this sample repo are structured in a feature based way. Where all files related to a feature resides in same directory.
- It also shows how to create some basic app logic agnostic modules and then re-use them in app specific modules. For Example : loggerModule
- It has a basic example of a custom directive based navigation menu. Menu creation uses a Menu service and each module can add its own menu items during its configuration(check user-module-config.js).
- Example in this repo are using ui-router, which basically works on the concept of state based routing, where each state corresponds to a view. Please refer [ui-state-router](https://scotch.io/tutorials/angular-routing-using-ui-router).
- Most of the example js/html files have inline comments, please refer them for more information around individual components. 

