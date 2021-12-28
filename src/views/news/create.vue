<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
      style="width: 80%"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select
          v-model="form.category"
          placeholder="请选择分类"
          style="width: 100%"
        >
          <el-option label="分类1" value="1" />
          <el-option label="分类2" value="2" />
          <el-option label="分类3" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            placeholder="选择时间"
            style="width: 100%"
          /> </el-col></el-form-item>
      <el-form-item label="标签">
        <el-checkbox-group v-model="form.tags">
          <el-checkbox label="tag1" name="tag">标签1</el-checkbox>
          <el-checkbox label="tag2" name="tag">标签2</el-checkbox>
          <el-checkbox label="tag3" name="tag">标签3</el-checkbox>
          <el-checkbox label="tag4" name="tag">标签1</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否对外展示">
        <el-radio-group v-model="form.show">
          <el-radio :label="true" name="show">是</el-radio>
          <el-radio :label="false" name="show">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="正文" prop="desc">
        <el-input v-model="form.desc" type="textarea" :rows="10" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="onCancel('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: '',
        category: '',
        tags: [],
        show: true,
        desc: ''
      },
      rules: {
        title: [{ required: true, message: '请填写标题' }],
        category: [{ required: true, message: '请选择分类', trigger: ['blur', 'change'] }],
        desc: [{ required: true, message: '请填写正文' }]
      }

    }
  },

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message('已提交')
          console.log(this.form)
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$message({ message: '已取消', type: 'warning' })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
