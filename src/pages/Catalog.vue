<template>
  <q-page>
    <div class="text-center text-h1 text-purple q-pa-xl">Каталог книг</div>
    <div class="row col-12 justify-end">
      <q-card class="col-md-3 col-xl-3 col-sm-12 flex justify-center">
        <div class="q-pa-md">
          <q-option-group :options="options" type="radio" v-model="group" />
        </div>
        <q-select
          filled
          v-model="single"
          :options="sortingAr"
          label="Сортировать"
          style="width: 250px"
        />
      </q-card>

      <q-card
        class="my-card col-xl-3 col-md-3 col-sm-6 col-xs-12 flex no-wrap"
        v-for="book in books"
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
          <q-card-section class="col">
            {{ book.description }}
          </q-card-section>

          <q-card-section>
            <q-btn color="black" label="Подробнее" style="width: 100px" />

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
          </q-card-section>
        </q-card-section>
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

// add data
const router = useRouter();

const { result, loading } = useQuery(gql`
  query MyQuery {
    books {
      author
      genre
      description
      image
      price
      title
    }
  }
`);
const books = computed(() => result.value?.books ?? []);

const model = ref("");

//addtocartcounter
let counterShop = ref(0);
const addToCartCounter = (index) => {
  counterShop.value += 1;
};

const group = ref(null);

const options = [
  {
    label: "Все жанры",
    value: "genres",
  },
  {
    label: "Художественная литература",
    value: "art",
  },
  {
    label: "Компьютерная литература",
    value: "comp",
  },
  {
    label: "Научная литература",
    value: "science",
  },
];

//sort by genre
const genre = [];

const sortByGenre = () => {};

const single = ref(null);

const sortingAr = ["По убыванию цены", "По возрастанию цены"];
</script>



