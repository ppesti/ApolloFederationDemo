// TODO: fetch data from db
const books = [
    { id: "b7", title: "The Catcher in the Rye", authorId: "a6", pages: 277, hardcover: false },
    { id: "b8", title: "Brave New World", authorId: "a7", pages: 288, hardcover: true },
    { id: "b9", title: "The Hobbit", authorId: "a8", pages: 310, hardcover: true },
    { id: "b6", title: "Go Set a Watchman", authorId: "a1", pages: 278 }, // duplicated -> null
]; // hardcover is only present in books2api

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
