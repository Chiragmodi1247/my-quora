<template>
  <v-card rounded outlined style="margin-bottom:10px;padding:10px">
    <table>
      <tr>
        <td colspan="6">
          <a href="">
            <h2 style="color: black">How about answering this question?</h2>
          </a>
        </td>
        <td style="float: right">
          <span class="mdi mdi-dots-vertical"></span>
        </td>
      </tr>
    </table>

    <table>
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
        <span class="mdi mdi-thumb-up-outline"></span>
        45
        <span class="mdi mdi-thumb-down-outline"></span>
        45
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
    </table>

    <h2>Older Comments</h2>
    <ul id="commentsList"></ul>
  </v-card>
</template>

<script>
// @ is an alias to /src
export default {
  name: "GuestPost",
  components: {},
  data() {
    return {
      myComments: [
        {
          id: 0,
          name: "Chirag",
          handle: "@mchirag1247",
          content: "I like this parent comment",
          upvotes: 7,
          downvotes: 2,
          parentId: null
        },
        {
          id: 1,
          name: "Pratik",
          handle: "@mchirag21",
          content: "I like being child comment",
          upvotes: 2,
          downvotes: 0,
          parentId: 0
        },
        {
          id: 2,
          name: "vedu",
          handle: "@mvedu12",
          content: "I like being grand child comment",
          upvotes: 0,
          downvotes: 0,
          parentId: 1
        },
        {
          id: 3,
          name: "Shreya",
          handle: "@shreyu",
          content: "I like being a sibbling comment",
          upvotes: 7,
          downvotes: 2,
          parentId: 0
        },
        {
          id: 4,
          name: "Dishu",
          handle: "@mdishu000",
          content: "I like this parent comment",
          upvotes: 9,
          downvotes: 0,
          parentId: null
        }
      ]
    };
  },
  props: {
    question_prop: Object
  },

  methods: {
    my_card() {
      alert("You clicked icon");
    }
  }
  //   created() {
  //       let storeCmt = JSON.stringify(this.myComments)
  //       localStorage.setItem("commentArr", storeCmt)
  //   }
};
</script>

<style scoped>
.my-row {
  padding: 0;
}
.report_post {
  background: blue;
  float: right;
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
