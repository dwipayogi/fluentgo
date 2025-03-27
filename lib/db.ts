import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!);

export default sql;
