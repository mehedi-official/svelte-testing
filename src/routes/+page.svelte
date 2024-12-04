<script>
    import _ from 'lodash';
    let data = $state([
        {id: 1, name: "Ariful Islam", status: 'pending'},
        {id: 2, name: "Timothy", status: 'cooking'},
        {id: 3, name: "Anne Marie", status: 'ready'},
        {id: 4, name: "Ariful Afrin", status: 'pending'},
        {id: 5, name: "Ayesha Miss", status: 'cooking'},
        {id: 6, name: "Anne Islam", status: 'cooking'},
        {id: 7, name: "Zubair Alam", status: 'pending'},
        {id: 8, name: "Shifat Ariful", status: 'delivered'},
    ]);

    function filter_by_string(data, property, condition, query) {
        let lowerCaseQuery = query.toLowerCase();
        if(condition === 'eq') {
            return data.filter((item) => item[property].toLowerCase().includes(lowerCaseQuery))
        }
        else if (condition === 'neq') {
            return data.filter((item) => !item[property].toLowerCase().includes(lowerCaseQuery))
        }   
    }

    let filteredData = data.map((value,)=> {
        return value;
    })
    // console.log(filteredData)
    let filters = [
        {property: 'status', condition: 'neq', query: 'ready'},
        {property: 'status', condition: 'eq', query: 'cooking'},
        {property: 'status', condition: 'eq', query: 'pending'},
        {property: 'name', condition: 'neq', query: 'ariful'}
    ]
    let operators = ['AND', 'OR', 'AND'];

    function multiple_filter(data) {
        let filtered_data;
        filters.map((filter, index)=> {
            if(index === 0) {
                filtered_data = filter_by_string(data, filter.property, filter.condition, filter.query);
            }

            if(operators[index - 1] === 'AND') {
                filtered_data = filter_by_string(filtered_data, filter.property, filter.condition, filter.query);
            }
            else if(operators[index - 1] === 'OR') {
                let temp_data = filter_by_string(data, filter.property, filter.condition, filter.query);
                filtered_data = _.union(filtered_data, temp_data);
            }
        })
        console.log('filtered_data', filtered_data);
        console.log('---------------------------');
        console.log('filters', filters);
    }
    multiple_filter(data);

    // console.log(filter_by_string(data, 'status', 'eq', 'delivered'))

    // let result = _.union(first, second);
    // console.log(result)












 let columns = $state([
    {value: 'status', label: 'Status'},
    {value: 'name', label: 'Name'},
    {value: 'date', label: 'Date'}
 ]);


 let captureColumns = $state([
    {id: crypto.randomUUID(), property: ''},
    {id: crypto.randomUUID(), property: ''}
 ]);


 let showOtherInputs = $derived.by(()=> {
    let result = captureColumns.map((column) => {
        if(column.property === 'status') {
            return {id: column.id, property: column.property, condition: ['eq', 'neq'], query: ['pending', 'cooking', 'delivered']}
        }
        else if(column.property === 'name') {
            return {id: column.id, property: column.property, condition: ['eq', 'neq'], query: ''}
        }
        else return '';
    })

    return result;
 });

 let captureOtherInputs = $derived.by(() => {
    showOtherInputs.map()
 })
 $inspect(showOtherInputs);

 let arr = $state();

//  $inspect(arr)
</script>

<form action="" bind:this={arr}>
   {#each captureColumns as captureColumn}
    
    <div id={captureColumn.id}>
        <select bind:value={captureColumn.property} class="column" >
            {#each columns as column}
                <option value={column.value}>{column.label}</option>
            {/each}
        </select>
        {#each showOtherInputs as inputs}
            {#if captureColumn.id === inputs.id}
                <select name="" class="condition" bind:value={arr} >
                    {#each inputs.condition as condition}
                      <option value={condition}>{condition}</option>
                    {/each}
                </select>
                {#if typeof inputs.query === 'object'}
                    <select name="" class="query">
                        {#each inputs.query as query}
                        <option value={query}>{query}</option>
                        {/each}
                    </select>
                {:else if typeof inputs.query === 'string'}
                    <input type="text" class="query">
                {/if}
                
            {/if}
        {/each}
    </div>
    <br>
    
   {/each}
</form>

<button onclick={()=> {
    console.log(arr);
    let result = document.getElementById(captureColumns[0].id);
    let column = result.getElementsByClassName('column');
    let condition = result.getElementsByClassName('condition');
    let query = result.getElementsByClassName('query');

    let columnValue = column[0].__value;
    let conditionValue = condition[0].__value;
    let queryValue = query[0].__value;

    console.log(result, columnValue, conditionValue, queryValue)
}}>see</button>
