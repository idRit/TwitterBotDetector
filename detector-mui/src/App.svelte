<script>
	export let uri;

	import SearchBox from "./components/SearchBox.svelte";
	import MainCard from "./components/MainCard.svelte";

	import { tag } from "./stores.js";

	let handle;

	const unsubscribe = tag.subscribe((value) => {
		handle = value;
	});
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
		margin-bottom: 10px;
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
	<div class="container">
		<div class="content">
			{#if handle.length > 1}
				<MainCard 
					uri={uri} />
			{:else}
				<h1>Fake Profile Detector</h1>
			{/if}
		</div>
		<div class="appname"><SearchBox/> </div>
	</div>
</main>
