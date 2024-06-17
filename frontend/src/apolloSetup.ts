import { ApolloClient, InMemoryCache } from "@apollo/client";
import { makeVar } from "@apollo/client";
import { getConfig } from "./config";
import { Book } from "./books/types";

export const readingListVar = makeVar<Array<Book>>([]);

const config = getConfig();
export const client = new ApolloClient({
  uri: config.bookServerUrl,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          readingList: {
            read() {
              return readingListVar();
            },
          },
        },
      },
      Book: {
        fields: {
          isInReadingList: {
            read(_, { readField }) {
              const bookId = readField("id");
              return readingListVar().some((book) => book.id === bookId);
            },
          },
        },
      },
    },
  }),
});
