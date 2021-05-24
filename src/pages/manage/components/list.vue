<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-top: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>

      <el-table-column prop="rolename" label="所属角色" width="180">
      </el-table-column>

      <el-table-column prop="status" label="菜单状态" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="willedit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="willdel(scope.row.uid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {requserdelete} from "../../../request/api"
export default {
  props: ["list", "info"],
  data() {
    return {};
  },


  methods: {
    //编辑功能
    //1.弹窗出现
    willedit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      //通知menu取数据
      this.$emit("edit", id);
    },

    willdel(id) {
      requserdelete({uid:id}).then((res) => {
        if ((res.data.code == 200)) {
          console.log(res);
        }
      });

      this.$emit('init');
    },


  },
};
</script>

<style>
</style>