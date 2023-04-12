require("dotenv").config();
const supabase = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabaseApp = supabase.createClient(supabaseUrl, supabaseKey);

const { getId } = require("./geheratorId");

async function addJsonData(data) {
  try {
    try {
      console.log("data", data);
      if (typeof data === "object") {
        let id = getId();
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

// let id = "asdcde1-";
// let data = {
//   name: "Denis",
//   age: 32,
// };

module.exports.addJsonData = addJsonData;
module.exports.getJsonData = getJsonData;

// addJsonData(id, data);

// getJsonData(id).then((res) => console.log(res));
// let idUrl = getId();
// console.log(idUrl);
