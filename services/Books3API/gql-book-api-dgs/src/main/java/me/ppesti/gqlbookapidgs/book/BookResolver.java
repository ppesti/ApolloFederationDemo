package me.ppesti.gqlbookapidgs.book;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import me.ppesti.gqlbookapidgs.utils.DatabaseHandler;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collection;

@DgsComponent
public class BookResolver {

    @Autowired
    DatabaseHandler dbHandler;

    @DgsQuery
    public Collection<Book> books() {
        return dbHandler.getBooks();
    }

    @DgsQuery
    public Book book(@InputArgument String id) {
        return dbHandler.getBookById(id);
    }
}
