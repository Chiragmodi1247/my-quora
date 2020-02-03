<template>
  <v-card rounded outlined style="margin-bottom:10px;padding:10px">
    <table>
      <tr>
        <td colspan="1">
          <v-img
            src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80"
            alt="MyDog"
            max-width="40px"
            max-height="40px"
            style="border-radius: 50%"
          >
          </v-img>
        </td>
        <td>
          {{ ans.profileNameOfAnswerer }}
        </td>
        <td style="float: right;">
          <span class="mdi mdi-dots-vertical"></span>
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <div class="ans">
          <!-- <p>my answer here. It just won't work.</p> -->
          <p>{{ ans.answerValue }}</p>
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
            v-model="sendCommentDTO.comment"
            height="40px"
            background-color="grey lighten-3"
            placeholder="Write a comment..."
            rounded
          ></v-text-field>
        </td>
        <td colspan="6">
          <button @click="sendCmt" class="btn_send">
            Send <span class="mdi mdi-send"></span>
          </button>
        </td>
      </tr>
    </table>

    <h2>Older Comments</h2>

    <table>
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
  name: "GuestPost",
  components: {
    Comment
  },
  data() {
    return {
      upCount: this.ans.numberOfLikes,
      downCount: this.ans.numberOfDislikes,
      sendCommentDTO: {
        parentId: this.ans.answerId,
        comment: null,
        questionOrAnswerUserId: this.ans.profileIdOfAnswerer
      },
      likeDTO: {
        questionOrAnswerId: this.ans.answerId,
        askerOrAnswererId: this.ans.profileIdOfAnswerer,
      },
      disLikeDTO: {
        questionOrAnswerId: this.ans.answerId,
        askerOrAnswererId: this.ans.profileIdOfAnswerer,
      },
      commentData: [
        {
          comment:
            "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
          like: 45,
          id: "111",
          dislike: 20,
          children: [
            {
              comment:
                "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
              like: 15,
              id: "112",
              dislike: 10
            },
            {
              comment:
                "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
              like: 35,
              id: "115",
              dislike: 20
            }
          ]
        },
        {
          comment:
            "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
          like: 5,
          id: "116",
          dislike: 3
        },
        {
          comment:
            "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
          like: 0,
          id: "121",
          dislike: 0
        }
      ]
    };
  },
  methods: {
    my_card() {
      alert("You clicked icon");
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

      fetch("/backend/answers/addLikes", {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(this.likeDTO)
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
      window.console.log("disliked called");
      fetch("/backend/answers/addDislikes", {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(this.disLikeDTO)
      });


//send to DA
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
    }
  },
  props: {
    ans: Object
  },
  created() {
    fetch("/backend/comment/getComment/" + this.ans.answerId, {
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
        this.commentData = result.data.content;
        window.console.log("Comment fetched");
      })
      .catch(window.console.log("error in Comment fetched"));
  }
};
</script>

<style scoped>
.my-row {
  padding: 0;
}
.comment_section {
  background: rgb(224, 224, 224);
  border-radius: 20px;
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
  background: blue;
  color: white;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
}

ul {
  list-style-type: none;
}

.comment-box {
  width: 500px;
  height: 50px;
  font-size: 15px;
}

.add-btn {
  width: 80px;
  font-size: 15px;
  background-color: #5b0de6;
  color: white;
}

.comment-handle {
  color: blue;
  margin-top: 20px;
  text-decoration: underline;
}

.hr {
  color: rgba(0, 0, 0, 0.15);
  width: 600px;
}

.comment-header {
  display: flex;
  width: 50%;
  justify-content: space-between;
}

.comment-input-row {
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
