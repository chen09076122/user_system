<template>
  <div>
    <el-button type="primary" @click="menuadd">添加</el-button>
    <v-list
      :list="list"
      :info="info"
      @edit="willedit"
      @init="initpage"
    ></v-list>
    <v-form :info="info" @init="initpage" :list="list" ref="form"></v-form>
    <el-pagination
      layout="prev, pager, next"
      :page-size="size"
      :total="this.total"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { requserlist, requsercount } from "../../request/api";
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

      page: 1,
      size: 2,
      total: 0,

      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    this.initpage();
  },

  methods: {
    ...mapActions({}),
    menuadd() {
      this.info.isshow = true;
    },

    //进去列表
    initlist() {
      // 7-2 请求list数据 没有传istree
      requserlist({ page: this.page, size: this.size }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.list = res.data.list ? res.data.list : [];
        }
      });
    },

    initpage() {
      this.initlist();
      this.getTotal();
  
    },

    getTotal() {
      requsercount().then((res) => {
        console.log(res);
        this.total = res.data.list[0].total;
        console.log(this.total);
      });
    },

    willedit(id) {
      //让form请数据，添加ref调用form中的方法
      this.$refs.form.getOnelist(id);
    },

    changePage(page) {
      this.page = page;
      this.initlist();
    },
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
</style>