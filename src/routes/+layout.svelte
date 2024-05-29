<script>
	import '../app.css';
</script>

<slot />

<style lang="postcss">
	@import 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap';

	:root {
		font-family: 'Nunito', sans-serif;
		color-scheme: light only;
		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;
	}

	:global(html) {
		background-color: theme(colors.white);
	}
</style>
