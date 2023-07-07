package me.ppesti.authorrestapi.controller;

import me.ppesti.authorrestapi.author.Author;
import me.ppesti.authorrestapi.util.DatabaseHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
public class AuthorsController {

    DatabaseHandler dbHandler = new DatabaseHandler();

    @GetMapping("/authors")
    public ResponseEntity<Collection<Author>> getAuthors() {
        var authors = dbHandler.getAuthors();

        if (authors == null || authors.size() == 0) {
            return ResponseEntity.notFound()
                    .header("X-Message", "No authors found.")
                    .build();
        }

        return ResponseEntity.ok()
                .header("X-Message", "Authors fetched.")
                .body(authors);
    }

    @GetMapping("/authors/author/{id}")
    public ResponseEntity<Author> getAuthor(@PathVariable final String id) {
        var author = dbHandler.getAuthorById(id);

        if (author == null) {
            return ResponseEntity.notFound()
                    .header("X-Message", "Author not found by the specified id.")
                    .build();
        }

        return ResponseEntity.ok()
                .header("X-Message", "Author fetched.")
                .body(author);
    }

    // TODO: POST, PUT, PATCH, DELETE
}
