require("dotenv").config();
const supabase = require("@supabase/supabase-js");
const { getId } = require("./generatorId");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabaseApp = supabase.createClient(supabaseUrl, supabaseKey);

async function addJsonData(data) {
  try {
    if (typeof data === "object") {
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
    if (e.name == "SyntaxError") {
      return { status: 401, error_message: e.message };
    } else {
      return { status: 400, error_message: e.message };
    }
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
      throw Error("object with this id was not found");
    }
    return { status: 200, data: data.data };
  } catch (e) {
    return { status: 404, error_message: e.message };
  }
}
module.exports.addJsonData = addJsonData;
module.exports.getJsonData = getJsonData;
