// TODO: fetch data from db
const authors = [
    { id: "a1", name: "Harper Lee" },
    { id: "a2", name: "George Orwell" },
    { id: "a3", name: "Jane Austen" },
    { id: "a4", name: "F. Scott Fitzgerald" },
    { id: "a5", name: "J.R.R. Tolkien" },
];

const resolvers = {
    Query: {
        authors: () => {
            return authors;
        },
        author: (_, args) => {
            return authors.find((b) => b.id === args.id);
        },
    },
    Book: {
        author: (parent) => authors.find((b) => b.id == parent.authorId),
    },
};

module.exports = resolvers;
