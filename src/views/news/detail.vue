<template>

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

    <el-form-item label="分类" prop="catId">
      <el-col :span="11">
        <el-select
          v-model="form.catId"
          placeholder="请选择分类"
          style="width: 100%"
        >
          <el-option label="分类1" value="1" />
          <el-option label="分类2" value="2" />
          <el-option label="分类3" value="3" />
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="展示时间">
      <el-col :span="11">
        <el-date-picker
          v-model="form.dateStart"
          type="datetime"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="line">-</el-col>
      <el-col :span="11">
        <el-date-picker
          v-model="form.dateEnd"
          type="datetime"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="标签">
      <el-checkbox-group v-model="form.tags">
        <el-checkbox label="tag1" name="tag">标签1</el-checkbox>
        <el-checkbox label="tag2" name="tag">标签2</el-checkbox>
        <el-checkbox label="tag3" name="tag">标签3</el-checkbox>
        <el-checkbox label="tag4" name="tag">标签4</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="是否对外展示">
      <el-radio-group v-model="form.show">
        <el-radio :label="true" name="show">是</el-radio>
        <el-radio :label="false" name="show">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="正文" prop="content">
      <el-input v-model="form.content" type="textarea" :rows="10" />
    </el-form-item>
    <el-form-item>
      <el-button v-loading="loading" type="primary" @click="onSubmit('form')">{{ edit ? '更新' : '新建' }}</el-button>
      <el-button @click="onReset('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { createNews, getNews, updateNews } from '@/api/news'

export default {
  props: {
    edit: Boolean
  },
  data() {
    return {
      loading: false,
      form: {
        id: 0,
        title: '',
        catId: '',
        tags: [],
        show: true,
        content: ''
      },
      rules: {
        title: [{ required: true, message: '请填写标题' }],
        catId: [{ required: true, message: '请选择分类', trigger: ['blur', 'change'] }],
        desc: [{ required: true, message: '请填写正文' }]
      }

    }
  },
  created() {
    if (this.edit) {
      const id = this.$route.params.id || 1
      getNews(id).then((data) => {
        const { news } = data
        if (!news) {
          this.$message({ message: '新闻不存在', type: 'warning' })
        } else {
          this.setData(news)
        }
      })
    }
  },
  methods: {
    setData(news) {
      const newForm = Object.assign({}, news)
      this.form = newForm
      console.log(this.form)
    },
    onSubmit(formName) {
      const form = this.$refs[formName]
      const data = form.model
      this.loading = true
      form.validate((valid) => {
        if (valid) {
          const p = this.edit ? updateNews(data) : createNews(data)
          p.then(() => {
            this.$message('已提交')
            if (!this.edit) {
              this.$refs[formName].resetFields()
            }
            this.loading = false
          }).catch(e => {
            this.loading = false
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    onReset(formName) {
      this.$refs[formName].resetFields()
      this.$message({ message: '已重置', type: 'warning' })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
