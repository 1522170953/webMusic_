<template>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in imgSrcs" :key="item">
      <el-image style="width: 100%; height: 100%" :src="item"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "CarouselImg",
  data() {
    return {
      imgSrcs: [
        "https://imgessl.kugou.com/commendpic/20221012/20221012151556309954.jpg",
        "https://imgessl.kugou.com/commendpic/20230209/20230209200536421871.jpg",
        "https://imgessl.kugou.com/commendpic/20230209/20230209200957372682.jpg",
        "https://imgessl.kugou.com/commendpic/20230209/20230209212148892942.jpg",
      ],
    };
  },
};
</script>

<style scoped></style>
