<script lang="ts">
    import {fade} from "svelte/transition";
    import type { Task } from "../types";

  let {tasks, toggleDone, removeTask} : {tasks: Task[], toggleDone: (task: Task) => void, removeTask: (id: string) => void} = $props()
</script>

<section class="w-full max-w-md">
        {#each tasks as task (task.id)}
        <article class="task bg-red-900 p-4 hover:bg-red-600" transition:fade>
        <label class="flex items-center">
            <input type="checkbox" checked={task.completed} onchange={() => toggleDone(task)} />
         <span class:done={task.completed} class="font-semibold">{task.title}</span>
        </label>
        <button onclick={() => removeTask(task.id)} class="outline text-xs font-semibold p-2 cursor-pointer hover:bg-white hover:text-red-900">Remove</button>
        </article>
        {/each}
  </section>


<style>
    .done {
        text-decoration: line-through;
    }
    .task {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    section {
        margin-top: 1rem;
    }
    article {
        margin-bottom: 0.5rem;
    }
    label {
        cursor: pointer;
    }
    input[type="checkbox"] {
        margin-right: 0.5rem;
        cursor: pointer;
    }
</style>