<template>
  <div>
    <div class="left-div">
      <button class="login-btn">
        <h2>Ask Question</h2>
      </button>
      <ul>
        <li>
          <button @click="cat = false">
            <h2>Home</h2>
          </button>
        </li>

        <li>
          <button @click="cat = true">
            <h2>Categories</h2>
          </button>
        </li>
      </ul>
    </div>
    <div v-if="!cat" class="center-cont">
      <h1>Some popular stories for guest only</h1>

      <GuestPost
        v-for="(question, index) in questionList"
        v-bind:key="index"
        :question_prop="question"
      />
    </div>
    <div v-if="cat" class="center-cont">
      <h1>Some popular Categories for guest only</h1>
      <v-row
        class="small-category"
        v-for="(category, index) in categoryList"
        v-bind:key="index"
      >
        <Category :category="category" />
      </v-row>
    </div>
  </div>
</template>

<script>
import GuestPost from "../components/GuestPost";
import Category from "../components/Category";
export default {
  name: "home",
  components: {
    GuestPost,
    Category
  },
  data: function() {
    return {
      cat: false,
      categoryList: [
        {
          name: "Literature"
        },
        {
          name: "Lifestyle(Brands)"
        },
        {
          name: "Movies"
        },
        {
          name: "Coding"
        },
        {
          name: "Booze"
        },
        {
          name: "Cartoon"
        },
        {
          name: "Cricket"
        },
        {
          name: "Web/TV Series"
        },
        {
          name: "Politics"
        },
        {
          name: "Food"
        }
      ],
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
.small-category {
  width: 100%;
}
.login-btn {
  padding: 5px 20px 5px 20px;
  color: white;
  border-radius: 5px;
  background: rgb(223, 45, 0);
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
