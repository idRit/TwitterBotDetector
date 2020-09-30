import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        // name: 'world'
        uri: "http://3.137.168.72:3000/api/v1/analyse/analyse-handle/ec2/"
    }
});

export default app;