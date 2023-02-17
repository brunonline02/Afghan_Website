import axios from "axios";

const client = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${process.env.REACT_APP_SPACE_ID}`,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
  },
});

const getEntries = async (contentType) => {
  const response = await client.get(`/entries?content_type=${contentType}`);
  return response.data.items;
};

// console.log('About', getEntries('about'))
// console.log('News', getEntries('news'))
// console.log('Events', getEntries('event'))
// console.log('Contact', getEntries('contact'))

export default getEntries;
