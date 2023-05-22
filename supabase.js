require("dotenv").config();
const supabase = require("@supabase/supabase-js");
const { getId } = require("./generatorId");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabaseApp = supabase.createClient(supabaseUrl, supabaseKey);

async function addJsonData(data) {
  try {
    if (typeof data === "object") {
      if (JSON.stringify(data) === "{}") {
        throw SyntaxError("not json");
      }

      const id = getId();
      const { status, error } = await supabaseApp
        .from("jsons_tb")
        .insert([{ id, data }]);

      if (error) {
        throw Error("no data added");
      }
      return { status, id };
    } else {
      throw SyntaxError("received no json data");
    }
  } catch (e) {
    throw e;
  }
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
      throw Error("not object");
    }
    return data.data;
  } catch (e) {
    throw e;
  }
}
module.exports.addJsonData = addJsonData;
module.exports.getJsonData = getJsonData;
