const getCookie: any = (name: string) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};
export function lookup(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint?: "/posts/" | string,
  callback?: Function | any,
  data?: any
) {
  let jsonData: any = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open(method, `http://localhost:8000${endpoint}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  const coockie = getCookie("csrftoken");
  if (coockie) {
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
    xhr.setRequestHeader("X-Requested-with", "XMLHttpRequest");
    xhr.setRequestHeader("X-CSRFToken", coockie);
  }
  xhr.onload = function () {
    callback(xhr.response, xhr.status);
  };
  xhr.onerror = function (e) {
    console.log(e);
    callback({ message: "The request was an error" }, 400);
  };
  xhr.send(jsonData);
}
function loadTweets(callback: any) {
  lookup("GET", "/posts/", callback);
}
export default loadTweets;
