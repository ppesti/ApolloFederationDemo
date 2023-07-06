#!/bin/sh

rover subgraph introspect http://localhost:4003/graphql > books.graphql
rover subgraph introspect http://localhost:4004/graphql > author.graphql
rover supergraph compose --config ./supergraph-config.yaml > supergraph.graphql