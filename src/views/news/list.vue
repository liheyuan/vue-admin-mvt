<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label="标题">
          <el-input
            v-model="query.title"
            style="width: 200px"
            clearable
            @keyup.enter.native="refresh"
            @clear="refresh"
            @blur="refresh"
          />
        </el-form-item>
        <el-form-item label="对外展示">
          <el-radio-group
            v-model="query.show"
            clearable
            @change="refresh"
          >
            <el-radio-button :label="true" name="show">是</el-radio-button>
            <el-radio-button :label="false" name="show">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-button type="primary" @click="refresh">查询</el-button>
      </el-form>
    </div>
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        label="ID"
        prop="id"
        align="center"
        width="150"
        highlight-current-row
        border="true"
      />

      <el-table-column
        label="标题"
        prop="title"
        align="center"
      />

      <el-table-column
        label="分类Id"
        prop="catId"
        align="center"
        width="150"
      />

      <el-table-column
        label="标签"
        prop="tags"
        align="center"
        width="200"
      >
        <template
          slot-scope="{ row: {tags} }"
        >
          <span>{{ tags | concatFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="对外展示"
        prop="show"
        :formatter="formatBoolean"
        align="center"
        width="150"
      />

      <el-table-column
        label="操作"
        width="120"
        aligh="center"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)" />
          <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        layout="sizes, prev, pager, next"
        :page-sizes="[10, 50, 100]"
        :total="total"
        :current-page.sync="query.currentPage"
        :page-size.sync="query.pageSize"
        background="true"
        @current-change="refresh"
      />
    </div>
  </div>

</template>
<script>
import { getNewsList, deleteNews } from '@/api/news'

export default ({
  filters: {
    concatFilter(value) {
      Object.values(value).join(',')
      return value.join(',')
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      query: {}
    }
  },
  created() {
    this.query.pageSize = 10
    this.query.currentPage = 1
    this.refresh()
  },
  methods: {
    refresh() {
      getNewsList(this.query).then(data => {
        this.list = data.newsList
        this.total = data.newsCnt
      })
    },
    formatBoolean(row, column, cellValue) {
      return cellValue ? '是' : '否'
    },
    handleEdit(row) {
      this.$router.push(`/news/edit/${row.id}`)
    },
    handleDelete(row) {
      this.$confirm('确定删除该新闻?', '提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNews(row.id).then(resp => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 1500
          })
          this.refresh()
        })
      })
    }
  }
})
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  background: #fff;
  padding: 32px 16px;
  margin:0px auto;
  width: 100%;
  padding-right: 40px;
}
.filter-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 40px;
}
</style>
