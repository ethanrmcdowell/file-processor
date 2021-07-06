# **File Scanner (PDF/JPG)**

## Description

- Node.js was used to create this application with JavaScript. The goal of this program is to scan a directory for files, detecting any PDF or JPG files. Once those files are detected, it will log the path of the file, the file type, and an MD5 hash of the file into a CSV file.

- The application is broken up into the entry point of app.js, the file data model in lib/FileInfo.js, and the methods.js folder which contains important functions used in both app.js and in the testing module.

- Inquirer.js is used to acquire data from the user, as the application requires an input for target directory, the requested output path, and a flag 'r' at the end to signify that you would like the application to scan subfolders.

  - Ex: `/Users/ethanrmcdowell/Projects/Files /Users/ethanrmcdowell/output/output.csv r`

- Utilizes the fs and crypto modules from Node.js in order to read and write as well as to hash the files.

## Installation

- `npm install`

- `node app.js`

## Testing

- `npm test`

- Uses Mocha for testing that the program can read files, is receiving the correct data, and is writing a file with that data.

## Technologies

- Node.js
- Inquirer.js
- Mocha / Chai

## Contact

:link: https://www.ethanrmcdowell.com

:e-mail: ethan@ethanrmcdowell.com
