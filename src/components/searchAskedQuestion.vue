<template>
  <v-card rounded outlined style="margin-bottom:10px;padding:10px">
    <table>
      <tr>
        <td colspan="6">
          <router-link :to="{ path: '/question/' + mydata.questionId }">
            <h2 style="color: black">{{ mydata.questionValue }}</h2>
          </router-link>
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <div class="ans">
          <p>{{ mydata.approvedAnswer }}</p>
        </div>
      </tr>
      <tr>
        <button :disabled="alreadyLiked" @click="liked">
          <span v-if="!upVoted" class="mdi mdi-thumb-up-outline"></span>
          <span v-if="upVoted" class="mdi mdi-thumb-up"></span>
        </button>
        {{
          upCount
        }}

        <button :disabled="alreadyDisliked" @click="disliked">
          <span v-if="!downVoted" class="mdi mdi-thumb-down-outline"></span>
          <span v-if="downVoted" class="mdi mdi-thumb-down"></span>
        </button>
        {{
          downCount
        }}
      </tr>
    </table>

    <v-divider></v-divider>
    <table>
      <tr>
        <td colspan="6">
          <v-text-field
            class="input-box"
            height="40px"
            v-on:keyup="send_cmt_enter"
            @input="enable_ask"
            background-color="grey lighten-3"
            placeholder="Write a comment..."
            v-model="sendCommentDTO.comment"
            rounded
          ></v-text-field>
        </td>
        <td colspan="6">
          <button @click="sendCmt" :disabled="!isCommenting" class="btn_send">
            Send <span class="mdi mdi-send"></span>
          </button>
        </td>
      </tr>
    </table>

    <table>
      <tr class="comment_section">
        <Comment
          v-for="(comment, index) in commentData"
          :key="index"
          :node="comment"
          :likes="comment.likes"
          :dislikes="comment.dislikes"
        />
      </tr>
    </table>
  </v-card>
</template>

<script>
// @ is an alias to /src
import Comment from "../components/Comment";
export default {
  name: "UserAskedQuestion",
  components: {
    Comment
  },
  methods: {
    my_card() {
      alert("You clicked icon");
    },
    enable_ask() {
      if (this.sendCommentDTO.comment !== 0) this.isCommenting = true;
    },
    sendCmt() {
      fetch("/backend/comment/addComment", {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.sendCommentDTO)
      })
        .then(window.console.log("Comment added"))
        .catch(window.console.log("Error in Comment adding"));
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
      window.console.log("liked called");
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
      window.console.log("disliked called");
      //send to DA

      fetch("/report/supportAgent/createTicket", {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.dislikeDTO)
      })
        .then(window.console.log("Dislike send to CRM"))
        .catch(window.console.log("Error in dislike"));
    }
  },
  props: {
    mydata: Object
  },

  data: function() {
    return {
      dislikeDTO: {
        postId: "abcd1234",
        postDescription: this.mydata.questionValue,
        counterOfDislikes: this.mydata.numberOfDislikes + 1,
        postImageUrl: null,
        postVideoUrl: null,
        userId: this.mydata.askerProfileId,
        source: "qoura"
      },
      sendCommentDTO: {
        parentId: this.mydata.questionId,
        comment: null,
        questionOrAnswerUserId: this.mydata.askerProfileId
      },

      upCount: this.mydata.numberOfLikes,
      downCount: this.mydata.numberOfDislikes,
      upVoted: false,
      downVoted: false,
      alreadyLiked: false,
      alreadyDisliked: false,
      isCommenting: false,
      newCmtId: this.mydata.id,
      commentData: []
    };
  },
  created() {
    let that = this;
    fetch("/backend/comment/getComment/" + this.mydata.questionId + "/0/2", {
      headers: {
        token: localStorage.getItem("quora-token"),
        "Content-Type": "application/json"
      },
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        that.commentData = result.data.content;
        window.console.log("Comment fetched");
      })
      .catch(window.console.log("error in Comment fetched"));
  }
};
</script>

<style scoped>
.comment_section {
  background: rgb(224, 224, 224);
  border-radius: 20px;
}
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
  width: 50vw;
}
.btn_send {
  background: rgb(0, 0, 173);
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
