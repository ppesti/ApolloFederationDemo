const axios = require('axios');

const B1URI = 'http://localhost:4003/graphql';
const B2URI = 'http://localhost:4007/graphql';

const resolvers = {
  Query: {
    books: async () => {
        // Get all books from each API and merge them together
        const retVal = [];

        const BOOKS_WITHOUT_HARDCOVER = `
          query {
            books {
              id
              title
              pages
              authorId
            }
          }
        `; // Send it to Books1API

        const BOOKS_WITH_HARDCOVER = `
          query {
            books {
              id
              title
              pages
              authorId
              hardcover
            }
          }
        `; // Send it to Books2API

        // Sending to Books1API
        try {
            const response = await axios.post(B1URI, {
                query: BOOKS_WITHOUT_HARDCOVER,
            });

            // console.log(JSON.stringify(response.data));
            retVal.push(...response.data.data.books);       
        } catch (error) {
            console.error(error);
        }

        // Sending to Books2API
        try {
            const response = await axios.post(B2URI, {
                query: BOOKS_WITH_HARDCOVER,
            });

            // console.log(JSON.stringify(response.data));
            retVal.push(...response.data.data.books);
        } catch (error) {
            console.error(error);
        }

        // Note that I didn't need to instantiate anything or merge the 2 JSON responses together
        // Apollo does the dirty work for us in the background

        return retVal;
    },
    book: async (_, args) => {
        // Get the book by the given ID based on the range the authorID falls into
        const B1_LIMIT = 6;
        const B2_LIMIT = 9;

        const substring = args.id.substring(1);
        const parsedInt = parseInt(substring, 10);

        const BOOK_WITHOUT_HARDCOVER = `
            query {
              book(id: "${args.id}") {
                id
                title
                pages
                authorId
              }
            }
        `; // Send it to Books1API

        const BOOK_WITH_HARDCOVER = `
            query {
              book(id: "${args.id}") {
                id
                title
                pages
                authorId
                hardcover
              }
            }
        `; // Send it to Books2API

        // send request based on bookId range
        if (parsedInt <= B1_LIMIT) { // it is in Books1API
            try {
                const response = await axios.post(B1URI, {
                    query: BOOK_WITHOUT_HARDCOVER,
                });

                return response.data.data.book;
            } catch (error) {
                console.error(error);
            }
        } else if (parsedInt <= B2_LIMIT) { // it is in Books2API
            try {
                const response = await axios.post(B2URI, {
                    query: BOOK_WITH_HARDCOVER,
                });

                return response.data.data.book;
            } catch (error) {
                console.error(error);
            }
        }

        return null; // it is not contained
    },
  },
  Author: { // TODO: fix this, because books is not gonna work in this state
    author: (a) => books.filter((book) => book.authorId == a.id),
  },
};

module.exports = resolvers;
