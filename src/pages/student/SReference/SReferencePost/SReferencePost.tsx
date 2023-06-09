import { useNavigate, useSearchParams } from "react-router-dom";
import SSidebar from "../../../../components/sSidebar/SSidebar";
import SReferencePostCss from "./SReferencePostCss";

import axios from "axios";
import { useEffect, useState } from "react";

interface IReference {
    no: number;
    category: string;
    classNo: number;
    title: string;
    regDt: string;
    contents: string;
    authorName: string;
    authorno: number;
    files: {
        fileName: string;
        fileType: string;
        downloadURL: string;
    }[];
    prevPost?: {
        no: number;
        title: string;
    };
    nextPost?: {
        no: number;
        title: string;
    };
}

const SReferencePost = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const bbsNo = searchParams.get("no");

    const [reference, setReference] = useState<IReference>();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://192.168.0.62:9988/api/bbs/detail/${bbsNo}`,
            );
            console.log(response.data);
            const fetchedReference = response.data;
            fetchedReference.contents = fetchedReference.contents ?? "";
            setReference(fetchedReference);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [bbsNo]);

    const goNotice = () => {
        navigate("/student/reference?page=1");
    };

    const goPrev = () => {
        navigate(`/student/reference/post?no=${reference?.prevPost?.no}`);
    };
    const goNext = () => {
        navigate(`/student/reference/post?no=${reference?.nextPost?.no}`);
    };

    return (
        <>
            <SSidebar />
            <SReferencePostCss>
                <section className="section">
                    <p className="section-title">자료실</p>
                    <div className="notice-board">
                        <div className="title-area">
                            <span>{reference?.category}</span>
                            <div className="title">{reference?.title}</div>
                        </div>
                        <div className="info-area">
                            <p>
                                <strong>작성자</strong>
                                <span>{reference?.authorName} </span>
                            </p>
                            <p>
                                <strong>등록일</strong>
                                <span>
                                    {reference?.regDt.toString().slice(0, 10)}
                                </span>
                            </p>
                        </div>

                        <div className="content-area">
                            {reference?.contents !== undefined && (
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: reference?.contents,
                                    }}
                                ></p>
                            )}
                        </div>

                        <div className="file-area">
                            <span className="file">첨부파일</span>
                            {reference?.files ? (
                                <div className="file-list">
                                    {reference.files.map(file => (
                                        <div key={file.fileName}>
                                            <a
                                                href={`http://192.168.0.62:9988${file.downloadURL}`}
                                                download
                                                title="파일 다운로드"
                                            >
                                                {file.fileName}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <span>없음</span>
                            )}
                        </div>

                        <div className="prevnext-area">
                            <p className="prev">
                                <span>이전</span>
                                {reference?.prevPost ? (
                                    <span
                                        className="prev-title"
                                        onClick={goPrev}
                                    >
                                        {reference?.prevPost?.title}
                                    </span>
                                ) : (
                                    <span className="prev-titleNo">
                                        이전글이 없습니다.
                                    </span>
                                )}
                            </p>
                            <p className="next">
                                <span>다음</span>
                                {reference?.nextPost ? (
                                    <span
                                        className="next-title"
                                        onClick={goNext}
                                    >
                                        {reference?.nextPost?.title}
                                    </span>
                                ) : (
                                    <span className="next-titleNo">
                                        다음글이 없습니다.
                                    </span>
                                )}
                            </p>
                        </div>

                        <div className="button-area">
                            <div>
                                <button className="listBt" onClick={goNotice}>
                                    목록
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </SReferencePostCss>
        </>
    );
};

export default SReferencePost;
