import { Link, useParams } from "react-router-dom";
import style from "./style.module.scss";
import Header from "@components/header/Header";
import { useEffect, useState } from "react";
import { getThuocById } from "@api/Thuoc";
import { BASE_URL } from "@api/Base";
import { Spinner } from "react-bootstrap";
import { getCTDuocChatByIdThuoc } from "@api/CTDuocChat";
import { getAllDuocChat } from "@api/DuocChat";
import { useGlobal } from "@hooks";
import { formatTienVietNam } from "@utils/Money";
import { getThuocLienQuanByIdThuoc } from "@api/ThuocLienQuan";

function ThuocPage() {
  const { id } = useParams();
  const [thuoc, setThuoc] = useState();
  const [globalSTT, setGLB] = useGlobal();

  useEffect(() => {
    getThuocById(
      id,
      (res) => {
        const _newThuoc = {
          ...res.data,
          hinhAnh: `${BASE_URL}/images/${res.data.hinhAnh}`,
        };
        setThuoc(_newThuoc);
      },
      (err) => {}
    );
    getAllDuocChat(
      (res) => {
        console.log("Danh sach duoc chat");
        console.log(res);
        setDSDC(res.data);
      },
      (err) => {}
    );
    getCTDuocChatByIdThuoc(
      id,
      (res) => {
        console.log("Thanh phan duoc chat");
        console.log(res);
        setTPDC(res.data);
      },
      (err) => {}
    );
  }, []);

  const [tpDuocChat, setTPDC] = useState();
  const [dsDuocChat, setDSDC] = useState();
  const [isInit, setIIN] = useState(true);

  useEffect(() => {
    if (dsDuocChat && tpDuocChat && isInit) {
      const _newTPDC = tpDuocChat.map((tpdc) => {
        const _idDuocChat = tpdc.idDuocChat;
        const _duocChatForId = dsDuocChat.filter(
          (dc) => dc.id == _idDuocChat
        )[0];
        return {
          ...tpdc,
          tenDuocChat: _duocChatForId.tenDuocChat,
        };
      });
      setTPDC(_newTPDC);
      setIIN(false);
    }
  }, [dsDuocChat, tpDuocChat]);

  const [dsThuocLienQuan, setDSTLQ] = useState([]);

  return (
    <div className={style.pageWrapper}>
      <div className={style.header}>
        <Header />
      </div>
      {thuoc ? (
        <div className={style.page}>
          <div className={style.header}></div>
          <div className={style.body}>
            <div className={style.image}>
              <img alt="hinh anh thuoc" src={thuoc.hinhAnh} />
            </div>
            <div className={style.info}>
              <span className={style.tenThuoc}>{thuoc.tenThuoc}</span>
              <span className={style.kinhDoanh}>
                Trạng thái:
                {thuoc.kinhDoanh === true
                  ? " Đang kinh doanh"
                  : " Không kinh doanh"}
              </span>
              <span className={style.daBan}>{`Đã bán: ${thuoc.daBan}`}</span>
              <span className={style.tong}>{`Đã bán: ${thuoc.tong}`}</span>
              <span className={style.gia}>{`Giá: ${formatTienVietNam(
                thuoc.gia
              )}`}</span>
              <div className={style.area}>
                <span className={style.title}>Thành phần dược chất</span>
                <div className={style.items}>
                  <ul className={style.duocChats}>
                    {tpDuocChat ? (
                      tpDuocChat.map((item, index) => (
                        <li key={index} className={style.duocChat}>
                          <span>{`${item.tenDuocChat} - ${item.hamLuong}`}</span>
                        </li>
                      ))
                    ) : (
                      <div>
                        <Spinner />
                      </div>
                    )}
                  </ul>
                </div>
              </div>
              <div className={style.area}>
                <span className={style.title}>Công dụng</span>
                <div className={style.items}>{thuoc.congDung}</div>
              </div>
              <div className={style.area}>
                <span className={style.title}>Hướng dẫn sử dụng</span>
                <div className={style.items}>{thuoc.hdSuDung}</div>
              </div>
            </div>
          </div>
          <div className={style.footer}></div>
        </div>
      ) : (
        <div className={style.waiting}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default ThuocPage;
