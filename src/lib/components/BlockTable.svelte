<script lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from "$components/ui/table";
  import { blockHead } from "svelte-tezos";

  export let blocks: Array<typeof $blockHead> = [];
</script>

<Table>
  <TableCaption>A list of recent blocks on the Tezos blockchain.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead class="w-[100px]">Level</TableHead>
      <TableHead>Timestamp</TableHead>
      <TableHead>Hash</TableHead>
      <TableHead class="text-right">Operations</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {#each blocks as block, i (i)}
      {#if block}
        <TableRow key={block.level}>
          <TableCell class="font-medium">{block.level}</TableCell>
          <TableCell>{block.lastUpdate}</TableCell>
          <TableCell>{''}</TableCell>
          <TableCell class="text-right">{''}</TableCell>
        </TableRow>
      {/if}
    {/each}
  </TableBody>
</Table>