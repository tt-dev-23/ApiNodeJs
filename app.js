require("dotenv").config();
const supabase = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabaseApp = supabase.createClient(supabaseUrl, supabaseKey);

async function addUser(name) {
  try {
    const { error } = await supabaseApp
      .from("user")
      .insert({ name: `${name}` });

    if (error) throw error;
  } catch (e) {
    console.log(e);
  }
}

async function getCountUser() {
  try {
    const { error, count } = await supabaseApp
      .from("user")
      .select("id", { count: "exact", head: true });
    if (error) throw error;
    return { count };
  } catch (e) {
    console.log(e);
  }
}

async function getTask() {
  try {
    const { data, error } = await supabaseApp.from("user").select();
    if (error) throw error;
    return data;
  } catch (e) {
    console.log(e);
  }
}

// addUser("Petr");

getTask().then((res) => console.log(res));
// getCount().then((res) => console.log(res));
