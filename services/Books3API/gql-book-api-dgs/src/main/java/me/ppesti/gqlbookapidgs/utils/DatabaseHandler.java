package me.ppesti.gqlbookapidgs.utils;

import com.netflix.graphql.dgs.DgsComponent;
import me.ppesti.gqlbookapidgs.book.Book;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

@Component
public class DatabaseHandler {

    private final Collection<Book> books = List.of(
            new Book("b10", "The Hobbit", "a9", 310),
            new Book("b11", "War and Peace", "a10", 1225),
            new Book("b12", "Moby-Dick", "a11", 585),
            new Book("b13", "Alice's Adventures in Wonderland", "a12", 200),
            new Book("b14", "The Odyssey", "a13", 324)
    );

    public Collection<Book> getBooks() {
        return books;
    }

    public Book getBookById(String id) {
        return books.stream()
                .filter(book -> book.id().equals(id))
                .findFirst()
                .orElse(null);
    }
}
