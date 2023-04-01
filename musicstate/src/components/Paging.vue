<template>
    <div>
        <el-pagination
            :page-size="pageSize"
            :pager-count="5"
            layout="prev, pager, next"
            :total="ListCount"
            @current-change="fn"
          >
          </el-pagination>
    </div>
</template>

<script>
    export default {
        name:"pagingView",
        props:["pageSize","ListCount" , "pageFn"],
        data() {
            return {
                
            }
        },
        methods:{
            fn(e){
                this.pageFn(this.pageSize,e);
            }
        }
    }
</script>

<style scoped>

</style>