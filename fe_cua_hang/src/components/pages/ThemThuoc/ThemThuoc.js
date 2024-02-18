import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import Header from "@components/header/Header";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDebounces, useGlobal } from "@hooks";
import { checkTenThuoc, suaHinhAnhThuoc, taoThuoc } from "@api/Thuoc";
import { getAllNhom } from "@api/Nhom";
import { getAllThuongHieu } from "@api/ThuongHieu";
import { getAllDuocChat } from "@api/DuocChat";
import { taoCTDuocChat } from "@api/CTDuocChat";

function ThemThuoc() {
  const [dsNhom, setDSN] = useState();
  const [dsThuongHieu, setDSTH] = useState();
  const [tenThuoc, setTT] = useState();
  const [thuoc, setThuoc] = useState({
    id: 0,
    tenThuoc: "",
    hinhAnh: "",
    congDung: "",
    hdSuDung: "",
    kinhDoanh: true,
    gia: 0,
    tong: 0,
    daBan: 0,
    idNhom: -1,
    idThuongHieu: -1,
  });
  const [fileHinhAnh, setFHA] = useState();
  const [imgSrc, setIS] = useState();

  useEffect(() => {
    if (fileHinhAnh) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setIS(e.target.result);
      };

      reader.readAsDataURL(fileHinhAnh);
    }
  }, [fileHinhAnh]);

  const debounceTenThuoc = useDebounces(tenThuoc, 500);
  const [errTenThuoc, setETT] = useState();
  const [errChonNhom, setECN] = useState();
  const [errChonThuongHieu, setECTH] = useState();

  const inputTenThuoc = useRef();
  const selectIdNhom = useRef();
  const selectIdThuongHieu = useRef();

  const handleThemThuoc = () => {
    if (!dsNhom || !dsThuongHieu) {
      return;
    }
    let err = false;
    if (!thuoc.tenThuoc) {
      setETT("Tên thuốc không được bỏ trống");
      inputTenThuoc.current.focus();
      err = true;
    } else {
      setETT(null);
    }
    if (thuoc.idNhom === -1) {
      setECN("Vui lòng chọn nhóm");
      selectIdNhom.current.focus();
      err = true;
    } else {
      setECN(null);
    }
    if (thuoc.idThuongHieu === -1) {
      setECTH("Vui lòng chọn thương hiệu");
      selectIdThuongHieu.current.focus();
      err = true;
    } else {
      setECTH(null);
    }
    if (err) return;

    taoThuoc(
      thuoc,
      (res) => {
        console.log(res);
        const idThuoc = res.data.id;
        setTB({
          title: "Tạo thành công",
          content: `Đã tạo thuốc với ID: ${idThuoc}`,
        });
        handleShowModal();
        suaHinhAnhThuoc(
          fileHinhAnh,
          idThuoc,
          "",
          (res) => {},
          (err) => {
            setTB({
              title: "Lỗi thêm hình ảnh",
              content: `Đã tạo thuốc với ID: ${idThuoc} nhưng không thể thêm hình ảnh`,
            });
            handleShowModal();
          }
        );
        taoCTDuocChat(
          idThuoc,
          tpDuocChat,
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          },
          globalSTT?.user?.token
        );
      },
      (err) => {
        console.log(err);
        setTB({ title: "Lỗi 500", content: "Đã xảy ra lỗi khi cố tạo thuốc" });
        handleShowModal();
      },
      globalSTT?.user?.token
    );
  };
  const [globalSTT, setGLB] = useGlobal();
  const [showModal, setSMD] = useState(false);

  const handleCloseModal = () => setSMD(false);
  const handleShowModal = () => setSMD(true);

  const [thongBao, setTB] = useState({ title: "", content: "" });

  useEffect(() => {
    checkTenThuoc(
      debounceTenThuoc,
      (res) => {
        if (res.data) {
          setETT("Tên thuốc đã tồn tại");
        } else {
          setETT(null);
        }
      },
      (err) => {}
    );
  }, [debounceTenThuoc]);

  useEffect(() => {
    getAllNhom(
      (res) => {
        setDSN(res.data);
      },
      (err) => {}
    );
    getAllThuongHieu(
      (res) => {
        setDSTH(res.data);
      },
      (err) => {}
    );
    getAllDuocChat(
      (res) => {
        setDSDC(res.data);
      },
      (err) => {}
    );
  }, []);

  const [tpDuocChat, setTPDC] = useState();
  const [dsDuocChat, setDSDC] = useState();

  useEffect(() => {
    console.log(tpDuocChat);
  }, [tpDuocChat]);

  return (
    <div className={style.themThuocWrapper}>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{thongBao.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{thongBao.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={style.webHeader}>
        <Header />
      </div>
      <div className={style.themThuoc}>
        <div className={style.header}>
          <h1>Thêm thuốc</h1>
        </div>
        <div className={style.body}>
          <div className={style.inputGroup}>
            <label htmlFor="tenThuoc">Tên thuốc</label>
            <input
              ref={inputTenThuoc}
              type="text"
              id="tenThuoc"
              value={thuoc.tenThuoc}
              onChange={(e) => {
                const _value = e.target.value;
                setThuoc((pre) => ({ ...pre, tenThuoc: _value }));
                setTT(_value);
              }}
            />
            {errTenThuoc && <span className={style.error}>{errTenThuoc}</span>}
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="congDung">Công dụng</label>
            <textarea
              value={thuoc.congDung}
              onChange={(e) => {
                const _value = e.target.value;
                setThuoc((pre) => ({ ...pre, congDung: _value }));
              }}
            ></textarea>
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="hdSuDung">Hướng dẫn sử dụng</label>
            <textarea
              value={thuoc.hdSuDung}
              onChange={(e) => {
                const _value = e.target.value;
                setThuoc((pre) => ({ ...pre, hdSuDung: _value }));
              }}
            ></textarea>
          </div>
          <div className={style.inputGroup}>
            <input
              type="checkbox"
              id="kinhDoanh"
              defaultChecked={thuoc.kinhDoanh}
              onChange={(e) => {
                const _value = e.target.checked;
                setThuoc((pre) => ({ ...pre, kinhDoanh: _value }));
              }}
            />
            <label htmlFor="kinhDoanh">Kinh doanh</label>
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="gia">Giá</label>
            <input
              type="number"
              id="gia"
              value={thuoc.gia}
              onChange={(e) => {
                let _value = e.target.value;
                if (_value < 0) _value = 0;

                setThuoc((pre) => ({ ...pre, gia: _value }));
              }}
            />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="tong">Tổng</label>
            <input
              type="number"
              id="tong"
              value={thuoc.tong}
              onChange={(e) => {
                let _value = e.target.value;
                if (_value < 0) _value = 0;
                setThuoc((pre) => ({ ...pre, tong: _value }));
              }}
            />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="daBan">Đã bán</label>
            <input
              type="number"
              id="daBan"
              value={thuoc.daBan}
              onChange={(e) => {
                let _value = e.target.value;
                if (_value < 0) _value = 0;
                setThuoc((pre) => ({ ...pre, daBan: _value }));
              }}
            />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="idNhom">Nhóm</label>
            {dsNhom ? (
              <>
                <select
                  ref={selectIdNhom}
                  id="idNhom"
                  value={thuoc.idNhom}
                  onChange={(e) => {
                    const _value = e.target.value;
                    setThuoc((pre) => ({ ...pre, idNhom: _value }));
                    if (_value !== -1) {
                      setECN(null);
                    }
                  }}
                >
                  <option value={-1}>Chọn nhóm</option>

                  {dsNhom.map((nhom) => (
                    <option key={nhom.id} value={nhom.id}>
                      {nhom.tenNhom}
                    </option>
                  ))}
                </select>
                {errChonNhom && (
                  <span className={style.error}>{errChonNhom}</span>
                )}
              </>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="idThuongHieu">Thương hiệu</label>
            {dsThuongHieu ? (
              <>
                {" "}
                <select
                  ref={selectIdThuongHieu}
                  id="idThuongHieu"
                  value={thuoc.idThuongHieu}
                  onChange={(e) => {
                    const _value = e.target.value;
                    setThuoc((pre) => ({ ...pre, idThuongHieu: _value }));
                    if (_value !== -1) {
                      setECTH(null);
                    }
                  }}
                >
                  <option value={-1}>Chọn thương hiệu</option>
                  {dsThuongHieu.map((thuongHieu) => (
                    <option key={thuongHieu.id} value={thuongHieu.id}>
                      {thuongHieu.tenThuongHieu}
                    </option>
                  ))}
                </select>
                {errChonThuongHieu && (
                  <span className={style.error}>{errChonThuongHieu}</span>
                )}
              </>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="ctDuocChat">Thành phần dược chất</label>
            {dsDuocChat ? (
              <>
                <select
                  id="ctDuocChat"
                  onChange={(e) => {
                    const _value = e.target.value;
                    const duocChat = dsDuocChat.filter(
                      (dc) => dc.id == _value
                    )[0];
                    if (duocChat) {
                      const _newDSDC = dsDuocChat.filter(
                        (dc) => dc.id != _value
                      );
                      setDSDC(_newDSDC);
                      const _newTPDC = tpDuocChat ? [...tpDuocChat] : [];
                      _newTPDC.push({
                        id: 0,
                        tenDuocChat: duocChat.tenDuocChat,
                        idDuocChat: duocChat.id,
                        hamLuong: 0,
                      });
                      setTPDC(_newTPDC);
                    }
                  }}
                >
                  <option value={-1}>Chọn dược chất</option>
                  {dsDuocChat.map((dc) => (
                    <option key={dc.id} value={dc.id}>
                      {dc.tenDuocChat}
                    </option>
                  ))}
                </select>
                {tpDuocChat && (
                  <div className={style.chiTietDuocChat}>
                    {tpDuocChat.map((tpdc, index) => (
                      <div className={style.line}>
                        <span className={style.tenDuocChat}>
                          {tpdc.tenDuocChat}
                        </span>
                        <div className={style.hamLuong}>
                          <input
                            type="number"
                            value={tpdc.hamLuong}
                            onChange={(e) => {
                              let _value = e.target.value;
                              if (_value < 0) _value = 0;
                              const _newTPDC = [...tpDuocChat];
                              _newTPDC[index]["hamLuong"] = _value;
                              setTPDC(_newTPDC);
                            }}
                          />
                        </div>
                        <div className={style.options}>
                          <button
                            onClick={() => {
                              const _newTPDC = [...tpDuocChat];
                              const _deletedValue = { ...tpDuocChat[index] };
                              _newTPDC.splice(index, 1);
                              setTPDC(_newTPDC);
                              const _newDSDC = [...dsDuocChat];
                              _newDSDC.push({
                                id: _deletedValue.id,
                                tenDuocChat: _deletedValue.tenDuocChat,
                              });
                              setDSDC(_newDSDC);
                            }}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
          <div className={style.inputGroup}>
            <input
              type="file"
              id="fileHinhAnh"
              value={thuoc.fileHinhAnh}
              onChange={(e) => {
                const _value = e.target.files[0];
                setFHA(_value);
              }}
            />
            <div className={style.showHinhAnhThuoc}>
              <img alt="hinhAnhThuoc" src={imgSrc} />
            </div>
          </div>
          <div className={style.inputGroup}>
            <input
              type="button"
              value={"Thêm"}
              onClick={() => {
                handleThemThuoc();
              }}
            />
          </div>
        </div>
        <div className={style.footer}></div>
      </div>
    </div>
  );
}

export default ThemThuoc;
