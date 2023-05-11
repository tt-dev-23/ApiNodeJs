const { addJsonData } = require("../../supabase.js");

export const handler = async (event) => {
  const body = event.body;
  if (body === "") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "no body",
      }),
    };
  } else {
    try {
      const data = await addJsonData(body);
      console.log("post", data);

      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: error.message,
        }),
      };
    }
  }
};
