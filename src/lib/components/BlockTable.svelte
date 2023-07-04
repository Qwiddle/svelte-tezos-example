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
  import type { Block } from "$lib/stores/blocks";
  
  export let blocks: Array<Block> = [];
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
          <TableCell class="text-blue-600 hover:opacity-80">
            <a href={`https://tzkt.io/${block.level}`} target="_blank">{block.hash}</a>
          </TableCell>
          <TableCell class="text-right">{block.operations}</TableCell>
        </TableRow>
      {/if}
    {/each}
  </TableBody>
</Table>