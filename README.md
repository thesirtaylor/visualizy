
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


This monorepo houses a set of basic endpoints designed to manage bank entities. The endpoints include:

- Create Bank Entity: A POST request to create a bank entity.

- Fetch Bank by BIC: A GET request to fetch a particular bank by its Bank Identification Code (BIC).

- Fetch All Banks: A GET request to retrieve all banks existing in the database. This endpoint doesn't require authentication.

To prevent duplicate bank creation requests, I've implemented an idempotency key mechanism. This mechanism works by hashing the request payload and storing it in an in-memory database for a set duration. This ensures a particular bank can only be created once within that timeframe, even if the server restarts.

To see this feature in demonstration, check the log whenever a unique payload is sent to the database, you will notice the bank name is logged to the console, but if that same payload is sent repeatedly nothing will be logged, meaning the payload did not make it out of the producer server at subsequent requests.

This code demonstrates idempotency keys, a way of preventing request duplication, which we discussed earlier as a potential solution. While event step monitoring could also be implemented to track successful events and avoid re-execution of event steps in a transaction even after a system crash, there is no use case for it in this particular project.

#### Server Features:

##### File structure:
This is a monorepo, therefore there is a libs library where all code resources shared between the services reside.

##### Endpoint Security:
 Endpoints are accessible only when an id (prime number) is provided in the request header.

##### Deployment:
For local development without Docker, ensure Zookeeper, Kafka, PostgreSQL and Redis are running locally on your machine. 
Run ```yarn run start:all``` to start all servers concurrently

With Docker, simply run ```docker comose build``` then ```docker compose up```. 

##### Testing: 
Tests have been written for most components, ensuring the reliability and correctness of the codebase. Tests can be executed with 

```bash
#run all tests
yarn run test:ci

#run unit tests
yarn run test

#run e2e tests
yarn run test:e2e
```

##### Logging: 
Local logging is implemented to monitor data and errors. This is particularly useful as the API gateway cannot receive the actual response body from the microservice.
While the implementation is basic, a more sophisticated and persistent approach would be taken in a production environment.

##### Documentation:
A basic OpenAPI documentation is implemented to show how the API gateway endpoints function.


~
it is worth noting that the .env was intentionally included in the push to github for the reviewer to see, this would not be done in a proper project
~ 


I look forward to hearing from you,
Cheers.
