import Axios from "@/src/utils/api/Axios";

const nearSuggestion = async (location, setSssegtion) => {
  console.log(location);
  Axios.post("/univarsal/search/nearby", { location: location })
    .then((res) => {
      setSssegtion(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export default nearSuggestion;
