# Ozcrypto.tax website




This web package is part of the Ozcrypto.tax codebase.

## This is still in active development
You can follow along with development on the trello: https://trello.com/b/AVPgzFWT/ozcryptotax

## Current Features

+ It can run
+ It can be compiled with Electron to run as an executable
+ Material design


## Install dependencies with npm

``` bash
npm install
```

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

## To build for development

``` bash
npm run start:web
```

Currently runs with:

- Angular v6
- Angular-CLI v1.6.4
- Electron v1.8.2
- Electron Builder v20.0.4


## To build for production

- **in a terminal window** -> npm start

Voila! You can use your Angular + Electron app in a local development environment with hot reload !

## Manage your environment variables

- Using local variables :  `npm start` or `cross-env ENV=local npm start`
- Using development variables :  `cross-env ENV=dev npm start`
- Using production variables  :  `cross-env ENV=prod npm start`

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve`| Execute the app in the browser |
|`npm run start:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

**Your application is optimised. Only /dist folder and node dependencies are included in the executable.**

## Contributors

|User|Github|Contribution|
|--|--|--|
|GloriousCode|https://github.com/gloriouscode |Lead front-end|
|Maxime GRIS|https://github.com/maximegris |Angular4 + Electron Base|

## Contribution

Please feel free to submit any pull requests or suggest any desired features to be added.

## Donations

If this framework helped you in any way, or you would like to support the developers working on it, please donate Bitcoin to:

***1F5zVDgNjorJ51oGebSvNCrSAHpwGkUdDB***

