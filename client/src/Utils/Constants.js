let appconstants = {};

if (process.env.NODE_ENV === "production") {
  appconstants = {
    base_url: "https://nepaleplaza.herokuapp.com/api"
  };
} else {
  appconstants = {
    base_url: "http://localhost:8000/api"
  };
}

export default appconstants;
