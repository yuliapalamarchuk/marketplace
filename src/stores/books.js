import { useQuery } from "@vue/apollo-composable";
import { defineStore } from "pinia";
import { queryBooks } from "src/queries/getbooks";
import { computed, ref } from "vue";

export const getBooks = defineStore("counter", {
  state: () => ({
    books: ref([]),
    cart: ref([]),
    totalValue: 0,
    inputData: "",
  }),

  getters: {
    SET_BOOKS_FROM_DB(state) {
      return computed(() => state.books);
    },
    SET_CART(state) {
      return computed(() => state.cart);
    },
  },

  actions: {
    GET_BOOKS_FROM_DB() {
      let { result } = useQuery(queryBooks);
      this.books = computed(() => result.value?.books ?? []);
    },
    ADD_TO_CART(descDial) {
      if (this.cart.length) {
        let isProductExists = false;
        this.cart.map((i) => {
          if (i.title === descDial.title) {
            isProductExists = true;
            i.quantity++;
            this.totalValue += i.price;
          }
          return i;
        });
        if (!isProductExists) {
          this.cart.push(descDial);
        }
      } else {
        descDial.quantity = 1;
        this.cart.push(descDial);
        this.totalValue += descDial.price;
      }
    },
    INCREMENT(book) {
      book.quantity++;
      this.totalValue += book.price;
    },
    DECREMENT(book) {
      const bookIndex = this.cart.findIndex((item) => item === book);
      if (book.quantity > 1) {
        book.quantity--;
        this.totalValue -= book.price;
      } else {
        this.cart.splice(bookIndex, 1);
      }
    },

    INPUTDATA(input) {
      this.inputData = "";
      this.inputData = input;
    },
  },
});
