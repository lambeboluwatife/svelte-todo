<script lang="ts">
    let newTask: string = $state("");
    let {addTask} : {addTask: (newTask: string) => void } = $props()

    function formSubmitted(event: SubmitEvent) {
        event.preventDefault();
        if (newTask.trim() === "") return;
        addTask(newTask);
        newTask = "";
    }
</script>

<form onsubmit={formSubmitted} class="my-4">
    <div class="flex items-center flex-col md:flex-row gap-4">
        <label class="mr-2 font-bold">
        Task:
        <input type="text" name="newTask" bind:value={newTask} class="border p-2 rounded-xl " />
    </label>
    <button type="submit" class="text-xs bg-white text-[#242424] p-2 font-semibold rounded-2xl hover:text-white hover:bg-[#242424] border cursor-pointer">Add Task</button>
    </div>
</form>