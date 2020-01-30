<template>
  <div>
    <div class="left-div">
      <ul style="color: blue">
        <li>
          <button
            @click="
              feed.all = true;
              feed.questions = false;
              feed.profile = false;
              feed.category = false;
            "
          >
            <h2>All Type</h2>
          </button>
        </li>
        <li>
          <button
            @click="
              feed.all = false;
              feed.questions = true;
              feed.profile = false;
              feed.category = false;
            "
          >
            <h2>Questions</h2>
          </button>
        </li>
        <li>
          <button
            @click="
              feed.all = false;
              feed.questions = false;
              feed.profile = true;
              feed.category = false;
            "
          >
            <h2>Profiles</h2>
          </button>
        </li>
        <li>
          <button
            @click="
              feed.all = false;
              feed.questions = false;
              feed.profile = false;
              feed.category = true;
            "
          >
            <h2>Categories</h2>
          </button>
        </li>
      </ul>
    </div>
    <div class="center-cont">
      <div v-if="feed.all">
        <h1 style="color: black">
          Search results for {{ this.$route.query.searchQuery }}
        </h1>
        <Category :category="my_category" />
        <UserAskedQuestion />
        <SmallProfile />
        <SmallProfile />
        <UserAskedQuestion />
        <UserAskedQuestion />
        <Category :category="my_category" />
        <UserAskedQuestion />
      </div>

      <div v-if="feed.questions">
        <h1 style="color: black">
          Questions: {{ this.$route.query.searchQuery }}
        </h1>
        <UserAskedQuestion />
        <UserAskedQuestion />
        <UserAskedQuestion />
        <UserAskedQuestion />
        <UserAskedQuestion />
        <UserAskedQuestion />
      </div>
      <div v-if="feed.profile">
        <h1 style="color: black">
          Profile: {{ this.$route.query.searchQuery }}
        </h1>
        <SmallProfile />
        <SmallProfile />
        <SmallProfile />
        <SmallProfile />
        <SmallProfile />
      </div>

      <div v-if="feed.category">
        <h1 style="color: black">
          Category: {{ this.$route.query.searchQuery }}
        </h1>
        <Category :category="my_category" />
        <Category :category="my_category" />
        <Category :category="my_category" />
        <Category :category="my_category" />
        <Category :category="my_category" />
        <Category :category="my_category" />
        <Category :category="my_category" />
        <Category :category="my_category" />
      </div>
    </div>
  </div>
</template>

<script>
import UserAskedQuestion from "../components/UsersAskedQuestions";
import SmallProfile from "../components/SmallProfile";
import Category from "../components/Category";

export default {
  name: "home",
  components: {
    UserAskedQuestion,
    SmallProfile,
    Category
  },
  data: function() {
    return {
      feed: {
        all: true,
        questions: false,
        profile: false,
        category: false
      },
      my_category: {
        name: "Literature"
      }
    };
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
