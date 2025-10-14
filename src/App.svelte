<script lang="ts">
  import TasksForm from "./components/TasksForm.svelte";
  import TasksList from "./components/TasksList.svelte";
  import type { Task , Filter} from "./types";

  let message: string = "Task App";
  let currentFilter = $state<Filter>("all");

  let tasks = $state<Task[]>([]);
  let totalCompleted = $derived(tasks.reduce((total, task) => total + Number(task.completed), 0));


  let filteredTasks = $derived.by(() => {
    switch (currentFilter) {
      case "all":
        return tasks;
      case "todo":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
    }  return tasks;
  });

  function addTask(newTask: string) {
    tasks = [
      ...tasks,
      { id: crypto.randomUUID(), title: newTask, completed: false },
    ];
  }

  function toggleDone(task: Task) {
    task.completed = !task.completed;
  }

  function removeTask(id: string) {
    tasks = tasks.filter((task) => task.id !== id);
  }
</script>

{#snippet filterButton(filter: Filter)}
    <button onclick={() => currentFilter = filter} class:contrast={currentFilter === filter} class="secondary filterButton bg-red-800 p-2 font-semibold cursor-pointer hover:bg-red-500 text-sm">{filter}</button>
{/snippet}

<main class="flex justify-center items-center flex-col p-4">
  <h1 class="text-3xl font-bold my-6">{message}</h1>
  <TasksForm {addTask}/>
  {#if tasks.length > 0}
    <p>{totalCompleted} of {tasks.length} completed</p>
    {:else}
     <p class="text-center font-semibold bg-red-800 px-4 py-1 rounded-full">Add a task to get started</p>
  {/if}
  {#if tasks.length }
    <div class="button-container">
    {@render filterButton("all")}
    {@render filterButton("todo")}
    {@render filterButton("completed")}
  </div>
  {/if}
  <TasksList tasks={filteredTasks} {toggleDone} {removeTask}/>
</main>

<style>
  .button-container {
    margin: 1rem 0;
    display: flex;
    justify-content: end;
    gap: 0.5rem;
  }

  .filterButton {
    text-transform: capitalize;
  }
</style>
