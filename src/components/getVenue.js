const axios = require('axios');

//Get venues from fourSquareApi
export const getVenus = async () => {
    const url = "https://api.foursquare.com/v2/venues/explore?"
    const parameter = {
      client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
      client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
      query: "food",
      near: "Karachi",
      v: "20182507"
    }
    return await axios.get(url + new URLSearchParams(parameter));
  }
