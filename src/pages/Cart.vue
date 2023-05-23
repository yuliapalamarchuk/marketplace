<template>
  <q-page>
    <div class="text-h2 text-center q-pa-xl">
      Корзина товаров

      <q-card class="" v-for="book in books" :key="book.id">
        <div class="flex justify-around">
          <q-card-section>
            <q-img :src="book.image" width="150px"></q-img>
          </q-card-section>
          <q-card-section class="text-h6">
            {{ book.author }} - {{ book.title }}
          </q-card-section>
          <q-card-section class="flex column justify-evenly">
            <div class="btn_qtn">
              <q-btn round color="purple" glossy icon="plus" />
              <q-btn outline style="color: black" label="1" />
              <q-btn round color="purple" glossy icon="minus" />
            </div>
            <div class="text-h6">{{ book.price }} P</div>
            <q-btn
              style="background: purple; color: white"
              label="Оформить заказ"
            />
          </q-card-section>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent } from "vue";
import { getBooks } from "stores/books";

const store = getBooks();
store.GET_BOOKS_FROM_DB();
const books = store.SET_CART;

</script>















