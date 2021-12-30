<template>
  <div class="app-container">
    <detail :edit="true" />
  </div>
</template>

<script>
import detail from './detail'

export default ({
  components: {
    detail
  }
})
</script>
