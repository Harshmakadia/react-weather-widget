import axios from "axios";

class APIHelper {
  get(endpoint: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(String(endpoint))
        .then((data) => resolve(data.data))
        .catch((e) => reject(e));
    });
  }
}
export default new APIHelper();
