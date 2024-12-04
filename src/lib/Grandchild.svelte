<script>
    import { getContext } from "svelte";

    let counter = getContext('mehedi');
</script>

<h5>Counter from grand children</h5>

<p>{counter.value.age}</p>

<button onclick={()=> counter.value.age += 1}>Increase from grandchild</button>