<template>
  <v-card  rounded outlined style="margin-bottom:10px;padding:10px">
    <table>
      <tr>
        <td >
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
      </tr>
      <tr>
        <td colspan="6">
        <router-link :to="{ path: '/question/'+question_prop.id}">
            <h2 style="color: black">{{question_prop.question}}</h2>
        </router-link>
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
          <p>
            Some more desc here. My answer might be disturbing to some. I have
            been looking forward to writing this for a long time, but couldn’t
            had a job and my mom was
          </p>
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
    </table>

  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: "GuestPost",
  components: {},
  props: {
    question_prop: Object
  },
  methods: {
    my_card() {
      alert("You clicked icon");
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
    background: grey;
}
</style>
