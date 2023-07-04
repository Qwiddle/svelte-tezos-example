<script>
  import { disconnect, connect, connected } from "svelte-tezos";
  import { Button } from "$components/ui/button";
  
  const handleWalletButtonClick = async () => {
    if($connected) {
      await disconnect();
    }
    else {
      await connect();
    }
  }
</script>

<Button class="bg-primary/10" on:click={handleWalletButtonClick} variant="outline">
  {#if $connected}
  Disconnect
  {:else}
  Connect
  {/if}
</Button>

