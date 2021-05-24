<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
  <!-- 列表 -->
    <v-list :info="info"  @edit="willEdit"></v-list>

    <!-- 表单 -->
    <!-- 2.传递info -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
export default {
  props: [],
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
    };
  },
  methods: {
    add() {
      this.info.isshow = true;
      
    },

    willEdit(id){
      this.$refs.form.getOnelist(id) 
    }
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
</style>