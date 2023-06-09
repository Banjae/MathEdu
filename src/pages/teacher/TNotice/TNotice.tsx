import NoticeForm from "../../../components/noticeForm/NoticeForm";
import TSidebar from "../../../components/tSidebar/TSidebar";
import TNoticeCss from "./TNoticeCss";

import Pagination from "@mui/material/Pagination";

import { useNavigate, useSearchParams } from "react-router-dom";
import { PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducer/store";
import Loading from "../../../components/loading/Loading";

export interface INotice {
    status: boolean;
    totalPage: number;
    currentPage: number;
    totalCount: number;
    keyword: string;
    list: {
        no: number;
        category: string;
        title: string;
        regDt: string;
        authorName: string;
        authorNo: number;
    }[];
}

const TNotice = () => {
    const [handler, setHandler] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page");
    const keyword = searchParams.get("keyword");

    const [searchKeyword, setSearchKeyword] = useState<string>("");

    const user = useSelector((state: RootState) => state.user);
    const teacherNo = user.no;

    const [classNo, setClassNo] = useState(0);
    const [order, setOrder] = useState("desc");

    const [notiList, setNotiList] = useState<INotice>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const params = new URLSearchParams({
            page: notiList?.currentPage.toString() ?? "",
            keyword: searchKeyword,
        });
        setSearchParams(params);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://192.168.0.62:9988/api/notice/${classNo}/${teacherNo}/${order}`,
                {
                    params: {
                        keyword: searchKeyword,
                        page: page,
                    },
                },
            );
            setNotiList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, keyword, handler, classNo]);

    const deleteNotice = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                const response = await axios.delete(
                    `http://192.168.0.62:9988/api/notice/${noticeNos}/${teacherNo}`,
                );
                alert(response.data.message);
                setHandler(!handler);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const [checkedList, setCheckedList] = useState<number[]>([]);
    const noticeNos = checkedList.join(",");

    const goWrite = () => {
        navigate("/teacher/notice/write");
    };

    return (
        <>
            <TSidebar />
            <TNoticeCss>
                {notiList ? (
                    <section className="section">
                        <NoticeForm
                            sectionTitle={"공지사항"}
                            notice={notiList}
                            checkedList={checkedList}
                            setCheckedList={setCheckedList}
                            setSearchKeyword={setSearchKeyword}
                            handleSubmit={handleSubmit}
                            setClassNo={setClassNo}
                        />
                        <div className="sectionBt">
                            <button className="deleteBt" onClick={deleteNotice}>
                                삭제
                            </button>
                            <button className="createBt" onClick={goWrite}>
                                작성
                            </button>
                        </div>
                        <Pagination
                            renderItem={item => (
                                <PaginationItem
                                    component={Link}
                                    to={`/teacher/notice?page=${item.page}`}
                                    {...item}
                                />
                            )}
                            count={notiList.totalPage}
                            defaultPage={1}
                            color="primary"
                            className="pagination"
                        />
                    </section>
                ) : (
                    <Loading />
                )}
            </TNoticeCss>
        </>
    );
};

export default TNotice;
