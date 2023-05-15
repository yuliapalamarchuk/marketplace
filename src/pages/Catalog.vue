<template>
  <q-layout view="lHh Lpr lFf">
    <q-item v-for="product in products" :key="product.id">
      <q-item-label>
        {{ product.title }}
      </q-item-label>
      <q-item-label caption>ID: {{ product.id }}</q-item-label>
    </q-item>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script>
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default defineComponent({
  name: "Catalog",

  setup() {
    const router = useRouter();

    const { result, loading } = useQuery(gql`
      query MyQuery {
        products {
          id
          title
        }
      }
    `);

    const products = computed(() => result.value?.products ?? []);

    return {
      products,
    };
  },
});
</script>



