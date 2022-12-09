# Developer Guide

## Setting up the Development Environment

1. Install Node.js by downloading the appropriate installer from the [Node.js website](https://nodejs.org/en/) and following the on-screen instructions.

2. Install the yarn package manager by running the following command on the command line:
   npm install -g yarn

3. Clone the project repository from GitHub (if applicable) by running the following command:
   git clone https://github.com/Sarhan619/feedback-forum.git

4. Navigate to the project directory and install the project dependencies by running the following command:
   yarn install

## Running the Development Server

To run the development server and start the project, run the following command on the command line:
yarn dev

This will start the development server and automatically open the project in your default web browser at the URL `http://localhost:3000`. Any changes you make to the code will be automatically reflected in the browser.

## Project Structure

The project is organized into the following directories:

-   `tests`: Contains the tests for the project.
-   `assets`: Contains the images and icons used in the project.
-   `backend`: Contains the code for firebase cloud functions.
-   `components`: Contains the reusable UI components used in the project.
-   `constants`: Contains the constant variables used in the project.
-   `home`: Contains the components used in the home page.
-   `hooks`: Contains custom React hooks used in the project.
-   `lib`: Contains configuration files for libraries used in the project.
-   `node_modules`: Contains the project dependencies installed by yarn.
-   `pages`: Contains the individual pages of the project.
-   `public`: Contains the public assets used in the project, such as the favicon and manifest files.
-   `styles`: Contains the global styles used in the project.
-   `types`: Contains the TypeScript types used in the project.

## Building the Project

To build the project for production, run the following command on the command line:
yarn build

This will create a production-ready version of the project in the `build` directory.

-> Make sure Node JS is installed on your PC. to download Node JS visit [Node JS](https://nodejs.org/en/download/).

The `package.json` file contains the following scripts that you can use to perform various tasks:

-   `dev`: Runs the development server and opens the project in the browser.
-   `build`: Builds the project for production.
-   `start`: Starts the production server.
-   `test`: Runs the test suite.

## Contributing to the Project

We welcome contributions to the project! If you have found a bug or have a feature request, please open an issue on the [project's GitHub page](https://github.com/Sarhan619/feedback-forum).

If you would like to submit a pull request with a bug fix or new feature, please follow these steps:

1. Fork the project repository and clone it to your local machine.
2. Create a new branch for your changes.
3. Make your changes and commit them to your branch.
4. Push your branch to your forked repository.
5. Open a pull request from your branch to the `master` branch of the original project repository.

We will review your pull request and provide feedback if necessary. Once your changes have been reviewed and approved, they will be merged into the master branch of the original repository.

Thank you for contributing to the project!
