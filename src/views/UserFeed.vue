<template>
  <div>
    <div class="left-div">
      <button @click="openModal" class="login-btn">
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
      <h1>Some popular stories for Specific user</h1>
      <UserPost
        v-for="(question, index) in questionList"
        v-bind:key="index"
        :question_prop="question"
      />
    </div>

    <div v-if="cat" class="center-cont">
      <h1>User specific Categories</h1>
      <v-row
        class="small-category"
        v-for="(category, index) in categoryList"
        v-bind:key="index"
      >
        <Category :category="category" />
      </v-row>
    </div>

    <div id="simpleModal" class="modal">
      <div class="modal-content">
        <span id="closeBtn" @click="closeModal">&times; </span>
        <v-row>
          <textarea
            id="asking_new_question"
            class="asking_new_question_onprofile"
            placeholder="Ask a question"
          ></textarea>
        </v-row>
        <v-row>
          <v-col>
            <span style="color: red">Please Select a category: </span>
            <select @click="selected = true" class="cat-select">
              <option value="">Category 1</option>
              <option value="">Category 2</option>
              <option value="">Category 3</option>
              <option value="">Category 4</option>
              <option value="">Category 5</option>
            </select>
          </v-col>
          <v-col>
            <button :disabled="!selected" class="btn_send">
              Ask <span class="mdi mdi-send"></span>
            </button>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import UserPost from "../components/UserPost";
import Category from "../components/Category";
export default {
  name: "home",
  components: {
    UserPost,
    Category
  },
  data: function() {
    return {
      selected: false,
      cat: false,
      questionList: [],
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
      ]
    };
  },
  created() {
    fetch("http://10.177.68.235:8080/questions/getAllQuestions", {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        this.questionList = result.content;
        window.console.log("My data: " + result.content);
      });

  },

  methods: {
    openModal() {
      // let modalBtn = document.getElementById("edit_profile");

      let modal = document.getElementById("simpleModal");
      modal.style.display = "block";
      window.console.log("123");
    },
    closeModal() {
      let modal = document.getElementById("simpleModal");
      modal.style.display = "none";
    }
  }
};
</script>

<style scoped>
.cat-btn {
  padding: 22px;
}
.cat-select {
  border: 1px solid black;
}

.asking_new_question_onprofile {
  background: rgb(233, 233, 233);
  width: 100%;
  border-radius: 20px;
  margin: 10px 0px 10px 0px;
  padding: 10px;
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

.input_box {
  font-size: 20pt;
  border: 1px solid black;
  border-radius: 5px;
}
.modal {
  display: none;
  position: fixed;
  z-index: 2;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
#closeBtn {
  float: right;
  font-size: 24pt;
}
#closeBtn:hover,
#closeBtn:focus {
  text-decoration: none;
  cursor: pointer;
}
.modal-content {
  border-radius: 10px;
  background-color: azure;
  margin: 20% auto;
  width: 70%;
  padding: 20px;
}
</style>
