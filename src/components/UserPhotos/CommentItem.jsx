import "./CommentItem.css";
import TimeIcon from "../../images/time-icon.png";
import { getDay } from "../../utils/getDay";
import { getTime } from "../../utils/getTime";
import { Link } from "react-router-dom";
import LikeIcon from "../../images/icon-like.png";
import ReplyIcon from "../../images/icon-comment.png";
import { useEffect, useState } from "react";
import fetchModel from "../../lib/fetchModelData";
import { URL } from "../../utils/url";
function CommentItem(props) {
  const { item } = props;
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetchModel(`${URL}/user/${item.user_id}`);
        console.log(res);
        if (res.code == 200) {
          setUser(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      {item && user && (
        <div className="comment_item">
          <div className="comment_user">
            <Link to={`/users/${user._id}`}>
              {user.first_name} {user.last_name}
            </Link>
          </div>
          <div className="comment_time">
            <img src={TimeIcon} className="time-icon" />
            <span className="day">{getDay(item.date_time)}</span>
            <span className="time">{getTime(item.date_time)}</span>
          </div>
          <div className="comment_content">
            <p className="content">{item.comment}</p>
          </div>
        </div>
      )}
    </>
  );
}
export default CommentItem;
