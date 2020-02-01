<template>
  <div>
    <div class="my-profile">
      <UserProfileBox />
    </div>

    <div class="left-div">
      <ul style="color: blue">
        <li>
          <button
            @click="
              feed.questions = true;
              feed.answers = false;
              feed.followers = false;
              feed.followings = false;
            "
          >
            <h2>My Questions</h2>
          </button>
        </li>
        <li>
          <button
            @click="
              feed.questions = false;
              feed.answers = true;
              feed.followers = false;
              feed.followings = false;
            "
          >
            <h2>My Answers</h2>
          </button>
        </li>
        <li>
          <button
            @click="
              feed.questions = false;
              feed.answers = false;
              feed.followers = true;
              feed.followings = false;
            "
          >
            <h2>My Followers</h2>
          </button>
        </li>
        <li>
          <button
            @click="
              feed.questions = false;
              feed.answers = false;
              feed.followers = false;
              feed.followings = true;
            "
          >
            <h2>My Followings</h2>
          </button>
        </li>
      </ul>
    </div>
    <div class="center-cont">
      <div v-if="feed.questions">
        <h1 style="color: black">My questions here</h1>
        <UserAskedQuestion 
        v-for="(question, index) in questionList"
        v-bind:key="index"
        :question_prop="question"
        />
      </div>

      <div v-if="feed.answers">
        <h1 style="color: black">My Answers here</h1>
        <UserAnsweredQuestions />
        <UserAnsweredQuestions />
        <UserAnsweredQuestions />
      </div>
      <div v-if="feed.followers">
        <h1 style="color: black">My followers here</h1>
        <SmallProfile />
        <SmallProfile />
        <SmallProfile />
        <SmallProfile />
        <SmallProfile />
      </div>

      <div v-if="feed.followings">
        <h1 style="color: black">My followings here</h1>
        <SmallProfile />
        <SmallProfile />
        <SmallProfile />
        <SmallProfile />
        <SmallProfile />
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileBox from "../components/UserProfileBox";
import UserAskedQuestion from "../components/UsersAskedQuestions";
import UserAnsweredQuestions from "../components/UserAnsweredQuestion";
import SmallProfile from "../components/SmallProfile";
export default {
  name: "home",
  components: {
    UserProfileBox,
    UserAskedQuestion,
    UserAnsweredQuestions,
    SmallProfile
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
      questionList: [
        {
          id: "1",
          question: "What is the most life changing book you've ever read?",
          category: "Literature"
        },
        {
          id: "2",
          question: "Was China cited in Indian literature?",
          category: "Literature"
        },
        {
          id: "3",
          question: "What books are on your to read list for 2020?",
          category: "Literature"
        },
        {
          id: "4",
          question: "What are the most philosophical cartoons?",
          category: "Cartoon"
        },
        {
          id: "5",
          question: "What's your favorite 'programming' cartoon or comic?",
          category: "Cartoon"
        },
        {
          id: "6",
          question: "What are some of the strangest facts about famous movies?",
          category: "Movies"
        },
        {
          question:
            "What is the best movie you have seen that most people probably haven’t ever heard of?",
          id: "7",
          category: "Movies"
        }
      ]
    };
  }
};
</script>

<style scoped>
.cat-btn {
  padding: 22px;
}
.asking_new_question_onprofile {
  background: rgb(233, 233, 233);
  width: 100%;
  border-radius: 20px;
  margin: 10px 0px 10px 0px;
  padding: 10px;
}
.cat-select {
  background: rgb(197, 197, 197);
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
