<template>
  <div>
    <div class="my-profile">
      <ProfileBox :profile="profile" />
    </div>
    <div v-if="canSee">
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
        <textarea
          id="asking_new_question"
          @input="enable_ask"
          class="asking_new_question_onprofile"
          placeholder="Ask me a question"
        ></textarea>
        <span style="color: red">Please Select a category: </span>
        <select id="" class="cat-select" @click="selected = true">
          <option value="">Category 1</option>
          <option value="">Category 2</option>
          <option value="">Category 3</option>
          <option value="">Category 4</option>
          <option value="">Category 5</option>
        </select>

        <button :disabled="!selected || !txtselected" class="btn_send">
          Ask <span class="mdi mdi-send"></span>
        </button>
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
          <SmallProfile v-for="(follower,index) in listOfFollowers" :key="index" :profile="follower"/>
        </div>

        <div v-if="feed.followings">
          <h1 style="color: black">My followings here</h1>
          <SmallProfile v-for="(following,index) in listOfFollowings" :key="index" :profile="following"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileBox from "../components/ProfileBox";
import UserAskedQuestion from "../components/UsersAskedQuestions";
import UserAnsweredQuestions from "../components/UserAnsweredQuestion";
import SmallProfile from "../components/SmallProfile";
export default {
  name: "home",
  components: {
    ProfileBox,
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
      profile: {},
      listOfFollowers: [],
      listOfFollowings: [],
      selected: false,
      txtselected: false,
      canSee: true,
      questionList: [
        {
          id: "211",
          question: "What is the most life changing book you've ever read?",
          category: "Literature"
        },
        {
          id: "212",
          question: "Was China cited in Indian literature?",
          category: "Literature"
        },
        {
          id: "213",
          question: "What books are on your to read list for 2020?",
          category: "Literature"
        },
        {
          id: "214",
          question: "What are the most philosophical cartoons?",
          category: "Cartoon"
        },
        {
          id: "215",
          question: "What's your favorite 'programming' cartoon or comic?",
          category: "Cartoon"
        },
        {
          id: "216",
          question: "What are some of the strangest facts about famous movies?",
          category: "Movies"
        },
        {
          question:
            "What is the best movie you have seen that most people probably haven’t ever heard of?",
          id: "217",
          category: "Movies"
        }
      ]
    };
  },
  methods: {
    enable_ask() {
      let que = document.getElementById("asking_new_question");
      if (que.value.length !== 0) {
        this.txtselected = true;
      }
      if (que.value.length === 0) this.txtselected = false;
    },
    getQuestions() {

    },
    getFollowers() {
      fetch("/backend/profile/getFollower/" + this.$route.params.id, {
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(result => {
          this.listOfFollowers = result;
          window.console.log("Result listof followers: " + result);
        })
        .catch(window.console.log("error in listof followers"));
    },
    getFollowings() {
      fetch("/backend/profile/getFollowing/" + this.$route.params.id, {
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(result => {
this.listOfFollowings = result;
          window.console.log("Result listof followings: " + result);
        })
        .catch(window.console.log("error in listof followings"));
    }
  },
  created() {
    fetch("/backend/profile/getProfile/" + this.$route.params.id, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        this.profile = result;
        window.console.log("Result profile: " + result);
      })
      .catch(window.console.log("error in profile"));

setTimeout(this.getFollowers,1000)
setTimeout(this.getFollowings,2000)

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
