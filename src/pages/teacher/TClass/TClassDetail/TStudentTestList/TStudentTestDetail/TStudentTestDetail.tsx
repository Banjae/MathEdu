import { TStudentTestDetailCss } from "./TStudentTestDetailCss";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import highchartsMore from "highcharts/highcharts-more.js";
import TSidebar from "../../../../../../components/tSidebar/TSidebar";
import TClassTestDetail from "../../../../../../components/tclassDetail/TClassTest/TClassTestDetail/TClassTestDetail";
import axios from "axios";
import { TStudentChartCss } from "./TStudentChartCss";

highchartsMore(Highcharts);
const TStudentTestDetail = () => {
    const chartRef = useRef(null);
    const { pathname } = useLocation();
    const examNo = pathname.split("examNo=")[1].split("&")[0];
    const classNo = pathname.split("classNo=")[1];

    // 통계 state
    const [avg, setAvg] = useState<number>();
    const [arrData, setArrData] = useState();
    const [maxValue, setMaxValue] = useState<number>();
    const [minValue, setMinValue] = useState<number>();
    const [nameTop, setNameTop] = useState();
    const [nameLowest, setNameLowest] = useState();

    // 시험 통계 api
    const classTestSummaryApi = async () => {
        try {
            const res = await axios.get(
                `http://192.168.0.62:9988/api/class/exam/summary/${examNo}`,
            );
            const data = res.data.summary;
            console.log(data)
            setArrData(data.areaData.reverse());
            setAvg(parseInt(data.avgScore));
            setMaxValue(data.maxScore.score);
            setMinValue(data.minScore.score);
            setNameTop(data.maxScore.name);
            setNameLowest(data.minScore.name);
            console.log("통계", res.data.summary);
        } catch (error) {
            console.error("통계를 찾아올 수 없습니다.", error);
        }
    };

    useEffect(() => {
        classTestSummaryApi();
    }, []);

    const options = {
        chart: {
            type: "column",
        },
        title: {
            align: "center",
            text: "성적 통계",
        },
        accessibility: {
            announceNewData: {
                enabled: true,
            },
        },
        xAxis: {
            type: "category",
        },
        yAxis: {
            title: {
                text: "성적",
            },
            max: 100,
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            column: {
                borderRadius: 5,
            },
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: "{point.y:.1f}점",
                },
            },
        },
        series: [
            {
                name: "점수",
                colorByPoint: true,
                data: [
                    {
                        name: "반평균",
                        y: avg,
                        color: "#201E59",
                    },
                    {
                        name: "최고점수",
                        y: maxValue,
                        color: "#4543A0",
                    },
                    {
                        name: "최저점수",
                        y: minValue,
                        color: "#00A49A",
                    },
                ],
            },
        ],
    };
    const optionsArr = {
        chart: {
            type: "spline",
        },
        title: {
            text: "점수 분포도",
        },
        xAxis: {
            categories: [
                "20점 미만",
                "20점 ~ 39점",
                "40점 ~ 59점",
                "60점 ~ 79점",
                "80점 ~ 100점",
            ],
        },
        yAxis: {
            title: {
                text: "학생 수",
            },
            max: 8,
        },
        tooltip: {
            pointFormat: "{point.x.name} {point.y}명 ",
        },
        plotOptions: {
            area: {
                lineWidth: 2,
                softThreshold: true,
                linecap: "round",
                pointStart: 0,
                marker: {
                    enabled: false,
                    symbol: "circle",
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true,
                        },
                    },
                },
            },
        },

        series: [
            {
                name: "학생",
                data: arrData,
                lineColor: "#4543A0",
                lineWidth: 3,
                marker: {
                    symbol: "circle",
                    lineWidth: 3,
                    fillColor: "#fff",
                    lineColor: "#4543A0",
                },
            },
        ],
    };
    return (
        <>
            <TSidebar />
            <TStudentTestDetailCss>
                <div className="testWrap">
                    <TStudentChartCss>
                        <div className="sectionChart">
                            <div className="headerChart">
                                <span>시험성적 통계</span>
                            </div>
                            <div className="chartWrap">
                                <HighchartsReact
                                    ref={chartRef}
                                    highcharts={Highcharts}
                                    oneToOne={true}
                                    options={options}
                                />
                                <HighchartsReact
                                    ref={chartRef}
                                    highcharts={Highcharts}
                                    oneToOne={true}
                                    options={optionsArr}
                                />
                                <ul>
                                    <li>
                                        <span>반 평균</span>
                                        <span className="score">{avg}점</span>
                                    </li>
                                    <li>
                                        <span>최고</span>
                                        <span className="score">
                                            {maxValue}점
                                        </span>
                                    </li>
                                    <li>
                                        <span>최저</span>
                                        <span className="score">
                                            {minValue}점
                                        </span>
                                    </li>
                                    <li className="seat">
                                        <span>석차</span>
                                        <ul>
                                            <li>
                                                <span>1등</span>
                                                <span>{nameTop}</span>
                                            </li>
                                            <li>
                                                <span>최저등수</span>
                                                <span>{nameLowest}</span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </TStudentChartCss>
                    <TClassTestDetail
                        classPaNo={classNo}
                        examPaNo={examNo}
                        classTestSummaryApi={classTestSummaryApi}
                    />
                </div>
            </TStudentTestDetailCss>
        </>
    );
};

export default TStudentTestDetail;
