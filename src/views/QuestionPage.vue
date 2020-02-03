<template>
  <div>
    <div class="left-div">
      <v-row>
        <button @click="openQuestionModal" class="login-btn">
          <h2>Ask Question</h2>
        </button>
      </v-row>
    </div>
    <div class="center-cont">
      <h1 style="color: black">
        {{ questionValue }}
      </h1>

      <button class="answer-btn" @click="openModal">
        <h2>
          Answer Question <span class="mdi mdi-pencil-box-outline"></span>
        </h2>
      </button>

      <UserQuestion
        v-for="(ans, index) in answers"
        :key="index"
        :ans="ans"
        :category="selectedQCat"
      />
    </div>

    <div id="questionModal" class="modal">
      <div class="modal-content">
        <span id="closeBtn" @click="closeQuestionModal">&times; </span>
        <v-row>
          <textarea
            v-model="newQuestionValue"
            class="asking_new_question_onprofile"
            placeholder="Ask a question"
          ></textarea>
        </v-row>
        <v-row>
          <v-col>
            <span style="color: red">Please Select a category: </span>
            <select
              v-model="selectedCat"
              @click="selected = true"
              class="cat-select"
            >
              <option value="fiction">fiction</option>
              <option value="non-fiction">non-fiction</option>
              <option value="poetry">poetry</option>
              <option value="short stories">short stories</option>
              <option value="Bollywood">Bollywood</option>
              <option value="Hollywood">Hollywood</option>
              <option value="Tollywood">Tollywood</option>
              <option value="Punjaabi">Punjaabi</option>
              <option value="Android">Android</option>
            </select>
          </v-col>
          <v-col>
            <button
              :disabled="!selected"
              @click="askToProfile"
              class="btn_send"
            >
              Ask <span class="mdi mdi-send"></span>
            </button>
          </v-col>
        </v-row>
      </div>
    </div>

    <div id="simpleModal" class="modal">
      <div class="modal-content">
        <span id="closeBtn" @click="closeModal">&times; </span>
        <v-row>
          <textarea
            v-model="answerDTO.answerValue"
            @input="enable_ask"
            class="asking_new_question_onprofile"
            placeholder="Answer this question"
          ></textarea>
        </v-row>
        <v-row>
          <v-col>
            <button @click="answer" class="btn_send">
              Answer <span class="mdi mdi-send"></span>
            </button>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import UserQuestion from "../components/UserQuestion";
export default {
  name: "home",
  components: {
    UserQuestion
  },
  data: function() {
    return {
      DADTO: {
        channel: "Quora",
        tag: null,
        action: null
      },
      addQDTO: {
        questionValue: "",
        categoryId: null,
        categoryName: null,
        // askerProfileId: null,
        // askerProfileName: null,
        profileWhereAskedId: "",
        profileWhereAskedName: "",
        profileWhereAskedType: ""
      },
      selected: false,
      selectedQCat: null,
      questionID: this.$route.params.id,
      questionValue: null,
      newQuestionValue: null,
      selectedCat: null,
      answerDTO: {
        answerValue: null,
        questionId: this.$route.params.id
      },
      txtInput: false,
      answers: []
    };
  },
  methods: {
    enable_ask() {
      if (this.answerDTO.answerValue.length === 0) this.txtInput = false;
      else this.txtInput = true;
    },
    openQuestionModal() {
      // let modalBtn = document.getElementById("edit_profile");

      let modal = document.getElementById("questionModal");
      modal.style.display = "block";
      window.console.log("123");
    },
    closeQuestionModal() {
      let modal = document.getElementById("questionModal");
      modal.style.display = "none";
    },

    openModal() {
      // let modalBtn = document.getElementById("edit_profile");

      let modal = document.getElementById("simpleModal");
      modal.style.display = "block";
      window.console.log("123");
    },
    closeModal() {
      let modal = document.getElementById("simpleModal");
      modal.style.display = "none";
    },
    answer() {
      window.console.log("Asnwer: " + this.answerDTO.answerValue);
      let modal = document.getElementById("simpleModal");
      modal.style.display = "none";

      //fecth from ananya
      this.DADTO.tag = this.selectedQCat;
      this.DADTO.action = "answer";

      //add answer
      fetch("/backend/answers/addAnswer", {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.answerDTO)
      })
        .then(window.console.log("Answer added!!"))
        .catch(err => {
          window.console.log("Error adding answer: " + err);
        });

      //sending to DA
      fetch("http://172.16.20.160:8100/repo/add", {
        headers: {
          accessToken: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.DADTO)
      });
    },

    getCategory() {
      let that = this;
      fetch(
        "/backend/questions/getCategoryByQuestionId/" + this.$route.params.id,
        {
          headers: {
            token: localStorage.getItem("quora-token"),
            "Content-Type": "application/json"
          }
        }
      )
        .then(res => {
          return res.json();
        })
        .then(result => {
          that.selectedQCat = result.categoryId;
        });
    },

    askToProfile() {
      this.addQDTO.questionValue = this.newQuestionValue;
      this.addQDTO.categoryId = this.selectedCat;
      this.addQDTO.categoryName = this.selectedCat;
      this.DADTO.tag = this.selectedCat;
      this.DADTO.action = "post";

      fetch("/backend/questions/addQuestion", {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.DADTO)
      })
        .then(window.console.log("Success adding question"))
        .catch(window.console.log("error adding question"));
      // alert("Question: " + newQ.value + " on cat: " + this.selectedCat);

      fetch("http://172.16.20.160:8100/repo/add", {
        headers: {
          accessToken: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.DADTO)
      });

      let modal = document.getElementById("questionModal");
      modal.style.display = "none";
      this.newQuestionValue = null;
    }
  },
  created() {
    window.console.log(this.questionID);
    // window.console.log("http://10.177.68.235:8080/answers/getAllAnswersOfAQuestion?questionId="+`${this.questionID}`)
    fetch(
      "/backend/answers/getAllAnswersOfAQuestion?questionId=" +
        `${this.questionID}`,
      {
        method: "GET"
      }
    )
      .then(res => {
        return res.json();
      })
      .then(result => {
        this.questionValue = result.content[0].question;

        this.answers = result.content;
        window.console.log("My data: " + result.content[0].question);
      });

    setTimeout(this.getCategory, 1000);
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
.answer-btn {
  padding: 5px 20px 5px 20px;
  color: white;
  border-radius: 5px;
  background: rgb(0, 89, 223);
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

.btn_send {
  background: rgb(255, 94, 0);
  color: white;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
  float: right;
}

.input_box {
  font-size: 20pt;
  border: 1px solid black;
  border-radius: 5px;
}
.asking_new_question_onprofile {
  background: rgb(233, 233, 233);
  width: 100%;
  border-radius: 20px;
  margin: 10px 0px 10px 0px;
  padding: 10px;
}

.center-cont {
  width: 60vw;
  left: 20%;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
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
