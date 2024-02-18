import { Spinner } from "react-bootstrap";
import styles from "./styles.module.scss";
import ChatField from "@components/ChatField/ChatField";
import { memo, useRef } from "react";

function ChatForm({ sendHandler, closeHandler, chatLines, isLoading }) {
  const inputMessage = useRef();
  const sendButton = useRef();

  return (
    <div className={styles.chatFormWrapper}>
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.avatar}>
            <img
              alt="logo"
              src="https://longchau.backend.oncx.vn/api/files/images/271487561_884455895569845_3199847286623989399_n.png"
            />
          </div>
          <div className={styles.name}>Nhà thuốc long châu</div>
        </div>
        <div className={styles.closeButton}>
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="#ffffff"
            onClick={() => {
              closeHandler && closeHandler();
            }}
          >
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </div>
      </div>
      <div className={styles.body}>
        {isLoading === true ? (
          <div className={styles.loading}>
            <Spinner animation="border" variant="secondary" />
          </div>
        ) : (
          <div className={styles.content}>
            {chatLines ? (
              chatLines.map((item, index) => (
                <ChatField
                  key={index}
                  isUser={item.isUser}
                  content={item.content}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.chatInput}>
          <input
            placeholder="Nhập tin nhắn . . ."
            ref={inputMessage}
            onChange={(e) => {
              if (e.target.value) {
                sendButton.current.classList.add(`${styles.active}`);
              } else {
                sendButton.current.classList.remove(`${styles.active}`);
              }
            }}
          />
        </div>
        <div className={styles.sendButton} ref={sendButton}>
          <svg
            viewBox="0 0 24.00 24.00"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              if (sendHandler) {
                const message = inputMessage.current.value;
                if (message) {
                  sendHandler({ message });
                  inputMessage.current.value = "";
                  sendButton.current.classList.remove(`${styles.active}`);
                }
              }
            }}
          >
            <g id="SVGRepo_iconCarrier">
              <path
                opacity="0.15"
                d="M20 4L3 11L10 14L13 21L20 4Z"
                fill="#ffffff"
              ></path>
              <path
                d="M20 4L3 11L10 14L13 21L20 4Z"
                strokeWidth="2"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default memo(ChatForm);
