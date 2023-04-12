require("dotenv").config();
const supabase = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabaseApp = supabase.createClient(supabaseUrl, supabaseKey);

const { getId } = require("./geheratorId");

// async function addUser(name) {
//   try {
//     const { error } = await supabaseApp
//       .from("user")
//       .insert({ name: `${name}` });

//     if (error) throw error;
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function getCountUser() {
//   try {
//     const { error, count } = await supabaseApp
//       .from("user")
//       .select("id", { count: "exact", head: true });
//     if (error) throw error;
//     return { count };
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function getTask() {
//   try {
//     const { data, error } = await supabaseApp.from("user").select();
//     if (error) throw error;
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// }

// addUser("Petr");

// getTask().then((res) => console.log(res));
// getCount().then((res) => console.log(res));

async function addJsonData(id, data) {
  try {
    try {
      if (typeof data === "object") {
        const { error } = await supabaseApp
          .from("jsons_tb")
          .insert([{ id: id, data: data }]);

        if (error) throw error;
      } else throw new NotJsonException();
    } catch (e) {
      console.log(e);
    }
  } catch (NotJsonException) {
    console.log(NotJsonException.message);
  }
}

function NotJsonException() {
  this.message = "data is not object";
}

async function getJsonData(id) {
  try {
    const { data, error } = await supabaseApp
      .from("jsons_tb")
      .select("data")
      .eq("id", id);
    if (error) throw error;
    return data;
  } catch (e) {
    console.log(e);
  }
}

let id = "asdcde1-";
let data = {
  name: "Denis",
  age: 32,
};

// addJsonData(id, data);

getJsonData(id).then((res) => console.log(res));
let idUrl = getId();
console.log(idUrl);
