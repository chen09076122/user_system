<template>
  <div>
    <el-dialog
      :title="info.isadd ? '商品分类添加' : '商品分类编辑'"
      :visible.sync="info.isshow"
    >
      {{ form }}

      <el-form :model="form">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid">
            <el-option label="请选择" value disabled> </el-option>
            <el-option label="顶级分类" :value="0"> </el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { mapGetters, mapActions } from "vuex";
import {
  reqcateadd,
  reqcateinfo,
  reqcateedit,
  reqmenulist,
} from "../../../request/api";
import { successAlert } from "../../../utils/alert";
import { errorAlert } from "../../../utils/alert";
import { IndexRoutes } from "../../../router/index";

export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },

      imageUrl: null,
      IndexRoutes,

      menuList: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },

  mounted() {},

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

    //设置上传文件的格式大小，并显示在页面
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        return isJPG;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return isLt2M;
      }

      this.imageUrl = URL.createObjectURL(file);
      //将文件给form.img
      this.form.img = file;
    },

    //点击取消
    cancle() {
      this.info.isshow = false;
    },

    // 点击添加
    add() {
      reqcateadd(this.form).then((res) => {
        // 添加成功
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
        } else {
          errorAlert(res.data.msg);
        }
        //清空数据
        this.form = {
          pid: "",
          catename: "",
          img: "",
          status: 1,
        };
        this.imageUrl = null;

        //请列表数据
        this.reqList();
        //弹框消失
        this.info.isshow = false;
      });
    },

    changpid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },

    //获取点击的那条数据
    getOnelist(id) {
      reqcateinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.form = res.data.list;
          // form此时没有id
          this.form.id = id;
          this.imageUrl = this.$pre + this.form.img;
        }
      });
    },

    //点了修改按钮，告诉menu请数据，menu把数据传递给form和list.重新渲染
    formedit() {
      reqcateedit(this.form).then((res) => {
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
          catename: "",
          img: "",
          status: 1,
        };
        //清空图片
        (this.imageUrl = null),
          //请列表数据
          this.reqList();
        //弹框消失
        this.info.isshow = false;
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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