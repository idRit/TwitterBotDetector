<script>
	export let name;

	import SearchBox from './components/SearchBox.svelte';
</script>

<style>
	main {
		padding: 10px;
	}

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 97vh;
	}

	.appname {
		height: 10vh;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2px;
		border: 2px solid #000000;
	}

	.content {
		height: 83vh;
		margin-top: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2px;
		border: 2px solid #000000;
	}

	@media (min-width: 640px) {
	}
</style>

<main>
	<!-- <h1>{name}</h1> -->
	<div class="container">
		<div class="appname"><h1>{name}</h1> <SearchBox/> </div>
		<div class="content"></div>
		<!-- <div class="searchbox"></div> -->
	</div>
</main>
