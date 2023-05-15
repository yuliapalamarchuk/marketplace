<template>
  <q-page>
    <div class="text-center text-h1 text-purple q-pa-xl">Я самая лучшая</div>
    <div class="row col-12 justify-end">
      <q-card class="col-md-3 col-xl-3 col-sm-12 flex justify-center">
        <q-select
          label="Flip up/down"
          transition-show="flip-up"
          transition-hide="flip-down"
          filled
          v-model="model"
          :options="options"
          style="width: 100%"
        />
      </q-card>
      <q-card
        class="my-card col-xl-3 col-md-3 col-sm-6 col-xs-12 flex no-wrap"
        v-for="product in products"
        :key="product.id"
      >
        <q-card-section>
          <q-img :src="product.image" width="250px">
            <div class="absolute-bottom text-h6">Title</div>
          </q-img>
          <q-card-section class="col">
            {{ product.title }}
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <!-- <q-item v-for="product in products" :key="product.id">
      <q-item-label>
        {{ product.title }}
      </q-item-label>
      <q-item-label caption>ID: {{ product.id }}</q-item-label>
    </q-item> -->

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
    products {
      id
      title
      image
    }
  }
`);
const products = computed(() => result.value?.products ?? []);

// SET_TO_BASKET
</script>



