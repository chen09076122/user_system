<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-top: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="规格名称" width="180">
      </el-table-column>

      <el-table-column prop="catename" label="规格属性" width="180">
      </el-table-column>

      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
            >启用</el-button
          >
          <el-button v-else type="info">未启用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="willedit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="willdel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqcatedelete } from "../../../request/api";
export default {
  props: ["info"],

  data() {
    return {};
  },

  mounted() {
    this.reqList();
  },

  computed: {
    ...mapGetters({
      //分类列表
      list: "cate/list",
    }),
  },

  methods: {
    ...mapActions({
      //获取分类列表
      reqList: "cate/reqList",
     
    }),

    //1.弹窗出现
    willedit(id) {
     
      this.info.isshow = true;
      this.info.isadd = false;

      //通知cate 编辑
      this.$emit("edit", id);
    },

    willdel(id) {
      //删除数据
      reqcatedelete({ id: id }).then((res) => {
        // console.log(res);
        this.list = res.data.list ? res.data.list : [];
        this.reqList()
      });
    },
  },
};
</script>

<style>
.imgup {
  width: 80px;
  height: 80px;
}
</style>