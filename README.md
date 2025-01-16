# Structize Code Test

https://github.com/user-attachments/assets/c37dcba0-6dc7-4ea6-9252-949646fe1b9a

## Project Setup

The repository is structured into apps and packages following a monorepo approach with a domain-driven design.

### Apps

- `web`: A Next.js app serving the frontend and api. For now, the api is contained as part of the application. In the future, it would make sense to split it into a separate application, so that the frontend and backend can be scaled independently based on demand. The application contains both the pages of frontend, as well as app-specific components which are not shareable between apps. In the future, it could be considered to keep these in different UI packages, separated from the shared UI package.
- `worker`: A Node.js application that listens to a queue in redis and processes events. For demonstration purposes, the concurrency is currently set to 2 jobs at a time. In a production environment, this value can be increased based on the available resources.

### Packages

- `eslint-config`: A package containing the base eslint configurations.
- `typescript-config`: A package containing the base typescript configurations.
- `ui`: A React component library containing shared UI components created with shadcn.
- `mongo`: A package containing a reusable, singleton mongo connection. In addition, the package contains shared mongo utilities and types.
- `redis`: A package containing a reusable, singleton redis connection.
- `calculations`: A package containing all code related to the calculations domain.

### Used Technologies

The code uses the following technologies:
- `Next.js` and `react` for the `web` app.
- `Node.js` for the `worker` app.
- `Shadcn` for generating shared UI components.
- `Tailwind` to style the UI.
- `TRPC` for serving a type-safe API and using it in react using hooks.
- `Zod` for verifying API inputs in `trpc`, as well as for parsing and verifying environment variables.
- `Server-sent events` for initiating the computation of the calculation and updating the frontend about its status.
- `Mongodb` and `mongoose` for storing calculations and defining data structures.
- `Redis` & `bullmq` for sending and handling jobs. Originally, I considered building a queue on top of mongo using changestreams. However, I decided that this would exceed the scope of the code test and to use an existing solution instead.
- `Pino` for logging.

The project uses the following technologies for the development:
- `Mise` for managing the versions of node, pnpm, and lefthook.
- `Turborepo` for managing the monorepo structure.
- `Docker` for setting up a local mongo and redis instance
- `Lefthook` for verifying the validity of commits.
- `Typescript` for ensuring the validity of the code.
- `Eslint` & `prettier` for linting and formatting the code.

### Next Steps

The following next steps could be taken:
- Add unit and integration tests for the codebase using `jest`. I originally planned to do this, however abandoned this due to time constraints.  
  - UI components should be tested using snapshot tests. 
  - The `calculations` service should be tested using unit tests and a mocked db connection.
  - The trpc API should be tested using either unit or integration tests for both the API and client parts.
- Add more robust error handling. Currently, expected errors, like zero division of the calculation, are handled in the UI and zod schemas. However, API & connection errors are currently unhandled.
- Deployment of the apps to a hosting service, like AWS ECS & Fargate, using Terraform or Pulumi.
- Implementing a CI pipeline that automates the deployment process.
- Split the `web` app into separate `api` and `web` apps to ensure they can be scaled independently based on resource usage and demand.

## Getting Started

### Prerequisites

The following tools are required to run the project:
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Mise](https://mise.jdx.dev/getting-started.html) (Local development only)

### Development

1. Run `mise install`, followed by `mise reshim` to ensure you have the required version of `node`, `pnpm`, and `lefthook` installed. 
2. Ensure you have mongo and redis running: `docker-compose up mongo redis -d`.
3. Ensure, you have the local environment setup: `cp ./apps/web/.env.default ./apps/web/.env && cp ./apps/worker/.env.default ./apps/worker/.env`
4. By default, the application uses sensible default values for the environment. The values can be overwritten, by updating the values in the `.env` file of the app.
5. Run `pnpm run dev` to start the `web` and `worker` applications.

### Production

1. Ensure you have mongo and redis running: `docker-compose up mongo redis -d`.
2. Once mongo and redis are running, start the apps: `docker-compose up web worker`

**IMPORTANT**: Since Next.js requires access to mongo and redis during the build process, these have to be started before starting the apps. Otherwise, the docker build will fail.

## Test Requirements

### Front/back End:

- [x] Preferably use Next.js for the framework. React and NodeJS are a requirement.
- [x] Create 1 page with a form to enter the numbers A and B and trigger the compute using a Compute
button and store the numbers A and B in a database.
- [x] Once the user has hit Compute, show a progress bar of the job execution progress in real time + the
output of the compute jobs.
- [x] Ensure the UI is reasonably styled using Tailwind CSS. (we use Shadcn/ui)

### Scheduler/Worker application(s):
- [x] Manage the queue of jobs.
- [x] Execute the computations (A+B, A-B, A*B, A/B) with a 3-second delay per job to simulate
processing time.
- [x] Save results to the database.

### Database:
- [x] Use a database of your choosing (eg MongoDB, SQLite, Postgres, ...) to store the action
configuration.

### Deployment:
- [x] Create a script to run the solution locally and/or on a clean server.

### Optional Bonus Tasks/Points:
- [ ] Use an LLM to do the computations (feel free to ignore hallucinations).
- [x] Use a monorepo (We use turbo repo)
- [x] Use tRPC and Zod schemas.
- [x] Ensure type safety for all API interactions.
- [x] Allow for multiple jobs to be executed in parallel.
- [ ] Deploy the application so we can go to a URL and test it.
- [ ] Deploy the containerized application to AWS using Amazon ECS (Elastic Container Service) and
manage it through AWS Fargate.
- [ ] Implement a CI/CD pipeline using Github actions.
- [ ] Use Pulumi for the deployment.
- [ ] Implement an oauth login with Microsoft Entra ID (We use next auth).
- [x] Use MongoDB as a database (we use MongoDB Atlas).
- [ ] Write unit tests for both the front-end and back-end.

