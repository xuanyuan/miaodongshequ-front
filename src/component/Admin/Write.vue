<template>
  <div id="editor">
    <textarea :value="input"
              @input="update"></textarea>
    <div v-html="compiledMarkdown"></div>
    <el-button type="primary"
               size="medium"
               round>提交</el-button>
    <el-button size="medium"
               round>重置</el-button>
  </div>
</template>

<script>
import marked from 'marked';
import _ from 'lodash';
export default {
  data() {
    return {
      input: '# hello',
    }
  },
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value
    }, 300)
  },
  computed: {
    compiledMarkdown: function() {
      console.log(marked(this.input, { sanitize: true }));
      return marked(this.input, { sanitize: true })
    }
  }
}
</script>

<style lang="scss" scoped>
#editor {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 90%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
