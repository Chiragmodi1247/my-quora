<template>
  <v-card class="my_card">
    <v-row>
        <v-col lg="1"></v-col>
      <v-col lg="9">
        <router-link :to="{ path: '/categorypage/'+category.interestName}">
          <h2 class="cat-name">{{ category.interestName }}</h2>
        </router-link>
      </v-col>
      <v-col lg="2">
        <h2 @click="follow_cat" class="follow_btn">Follow <span class="mdi mdi-account-plus"></span></h2>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  methods:{
    follow_cat() {
      alert("Following: "+ this.category.interestName)
    }
  },
  props: {
    category: Object
  },
};
</script>

<style scoped>
.my_card {
    margin-bottom: 10px;
  width: 100%;
  padding: 10px;
}
.cat-name {
    color: black;
    text-decoration: none;
}
.follow_btn {
    border-radius: 10px;
  text-align: center;
  background: blue;
  color: white;
  cursor: pointer;
}
</style>
