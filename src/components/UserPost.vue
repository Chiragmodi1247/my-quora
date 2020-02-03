<template>
  <v-card rounded outlined style="margin-bottom:10px;padding:10px">
    <table>
      <tr>
        <td colspan="6">
          <router-link :to="{ path: '/question/' + question_prop.questionId }">
            <h2 style="color: black">{{ question_prop.questionValue }}</h2>
          </router-link>
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
  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Userpost",
  components: {},
  data: function() {
    return {
      DADTO: {
        channel: "Quora",
        tag: this.category,
        action: null
      },

      isCommenting: false,
      newCmtId: this.question_prop.questionId,
      alreadyLiked: false,
      alreadyDisliked: false,
      upVoted: false,
      downVoted: false,
      upCount: this.question_prop.numberOfLikes,
      downCount: this.question_prop.numberOfDislikes,
      likeDTO: {
        questionOrAnswerId: this.question_prop.questionId,
        askerOrAnswererId: this.question_prop.askerProfileId
      },
      disLikeDTO: {
        questionOrAnswerId: this.question_prop.questionId,
        askerOrAnswererId: this.question_prop.askerProfileId
      }
    };
  },
  props: {
    question_prop: Object,
    category: String
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
      fetch("/backend/questions/addLikes", {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(this.likeDTO)
      });

      //send to DA
      this.DADTO.action = "like";
      fetch("http://172.16.20.160:8100/repo/add", {
        headers: {
          accessToken: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.DADTO)
      });
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

      this.DADTO.action = "dislike";
      fetch("http://172.16.20.160:8100/repo/add", {
        headers: {
          accessToken: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.DADTO)
      });


      fetch("/backend/questions/addDislikes", {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(this.disLikeDTO)
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
