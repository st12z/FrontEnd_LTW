import "./PhotoItem.css";
import TimeIcon from "../../images/time-icon.png";
import { getDay } from "../../utils/getDay";
import { getTime } from "../../utils/getTime";
import { Link } from "react-router-dom";
import CommentItem from "./CommentItem";
import LikeIcon from "../../images/icon-like.png";
import ReplyIcon from "../../images/icon-comment.png";
import { useState } from "react";
import SendIcon from "../../images/icon-send.png";
function PhotoItem(props) {
  const { item, user } = props;
  const [reply, setReply] = useState(false);
  const handleReply = () => {
    setReply(!reply);
  };

  return (
    <>
      {item && user && (
        <div className="photo_item">
          <div className="photo_header">
            <div className="user_name">
              <Link to={`/users/${user._id}`}>
                <b>
                  {user.first_name} {user.last_name}
                </b>
              </Link>
            </div>
            <div className="photo_time">
              <img src={TimeIcon} className="time-icon" />
              <span className="day">{getDay(item.date_time)}</span>
              <span className="time">{getTime(item.date_time)}</span>
            </div>
            <div className="photo_images">
              <img src={`/images/${item.file_name}`} />
            </div>
          </div>
          <div className="photo_action">
            <img src={ReplyIcon} onClick={handleReply} />
          </div>
          <div className="photo_comments">
            {reply && (
              <div className="input-send">
                <input type="text" />
                <img src={SendIcon} />
              </div>
            )}
            {item.comments &&
              item.comments.length > 0 &&
              item.comments.map((comment, index) => (
                <CommentItem item={comment} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
export default PhotoItem;
