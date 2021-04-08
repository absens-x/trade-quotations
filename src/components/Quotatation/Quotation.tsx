import React, { useEffect, useMemo, useRef, useState } from 'react';

import { getMean, getStandartDeviation, getMode, getMedian } from '../../logic/calc';
import { IQuotationData, IStatisticsData } from './types';
import QuotationStatistics from './QuotationStatistics/QuotationStatistics';

import './Quotation.css';

function getComputedStatistics(data: IQuotationData[]): IStatisticsData {
    const start: number = Date.now();
    const values: number[] = data.map((item) => item.value);

    const result = {
        mean: +getMean(values).toFixed(4),
        standartDeviation: +getStandartDeviation(values).toFixed(4),
        mode: getMode(values),
        median: getMedian(values),
    };

    const end = Date.now() - start;

    return { ...result, time: end };
}

const Quotation = () => {
    const [startWS, setStartWS] = useState<boolean>(false);
    const [startStatistics, setStartStatistics] = useState<boolean>(false);
    const [quotationsLength, setQuotationsLength] = useState<number>(0);
    const [statistics, setStatistics] = useState<IStatisticsData | null>();

    const quotations = useRef<IQuotationData[]>([]);
    const WS = useRef<WebSocket>();

    const statisticsData = () => {
        let result: IStatisticsData | null = null;
        if (quotationsLength > 0) {
            result = getComputedStatistics(quotations.current);
        }

        return result;
    };

    useEffect(() => {
        if (startStatistics) {
            setQuotationsLength(quotations.current.length);
            setStatistics(statisticsData);
            setStartStatistics(false);
        }
    }, [startStatistics]);

    useEffect(() => {
        if (startWS) {
            WS.current = new WebSocket('ws://localhost:8099');

            WS.current.addEventListener('open', () => {
                console.log('Success');
            });

            WS.current.addEventListener('message', (e) => {
                if (typeof e.data === 'string') {
                    quotations.current = [...quotations.current, JSON.parse(e.data)];
                }
            });

            setStartWS(false);
        } else {
            quotations.current = [];
            setQuotationsLength(0);
            setStartStatistics(false);
            setStatistics(null);
        }
    }, [startWS]);

    return (
        <div>
            <h1>Trade Quotations</h1>
            <button className="quotation-btn" onClick={() => setStartWS(true)}>
                Start
            </button>
            <button className="quotation-btn" onClick={() => setStartStatistics(true)}>
                Get statistics
            </button>
            {quotationsLength > 0 ? <p>Data is loaded, click again</p> : null}
            {statistics ? <QuotationStatistics {...statistics} /> : null}
        </div>
    );
};

export default Quotation;
