<template>
  <div>
    <el-dialog
      :title="info.isadd ? '商品规格添加' : '商品规格编辑'"
      :visible.sync="info.isshow"
    >
      {{ form }}

      <el-form :model="form">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          v-for="(item, index) in attrArr"
          :key="index"
          label="规格属性"
          label-width="120px"
        >
          <div class="box">
            <el-input v-model="item.value"></el-input>
            <el-button type="primary" v-if="index == 0" @click="attrAdd"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="attrAel">删除</el-button>
          </div>
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
  reqspecsadd,
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
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrArr: [
        {
          value: "",
        },
      ],

      IndexRoutes,

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

    attrAdd() {
      this.attrArr.push({ value: "" });
    },

    attrAel(index) {
      this.attrArr.splice(index, 1);
    },

    //点击取消
    cancle() {
      this.info.isshow = false;
    },

    // 点击添加
    add() {
      let str = this.attrArr.reduce((val, item) => (val += item.value + ","),"");

      // console.log( typeof str.slice(0,str.length-1));
      this.form.attrs = str.slice(0, str.length - 1);

      reqspecsadd(this.form).then((res) => {
        // 添加成功
        // console.log(res);
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
        } else {
          errorAlert(res.data.msg);
        }
        //清空数据
        this.form = {
          specsname: "",
          attrs: "",
          status: 1,
        };

        (this.attrArr = [
          {
            value: "",
          },
        ]),
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

.box {
  display: flex;
}

.box .el-input {
  display: 1;
}
</style>