import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";


export const useBooksStore = defineStore("books", {
  state: () => ({
    books: ref([]),
  }),
  getters: {},
  actions: {
    GET_BOOKS_FROM_API() {
      const { result, loading } = useQuery(gql`
        query MyQuery {
          books {
            author
            genre
            description
            image
            price
            title
            fulldescription
          }
        }
      `);
      this.books = computed(() => result.value?.books ?? []);
    },
  },
});
