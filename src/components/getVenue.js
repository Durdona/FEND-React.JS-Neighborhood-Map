const axios = require('axios');

//Get venues from fourSquareApi
export const getVenus = async () => {
  const url = "https://api.foursquare.com/v2/venues/explore?";
  const client_id = "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR"
  const client_secret = "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0"
  const query = "food"
  const near = "Karachi"
  const v = "20182507"
  return await axios.get(`${url}client_id=${client_id}&client_secret=${client_secret}&query=${query}&near=${near}&v=${v}`);
}
