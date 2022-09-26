<script lang="ts">
	import Plus from 'svelte-icons/fa/FaPlus.svelte'

	import CODE_LENGTH from '../shared/code/length.js'
	import MetaImage from '../components/Meta/Image.svelte'
	import MetaTitle from '../components/Meta/Title.svelte'
	import MetaDescription from '../components/Meta/Description.svelte'
	import NavbarContainer from '../components/NavbarContainer.svelte'

	let input: HTMLInputElement | null = null
	$: input?.focus()

	let code = ''
	let joinLoading = false

	const join = () => {}

	let createLoading = false

	const create = () => {}
</script>

<MetaImage />
<MetaTitle />
<MetaDescription />

<NavbarContainer>
	<div class="container">
		<main>
			<form on:submit|preventDefault={join}>
				<input
					placeholder="Game Code"
					bind:this={input}
					bind:value={code}
					maxlength={CODE_LENGTH}
				/>
				<button
					class="join"
					aria-busy={joinLoading || undefined}
					disabled={code.length !== CODE_LENGTH}
				>
					Join Game
				</button>
			</form>
			<button
				class="create"
				aria-busy={createLoading || undefined}
				on:click={create}
			>
				<span class="plus">
					<Plus />
				</span>
				New Game
			</button>
		</main>
	</div>
</NavbarContainer>

<style lang="scss">
	@use 'sass:math';

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	main {
		display: flex;
		align-items: stretch;
	}

	form {
		$spacing: 2rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: $spacing;
		padding-right: $spacing;
		border-right: 0.125rem solid rgba(black, 0.05);
	}

	input {
		font-size: 1rem;
		font-weight: 700;
		padding: 0.7rem 1rem;
		background: rgba(black, 0.06);
		border-radius: 0.5rem;

		&::placeholder {
			color: rgba(black, 0.4);
		}
	}

	button {
		font-weight: 900;
		background: linear-gradient(to right, colors.$purple, colors.$orange);
		background-clip: text;
		-webkit-text-fill-color: transparent;
		-moz-text-fill-color: transparent;
		transition: opacity 0.3s;

		&[aria-busy],
		&:disabled {
			pointer-events: none;
			opacity: 0.5;
		}
	}

	.join {
		margin-top: 1rem;
		font-size: 1.2rem;
	}

	.create {
		display: flex;
		align-items: center;
		font-size: 1.5rem;
	}

	.plus {
		$size: 2.5rem;

		display: flex;
		justify-content: center;
		align-items: center;
		width: $size;
		height: $size;
		margin-right: 0.8rem;
		background: linear-gradient(to right, colors.$purple, colors.$orange);
		border-radius: math.div($size, 2);

		> :global(svg) {
			height: 1.5rem;
			color: white;
		}
	}
</style>
