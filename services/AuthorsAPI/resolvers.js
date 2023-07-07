const AuthorsRESTAPI = require("./RESTdataSource.js");

const api = new AuthorsRESTAPI();

const resolvers = {
    Query: {
        authors: () => api.getAuthors(),
        author: (_, args) => api.getAuthor(args.id),
    },
    Book: {
        author: (parent) => api.getAuthor(parent.authorId),
    },
};

module.exports = resolvers;
