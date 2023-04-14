<script>
export default {
  watch: {
    category() {
      this.breadcrumbItems = [...this.breadcrumbItems, {
        title: this.category.title
      }]
    }
  }
}
</script>