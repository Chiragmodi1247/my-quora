<template>
  <v-card rounded outlined style="margin-bottom:10px;padding:10px">
    <table>
      <tr>
        <td>
          <v-img
            src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80"
            alt="MyDog"
            max-width="30px"
            max-height="30px"
            style="border-radius: 50%"
          >
          </v-img>
        </td>
        <td>
          Some User info who has posted here
        </td>
        <td style="float: right">
          <span class="mdi mdi-dots-vertical"></span>
        </td>
      </tr>
      <tr>
        <td colspan="6">
          <router-link :to="{ path: '/question/' + question_prop.questionId }">
            <h2 style="color: black">{{ question_prop.questionValue }}</h2>
          </router-link>
        </td>
      </tr>
      <tr>
        <td colspan="1">
          <v-img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
            max-width="40px"
            max-height="40px"
            style="border-radius: 50%"
          >
          </v-img>
        </td>
        <td>
          <p>{{ question_prop.approvedAnswererProfile }}</p>
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <div class="ans">
          <p>{{ question_prop.approvedAnswer }}</p>
        </div>
      </tr>
    </table>

    <tr>
      <button @click="liked">
        <span v-if="!upVoted" class="mdi mdi-thumb-up-outline"></span>
        <span v-if="upVoted" class="mdi mdi-thumb-up"></span>
      </button>
      {{
        upCount
      }}

      <button @click="disliked">
        <span v-if="!downVoted" class="mdi mdi-thumb-down-outline"></span>
        <span v-if="downVoted" class="mdi mdi-thumb-down"></span>
      </button>
      {{
        downCount
      }}
    </tr>

    <v-divider></v-divider>
    <table>
      <tr>
        <td>
          <v-text-field
            class="input-box"
            height="40px"
            v-on:keyup="send_cmt_enter"
            @input="enable_ask"
            background-color="grey lighten-3"
            placeholder="Write a comment..."
            :id="newCmtId"
            rounded
          ></v-text-field>
        </td>
        <td>
          <button @click="sendCmt" :disabled="!isCommenting" class="btn_send">
            Send <span class="mdi mdi-send"></span>
          </button>
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <h2>Older Comments</h2>
      </tr>
      <tr class="comment_section">
        <Comment
          v-for="(comment, index) in commentData"
          :key="index"
          :node="comment"
        />
      </tr>
    </table>
  </v-card>
</template>

<script>
// @ is an alias to /src
import Comment from "../components/Comment";

export default {
  name: "Userpost",
  components: {
    Comment
  },
  data: function() {
    return {
      isCommenting: false,
      newCmtId: this.question_prop.questionId,
      alreadyLiked: false,
      alreadyDisliked: false,
      upVoted: false,
      downVoted: false,
      upCount: this.question_prop.numberOfLikes,
      downCount: this.question_prop.numberOfDislikes,
      likeDTO: {
        questionOrAnswerId: this.question_prop.questionId
      }
          };
  },
  props: {
    question_prop: Object
  },
  methods: {
    enable_ask() {
      let cmt = document.getElementById(this.newCmtId);
      if (cmt.value.length !== 0) this.isCommenting = true;
      if (cmt.value.length === 0) this.isCommenting = false;
    },
    sendCmt() {
      let cmt = document.getElementById(this.newCmtId);
      if (cmt.value.length === 0) {
        window.console.log("No comments");
        return;
      }
      window.console.log("Added comment: " + cmt.value + " on level: 0");
    },
    send_cmt_enter: function(e) {
      let cmt = document.getElementById(this.newCmtId);
      if (e.keyCode === 13) {
        if (cmt.value.length === 0) return;
        else {
          window.console.log("zero level Comment: " + cmt.value);
        }
      }
    },
    liked() {
      this.upVoted = true;
      this.downVoted = false;
      if (this.alreadyDisliked) {
        if (!this.alreadyLiked) {
          this.upCount++;
          this.downCount--;
        }
      } else {
        if (!this.alreadyLiked) {
          this.upCount++;
        }
      }
      this.alreadyLiked = true;
      this.alreadyDisliked = false;

      fetch("/addlike/", {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(this.likeDTO)
      })
        .then(res => {
          window.console.log("Like send to local: " + res);
        })
        .catch(err => {
          window.console.log("error in local like: " + err);
        });

      //send to DA
    },
    disliked() {
      this.upVoted = false;
      this.downVoted = true;
      if (this.alreadyLiked) {
        if (!this.alreadyDisliked) {
          this.upCount--;
          this.downCount++;
        }
      } else {
        if (!this.alreadyDisliked) {
          this.downCount++;
        }
      }
      this.alreadyLiked = false;
      this.alreadyDisliked = true;
      //send to DA
      fetch("/addDislike/", {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.likeDTO)
      })
        .then(res => {
          window.console.log("Dislike send to local: " + res);
        })
        .catch(err => {
          window.console.log("error in local dislike: " + err);
        });

}
  }
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
  width: 40vw;
}
.btn_send {
  background: blue;
  color: white;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
}
.btn_send:disabled {
  background: rgb(209, 209, 209);
  color: white;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
}
</style>
