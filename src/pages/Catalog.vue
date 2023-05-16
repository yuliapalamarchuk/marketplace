<template>
  <q-page>
    <div class="text-center text-h1 text-purple q-pa-xl">Каталог книг</div>
    <div class="row col-12 justify-end">
      <q-card class="col-md-3 col-xl-3 col-sm-12 flex justify-center">
        <div class="q-pa-md" style="width: 300px">
          <div class="q-gutter-md">
            <q-select
              filled
              v-model="model"
              :options="options"
              label="Выберите жанр"
              emit-value
              map-options
            />
          </div>
        </div>
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
          <q-btn color="black" label="Подробнее" />
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

const options = [
  {
    label: "Художественная литература",
  },
  {
    label: "Компьютерная литература",
  },
  {
    label: "Научная литература",
  },
];

// SET_TO_BASKET
</script>



