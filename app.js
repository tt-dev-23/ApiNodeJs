// GET-запрос
const getJsonDataApp = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/get/${userId}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

// POST-запрос
const addJsonDataApp = async (dataJson) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/generate",
      dataJson
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const getQuery = document.querySelector(".get");
  const postQuery = document.querySelector(".post");
  const jsonData = document.querySelector(".json_data");

  const idData = document.querySelector("#id");

  const idText = document.querySelector(".IdText");
  const jsText = document.querySelector(".jsText");

  const postError = document.querySelector(".postError");
  const getError = document.querySelector(".getError");

  const labelGet = document.querySelector(".labelGet");
  const labelPost = document.querySelector(".labelPost");

  const jsonDataStr = jsonData.value;
  const jsonObj = JSON.parse(jsonDataStr);

  getQuery.addEventListener("click", () => {
    getJsonDataApp(idData.value).then((res) => {
      if (res.status == 200) {
        labelGet.innerHTML = "json:";
        jsText.innerHTML = JSON.stringify(res.data);
        getError.innerHTML = "";
      } else {
        labelGet.innerHTML = "error:";
        jsText.innerHTML = "";
        getError.innerHTML = res.data.message;
      }
    });
  });
  postQuery.addEventListener("click", () => {
    addJsonDataApp(jsonObj).then((res) => {
      console.log(res.status);

      if (res.status == 201) {
        labelPost.innerHTML = "id:";
        idText.innerHTML = res.id;
        postError.innerHTML = "";
      } else {
        labelPost.innerHTML = "error:";
        idText.innerHTML = "";
        postError.innerHTML = res.message;
      }
    });
  });
});
