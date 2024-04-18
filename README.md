
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


This monorepo houses a set of basic endpoints designed to manage bank entities. The endpoints include:

- Create Bank Entity: A POST request to create a bank entity.

- Fetch Bank by BIC: A GET request to fetch a particular bank by its Bank Identification Code (BIC).

- Fetch All Banks: A GET request to retrieve all banks existing in the database. This endpoint doesn't require authentication.

To prevent duplicate bank creation requests, I've implemented an idempotency key mechanism. This mechanism works by hashing the request payload and storing it in an in-memory database for a set duration. This ensures a particular bank can only be created once within that timeframe, even if the server restarts.

This code demonstrates idempotency key a way of preventing transaction duplication, which we discussed earlier as a potential solution. While event step monitoring could also be implemented to track successful events and avoid re-execution of event steps in a transaction even after a system crash, there is no use case for it in this particular project.

#### Server Features:

##### File structure:
This is a monorepo, therefore there is a libs library where all code resources shared between the services reside.

##### Logging: 
Local logging is implemented to monitor data and errors. This is particularly useful as the API gateway cannot receive the actual response body from the microservice.
While the implementation is basic, a more sophisticated and persistent approach would be taken in a production environment.

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

##### Endpoint Security:
 Endpoints are accessible only when an id (prime number) is provided in the request header.

##### Deployment:
For local deployment without Docker, ensure Zookeeper, Kafka, and Redis are running locally on your machine, we are using a connection string for postgresql so there is no need to worry about it. 
Run ```yarn run start:all``` to start all servers concurrently

With Docker, simply run ```docker compose up```. 

###### Note: Using Kafka in docker successfully has been a challenge, so local deployment is advised for testing.

##### Documentation:
A basic OpenAPI documentation is implemented to show how the API gateway endpoints function.


~
it is worth noting that the .env was intentionally included in the push to github for the reviewer to see, this would not be done in a proper project
~ 

##### Extra note
I believe it is right that I mention that one of the reasons for the delay in submission is my ongoing learning process with Docker. While I haven't recently dockerized standard applications, I'm actively working on improving my Docker skills. In the meantime, I'm continuing to learn how to effectively utilize docker without depending on a devOps engineer.


I look forward to hearing from you,
Cheers.