const axios = require('axios');

const B1URI = 'http://localhost:4003/graphql';
const B2URI = 'http://localhost:4007/graphql';
const B3URI = 'http://localhost:4009/graphql';

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
            const response = await sendGraphQLRequest(B1URI, BOOKS_WITHOUT_HARDCOVER);
            retVal.push(...response.data.data.books);
        } catch (error) {
            console.error(error);
        }

        // Sending to Books2API
        try {
            const response = await sendGraphQLRequest(B2URI, BOOKS_WITH_HARDCOVER);
            retVal.push(...response.data.data.books);
        } catch (error) {
            console.error(error);
        }

        // Sending to Books3API
        try {            
            const response = await sendGraphQLRequest(B3URI, BOOKS_WITHOUT_HARDCOVER);
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
        const B3_LIMIT = 13;

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
                const response = await sendGraphQLRequest(B1URI, BOOK_WITHOUT_HARDCOVER);
                return response.data.data.book;
            } catch (error) {
                console.error(error);
            }
        } else if (parsedInt <= B2_LIMIT) { // it is in Books2API
            try {
                const response = await sendGraphQLRequest(B2URI, BOOK_WITH_HARDCOVER);
                return response.data.data.book;
            } catch (error) {
                console.error(error);
            }
        } else if (parsedInt <= B3_LIMIT) {
            try {
                const response = await sendGraphQLRequest(B3URI, BOOK_WITHOUT_HARDCOVER);
                return response.data.data.book;
            } catch (error) {
                console.error(error);
            }
        }

        return null; // it is not contained
    },
  },
  Author: {
    author: (a) => books.filter((book) => book.authorId == a.id),
  },
};

const sendGraphQLRequest = async (uri, query) => {
    return await axios.post(uri, {
        query: query,
    });
};

module.exports = resolvers;
