<script lang="ts">
  import { onMount } from "svelte";
  import {
    createStore, 
    userAddress, 
    Tezos,
  } from "svelte-tezos";
  import type { NetworkType } from "@airgap/beacon-sdk";
  import { blocks, updateBlocks } from '$lib/stores/blocks';
  import BlockTable from "$components/BlockTable.svelte";
  import ConnectButton from "$components/ConnectButton.svelte";
  
  onMount(async () => {
    createStore({ 
      rpcUrl: 'https://mainnet.api.tez.ie', 
      dappName: 'svelte-tezos-test', 
      networkType: "mainnet" as NetworkType,
    });
    
    const sub = Tezos.stream.subscribeBlock('head');
    
    sub.on('data', (event) => {
      updateBlocks({
        level: event.header.level,
        lastUpdate: event.header.timestamp.toString(),
        operations: event.operations[3].length,
        hash: event.hash,
      })
    });
  });
</script>

<div class="grid grid-cols-1">
  <div class="flex items-center justify-between bg-secondary border-b-2 py-2 px-3">
    <span class="text-md font-medium">svelte-tezos-example</span>
    <div class="flex items-center gap-4">
      {#if $userAddress}
      <p class="text-xs truncate ... md:w-auto w-12">{$userAddress}</p>
      {/if}
      <ConnectButton />
    </div>
  </div>
  
  <BlockTable blocks={$blocks} />
</div>