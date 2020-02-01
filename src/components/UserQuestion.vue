<template>
  <v-card rounded outlined style="margin-bottom:10px;padding:10px">
    <table>
      <tr>
        <td colspan="1">
          <v-img
            src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80"
            alt="MyDog"
            max-width="40px"
            max-height="40px"
            style="border-radius: 50%"
          >
          </v-img>
        </td>
        <td>
          {{ ans.profileNameOfAnswerer }}
        </td>
        <td style="float: right;">
          <span class="mdi mdi-dots-vertical"></span>
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <div class="ans">
          <p>{{ ans.answerValue }}</p>
        </div>
      </tr>
    </table>

    <v-divider></v-divider>

    <h2>Older Comments</h2>
  </v-card>
</template>

<script>
// @ is an alias to /src
export default {
  name: "GuestPost",
  components: {},
  data() {
    return {};
  },
  methods: {
    my_card() {
      alert("You clicked icon");
    }
  },
  props: {
    ans: Object
  }
  //   created() {
  //       let storeCmt = JSON.stringify(this.myComments)
  //       localStorage.setItem("commentArr", storeCmt)
  //   }
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
  width: 50vw;
}
.btn_send {
  background: blue;
  color: white;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
}

ul {
  list-style-type: none;
}

.comment-box {
  width: 500px;
  height: 50px;
  font-size: 15px;
}

.add-btn {
  width: 80px;
  font-size: 15px;
  background-color: #5b0de6;
  color: white;
}

.comment-handle {
  color: blue;
  margin-top: 20px;
  text-decoration: underline;
}

.hr {
  color: rgba(0, 0, 0, 0.15);
  width: 600px;
}

.comment-header {
  display: flex;
  width: 50%;
  justify-content: space-between;
}

.comment-input-row {
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
