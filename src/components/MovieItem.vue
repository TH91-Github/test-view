<template>
  <RouterLink 
    :to="`/movie/${movie.imdbID}`"
    :style="{backgroundImage: `url(${movie.Poster})` }"
    class="movie">
    <Loader 
      v-if="imageLoading"
      :size="1.5"
      absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>
<script>
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  props:{
    movie:{
      type:Object,
      default: () =>({}) // 함수로 만들어서 반환.
    }
  },
  data(){
    return{
      imageLoading: true
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    async init(){
        const poster = this.movie.Poster
        if (!poster || poster === 'N/A'){ // 포스터에 값이 없을 경우
          this.imageLoading = false
        } else { 
          await this.$loadImage(this.movie.Poster)
          this.imageLoading = false
        }
      }
      /*
      const img = document.createElement('img')
      img.src = this.movie.Poster
      img.addEventListener('load', () =>{ // ()=> 화살표 함수 대신 function 함수로 사용할 경우 
        this.imageLoading = false         // this.imageLoading의 this가 function으로 바뀌기 때문에 사용이 어렵다.
      })
      */
  }
}
</script>
<style lang="scss" scoped>
@import "~/scss/main";

.movie {
  $width: 200px;
  width: $width;
  height: $width * 3 / 2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size:cover;
  overflow:hidden;
  position:relative;
  &:hover::after{
    content:"";
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    border: 6px solid $primary;
  }
  .info{
    background-color :rgba($black, .3);
    width:100%;
    padding: 14px;
    font-size:14px;
    text-align: center;
    position:absolute;
    left: 0;
    bottom: 0;
    backdrop-filter:blur(10px);
    .year{
      color:$primary;
    }
    .title{
      color: $white;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  }
}

</style>