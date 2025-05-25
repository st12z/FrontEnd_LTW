import { useEffect, useState } from "react";
import fetchModel from "../../lib/fetchModelData";
import { URL } from "../../utils/url";
import { Link, useParams } from "react-router-dom";
import "./ListCommentsOfUser.css";
function ListCommentsOfUser() {
  const [data, setData] = useState();
  const params = useParams();
  const userId = params.userId;
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetchModel(`${URL}/comment/commentsOfUser/${userId}`);
        console.log(res);
        if (res.code == 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [userId]);
  return (
    <>
      <div className="comments">
        {data &&
          data.map((item, index) => (
            <>
              <Link to={`/photo-detail/${item.photo_id}`}>
                <div className="comments_item">
                  <div className="image">
                    <img src={`/images/${item.file_name}`} />
                  </div>
                  <div className="comment">
                    <p>{item.comment}</p>
                  </div>
                </div>
              </Link>
            </>
          ))}
      </div>
    </>
  );
}
export default ListCommentsOfUser;
