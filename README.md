
# Project file-analyzer
The project is about a bansic web app file reader (count total character) and it organized into two separate folders: `BE` and `FE`. The `BE` (backend) contains all the application logic to set up the server and read the file to compute the results based on the exercise request. The `FE` (frontend) is a small application based on Vue 3.
The chosen design pattern is the `Strategy Pattern`, as it allows for flexible and interchangeable algorithms for reading files from different sources (local and web).
The `dist_` folder contains executable files to directly launch the application and you can try it on the browser at `http://localhost:3000`.

# Before to start
Inside the project root the folder `dist_` just contains the executable file. If not, you can follow the step to launch directly the project:
`npm run install:all`

# Building the Project
If you want to generate the dist folder, you can run:
`npm run build`

# To regenerate the executable files, run:
`npm run pkg`

# Running Tests
To run tests, execute the following command from the root directory:
 `npm run test`

# Running the Executable Files
To launch the application from the terminal, navigate to the dist_ (or if you have regenerated in dist) folder and use the following commands based on your operating system:

# For Windows:
`dist\file-analyzer-win.exe`

# For macOS:
`./dist/file-analyzer-macos`

# For Linux:
`./dist/file-analyzer-linux`

