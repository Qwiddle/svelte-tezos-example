import { writable, type Writable } from "svelte/store";

export interface Block {
  level: number;
  hash: string;
  lastUpdate: string;
  operations: number;
}

export const blocks: Writable<Block[]> = writable([]);

export const updateBlocks = (block: Block) => {
  blocks.update((b) => 
    [block, ...b].slice(0, 10)
  );
}