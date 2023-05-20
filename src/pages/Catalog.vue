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
                <div class="text-h6">
                  {{ descDial.author }} - {{ descDial.title }}
                </div>
                <q-btn icon="close" flat round dense v-close-popup />
              </div>
              <div class="flex row">
                <q-img :src="descDial.image" width="250px" class="col-6" />
                <div class="col-6 q-pa-md">{{ descDial.fulldescription }}</div>
              </div>
              <div class="flex justify-end col q-pb-md">
                <q-btn color="black" label="Добавить в корзину" />
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

const router = useRouter();
/*
 * add data from hasura
 */
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
const books = computed(() => result.value?.books ?? []);
const model = ref("");

/* get books from api */

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
const options = ref([
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
]);
const group = ref(null);
/**
 * sort by genre
 */
const genre = [];
const sortByGenre = () => {};
const single = ref(null);
const sortingAr = ["По убыванию цены", "По возрастанию цены"];
/**
 * dialog
 */
const descDial = ref("");
const dialogDesc = (item) => {
  console.log(item);
  descDial.value = "";
  descDial.value = item;
  icon.value = true;
};
const icon = ref(false);



</script>

<style>
.col {
  max-height: 5.6em;
}
</style>