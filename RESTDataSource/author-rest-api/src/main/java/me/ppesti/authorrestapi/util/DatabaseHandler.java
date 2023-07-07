package me.ppesti.authorrestapi.util;

import me.ppesti.authorrestapi.author.Author;

import java.util.Collection;
import java.util.Set;

public class DatabaseHandler {

    // TODO: plug SQLite Database
    private final Collection<Author> authors = Set.of(
            new Author("a1", "Harper Lee"),
            new Author("a2", "George Orwell"),
            new Author("a3", "Jane Austen"),
            new Author("a4", "F. Scott Fitzgerald"),
            new Author("a5", "J.R.R. Tolkien")
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
