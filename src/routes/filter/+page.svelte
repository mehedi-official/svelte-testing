<script lang="ts">
    type record = {
        id: number,
        name: string,
        created: Date,
        job_position: 'junior' | 'senior' | 'intern',
        location_type: 'on-site' | 'remote' | 'hybrid'
    }
    let data = $state<record[]>([
        {
            id: 1,
            name: 'ui/ux designer',
            created: new Date('2024-7-13 15:03:37.433Z'),
            job_position: 'junior',
            location_type: 'on-site'
        },
        {
            id: 2,
            name: 'ui/ux designer',
            created: new Date('2024-7-13 15:03:37.433Z'),
            job_position: 'junior',
            location_type: 'remote'
        },
        {
            id: 3,
            name: 'ui/ux designer',
            created: new Date('2024-7-13 15:03:37.433Z'),
            job_position: 'intern',
            location_type: 'on-site'
        },
        {
            id: 4,
            name: 'software developer',
            created: new Date(),
            job_position: 'senior',
            location_type: 'hybrid'
        }
    ]);

    let captureFilter = {
        job_position: ['senior'],
        location_type: ['']
    }

    function filterByArray(data: record[], array: string[], object_property: string) {
        if(!array || array[0].length === 0 || data.length === 0 ) { return data }
        let result = array.map((filterBy) => {
            return data.filter((record) => record[object_property] === filterBy)
        })

        return result.flat();
    }

    function handleFilter() {

        let filteredData = filterByArray(data, captureFilter.job_position, 'job_position');

        filteredData = filterByArray(filteredData, captureFilter.location_type, 'location_type');
        console.log(filteredData);
    }
    
</script>

<h1>Filters</h1>

<button onclick={handleFilter}>Apply filter</button>