const BASE_ENDPOINT = `https://www.alphavantage.co`;
const API_KEY = `demo`;

export const getFunctionData = async ({
  functionName = `TIME_SERIES_INTRADAY`,
  symbol = `IBM`,
  interval = `5min`,
}) => {
  try {
    const apiCall = await fetch(
      `${BASE_ENDPOINT}/query?function=${functionName}&symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`
    );
    const apiResponse = await apiCall.json();
    return apiResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
