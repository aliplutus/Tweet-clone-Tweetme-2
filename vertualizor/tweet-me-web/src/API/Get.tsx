export function lookup(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint?: "/posts/" | string,
  callback?: Function | any,
  data?: any
) {
  let jsonData: string | undefined = data && JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open(method, `http://localhost:8000${endpoint}`);
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
