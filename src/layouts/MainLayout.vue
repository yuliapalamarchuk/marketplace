<template>
  <q-layout class="bg-grey-1">
    <q-header
      elevated
      class="text-white"
      style="background: #24292e"
      height-hint="61.59"
    >
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn
         
          round
          dense
          flat
          :ripple="false"
          icon="favorite_border"
          size="19px"
          color="white"
          class="q-mr-sm"
          no-caps
        />
        <div
          class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center"
        >
          <q-item to="/catalog" class="text-white text-h5">Catalog </q-item>
        </div>

        <q-input
          ref="search"
          dark
          dense
          standout
          use-input
          color="black"
          style="width: 300px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-space />

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn to="/cart" dense flat round size="m" icon="shopping_cart" />

          <q-btn dense flat no-wrap>
            <q-avatar rounded size="50px">
              <span class="material-icons"> account_circle </span>
            </q-avatar>

            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div>Signed in as <strong>Mary</strong></div>
                  </q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Your profile</q-item-section>
                </q-item>

                <q-item clickable class="GL__menu-link">
                  <q-item-section>Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MyLayout",

  setup() {},
};
</script>

<style lang="sass">
.GL

  &:hover
    background: #0366d6
    color: white
    .q-item__section--side
      color: white
      .default-type
        visibility: visible

  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7

  &__menu-link:hover
    background: #0366d6
    color: white

  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important

  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9

  &__toolbar-input.q-field--focused
    width: 450px !important
    background: white
    .q-field__append
      display: none
</style>






