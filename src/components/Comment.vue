<template>
  <div>
    <div
      @click="expanded = !expanded"
      :style="{ 'margin-left': `${depth * 20}px` }"
      class="node"
    >
      <h1>{{ node.comment }}</h1>
    </div>
    <div :style="{ 'margin-left': `${depth * 20}px` }">
      <button
        @click="
          upCount += 1;
          upVoted = true;
        "
      >
        <span v-if="!upVoted" class="mdi mdi-thumb-up-outline"></span>
        <span v-if="upVoted" class="mdi mdi-thumb-up"></span>
      </button>
      {{ node.like }}

      <button
        @click="
          downCount += 1;
          downVoted = true;
        "
      >
        <span v-if="!downVoted" class="mdi mdi-thumb-down-outline"></span>
        <span v-if="downVoted" class="mdi mdi-thumb-down"></span>
      </button>
      {{ node.dislike }}
    </div>
    <div v-if="expanded">
      <Comment
        v-for="child in node.children"
        :key="child.name"
        :node="child"
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
      upCount: 10,
      downCount: 5,
      upVoted: false,
      downVoted: false,
      expanded: false
    };
  },
  props: {
    node: Object,
    depth: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped></style>
