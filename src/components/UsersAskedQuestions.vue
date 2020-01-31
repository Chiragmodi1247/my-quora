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
            My answer might be disturbing to some. I have been looking forward
            to writing this for a long time, but couldn’t muster up the courage
            as it was very hurtful and disturbing to me.I was born in India and
            brought up in a middle class family. My dad had a job and my mom was
            a home maker. My mom gave birth to me and my brother via C-Section
            which made it worse for her. She was unable to stand for a long time
            and couldn’t manage even the basic household work.
          </p>
        </div>
      </tr>
      <tr>
        <button
          @click="
            upCount += 1;
            upVoted = true;
          "
        >
          <span v-if="!upVoted" class="mdi mdi-thumb-up-outline"></span>
          <span v-if="upVoted" class="mdi mdi-thumb-up"></span>
        </button>
        {{
          upCount
        }}

        <button
          @click="
            downCount += 1;
            downVoted = true;
          "
        >
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
        <td>
          <v-text-field
            class="questrial input-box"
            height="40px"
            background-color="grey lighten-3"
            placeholder="Write a comment..."
            rounded
          ></v-text-field>
        </td>
        <td>
          <button class="btn_send">
            Send <span class="mdi mdi-send"></span>
          </button>
        </td>
      </tr>
      <tr class="comment_section">
        <Comment
          v-for="comment in commentData"
          :key="comment"
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
  methods: {
    my_card() {
      alert("You clicked icon");
    }
  },
  data: function() {
    return {
      upCount: 10,
      downCount: 5,
      upVoted: false,
      downVoted: false,
      commentData: [
        {
          comment: "Comment1",
          like: 45,
          dislike: 20,
          children: [
            {
              comment: "Comment11",
              like: 15,
              dislike: 10,
              children: [
                {
                  comment: "Comment111",
                  like: 0,
                  dislike: 0
                },
                {
                  comment: "Comment112",
                  like: 5,
                  dislike: 20
                }
              ]
            },
            {
              comment: "Comment12",
              like: 35,
              dislike: 20
            }
          ]
        },
        {
          comment: "Comment2",
          like: 5,
          dislike: 3,
          children: [
            {
              comment: "Comment21",
              like: 45,
              dislike: 20,
              children: [
                {
                  comment: "Comment211",
                  like: 45,
                  dislike: 20
                },
                {
                  comment: "Comment212",
                  like: 45,
                  dislike: 20
                }
              ]
            },
            {
              comment: "Comment22",
              like: 45,
              dislike: 20
            }
          ]
        },
        {
          comment: "Comment3",
          like: 0,
          dislike: 0,
          children: [
            {
              comment: "Comment31",
              like: 45,
              dislike: 20,
              children: [
                {
                  comment: "Comment311",
                  like: 45,
                  dislike: 20
                },
                {
                  comment: "Comment312",
                  like: 45,
                  dislike: 20
                }
              ]
            },
            {
              comment: "Comment32",
              like: 45,
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
  background: rgb(184, 184, 184);
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
  background: blue;
  color: white;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
}
</style>
