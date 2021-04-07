import { IStatisticsData } from '../types';

const QuotationStatistics: React.FC<IStatisticsData> = ({ standartDeviation, mean, mode, median, time }) => {
    return (
        <div>
            <h2>Cтатистика</h2>
            <p>
                <b>Среднее:</b> {mean}
            </p>
            <p>
                <b>Стандартное отклонение:</b> {standartDeviation}
            </p>
            <p>
                <b>Мода:</b> {mode}
            </p>
            <p>
                <b>Медиана:</b> {median}
            </p>
            <p>
                <b>Время расчетов:</b> {time} мс.
            </p>
        </div>
    );
};

export default QuotationStatistics;
