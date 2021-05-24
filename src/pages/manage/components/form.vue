<template>
  <div>
    <el-dialog
      :title="info.isadd ? '用户添加' : '用户编辑'"
      :visible.sync="info.isshow"
    >
      {{ form }}

      <el-form :model="form">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" @change="changpid">
            <el-option disabled value>请选择</el-option>
            <!-- <el-option label="系统设置" :value="1"></el-option> -->
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
  requserinfo,
  requseredit,
  reqrolelist,
  requseradd,
} from "../../../request/api";
import { successAlert } from "../../../utils/alert";
import { errorAlert } from "../../../utils/alert";
import { IndexRoutes } from "../../../router/index";
export default {
  props: ["info", "list"],
  data() {
    return {
      form: {
        roleid: 1,
        username: "",
        password: "",
        status: 1,
      },

      rolelist: [],

      IndexRoutes,
      imageUrl: "",
    };
  },

  mounted() {
    reqrolelist({ istree: true }).then((res) => {
      if (res.data.code == 200) {
        this.rolelist = res.data.list ? res.data.list : [];
        console.log(this.rolelist);
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
      requseradd(this.form).then((res) => {
        //添加成功
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
        } else {
          errorAlert(res.data.msg);
        }

        //清空数据
        this.form = {
          username: "",
          password: "",
          status: 1,
        };

        //让manage.vue请列表数据
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
      requserinfo({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.form = res.data.list;
          this.form.password = "";
        }
      });
    },
    //点了修改按钮，告诉menu请数据，menu把数据传递给form和list.重新渲染
    formedit() {
      requseredit(this.form).then((res) => {
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
.imageup {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
  width: 120px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 178px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>