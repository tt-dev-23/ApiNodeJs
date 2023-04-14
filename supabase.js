require("dotenv").config();
const supabase = require("@supabase/supabase-js");
const { getId } = require("./generatorId");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabaseApp = supabase.createClient(supabaseUrl, supabaseKey);

async function addJsonData(data) {
  try {
    try {
      if (typeof data === "object") {
        const id = getId();
        const { status, statusText, error } = await supabaseApp
          .from("jsons_tb")
          .insert([{ id, data }]);

        if (error) {
          throw error;
        }
        return { statusText, status };
      } else {
        throw new NotJsonException();
      }
    } catch (e) {
      return { statusText };
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
      .eq("id", id)
      .limit(1)
      .single();
    if (error) {
      throw error;
    }
    return data.data;
  } catch (error) {
    console.log(error.message);
    return { error: "not object" };
  }
}
module.exports.addJsonData = addJsonData;
module.exports.getJsonData = getJsonData;
