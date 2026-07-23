# Visa Processing Times Tool (VIPTT)

## Description

Visa Processing Time's tool is a customer self serving form that calculates whether the visa applicant is within a decision response window or not (In SLA or not) and also a date is provided to the customer of when they will hear back from the Home Office. 

The application is built using [HOF (Home Office Forms) framework](https://github.com/UKHomeOfficeForms/hof)

Estimated response time for visa applications is calculated according to SLA, excluding non-working days (weekends and bank holidays).

Bank holiday data is fetched from the [Gov.UK Bank Holidays API](https://www.api.gov.uk/gds/bank-holidays/#bank-holidays).

Data will be written to a file, which is updated when the server is restarted, then the app will attempt to fetch the latest bank holiday data and update the file every 24 hours. It is also updated when the application is run locally, and then checked in to version control. This ensures there is an offline backup of this data.

SLA data is stored in JSON and checked in to version control. Currently, there is only one set of SLA data. However in the future we may need to support multiple versions of the SLA data.

## Install & Run the Application locally

### Prerequisites

- [Node.js](https://nodejs.org/en/) - for supported versions see `engines.node` in [package.json](package.json)
- [Redis server](http://redis.io/download) running on default port 6379

### Setup

1. Create a `.env` file in the root directory and populate it with all the required environment variables for the project.
2. Install dependencies using the command `yarn`.
3. Start the service in development mode using `yarn run start:dev`.

## Install & Run the Application locally with Docker Compose

You can containerise the application using [Docker](https://www.docker.com). The `.devcontainer` directory includes a `docker-compose.dev.yml` file for orchestrating multi-container application.

### Prerequisites

   - [Docker](https://www.docker.com)

### Setup

By following these steps, you should be able to install and run your application using a Docker Compose. This provides a consistent development environment across different machines and ensures that all required dependencies are available.

1. Make sure you have Docker installed and running on your machine. Docker is needed to create and manage your containers.

2. To configure your dev environment, copy `/.devcontainer/devcontainer.env.sample` to `devcontainer.env` in the same directory and fill in the necessary values. This ensures your development container is set up with the required environment variables.

3. Open a terminal, navigate to the project directory and run: `docker compose -f .devcontainer/docker-compose.dev.yml up -d`

4. Once the containers are built and started, you can go inside the app container: `docker exec -it devcontainer-hof-viptt-app-1 sh` (note: Docker containers may be named differently)

5. Run the necessary commands to install dependencies `yarn` and `yarn start:dev` to start your application.

## Install & Run the Application locally with VS Code Dev Containers

Alternatively, if you are using [Visual Studio Code](https://code.visualstudio.com/) (VS Code), you can run the application with a [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers).

The `.devcontainer` folder contains the necessary configuration files for the devcontainer.

### Prerequisites
   - [Docker](https://www.docker.com)
   - [VS Code Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extention

### Setup

By following these steps, you should be able to run your application using a devcontainer in VS Code. The Dev Containers extension lets you use a Docker container as a full-featured development environment. This provides a consistent development environment across different machines and ensures that all required dependencies are available. A `devcontainer.json` file in this project tells VS Code how to access (or create) a development container with a well-defined tool and runtime stack.

1. Make sure you have Docker installed and running on your machine. Docker is needed to create and manage your containers.

2. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extention in VS Code. This extension allows you to develop inside a containerised environment.

3. To configure your dev environment, copy `/.devcontainer/devcontainer.env.sample` to `devcontainer.env` in the same directory and fill in the necessary values. This ensures your development container is set up with the required environment variables.

4. Run the `Dev Containers: Open Folder in Container...` command from the Command Palette (F1) or click on the Remote Indicator (≶) in the status bar. This command will build and start the devcontainer based on the configuration files in the `.devcontainer` folder.

5. Once the devcontainer is built and started, you will be inside the containerised environment. You can now work on your project as if you were working locally, but with all the necessary dependencies and tools installed within the container.

6. To start the application, open a terminal within VS Code by going to `View -> Terminal` or by pressing `Ctrl+backtick`. In the terminal, navigate to the project directory if you're not already there.

7. Run the necessary commands to install dependencies `yarn` and `yarn start:dev` to start your application.

### Testing

Tests are run using [Jest](https://jestjs.io/).

Run all tests:
```bash
yarn run test
```
Run unit tests:
```bash
yarn run test:unit
```
Run linting:
```bash
yarn run test:lint
```