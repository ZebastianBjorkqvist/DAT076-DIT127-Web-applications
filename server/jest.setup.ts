import { closeDB, initDB } from "./src/db/conn"

beforeEach(async () => {
    await initDB(true);
});

afterEach(async () => {
    //await closeDB();
});