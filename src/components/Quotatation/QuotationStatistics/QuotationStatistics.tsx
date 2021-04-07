import { IStatisticsData } from '../types';

const QuotationStatistics: React.FC<IStatisticsData> = ({ standartDeviation, mean, mode, median, time }) => {
    return (
        <div>
            <h2>Statistics</h2>
            <p>
                <b>Mean:</b> {mean}
            </p>
            <p>
                <b>Standart deviation:</b> {standartDeviation}
            </p>
            <p>
                <b>Mode:</b> {mode}
            </p>
            <p>
                <b>Median:</b> {median}
            </p>
            <p>
                <b>Estimate speed time:</b> About {time} ms.
            </p>
        </div>
    );
};

export default QuotationStatistics;
