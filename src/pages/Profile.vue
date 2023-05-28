<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center" style="font-family: Lato">
        <q-card
          :style="$q.platform.is.desktop ? 'width:55%;' : ''"
          class="row ms-login items-center q-pa-none q-ma-none shadow-24"
        >
          <q-card-section
            v-if="$q.platform.is.desktop"
            class="col-md-4 col-lg-4 col-sm-12 sol-xs-12 items-center float-left bg-teal-6"
            :style="{ height: win_height - 270 + 'px' }"
            horizontal
          >
            <div class="text-center full-width">
              <div class="text-weight-bolder text-white text-h6">myShop</div>
              <div class="text-caption text-white">Closed sale store</div>
            </div>
          </q-card-section>
          <q-card-section
            class="col-md-8 col-lg-8 col-sm-12 sol-xs-12 float-left"
          >
            <q-card-section class="items-center">
              <div>
                <q-form
                  :style="
                    $q.platform.is.desktop
                      ? 'width:55%;margin: auto;'
                      : 'margin: auto;'
                  "
                  class="q-gutter-md"
                >
                  <span class="text-subtitle1 text-weight-bold text-grey-7"
                    >Welcome to myShop</span
                  >
                  <q-input
                    dense
                    outlined
                    v-model="username"
                    label="Username"
                    lazy-rules
                  />

                  <q-input
                    dense
                    type="password"
                    outlined
                    v-model="password"
                    label="Password"
                    lazy-rules
                  />
                  <q-checkbox
                    class="text-grey-8"
                    dense
                    v-model="remember_me"
                    label="Remember me"
                  />
                  <div>
                    <q-item id="auth-links">
                      <q-btn
                        id="btn"
                        class="text-capitalize bg-teal-6"
                        size="sm"
                        style="width: 75px"
                        dense
                        label="Login"
                        to="/catalog"
                        type="button"
                        color="primary"
                      />
                    </q-item>

                    <q-btn
                      class="float-right text-blue-9 text-capitalize"
                      size="sm"
                      style="width: 75px; border: 1px solid #36669e"
                      dense
                      label="Sign Up"
                      type="button"
                    />
                  </div>
                </q-form>
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      username: "admin",
      password: "admin",
      remember_me: false,
    };
  },
  mounted() {},
  computed: {
    win_width() {
      return this.$q.screen.width - 59;
    },
    win_height() {
      return this.$q.screen.height - 0;
    },
  },
  methods: {},
};
</script>
<style>
.ms-login {
  width: 55%;
  height: 30%;
}

#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}

.login-form {
  position: absolute;
}
</style>
