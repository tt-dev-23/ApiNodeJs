const { getJsonData } = require("../../supabase.js");

export const handler = async (event) => {
  const id = event.queryStringParameters.id;
  if (id.length !== 6) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "incorrect id",
      }),
    };
  } else {
    try {
      const data = await getJsonData(id);

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
