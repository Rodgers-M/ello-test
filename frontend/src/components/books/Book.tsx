import { CSSProperties, FC } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Book as TBook } from "./types";
import { readingListVar } from "../../apolloSetup";

type BookProps = {
  book: TBook;
};

export const Book: FC<BookProps> = ({ book }) => {
  const handleAddOrRemoveBook = (currentBook: TBook) => {
    const readingList = readingListVar();
    readingListVar(
      book.isInReadingList
        ? readingList.filter((book) => book.id !== currentBook.id)
        : [...readingList, { ...currentBook, isInReadingList: true }],
    );
  };

  return (
    <Box>
      <Card>
        <CardMedia
          component={"img"}
          image={new URL(
            `../../../public/${book.coverPhotoURL}`,
            import.meta.url,
          ).href.replace("/public", "")}
        />
        <CardContent style={styles.cardContent}>{book.title}</CardContent>
        <CardActions style={styles.cardActions}>
          <Button
            variant="contained"
            style={{
              backgroundColor: book.isInReadingList ? "#f76434" : "#5acccc",
            }}
            onClick={() => handleAddOrRemoveBook(book)}
          >
            {book.isInReadingList
              ? "Remove from reading list"
              : "Add to reading list"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

type Styles = {
  [key: string]: CSSProperties;
};

const styles: Styles = {
  cardContent: {
    height: "2rem",
  },
  cardActions: {
    justifyContent: "center",
  },
};
