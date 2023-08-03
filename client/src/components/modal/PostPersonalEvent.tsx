import { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import { useRecoilValue } from "recoil";
import { LogInState } from "../../recoil/atoms/LogInState";
import { useMutation } from "@tanstack/react-query";
import { postCustomSchedule } from "../../apis/CalendarApi";
import { Schedule } from "../../types/CalendarInterfaces";

interface AddEventProps {
  isOpen: boolean;
  closeModal: () => void;
  onNewEvent?: () => void;
}

const customModalStyles = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    maxWidth: "400px",
    padding: "24px",
  },
  overlay: {
    zIndex: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const PostPersonalEvent = ({
  isOpen,
  closeModal,
  onNewEvent,
}: AddEventProps) => {
  const isLoggedIn = useRecoilValue(LogInState);
  const [eventInfo, setEventInfo] = useState<Schedule>({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    description: "",
    color: "#557AB4",
    dayOfWeek: [0, 0, 0, 0, 0, 0, 0],
  });
  const mutation = useMutation(postCustomSchedule);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEventInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTextareaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEventInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!isLoggedIn) alert("로그인이 필요합니다.");
    event.preventDefault();
    try {
      await mutation.mutateAsync(eventInfo);
      closeModal();
      onNewEvent && onNewEvent();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-wrapper">
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Add Event Modal"
        style={customModalStyles}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <input
                type="text"
                name="title"
                value={eventInfo.title}
                onChange={handleInputChange}
                style={{ width: "200px", marginBottom: "8px" }}
                placeholder="일정제목"
                required
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="date"
                name="startDate"
                value={eventInfo.startDate}
                onChange={handleInputChange}
                style={{ width: "200px", marginBottom: "8px" }}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="date"
                name="endDate"
                value={eventInfo.endDate}
                onChange={handleInputChange}
                style={{ width: "200px", marginBottom: "8px" }}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="time"
                name="startTime"
                value={eventInfo.startTime}
                onChange={handleInputChange}
                style={{ width: "200px", marginBottom: "8px" }}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="time"
                name="endTime"
                value={eventInfo.endTime}
                onChange={handleInputChange}
                style={{ width: "200px", marginBottom: "8px" }}
                required
              />
            </label>
          </div>
          <div>
            <label style={{ fontSize: "15px" }}>
              <input
                type="color"
                name="color"
                value={eventInfo.color}
                onChange={handleInputChange}
                style={{ width: "200px", marginBottom: "8px" }}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <textarea
                name="description"
                placeholder="일정내용"
                value={eventInfo.description}
                onChange={handleTextareaChange}
                style={{ width: "200px", marginBottom: "8px" }}
              ></textarea>
            </label>
          </div>
          <div>
            <button
              type="submit"
              style={{ fontSize: "12px", border: "1px solid #1f1f1f" }}
            >
              이벤트 추가
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PostPersonalEvent;
