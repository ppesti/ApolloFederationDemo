// TODO: fetch data from db
const books = [
    { id: "b1", title: "To Kill a Mockingbird", authorId: "a1", pages: 281 },
    { id: "b2", title: "1984", authorId: "a2", pages: 328 },
    { id: "b3", title: "Pride and Prejudice", authorId: "a3", pages: 279 },
    { id: "b4", title: "The Great Gatsby", authorId: "a4", pages: 180 },
    { id: "b5", title: "The Lord of the Rings", authorId: "a5", pages: 1216 },
];

const resolvers = {
    Query: {
        books: () => {
            return books;
        },
        book: (_, args) => {
            return books.find((p) => p.id == args.id);
        },
    },
};

module.exports = resolvers;
