import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import models from "../../modelData/models";
import "./styles.css";
import { Link, useParams } from "react-router-dom";
import imagesIcon from "../../images/images-icon.png";
import fetchModel from "../../lib/fetchModelData";
import { URL } from "../../utils/url";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const params = useParams();
  const userId = params.userId;
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetchModel(`${URL}/user/${userId}`);
        console.log(res);
        if (res.code == 200) {
          setUser(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [userId]);
  return (
    <>
      {user && (
        <Typography variant="body1">
          <h3>Thông tin người dùng</h3>
          <div className="">
            <form>
              <label>Họ tên</label>
              <input type="text" value={user.first_name} />

              <label>Tên</label>
              <input type="text" value={user.last_name} />

              <label>Nghề nghiệp</label>
              <input type="text" value={user.occupation} />

              <label>Chỗ ở</label>
              <input type="text" value={user.location} />

              <label>Mô tả</label>
              <input type="text" value={user.description} />
            </form>
            <div className="photo">
              <img src={imagesIcon} />
              <Link to={`/photos/${user?._id}`}>
                <button className="button">Ảnh của bạn</button>
              </Link>
            </div>
          </div>
        </Typography>
      )}
    </>
  );
}

export default UserDetail;
