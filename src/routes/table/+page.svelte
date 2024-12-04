<script>

    let columnList = [
        {id: 1, label: 'Status', value: 'status'},
        {id: 2, label: 'Name', value: 'name'},
        {id: 3, label: 'Payment', value: 'payment'}
    ]

    let columnValue = $state(null);
    let conditionValue = $state(null);
    let queryValue = $state(null)

    let queryList = $derived.by(() => {
        if(columnValue === 'status') {
            return ['pending', 'cooking', 'delivered']
        }
        else if(columnValue === 'name') {
            return '';
        }
        else if(columnValue === 'payment') {
            return ['pending', 'processing', 'success']
        }
    })


    let captureFilters = $state([
        {columnValue: null, conditionValue: null, queryValue: null},
        {columnValue: null, conditionValue: null, queryValue: null},
        {columnValue: null, conditionValue: null, queryValue: null}
    ])

    function addFilter() {
        
    }

</script>

<!-- {#snippet showQuery(queryList, queryValue)}
    {#if typeof queryList === 'object'}
        <select bind:value={queryValue} name="query">
            {#each queryList as query}
                <option value={query}>{query}</option>
            {/each}
        </select>
    {:else}
        <input type="text" name="query" bind:value={queryValue}>
    {/if}
{/snippet} -->

<!-- <div>
    <select bind:value={columnValue} name="column">
        {#each columnList as column}
            <option value={column.value}>{column.label}</option>
        {/each}
    </select>
    
    <select bind:value={conditionValue} name="condition">
        <option value="eq">Equals to</option>
        <option value="neq">Not Equals to</option>
    </select>
    
    {@render showQuery(queryList)}
</div>

<div>
    <select bind:value={columnValue} name="column">
        {#each columnList as column}
            <option value={column.value}>{column.label}</option>
        {/each}
    </select>
    
    <select bind:value={conditionValue} name="condition">
        <option value="eq">Equals to</option>
        <option value="neq">Not Equals to</option>
    </select>
    
    {@render showQuery(queryList)}
</div> -->

{#each captureFilters as captureFilter}
<div>
    <select bind:value={captureFilter.columnValue} name="column">
        {#each columnList as column}
            <option value={column.value}>{column.label}</option>
        {/each}
    </select>
    
    <select bind:value={captureFilter.conditionValue} name="condition">
        <option value="eq">Equals to</option>
        <option value="neq">Not Equals to</option>
    </select>
    {#if captureFilter.columnValue === 'status'}
        {@const queryList = ['pending', 'cooking', 'delivered']}
        <select bind:value={captureFilter.queryValue} name="query">
            {#each queryList as query}
                <option value={query}>{query}</option>
            {/each}
        </select>
    {:else if captureFilter.columnValue === 'payment'}
        {@const queryList = ['pending', 'processing', 'success']}
        <select bind:value={captureFilter.queryValue} name="query">
            {#each queryList as query}
                <option value={query}>{query}</option>
            {/each}
        </select>
    {:else}
        <input type="text" name="query" bind:value={captureFilter.queryValue}>
    {/if}
</div>
{/each}

{#each captureFilters as {columnValue, conditionValue, queryValue}}
    <div>
        {columnValue} - {conditionValue} - {queryValue}
    </div>
{/each}
<div>

</div>

<button onclick={addFilter}>Add Filter</button>