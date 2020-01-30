<template>
  <div>
    <div class="center-cont">
      <h2>My Notifications</h2>
      <div
        v-for="(qu, index) in questionList"
        v-bind:key="index"
        class="my-notication-box"
      >
        <span id="closeBtn" >&times; </span>
          <h2>{{ qu.question }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data: function() {
    return {
      selected: false,
      canSee: true,
      questionList: [
        {
          id: 1,
          question: "What is the most life changing book you've ever read?",
          category: "Literature"
        },
        {
          id: 2,
          question: "Was China cited in Indian literature?",
          category: "Literature"
        },
        {
          id: 3,
          question: "What books are on your to read list for 2020?",
          category: "Literature"
        },
        {
          id: 4,
          question: "What are the most philosophical cartoons?",
          category: "Cartoon"
        },
        {
          id: 5,
          question: "What's your favorite 'programming' cartoon or comic?",
          category: "Cartoon"
        },
        {
          id: 6,
          question: "What are some of the strangest facts about famous movies?",
          category: "Movies"
        },
        {
          question:
            "What is the best movie you have seen that most people probably haven’t ever heard of?",
          id: 7,
          category: "Movies"
        },
        {
          id: 4,
          question: "What are the most philosophical cartoons?",
          category: "Cartoon"
        },
        {
          id: 5,
          question: "What's your favorite 'programming' cartoon or comic?",
          category: "Cartoon"
        },
        {
          id: 6,
          question: "What are some of the strangest facts about famous movies?",
          category: "Movies"
        },
        {
          question:
            "What is the best movie you have seen that most people probably haven’t ever heard of?",
          id: 7,
          category: "Movies"
        }
      ]
    };
  }
};
</script>

<style scoped>
.my-notication-box {
  border-bottom: 1px solid black;
  background: rgb(210, 241, 255);
  padding: 5px 20px 5px 20px;
  cursor: pointer;
}
.my-notication-box:hover {
  border-bottom: 1px solid black;
  background: rgb(159, 225, 255);
  padding: 5px 20px 5px 20px;
  cursor: pointer;
}
.center-cont {
  width: 80vw;
  left: 10%;
  position: relative;
  overflow-x: hidden;
}
#closeBtn {
  float: right;
}
#closeBtn:hover,
#closeBtn:focus {
  text-decoration: none;
  cursor: pointer;
}
</style>
