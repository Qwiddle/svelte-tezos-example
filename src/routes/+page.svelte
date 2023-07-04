<script lang="ts">
	import { onMount } from "svelte";
	import {
		createStore, 
		userAddress, 
		connected, 
		blockHead,
		connect,
		disconnect
	} from "svelte-tezos";
	import type { NetworkType } from "@airgap/beacon-sdk";

	onMount(async () => {
		createStore({ 
			rpcUrl: 'https://mainnet.api.tez.ie', 
			dappName: 'svelte-tezos-test', 
			networkType: "mainnet" as NetworkType,
		});

		await connect();
	});

	let blocks: Array<typeof $blockHead> = [];

	$: console.log({ blocks, $blockHead });
	$: if($blockHead) blocks = [...blocks, $blockHead];
</script>

<div style="display: flex; align-items: center;">
	<p>{$connected} - {$userAddress}</p>

	{#if $connected}
		<button on:click={disconnect}>
			Disconnect
		</button>
	{:else}
		<button on:click={connect}>
			Connect
		</button>
	{/if}
</div>

<h1>Latest blocks from the Tezos blockchain</h1>

{#each blocks as block}
	{#if block}
		<div>
			<h2>Block {block.level}</h2>
			<p>Timestamp: {block.lastUpdate}</p>
		</div>
	{/if}
{/each}