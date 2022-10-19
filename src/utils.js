export function covertTimeSeriesResponse(timeSeries = {}) {
  return Object.keys(timeSeries).reduce((prev, dateTime) => {
    const seriesData = timeSeries[dateTime];
    const series = cleanIndexBasedKeys(seriesData);
    prev = [...prev, { dateTime, ...series }];
    return prev;
  }, []);
}

export function cleanIndexBasedKeys(dataObject = {}) {
  return Object.keys(dataObject).reduce((data, key) => {
    const value = key.split('. ').pop();
    data[value] = dataObject[key];
    return data;
  }, {});
}
