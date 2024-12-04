// place files you want to import through the `$lib` alias in this folder.
export function ref(initial: any) {
    let value = $state(initial);

    return {
        get value() { return value },
        set value(v) { value = v }
    }
}

export function createSignal(initial) {
    let value = $state(initial);

    return [()=> value, (v)=> {value = v}]
}