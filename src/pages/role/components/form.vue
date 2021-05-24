<template>
  <div>
    <el-dialog
      :title="info.isadd ? '角色添加' : '角色编辑'"
      :visible.sync="info.isshow"
    >
      {{ form }}
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
           :default-checked-keys="[5]"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button v-if="info.isadd" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="formedit">修改 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqroleadd,
  reqroleinfo,
  reqroleedit,
  reqmenulist,
} from "../../../request/api";
import { successAlert } from "../../../utils/alert";
import { errorAlert } from "../../../utils/alert";
import { IndexRoutes } from "../../../router/index";
export default {
  props: ["info", "list"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      IndexRoutes,

      menuList: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },

  mounted() {
    reqmenulist({ istree: true }).then((res) => {
      console.log(res);
      if (res.data.code == 200) {
        this.menuList = res.data.list ? res.data.list : [];
        console.log(this.menuList);
      }
    });
  },

  methods: {
    //点击取消
    cancle() {
      this.info.isshow = false;
    },

    // 点击添加
    add() {
      // console.log(this.$refs.tree.getCheckedKeys());
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleadd(this.form).then((res) => {
        //添加成功
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
        } else {
          errorAlert(res.data.msg);
        }

        //清空数据
        this.form = {
          rolename: "",
          menus: "",
          status: 1,
        };

        //请列表数据
        this.$emit("init");

        //弹框消失
        this.info.isshow = false;
      });
    },

    changpid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },

    //获取点击的那条数据
    getOnelist(id) {
      reqroleinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          // console.log(res);
          this.form = res.data.list;
          //form此时没有id
          this.form.id = id;
        }
      });
    },
    //点了修改按钮，告诉menu请数据，menu把数据传递给form和list.重新渲染
    formedit() {
      reqroleedit(this.form).then((res) => {
        //添加成功
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
        } else {
          errorAlert(res.data.msg);
        }

        //清空数据
        this.form = {
          rolename: "",
          menus: "",
          status: 1,
        };
        //请列表数据
        this.$emit("init");
        //弹框消失
        this.info.isshow = false;
      });
    },
  },
};
</script>

<style>
</style>