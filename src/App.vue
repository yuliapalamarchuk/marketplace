<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})

/* import Clerk from "@clerk/clerk-js";
const publishableKey = pk_test_cHJlY2lvdXMtYmVhci01LmNsZXJrLmFjY291bnRzLmRldiQ

const clerk = new Clerk(publishableKey);
await clerk.load({
  // Set load options here...
}); */
</script>
