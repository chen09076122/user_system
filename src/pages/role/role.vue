<template>
  <div>
    <el-button type="primary" @click="menuadd">添加</el-button>
    <v-list :list="list" :info="info" @edit="willedit"  @init="initrole"></v-list>
    <v-form :info="info" @init="initrole" :list="list" ref="form"></v-form>

    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import {reqrolelist} from "../../request/api"
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
        isadd:true
      },

      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    this.initrole();
  },
  methods: {
    ...mapActions({}),
    menuadd() {
      this.info.isshow = true;
    },

    //进去列表
    initrole() {
      // 7-2 请求list数据 没有传istree
      reqrolelist({istree:true}).then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list ? res.data.list : [];
          console.log(this.list);
        }
      });
    },

    willedit(id){
      //让form请数据，添加ref调用form中的方法
      this.$refs.form.getOnelist(id)
    }
  },


};
</script>
<style scoped lang="less">
@import "../../less/index.less";
</style>