import Axios from "axios";

export default ({ url = "", method = "GET", data = {} }) =>
  new Promise(resolve => {
    try {
      let tokens = JSON.parse(localStorage.getItem("credentials"));
      Axios({
        url,
        method,
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          refresh_token: `${tokens.refresh_token}`
        },
        data
      }).then(({ data }) => {
        if (data.tokens) {
          localStorage.setItem("credentials", JSON.stringify(data.tokens));
          resolve(data.data);
        } else if (!data.status) {
          resolve(data);
        } else {
          resolve(false);
        }
      });
    } catch (err) {
      resolve(false);
    }
  });