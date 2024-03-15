/*
! package manager (npm or yarn) 
is a tool to install, update, configure or remove libraries or packages inside a project
- install node js (stable version), and npm will be installed automatically
- node -v, npm -v => to see the version of each one and confirm it's installed (in terminal ofc)
note : libraries and packages are just modules (set of ready code func and m used to extend the functionality of our code), it's juts a bunch of modules is package, and a bunch of packages is library
we can use these by cdn link (not good), or install the packages of that specific library and here we need npm

? package.json , package-lock.json, node modules folder
- create a project folder and do (npm init) to initialize a node project
- package.json => will be created and contain info about your project (press ok to but them empty you can change them later manually or with commands)
- package-lock.json and node modules folder => will be created when you install any libraries like: npm install axios

what do they do ???
- package.json: a file used by node js to define information such as: name, author, Dependencies, dev Dependencies..
-- dev-dependencies: required only during development,such as testing frameworks... so it should be there
-- dependencies: required by the application when it is running in a production environment, such as a web server or a database driver.) so it should be in dependencies to work (packaging)
- package-lock.json: a file that contains the versions of the Dependencies, dev Dependencies (libraries)
- node modules: a folder that contains the packages of the installed libraries
note: when a project is uploaded on github node modules is deleted (too large), and package.json contains 
the used libraries and package-lock.json their versions 

? installing and removing 
npm install (or i) axios 
npm uninstall axios   or   npm remove (or r only) axios

? installing packages globally or locally 
- Global packages can be used anywhere in the system because they are installed at the system level and their executables are added to the system's PATH. This means you can access and use the command-line tools or utilities provided by global packages from any directory in your system. and wont be found in pacakge.jsoon
- local packages are specific to a particular project and are installed within the project directory. They are listed in the dependencies or devDependencies section of the project's package.json file.
- npm i axios => locally, npm i -g axios => globally

? updating packages
npm update axios or (for global packages) npm update -g axios
*/ 


/*
* advanced concepts
! npm versioning
sometimes you need to use older versions of npm 
- npm install loadash --save => the latest, npm install loadash@3.3.1 --save => will install a specific one and set it in package.json ofc
you can use tools that switch between nodde or npm versions easily: n for mac&linux or nvs [node versioning siwtcher]
. node -v / npm -v to see the version installed
? nvs
- download the setup file from github
. nvm => to confirm it's installed
. nvm list => to see the versions of node it's containing
. nvm use 4.4.0 => to use a certain version of node
. nvm install 4.4.0 => install that version first
now if you do nvm list you will find all versions you installed and the one used,
and you do node -v to confirm the one used, and we do nvm use 4.4.0 and do node -v 
we see that the old one is being used now
? n
- npm install -g n => in macos and linux
- after installing it it creates a command n in 
- sudo npm install -g n => to install it in mac or linux, and creates a command n
- sudo n latest => update to the latest version of node and npm
- sudo + enter => to see all node versions + enter to choose which one to use, d to delete q to quit
node -v to confirm, you can try flat method in array which returns not recognized (til node 10 and above)
- sudo n 6.0 => to install a specific version

! yarn 
https://www.youtube.com/watch?v=ByRxp9VlzeI
https://www.youtube.com/watch?v=1Sjhc09Q7f8
- yarn is an alternative of npm that was made by fb since npm was slow and had problems
- similar syntax & functionality to npm
- you can install packages from npm registry
. npm install --global yarn
. yarn init -y => to install package.json in the current dir

yarn init => will ask a few questions
-- your app name: first-app
-- entry point: is the first file in the app: index.js
-- url: to be pushed in github

! changing the data on package.json 
- you can change those information later on manually or with command
npm config set init-author-name => "rahim"
npm config set init-license "MIT" 
npm delete init-license => to delete 
npm config get init-author-name => will get you the name
*/ 