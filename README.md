# csc648-sp19-Team205

## FILE STRUCTURE
app:
  server.js
  ..etc
  client:
    public
    src
    ..etc
    
Everything will live in the app folder. It will contain the node server (backend) and its relevant files as well as the client folder (front end). React will live in the client folder with it's dependcies.

## Install dependencies
1. Install Node.js ver. 10 https://nodejs.org/en/.
2. Clone development branch from github. Make sure to switch to development branch after using "git checkout development" if you haven't already.
3. In cloned git folder navigate to the app folder (e.g ./csc648-sp19-team205/app). The folder should have a client folder and server.js
4. In that directory open a terminal and run
```
npm install
```
5. A folder called node_modules should show up with NODE DEPENDENCIES
6. Navigate to ./csc648-sp19-team205/app/client
7. In that directory run again
```
npm install
```
8. Another node_module folder will show up with REACT DEPENDENCIES

## Testing locally

Once you have setup the folders and installed the node.js and react modules you can now test it.

You will need two terminal instances or run node and react in the background yourself somehow.

ON YOUR FIRST TERMINAL INSTANCE -
  Navigate to ./csc648-sp19-team205/app and run
  ```
  node server.js
  ```

  This will start a local node server. So make sure to give node access permissions to do so if your OS asks for it.

ON YOUR SECOND TERMINAL INSTANCE -
  Now it's time to start react

  Navigate to ./csc648-sp19-team205/app/client and run
  ```
  npm start
  ```

React should automatically connect to http://localhost:3000/

## Need help?

Ask in the discord or text someone if you need help setting it up.
