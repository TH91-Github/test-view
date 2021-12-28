<template>
  <div class="container">
    <div 
      :class="{ 'no-result' : !movies.length }" 
      class="inner">
      <Loader v-if="loading" />
      <div 
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <div 
        v-else
        class="movies">
        <MovieItem 
        v-for="movie in movies" 
        :key="movie.imdbID" 
        :movie="movie" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import MovieItem from '~/components/MovieItem'
import Loader from '~/components/Loader'
export default{
  components:{
    MovieItem,
    Loader
  },
  computed: {
    // mapState 헬퍼 store/의 movie 모듈 안에 있는 상태를 배열로 등록
    ...mapState('movie', [ 
      'movies',
      'message',
      'loading'
    ])
  },
  /* mapState 헬퍼를 통해 아래 내용을 위와 같이 간략하게 사용
  computed:{
    movies (){
      return this.$store.state.movie.movies
    },
    message (){
      return this.$store.state.movie.message
    },
    loading (){
      return this.$store.state.movie.loading
    }
  }
  */
}
</script>
<style lang="scss" scoped>
@import "~/scss/main";
.container{
  margin-top:30px;
  .inner {
    background-color:$gray-200;
    padding: 10px 0;
    border-radius:4px;
    text-align:center;
    &.no-result{ 
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size:20px;
  }
  .movies{
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

</style>