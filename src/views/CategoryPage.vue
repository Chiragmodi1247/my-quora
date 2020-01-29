<template>
  <div>
    <div class="my-profile">
      <br /><br /><br />
      <br />
      <h1 style="color: white">{{ CategoryName }}</h1>
    </div>

    <div class="left-div"></div>
    <div class="center-cont">
      <textarea
        id="asking_new_question"
        @input="enable_ask"
        class="asking_new_question_onprofile"
        placeholder="Ask a question for this category"
      ></textarea>
      <button :disabled="!selected" class="btn_send">
        Ask <span class="mdi mdi-send"></span>
      </button>
      <div>
        <h1 style="color: black">Specific category questions here</h1>
        <UserAskedQuestion />
        <UserAskedQuestion />
        <UserAskedQuestion />
        <UserAskedQuestion />
        <UserAskedQuestion />
        <UserAskedQuestion />
      </div>
    </div>
  </div>
</template>

<script>
import UserAskedQuestion from "../components/UsersAskedQuestions";
export default {
  name: "home",
  components: {
    UserAskedQuestion
  },
  data: function() {
    return {
      feed: {
        questions: true,
        answers: false,
        followers: false,
        followings: false
      },
      selected: false,
      CategoryName: this.$route.params.name
    };
  },
  methods: {
    enable_ask() {
      let que = document.getElementById("asking_new_question");
      if (que.value.length !== 0) this.selected = true;
      if (que.value.length === 0) this.selected = false;
    }
  }
};
</script>

<style scoped>
.cat-btn {
  padding: 22px;
}
.asking_new_question_onprofile {
  background: rgb(255, 255, 255);
  width: 100%;
  border-radius: 20px;
  margin: 10px 0px 10px 0px;
  padding: 10px;
}
.cat-select {
  border: 1px solid black;
  padding: 0px 10px 0px 10px;
}
.my-profile {
  text-align: center;
  height: 200px;
  background: rgb(0, 54, 134);
}
.login-btn {
  padding: 5px 20px 5px 20px;
  color: white;
  border-radius: 5px;
  background: rgb(223, 45, 0);
}
.btn_send {
  background: rgb(255, 94, 0);
  color: white;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
  float: right;
}
.btn_send:disabled {
  background: rgb(209, 209, 209);
  color: white;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
  float: right;
}

.left-div {
  text-align: center;
  padding: 20px;
  width: 20%;
  margin-top: 30px;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  left: 2%;
}
.center-cont {
  width: 60vw;
  left: 20%;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
}
</style>
