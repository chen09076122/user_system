<template>
  <div>
    <el-dialog
      :title="info.isadd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isshow"
    >
      {{ form }}
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid" @change="changpid">
            <el-option disabled value>请选择</el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- <el-option label="系统设置" :value="1"></el-option> -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          label-width="120px"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon">
            <el-option disabled value="">请选择</el-option>
            <el-option value="el-icon-eleme">
              <i class="el-icon-eleme"></i>
            </el-option>
            <el-option value="el-icon-s-tools">
              <i class="el-icon-s-tools"></i>
            </el-option>
            <el-option value="el-icon-user-solid">
              <i class="el-icon-user-solid"></i>
            </el-option>
            <el-option value="el-icon-picture">
              <i class="el-icon-picture"></i>
            </el-option>
            <el-option value="el-icon-circle-plus-outline">
              <i class="el-icon-circle-plus-outline"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url">
            <el-option disabled value>请选择</el-option>
            <el-option
              :lable="'/' + item.path"
              :value="item.meta.title"
              v-for="item in IndexRoutes"
              :key="item"
            ></el-option>
          </el-select>
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
import { reqmenuadd, reqmenuinfo, reqmenuedit, } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
import { errorAlert } from "../../../utils/alert";
import { IndexRoutes } from "../../../router/index";
export default {
  props: ["info", "list"],
  data() {
    return {
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },

      IndexRoutes,
    };
  },

  methods: {
  //点击取消
    cancle() {
      this.info.isshow = false;
    },

    // 点击添加
    add() {
      reqmenuadd(this.form).then((res) => {
        //添加成功
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
        } else {
          errorAlert(res.data.msg);
        }

        //清空数据
        this.form = {
          pid: "",
          title: "",
          icon: "",
          type: 1,
          url: "",
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
      reqmenuinfo({ id: id }).then((res) => {
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
      reqmenuedit(this.form).then((res) => {
        //添加成功
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
        } else {
          errorAlert(res.data.msg);
        }

        //清空数据
        this.form = {
          pid: "",
          title: "",
          icon: "",
          type: 1,
          url: "",
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