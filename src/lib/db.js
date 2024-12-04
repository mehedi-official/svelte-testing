import Dexie from "dexie";

export const db = new Dexie('urban-job');

db.version(1).stores({
    job_post: '++id, name, description, url'
})