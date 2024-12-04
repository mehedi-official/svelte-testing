<script>
    import {db} from '$lib/db.js';

    async function addToDB() {
        try {
            const id = await db.job_post.add({
        name: 'Mehedi',
        description: 'adsf',
        url: 'https://google.com'
    });
    console.log(id)
        } catch (error) {
            console.log(error)
        }
    }

    addToDB();
    let data = $state([
        {
            id: 1,
            name: 'ui/ux designer',
            created: new Date(1721548253438 - 0),
            job_position: 'junior',
            location_type: 'on-site',
            category: 'ui/ux design'
        },
        {
            id: 2,
            name: 'UI/UX Designer',
            created: new Date(1721548253438 - (86400000 * 1)),
            job_position: 'intern',
            location_type: 'remote',
            category: 'ui/ux design'
        },
        {
            id: 3,
            name: 'web developer',
            created: new Date(1721548253438 - (86400000 * 1)),
            job_position: 'junior',
            location_type: 'remote',
            category: 'web developer'
        },
        {
            id: 4,
            name: 'ui/ux designer',
            created: new Date(1721548253438 - (86400000 * 3)),
            job_position: 'senior',
            location_type: 'remote',
            category: 'ui/ux design'
        },
        {
            id: 5,
            name: 'web developer',
            created: new Date(1721548253438 - (86400000 * 3)),
            job_position: 'senior',
            location_type: 'hybrid',
            category: 'web developer'
        },
        {
            id: 6,
            name: 'web developer',
            created: new Date(1721548253438 - (86400000 * 3)),
            job_position: 'intern',
            location_type: 'hybrid',
            category: 'web developer'
        },
        {
            id: 7,
            name: 'ui/ux designer',
            created: new Date(1721548253438 - (86400000 * 6)),
            job_position: 'junior',
            location_type: 'on-site',
            category: 'ui/ux design'
        },
        {
            id: 8,
            name: 'web developer',
            created: new Date(1721548253438 - (86400000 * 5)),
            job_position: 'junior',
            location_type: 'on-site',
            category: 'web developer'
        },
        {
            id: 9,
            name: 'web developer',
            created: new Date(1721548253438 - (86400000 * 12)),
            job_position: 'intern',
            location_type: 'on-site',
            category: 'web developer'
        }
    ]);
    let filteredData = $state([]);
    let isFiltered = $state(false);

    function filterByArray(data, array, data_property) {
        if(array === '') { return data }
        else if(array?.length === 0 ) { return data }
        let result = array.map((filterBy) => {
            return data.filter((record) => record[data_property] === filterBy)
        })

        return result.flat();
    }

    function filterByTime(data, time_in_day, data_property) {
        if(Number(time_in_day) === 0) { return data }

        let ms = Number(time_in_day) * 86400000;

        data = data.filter((record) => {
            let filtred_time = new Date().getTime() - ms;
            let record_created_time = record[data_property].getTime();

            return record_created_time > filtred_time;
        })
        return data;
    }


    let captureFilters = $state(
        {time: '', postition: '', location_type: '', category: ''}
    );

    function applyFilter() {
        isFiltered = true;
        filteredData = filterByTime(data, captureFilters.time, 'created');
        console.log('--------Filter by time---------');
        console.log(filteredData);
        filteredData = filterByArray(filteredData, captureFilters.postition, 'job_position');
        console.log('--------Job Position---------');
        console.log(filteredData);
        filteredData = filterByArray(filteredData, captureFilters.location_type, 'location_type');

        filteredData = filterByArray(filteredData, captureFilters.category, 'category');

        console.log(filteredData);
    }

    $inspect(captureFilters);

    
</script>



<main>
    <aside>
        <h3>Filter</h3>
        <div>
            <label for="">Job Posted <br>
                <select bind:value={captureFilters.time} name="" id="">
                    <option selected value="0">Anytime</option>
                    <option value="1">1d ago</option>
                    <option value="3">3d ago</option>
                    <option value="7">7d ago</option>
                    <option value="15">15d ago</option>
                </select>
            </label>
        </div>
    
        <div>
            <h4>Job Position</h4>
            <label for="junior"><input bind:group={captureFilters.postition} value="junior" type="checkbox" name="junior" id="">Junior</label><br>
            <label for="intern"><input bind:group={captureFilters.postition} value="intern" type="checkbox" name="intern" id="">Intern</label><br>
            <label for="senior"><input bind:group={captureFilters.postition} value="senior" type="checkbox" name="senior" id="">Senior</label>
        </div>
    
        <div>
            <h4>Location Type</h4>
            <label for="on-site"><input bind:group={captureFilters.location_type} value="on-site" type="checkbox" name="on-site" id="">On-site</label><br>
            <label for="remote"><input bind:group={captureFilters.location_type} value="remote" type="checkbox" name="remote" id="">Remote</label><br>
            <label for="hybrid"><input bind:group={captureFilters.location_type} value="hybrid" type="checkbox" name="hybrid" id="">Hybrid</label>
        </div>
    
        <div>
            <h4>Categories</h4>
            <label for="ui/ux design"><input bind:group={captureFilters.category} value="ui/ux design" type="checkbox" name="ui/ux design" id="">Ui/ux design</label><br>
            <label for="web developer"><input bind:group={captureFilters.category} value="web developer" type="checkbox" name="web developer" id="">Web developer</label>
        </div>
    
        <div>
            <br>
            <button onclick={applyFilter}>Apply Filter</button>
        </div>
    </aside>

    <section>

        
        {#if isFiltered && filteredData.length === 0}
            <p>No data found</p>
        {:else if filteredData.length > 0}
            {#each filteredData as {id, name, created, job_position, location_type, category}}
            <h2>{id} - {name}</h2>
            <p>Posted at: <strong>{created.toDateString() + ' ' + created.toLocaleTimeString()}</strong></p>
            <p>Position: <strong>{job_position}</strong></p>
            <p>Location: <strong>{location_type}</strong></p>
            <p>Category: <strong>{category}</strong></p>
            {/each}
        {:else}
            {#each data as {id, name, created, job_position, location_type, category}}
            <h2>{id} - {name}</h2>
            <p>Posted at: <strong>{created.toDateString() + ' ' + created.toLocaleTimeString()}</strong></p>
            <p>Position: <strong>{job_position}</strong></p>
            <p>Location: <strong>{location_type}</strong></p>
            <p>Category: <strong>{category}</strong></p>
            {/each}
        {/if}
    </section>
</main>

<style>
    main {
        display: flex;
    }
    aside {
        min-width: 400px;
    }
    section p {
        color: #666;
    }
    section p strong {
        color: #323232;
    }
</style>



