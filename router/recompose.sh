#!/bin/sh

# this is the unified book schema
rover subgraph introspect http://localhost:4008/graphql > books.graphql
rover subgraph introspect http://localhost:4004/graphql > author.graphql
rover supergraph compose --config ./supergraph-config.yaml > supergraph.graphql