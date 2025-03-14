# DAT076-DIT127-Web-applications

The directory structure of the repo: 
For the entire directory the test-files can be found in the same place as the file they are intended to test.


**client folder (contains the frontend)**
contains a few files at top lvl, mostly setup (different config files, gitignore) and the base HTML file (index.html)
contains the client/src folder which is structured according to the following list:
- api file , main.tsx (which handles the navigation) and vite-env file
- folder for assets (the icons/images used)
- folder for the components (used by the different pages)
- folder for the pages (containing base-components for each page)
- folder for the context (only contains the authorization context, but in a folder to easly find it)
- folder for the styles (contains the different css files used in the project)

**server folder (contains the backend)**
contains a few different config files, and the .env file
contains the server/src folder which is structured according to the following list: 
- index and start files
- db folder (database files)
- middleware folder (contains a file with the middleware for authentication)
- folder for the model-layer
- folder for the router-layer
- folder for the service-layer



**The project report can be found as a pdf in the top layer of the repo, similarly to this README file.** TODO