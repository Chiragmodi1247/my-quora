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
      </ul>
    </div>
    <div class="center-cont">
      <div v-if="feed.all">
        <h1 style="color: black">
          Search results for {{ this.$route.query.searchQuery }}
        </h1>
        <div v-for="(result, index) in resultofSearch" :key="index">
          <SearchAskedQuestion v-if="result.valueType === 'Q'" :mydata="result" />
          <SearchSmallProfile v-if="result.valueType === 'P'" :mydata="result"/>
        </div>
      </div>

      <div v-if="feed.questions">
        <h1 style="color: black">
          Questions: {{ this.$route.query.searchQuery }}
        </h1>
        <div v-for="(result, index) in resultofSearch" :key="index">
          <SearchAskedQuestion v-if="result.valueType === 'Q'" :mydata="result"/>
        </div>
      </div>
      <div v-if="feed.profile">
        <h1 style="color: black">
          Profile: {{ this.$route.query.searchQuery }}
        </h1>
        <div v-for="(result, index) in resultofSearch" :key="index">
          <SearchSmallProfile v-if="result.valueType === 'P'" :mydata="result"/>
        </div>
        <!-- <div v-for="(result, index) in dummyProfile" :key="index">
          <SearchSmallProfile v-if="result.valueType === 'P'" :mydata="result"/>
        </div> -->
      </div>

    </div>
  </div>
</template>

<script>
import SearchAskedQuestion from "../components/searchAskedQuestion";
import SearchSmallProfile from "../components/SearchSmallProfile";

export default {
  name: "home",
  components: {
    SearchAskedQuestion,
    SearchSmallProfile,
  },
  data: function() {
    return {
      feed: {
        all: true,
        questions: false,
        profile: false,
        ques:''
      },
      resultofSearch: [],
      my_category: {
        name: "Literature"
      },
      dummyProfile: [
        {
            "profileValue": null,
            "profileId": null,
            "profileType": null,
            "searchId": "4",
            "valueType": "Q",
            "questionValue": "Why no great movies, chirag4?",
            "questionId": null,
            "questionStatus": null,
            "askerProfileId": "3ae2e24d-4225-4f44-a391-b3ef2ccf1ee2",
            "askerProfileName": "chirag4",
            "numberOfLikes": 0,
            "numberOfDislikes": 0,
            "approvedAnswerId": "",
            "approvedAnswer": null,
            "approvedAnswererId": null,
            "approvedAnswererProfile": null,
            "categoryId": "Bollywood",
            "categoryName": "Bollywood"
        },
        {
            "profileValue": "chirag10",
            "profileId": "450dce35-256c-469d-a8f1-71b1a070ac0e",
            "profileType": "Public",
            "searchId": "450dce35-256c-469d-a8f1-71b1a070ac0e",
            "valueType": "P",
            "questionValue": null,
            "questionId": null,
            "questionStatus": null,
            "askerProfileId": null,
            "askerProfileName": null,
            "numberOfLikes": 0,
            "numberOfDislikes": 0,
            "approvedAnswerId": null,
            "approvedAnswer": null,
            "approvedAnswererId": null,
            "approvedAnswererProfile": null,
            "categoryId": null,
            "categoryName": null
        },
        {
            "profileValue": null,
            "profileId": null,
            "profileType": null,
            "searchId": "8",
            "valueType": "Q",
            "questionValue": "Why are there no great movies?",
            "questionId": null,
            "questionStatus": null,
            "askerProfileId": "3ae2e24d-4225-4f44-a391-b3ef2ccf1ee2",
            "askerProfileName": "chirag4",
            "numberOfLikes": 0,
            "numberOfDislikes": 0,
            "approvedAnswerId": "",
            "approvedAnswer": null,
            "approvedAnswererId": null,
            "approvedAnswererProfile": null,
            "categoryId": "Bollywood",
            "categoryName": "Bollywood"
        },
        {
            "profileValue": null,
            "profileId": null,
            "profileType": null,
            "searchId": "1",
            "valueType": "Q",
            "questionValue": "who is KRK?",
            "questionId": "5e36906955fd6276d3a52511",
            "questionStatus": null,
            "askerProfileId": "3ae2e24d-4225-4f44-a391-b3ef2ccf1ee2",
            "askerProfileName": "chirag4",
            "numberOfLikes": 0,
            "numberOfDislikes": 0,
            "approvedAnswerId": "",
            "approvedAnswer": null,
            "approvedAnswererId": null,
            "approvedAnswererProfile": null,
            "categoryId": "Bollywood",
            "categoryName": "Bollywood"
        },
        {
            "profileValue": null,
            "profileId": null,
            "profileType": null,
            "searchId": "5",
            "valueType": "Q",
            "questionValue": "why someone is boring?",
            "questionId": null,
            "questionStatus": null,
            "askerProfileId": "3ae2e24d-4225-4f44-a391-b3ef2ccf1ee2",
            "askerProfileName": "chirag4",
            "numberOfLikes": 0,
            "numberOfDislikes": 0,
            "approvedAnswerId": "",
            "approvedAnswer": null,
            "approvedAnswererId": null,
            "approvedAnswererProfile": null,
            "categoryId": "non-fiction",
            "categoryName": "non-fiction"
        }
      ]
    };
  },
  created() {
    fetch(
      "http://172.16.20.110:8082/search/searchFunction?keyword=" +
        this.$route.query.searchQuery,
      {
        method: "GET"
      }
    )
      .then(res => {
        return res.json();
      })
      .then(result => {
        this.resultofSearch = result.content;
        window.console.log("My result: " + result.content[0].questionValue);
        this.ques = this.result[0].questionValue;
        
    })
      .catch(window.console.log("Error in searching"));
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
