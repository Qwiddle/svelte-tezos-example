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
	import BlockTable from "$components/BlockTable.svelte";
	import Button from "$components/ui/button/Button.svelte";

	onMount(async () => {
		createStore({ 
			rpcUrl: 'https://mainnet.api.tez.ie', 
			dappName: 'svelte-tezos-test', 
			networkType: "mainnet" as NetworkType,
		});
	});

	const handleWalletButtonClick = async () => {
		if($connected) {
			await disconnect();
		}
		else {
			await connect();
		}
	}

	let blocks: Array<typeof $blockHead> = [];

	$: console.log({ blocks, $blockHead });
	$: if($blockHead) blocks = [$blockHead, ...blocks].slice(0, 10);
</script>

<div class="grid grid-cols-1">
	<div class="flex items-center justify-between bg-secondary border-b-2 py-2 px-3">
		<span class="text-md font-medium">svelte-tezos-example</span>
		<div class="flex items-center gap-4">
			{#if $userAddress}
				<p class="text-xs truncate ... md:w-auto w-12">{$userAddress}</p>
			{/if}
			<Button class="bg-primary/10" on:click={handleWalletButtonClick} variant="outline">
				{#if $connected}
					Disconnect
				{:else}
					Connect
				{/if}
			</Button>
		</div>
	</div>

	<BlockTable blocks={blocks} />
</div>