import { Box, Button, Grid } from "@mui/material";
import { Book as TBook } from "./types";
import { gql, useQuery } from "@apollo/client";
import { Book } from "./Book";
import { Search } from "../search";
import { CSSProperties, useEffect, useState } from "react";
import { readingListVar } from "../../apolloSetup";
import { SkeletonLoader } from "../loader/skeleton";

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
export const BookList = () => {
  const [books, setBooks] = useState<Array<TBook>>();
  const [viewReadingList, setViewReadingList] = useState(false);

  const { loading, error, data } = useQuery(GET_BOOKS_QUERY, {
    errorPolicy: "all",
    onCompleted: (data) => {
      setBooks(data.books);
    },
  });

  console.log("books", books);
  useEffect(() => {
    if (viewReadingList) {
      setBooks(readingListVar());
    } else {
      setBooks(data?.books);
    }
  }, [viewReadingList, data?.books]);

  const toggleViewReadingList = () => {
    setViewReadingList((prevValue) => !prevValue);
  };

  // TODO: replace this with an error component
  if (error) return <Box>Something went wrong while fetching books</Box>;
  return (
    <Box sx={styles.bookListContainer}>
      <Search />
      <Box sx={styles.actionButtonContainer}>
        <Button
          variant="outlined"
          sx={{ color: "#5acccc", fontWeight: 700 }}
          onClick={() => toggleViewReadingList()}
        >
          {viewReadingList ? "View all books" : "View Reading List"}
        </Button>
      </Box>
      <>
        {loading ? (
          <SkeletonLoader numberOfRows={2} />
        ) : (
          <Grid container spacing={2} justifyContent={"center"}>
            {!books?.length ? (
              <Box sx={{ width: "100vw" }}>
                No books available{" "}
                {`${viewReadingList ? " in your reading list" : ""}`}
              </Box>
            ) : (
              books?.map((book: TBook) => (
                <Grid item xs={10} sm={6} md={4} lg={3} key={book.id}>
                  <Book book={book} />
                </Grid>
              ))
            )}
          </Grid>
        )}
      </>
    </Box>
  );
};

type Styles = {
  [key: string]: CSSProperties;
};

const styles: Styles = {
  bookListContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    minHeight: "100vh",
  },
  actionButtonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "end",
    paddingBottom: "0.5rem",
  },
};
