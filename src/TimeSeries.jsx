import React, { useState, useEffect, useMemo } from 'react';
import { getFunctionData } from './api.services';
import { cleanIndexBasedKeys, covertTimeSeriesResponse } from './utils';
import Table from './components/Table';

const TIME_INTEVAL = '5min';

export default function TimeSeries() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState({});

  useEffect(() => {
    (async () => {
      const functionDataResponse = await getFunctionData({
        interval: TIME_INTEVAL,
      });
      console.log(functionDataResponse);
      setApiResponse(functionDataResponse);
      setIsLoading(false);
    })();
  }, []);

  const { info, series, headerColumns } = useMemo(() => {
    const info = cleanIndexBasedKeys(apiResponse['Meta Data']);
    const series = covertTimeSeriesResponse(
      apiResponse[`Time Series (${TIME_INTEVAL})`] || {}
    );
    const headerColumns = Object.keys(series[0] || {}).map((key) => {
      return { key, label: `${key[0].toUpperCase()}${key.slice(1)}` };
    });
    return { info, series, headerColumns };
  }, [apiResponse]);

  if (isLoading) {
    return (
      <div className="bg-light py-5 text-center display-5">Loading...</div>
    );
  }

  return (
    <main>
      <TimeSeriesHeader info={info} />
      <section className="container py-3 table-responsive">
        <Table columns={headerColumns} data={series} />
      </section>
    </main>
  );
}

function TimeSeriesHeader({ info = {} }) {
  return (
    <section className="bg-light py-5 shadow-sm mb-4">
      <div className="container">
        <h3 className="display-5">{info?.Information}</h3>
        <span>Last Refreshed: {info['Last Refreshed']}</span>
      </div>
    </section>
  );
}
