<template>
  <Headline />
  <Serarch />
  <MovieList />
</template>
<script>
import Headline from '~/components/Headline'
import Serarch from '~/components/Search'
import MovieList from '~/components/MovieList'

export default {
  components:{
    Headline,
    Serarch,
    MovieList
  },
  created(){
    this.$store.commit('movie/resetMovies')
  }
}
</script>
