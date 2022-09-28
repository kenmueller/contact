<script lang="ts">
	import { onDestroy } from 'svelte'
	import { type Socket, io } from 'socket.io-client'

	import { page } from '$app/stores'

	import type GameState from '../../shared/game/state.js'
	import MetaImage from '../../components/Meta/Image.svelte'
	import MetaTitle from '../../components/Meta/Title.svelte'
	import MetaDescription from '../../components/Meta/Description.svelte'
	import NavbarContainer from '../../components/NavbarContainer.svelte'

	$: code = $page.params.code

	let socket: Socket | null = null
	let state: GameState | null = null

	$: socket?.on('state', (newState: GameState) => {
		state = newState
	})

	let nameInput: HTMLInputElement | null = null
	$: nameInput?.focus()

	let name = ''
	let joinLoading = false

	const join = () => {
		if (!name || socket) return
		socket = io({ query: { code, name } })
	}

	onDestroy(() => {
		socket?.disconnect()
	})
</script>

<MetaImage />
<MetaTitle value="Game | Contact!" />
<MetaDescription />

<NavbarContainer>
	{#if !socket}
		<main>
			<form on:submit|preventDefault={join}>
				<input placeholder="Name" bind:this={nameInput} bind:value={name} />
				<button aria-busy={joinLoading || undefined} disabled={!name.length}>
					Join Game
				</button>
			</form>
		</main>
	{:else if !state}
		<main>
			<p>Loading...</p>
		</main>
	{:else if state.type === 'waiting-to-start'}
		<main>
			<p>Waiting to Start</p>
		</main>
	{:else if state.type === 'voting'}
		<main>
			<p>Voting</p>
		</main>
	{/if}
</NavbarContainer>

<style lang="scss">
	main {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
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
		margin-top: 1rem;
		font-size: 1.2rem;
		font-weight: 900;
		background: linear-gradient(to right, colors.$purple, colors.$orange);
		background-clip: text;
		-webkit-text-fill-color: transparent;
		-moz-text-fill-color: transparent;
		transition: opacity 0.3s;

		&:hover {
			opacity: 0.7;
		}

		&[aria-busy],
		&:disabled {
			pointer-events: none;
			opacity: 0.5;
		}
	}

	p {
		font-size: 2rem;
		font-weight: 900;
	}
</style>
