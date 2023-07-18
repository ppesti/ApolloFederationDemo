package me.ppesti.authorrestapi.util;

import me.ppesti.authorrestapi.author.Author;

import java.util.Collection;
import java.util.Set;

public class DatabaseHandler {

    // TODO: plug SQLite Database
    private final Collection<Author> authors = Set.of(
            new Author("a1", "Harper Lee", "American"),
            new Author("a2", "George Orwell", "British"),
            new Author("a3", "Jane Austen", "British"),
            new Author("a4", "F. Scott Fitzgerald", "American"),
            new Author("a5", "J.R.R. Tolkien", "British"),
            new Author("a6", "Virginia Woolf", "British"),
            new Author("a7", "J.D. Salinger", "American"),
            new Author("a8", "Aldous Huxley", "British")
    );

    public Collection<Author> getAuthors() {
        return authors;
    }

    public Author getAuthorById(String id) {
        return authors.stream()
                .filter(author -> author.id().equals(id))
                .findFirst()
                .orElse(null);
    }
}
