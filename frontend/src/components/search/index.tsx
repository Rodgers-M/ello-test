import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Book } from "../books/types";
import styles from "./search.module.css";
import { useDebounce } from "../../hooks/useDebounce";
import { gql, useLazyQuery } from "@apollo/client";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

const GET_BOOKS_QUERY = gql`
  query Books {
    books {
      id
      title
      author
      coverPhotoURL
      readingLevel
      isInReadingList @client
    }
  }
`;

export const Search = () => {
  const [showResultsComponent, setShowResultsComponent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>();

  const searchComponentRef = useRef<HTMLDivElement>(null);

  const [getBooks, { loading, error }] = useLazyQuery(GET_BOOKS_QUERY, {
    errorPolicy: "all",
  });

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      if (
        searchComponentRef.current &&
        !searchComponentRef.current.contains(event.target as Node)
      ) {
        setShowResultsComponent(false);
        setSearchTerm("");
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", clickOutsideHandler);
    return () => document.removeEventListener("mousedown", clickOutsideHandler);
  }, [searchComponentRef]);

  const searchBooks = () => {
    // this returns all the books in the cache
    // the query will idealy be replaced with another that performs a search on
    // the backend
    getBooks({
      onCompleted: (data) => {
        const filteredBooks = data.books.filter((book: Book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setSearchResults(filteredBooks);
      },
    });
  };

  const debouncedSearchBooks = useDebounce(searchBooks, 300);

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      setShowResultsComponent(true);
    } else {
      setShowResultsComponent(false);
    }
    debouncedSearchBooks();
  };

  return (
    <div className={styles["search-container"]} ref={searchComponentRef}>
      <SearchInput
        searchTerm={searchTerm}
        handleChange={handleSearchTermChange}
      />
      <SearchResults visible={showResultsComponent} books={searchResults} />
    </div>
  );
};
