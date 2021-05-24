<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-top: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
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
import {reqroledelete} from "../../../request/api"
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
      //通知role取数据
      this.$emit("edit", id);
    },

    willdel(id) {
      reqroledelete({id:id}).then((res) => {
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