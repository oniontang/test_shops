<template>
  <div id="app">
    <router-view/>
		<FooterGuide v-if="$route.meta.showFooter"/>
  </div>
</template>

<script>
	import {mapActions} from 'vuex'
	import FooterGuide from './components/FooterGuide/FooterGuide.vue'
	export default {
		components: {
			FooterGuide
		},
		name: 'App',
		mounted() {
			this.getAddress()
			this.getUserInfo()
		},
		methods:{
			...mapActions(['getAddress','getShops','getUserInfo'])
		}
	}
</script>

<style lang="less" scoped>
	#app{
		width: 100%;
		height: 100vh;
		background-color: #F5F5F5;
		// overflow: hidden;
	}
</style>
