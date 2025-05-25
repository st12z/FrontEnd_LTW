import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import models from "../../modelData/models";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { URL } from "../../utils/url";
/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetchModel(`${URL}/user/list`);

        console.log(res);
        if (res.code == 200) {
          const data = res.data;
          const newUsers = [];
          for (const item of data) {
            const resAmountPhotos = await fetchModel(
              `${URL}/photo/countPhotosOfUser/${item._id}`
            );
            const resAmountComments = await fetchModel(
              `${URL}/comment/countCommentsOfUser/${item._id}`
            );
            if (resAmountPhotos.code == 200 && resAmountComments.code == 200) {
              newUsers.push({
                ...item,
                amountPhotos: resAmountPhotos.data,
                amountComments: resAmountComments.data,
              });
            }
          }
          setUsers(newUsers);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <div>
      <List component="nav">
        {users.map((item) => (
          <>
            <ListItem>
              <Link to={`/users/${item._id}`}>
                <ListItemText
                  primary={`${item.first_name} ${item.last_name}`}
                  style={{ marginRight: "20px" }}
                />
              </Link>
            </ListItem>
            <div className="bubles">
              <p>
                <span className="amount-photos">{item.amountPhotos} </span> ảnh
              </p>
              <p>
                <Link to={`/comments/${item._id}`}>
                  <span className="amount-comments">{item.amountComments}</span>{" "}
                  bình luận
                </Link>
              </p>
            </div>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
}

export default UserList;
