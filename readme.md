# ApolloFederationDemo

This demo project demonstrates the use of Apollo's products to create GraphQL solutions.
Apollo Federation is used to create a federated architecture instead of a monolithic graph.

This demo project only serves as an example and does not provide a step-by-step guide on recreating such applications using tools like Rover Cli.

Here are some useful resources where you can learn about all Apollo Products and GraphQL concepts:

- Official Apollo documentation: https://www.apollographql.com/docs/
- Apollo Federation documentation: https://apollo-gateway-0-28-3--apollo-federation-docs.netlify.app/docs/federation/quickstart/
- Apollo Odyssey tutorials (video + text): https://www.apollographql.com/tutorials/
- A list of Third Party libraries that support Apollo Federation: https://apollo-gateway-0-28-3--apollo-federation-docs.netlify.app/docs/federation/other-servers/

## System Structure:
```
                        Book1 API
                       /
           Book API - <
          /            \
Router - <              Book2 API
          \
           Author API
```

**Router**: the entry point for all requests (via Apollo Router)
  - routes the request to the corresponding APIs/subgraphs
  - does the stitching

**Book API**: the unified API for all book APIs (via Apollo Server)
  - sends requests to Book1 and Book2 APIs 
  - its schema is the union of the Book1 and Book2 schemas (thus Book2),
    where those fields not in the intersection of the 2 schema definitions,
    are not required

**Book1 APIs**: has fields id, authorId, title, pages

**Book2 APIs**: has fields id, authorId, title, pages, hardcover

**Author API**: the API for the authors of all Book APIs' contents (both Book1 and Book2 APIs)
