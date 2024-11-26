# Recreational Sports League Management UI
This repository contains the frontend built with Nextjs, Tailwindcss, and Typescript.

[Deployment Link](https://black-bay-0a64fde0f.5.azurestaticapps.net/)
[Backend Service API Link](https://recreation-sports-core-service-eja5ffe3fraeb5f8.eastus2-01.azurewebsites.net/api-spec)
[Backend Service Repository](https://github.com/congmul/recreational-sports-league-management-core-service)

## Overview
"Recreational Sports League Management" app provides managing Teams, Players, and Coaches. 

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Tech Stack
- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **API**: Integration with a backend service built in Nest.js
- **DB**: MongoDB with mongoose
- **Library**: Azure Blob

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:congmul/recreational-sports-league-management-ui.git
   cd recreational-sports-league-management-ui
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:

    Create a .env.local file in the root directory and add the values (Please check env.production file)

4. Start the application:
    ```bash
    npm run start:dev
    ```
This will start the application on 'http://localhost:3000'

## Project Structure
It follows APP route of Nextjs

## Contributing
1. Fort the repository.
2. Create a new branch: `git checkout -b feature/your-feautre-name` on `development` branch.
3. Whatever work you do, after it has been tested locally by hand and unit/integration tests, you will bump the major, minor, or patch versions of package.json file based on the scope of work completed. Rule of thumb is:
 - Breaking changes = bump major version
 - Additional feature(s) with no breaking changes = bump minor version
 - Chore or bug fix = bump patch version
4. Make your changes an commit them: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Open a pull request.