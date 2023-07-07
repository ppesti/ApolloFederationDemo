const { RESTDataSource } = require("@apollo/datasource-rest");

class AuthorsRESTAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = "http://localhost:4005";
    }

    /** returns all authors */
    getAuthors = () => this.get("authors");

    /** returns an author by id */
    getAuthor = (id) => this.get(`authors/author/${id}`);
}

module.exports = AuthorsRESTAPI;
