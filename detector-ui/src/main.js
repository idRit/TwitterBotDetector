import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Fake Profile Detector'
	}
});

export default app;