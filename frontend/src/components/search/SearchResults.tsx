import { FC, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import styles from "./search.module.css";
import { readingListVar } from "../../apolloSetup";
import { Book } from "../books/types";

const SearchResultsItem: FC<{ book: Book }> = ({ book }) => {
  const [addedToReadingList, setAddedToReadingList] = useState(false);

  const handleAddBookToReadingList = (currentBook: Book) => {
    readingListVar([...readingListVar(), currentBook]);
    setAddedToReadingList(true);
  };

  return (
    <>
      <ListItem key={`${book.id}`}>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={new URL(
              `../../../public/${book.coverPhotoURL}`,
              import.meta.url,
            ).href.replace("/public", "")}
          />
        </ListItemAvatar>
        <ListItemText>{book.title}</ListItemText>
        <Button
          onClick={() => handleAddBookToReadingList(book)}
          variant="contained"
          disabled={book.isInReadingList || addedToReadingList}
          style={{
            backgroundColor:
              book.isInReadingList || addedToReadingList
                ? "#eff2f5"
                : "#5acccc",
          }}
        >
          add book
        </Button>{" "}
      </ListItem>
      <Divider />
    </>
  );
};

type SearchResultsProps = {
  books?: Array<Book>;
  visible: boolean;
};

export const SearchResults: FC<SearchResultsProps> = ({ books, visible }) => {
  return (
    <div
      className={`${styles["search-results-container"]} ${
        visible ? "" : styles["hidden"]
      }`}
    >
      <List>
        {!books?.length ? (
          <ListItem>
            <ListItemText>No books matched your search</ListItemText>
          </ListItem>
        ) : (
          books.map((book) => <SearchResultsItem book={book} key={book.id} />)
        )}
      </List>
    </div>
  );
};
