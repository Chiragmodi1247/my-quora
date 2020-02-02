<template>
  <v-card rounded outlined style="margin-bottom:10px;padding:10px">
    <table>
      <tr>
        <td colspan="6">
          <router-link :to="{ path: '/question/' + question_prop.id }">
            <h2 style="color: black">{{ question_prop.question }}</h2>
          </router-link>
        </td>
        <td style="float: right">
          <span class="mdi mdi-dots-vertical"></span>
        </td>
      </tr>
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
          Some more desc here. My answer might be disturbing to some. I have
          been looking forward to writing this for a long time, but couldn’t had
          a job and my mom was
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <div class="ans">
          <p>
            My answer might be disturbing to some. I have been looking forward
            to writing this for a long time, but couldn’t muster up the courage
            as it was very hurtful and disturbing to me.I was born in India and
            brought up in a middle class family. My dad had a job and my mom was
            a home maker. My mom gave birth to me and my brother via C-Section
            and she suffers from severe back pain due to the complications she
            suffered during the surgeries. I was born prematurely at 7.5 months,
            My answer might be disturbing to some.
          </p>
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
            :id="newCmtId"
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
    }
  },
  data: function() {
    return {
      upCount: 10,
      downCount: 5,
      upVoted: false,
      downVoted: false,
      alreadyLiked: false,
      alreadyDisliked: false,
      isCommenting: false,
      newCmtId: this.question_prop.id,
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
              dislike: 10,
              children: [
                {
                  comment:
                    "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
                  like: 0,
                  id: "113",
                  dislike: 0
                },
                {
                  comment:
                    "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
                  like: 5,
                  id: "114",
                  dislike: 20
                }
              ]
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
          dislike: 3,
          children: [
            {
              comment:
                "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
              like: 45,
              id: "117",
              dislike: 20,
              children: [
                {
                  comment:
                    "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
                  like: 45,
                  id: "118",
                  dislike: 20
                },
                {
                  comment:
                    "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
                  like: 45,
                  id: "119",
                  dislike: 20
                }
              ]
            },
            {
              comment:
                "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
              id: "120",
              like: 45,
              dislike: 20
            }
          ]
        },
        {
          comment:
            "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
          like: 0,
          id: "121",
          dislike: 0,
          children: [
            {
              comment:
                "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
              like: 45,
              id: "122",
              dislike: 20,
              children: [
                {
                  comment:
                    "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
                  id: "123",
                  like: 45,
                  dislike: 20
                },
                {
                  comment:
                    "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
                  id: "124",
                  like: 45,
                  dislike: 20
                }
              ]
            },
            {
              comment:
                "My answer might be disturbing to some. I have been looking forward to writing this for a long time, but couldn’t muster up the courage as it",
              like: 45,
              id: "125",
              dislike: 20
            }
          ]
        }
      ]
    };
  },
  props: {
    question_prop: Object
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
