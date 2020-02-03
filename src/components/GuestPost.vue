<template>
  <v-card  rounded outlined style="margin-bottom:10px;padding:10px">
    <table>
      <tr>
        <td colspan="6">
        <router-link :to="{ path: '/question/'+question_prop.questionId}">
            <h2 style="color: black">{{question_prop.questionValue}}</h2>
        </router-link>
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <div class="ans">
          <p>{{question_prop.approvedAnswer}}
          </p>
        </div>
      </tr>
    </table>

  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: "GuestPost",
  components: {},
  props: {
    question_prop: Object
  },
  methods: {
    my_card() {
      alert("You clicked icon");
    }
  }
};
</script>

<style scoped>
.my-row {
  padding: 0;
}
.my-post-box {
  height: 20vh;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
  background: white;
}
.input-box {
    background: grey;
}
</style>
