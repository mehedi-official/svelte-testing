<script>
    import { page } from "$app/stores";
    let { children } = $props();

    console.log($page);

    let showLinks = [
        {path: '/', label: 'Home'},
        {path: '/filter', label: 'Filter'},
        {path: '/context', label: 'Context'},
        {path: '/table', label: 'Table'}
    ]
</script>


<div>
    {#each showLinks as {path, label}}
        <a href={path} class:active={ $page.url.pathName === path} >{label}</a>
    {/each}
</div>

{@render children()}

<style>
    :global(div a){
        color: goldenrod;
    }
</style>