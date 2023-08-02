const prod = {
  url: {
    FILE_API_URL: 'http://62.113.102.222:3000/api',
    AUTH_API_URL: 'http://62.113.102.222:5000/api',
  },
};
const dev = {
  url: {
    FILE_API_URL: 'http://localhost:4000/api',
    AUTH_API_URL: 'http://localhost:5000/api',
  },
};
export default process.env.NODE_ENV === 'development' ? dev : prod;
