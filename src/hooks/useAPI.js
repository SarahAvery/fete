// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const baseUrl = `/api/${process.env.REACT_APP_API_TOKEN}/`;

// const requestOptions = ({ mode, name, id }) => {
//   const modes = {
//     search: {
//       method: 'GET',
//       url: `${baseUrl}/search/${name}`,
//     },
//     id: {
//       method: 'GET',
//       url: `${baseUrl}/${id}`,
//     },
//   };

//   return modes[mode];
// };

// const useAPI = (options) => {
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // console.log(options);

//   useEffect(() => {
//     axios(requestOptions(options))
//       .then((result) => {
//         if (result.data.error) {
//           setLoading(false);
//           return setError(result.data.error);
//         }
//         setLoading(false);
//         setResponse(result.data);
//       })
//       .catch((err) => {
//         console.log({ err });
//         setLoading(false);
//         setError(err.message);
//         console.log(err.message);
//       });
//   }, []);

//   return {
//     response,
//     loading,
//     error,
//   };
// };

// export default useAPI;
