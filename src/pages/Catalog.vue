<template>
  <q-page>
    <div class="text-center text-h2 q-pa-xl">Каталог книг</div>
    <div class="">{{ store.counter }}</div>
    <div class="row col-12 justify-end">
      <q-card class="col-md-3 col-xl-3 col-sm-12 flex justify-center">
        <div class="q-pa-md">
          <q-option-group
            :options="options"
            type="checkbox"
            :select="filterByGenres(model)"
            v-model="model"
          />
        </div>
        <q-select
          filled
          v-model="single"
          :options="sortingAr"
          label="Сортировать"
          :select="sortedByPrice(single)"
          style="width: 250px"
        />
      </q-card>
      <q-card
        class="my-card col-xl-3 col-md-3 col-sm-6 col-xs-12 flex no-wrap"
        v-for="book in arr"
        :key="book.id"
      >
        <q-card-section>
          <q-img :src="book.image" width="250px">
            <div class="absolute-top text-subtitle1">
              {{ book.genre }}
            </div>
            <div class="absolute-bottom text-h6">
              {{ book.author }} - {{ book.title }}
            </div>
          </q-img>
          <q-card-section class="flex">
            <q-btn
              @click="dialogDesc(book)"
              color="black"
              label="Подробнее"
              style="width: 100px"
            />
            <q-btn
              @click="addToCartCounter(index)"
              dense
              color="purple"
              round
              icon="local_grocery_store"
              class="q-ml-md"
            >
              <q-tooltip class="bg-indigo" :offset="[10, 10]">
                Добавить в корзину
              </q-tooltip>

              <q-badge color="red" floating>{{ counterShop }}</q-badge>
            </q-btn>
            <div class="q-pl-sm text-bold text-h6">{{ book.price }} рублей</div>
          </q-card-section>
        </q-card-section>

        <q-dialog v-model="icon">
          <q-card>
            <q-card-section class="row items-center q-pb-none">
              <div class="flex justify-between col">
                <div class="text-subtitle1">
                  {{ descDial.author }} - {{ descDial.title }}
                </div>
                <q-btn icon="close" flat round dense v-close-popup />
              </div>
              <div class="flex row">
                <q-img :src="descDial.image" width="250px" class="col-6" />
                <div class="col-6 q-pa-md">{{ descDial.fulldescription }}</div>
              </div>
              <div class="flex justify-end col q-pb-md">
                <q-btn
                  color="black"
                  label="Добавить в корзину"
                  @click="addToCart(descDial)"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-card>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-page>
</template>


<script setup>
// import
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { getBooks } from "stores/books";
/* 
test pinia
*/
const store = getBooks();
store.GET_BOOKS_FROM_DB();
const books = store.SET_BOOKS_FROM_DB;

const router = useRouter();
/*
 * add data from hasura
 */
/* const { result, loading } = useQuery(gql`
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
const books = computed(() => result.value?.books ?? []); */

const model = ref([]);

/**
 * filter by genres
 */

const filteredBooks = ref([]);

const filterByGenres = (model) => {
  filteredBooks.value.length = 0;
  for (let i of model) {
    books.value.map((elem) => {
      if (elem.genre === i) {
        filteredBooks.value.push(elem);
      } else {
        return;
      }
    });
  }
};

const selectedGenres = computed(() => {
  if (filteredBooks.value.length) {
    return filteredBooks.value;
  } else {
    return books.value;
  }
});

/**
 * addtocartcounter
 */

let counterShop = ref(0);
const addToCartCounter = (index) => {
  counterShop.value += 1;
};
/**
 * filter genres
 */
const options = [
  {
    label: "Художественная литература",
    value: "Художественная литература",
  },
  {
    label: "Компьютерная литература",
    value: "Компьютерная литература",
  },
  {
    label: "Научная литература",
    value: "Научная литература",
  },
  {
    label: "Бизнес, экономика и право",
    value: "Бизнес, экономика и право",
  },
  {
    label: "Психология и эзотерика",
    value: "Психология и эзотерика",
  },
  {
    label: "Книги в оригинале",
    value: "Книги в оригинале",
  },
];
// const group = ref("Все жанры");

/**
 * sort by price
 */
const genre = [];
const sortByGenre = () => {};
const single = ref("");
const sortingAr = [
  {
    value: "По возрастанию цены",
    label: "По возрастанию цены",
  },
  {
    value: "По убыванию цены",
    label: "По убыванию цены",
  },
];

const sortByAsc = (d1, d2) => {
  return d1.price > d2.price ? 1 : -1;
};

const sortByDesc = (d1, d2) => {
  return d1.price < d2.price ? 1 : -1;
};
const sorting = ref("");
const arr = ref([...selectedGenres.value]);
const sortedByPrice = (single) => {
  switch (single.value) {
    case "По возрастанию цены":
      return arr.value.sort(sortByAsc);
    case "По убыванию цены":
      return arr.value.sort(sortByDesc);
  }
};

/**
 * dialog
 */
const descDial = ref("");
const dialogDesc = (item) => {
  descDial.value = "";
  descDial.value = item;
  icon.value = true;
};
const icon = ref(false);

/**
 * Add to cart
 */

const addToCart = (descDial) => {
  const cloneAddToCart = { ...descDial };
  store.ADD_TO_CART(cloneAddToCart);
};
</script>

<style>
.col {
  max-height: 5.6em;
}
</style>