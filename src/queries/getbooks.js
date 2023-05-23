import { gql } from "graphql-tag";

export const queryBooks = gql`
  query MyQuery {
    books {
      author
      genre
      image
      price
      title
      fulldescription
      quantity
    }
  }
`;
