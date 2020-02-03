<template>
  <div>
    <div
      @click="expanded = !expanded"
      :style="{ 'margin-left': `${depth * 20}px` }"
      class="node"
    >
      <p>{{ node.comment }}</p>
    </div>
    <div :style="{ 'margin-left': `${depth * 20}px` }">
      <button :disabled="alreadyLiked" @click="liked">
        <span v-if="!upVoted" class="mdi mdi-thumb-up-outline"></span>
        <span v-if="upVoted" class="mdi mdi-thumb-up"></span>
      </button>
      {{ upCount }}

      <button :disabled="alreadyDisliked" @click="disliked">
        <span v-if="!downVoted" class="mdi mdi-thumb-down-outline"></span>
        <span v-if="downVoted" class="mdi mdi-thumb-down"></span>
      </button>
      {{ downCount }}

      <button @click="reply_oncomment = !reply_oncomment">
        <b>Reply</b>
      </button>
    </div>

    <table v-if="reply_oncomment" class="reply_comment">
      <tr>
        <td colspan="6">
          <v-text-field
            class="input-box"
            height="40px"
            @input="enable_ask"
            v-on:keyup="send_cmt_enter"
            background-color="grey lighten-3"
            placeholder="Write a comment..."
            :id="myCmtId"
            rounded
          ></v-text-field>
        </td>
        <td colspan="6">
          <button :disabled="!isCommenting" @click="sendCmt" class="btn_send">
            Send <span class="mdi mdi-send"></span>
          </button>
        </td>
      </tr>
    </table>

    <div v-if="expanded">
      <Comment
        v-for="(comment, index) in commentData"
        :key="index"
        :node="comment"
        :likes="comment.likes"
        :dislikes="comment.dislikes"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data: function() {
    return {
      upCount: this.likes,
      downCount: this.dislikes,
      upVoted: false,
      downVoted: false,
      expanded: false,
      alreadyLiked: false,
      alreadyDisliked: false,
      reply_oncomment: false,
      isCommenting: false,
      myCmtId: this.node.commentId,
      commentData: null,
      sendCommentDTO: {
        parentId: this.node.commentId,
        comment: null,
        questionOrAnswerUserId: this.node.questionOrAnswerUserId
      }
    };
  },
  methods: {
    enable_ask() {
      let cmt = document.getElementById(this.myCmtId);
      if (cmt.value.length !== 0) this.isCommenting = true;
      if (cmt.value.length === 0) this.isCommenting = false;
    },
    sendCmt() {
      let cmt = document.getElementById(this.myCmtId);
      if (cmt.value.length === 0) {
        window.console.log("No comments");
        return;
      }

      this.sendCommentDTO.comment = cmt.value;

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

      window.console.log(
        "Added comment: " + cmt.value + " on level: " + this.depth
      );
    },
    send_cmt_enter: function(e) {
      let cmt = document.getElementById(this.myCmtId);
      if (e.keyCode === 13) {
        if (cmt.value.length === 0) return;
        else {
          window.console.log(
            "Added comment: " + cmt.value + " on level: " + this.depth
          );
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

      fetch("/backend/comment/addLike/" + this.myCmtId, {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST"
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
      //send to DA
      fetch("/backend/comment/addDislike/" + this.myCmtId, {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST"
      });
    }
  },
  props: {
    node: Object,
    likes: Number,
    dislikes: Number,
    depth: {
      type: Number,
      default: 1
    }
  },
  created() {
    fetch("/backend/comment/getComment/" + this.node.commentId + "/0/2", {
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
