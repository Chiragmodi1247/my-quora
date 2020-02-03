<template>
  <v-card @click="sendAd" class="myAd">
    <v-row>
      <v-col>
        <a :href="myAd.targetUrl" target="_blank">
        <v-img
          :src="myAd.imageUrl"
          :lazy-src="myAd.imageUrl"
          max-width="350"
          max-height="150"
        >
        </v-img>
        </a>
        <p>{{ myAd.description }}</p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Ad",
  data: function() {
    return {
      sendAdDTO: {
        adId: this.myAd.adId,
        tag: this.myAd.tag,
        advertiserId: this.myAd.advertiserId,
        categoryName: this.myAd.categoryName,
        description: this.myAd.description,
        source: "Quora",
        userId: localStorage.getItem("quora-token"),
        targetUrl: this.myAd.targetUrl
      }
    };
  },
  props: {
    myAd: Object
  },
  methods: {
    sendAd() {
      fetch("http://172.16.20.83:8080/ads/onclick", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.sendAdDTO)
      })
      .then(
      window.console.log("Ads send")
      )

    }
  }
};
</script>

<style>
.myAd {
  margin: 20px;
  cursor: pointer;
}
</style>
