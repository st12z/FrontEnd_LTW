import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useMatch } from "react-router-dom";

import "./styles.css";
import { useLocation, useParams } from "react-router-dom";
import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData";
import { URL } from "../../utils/url";
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const matchUser = useMatch("/users/:userId");
  const matchPhoto = useMatch("/photos/:userId");
  const matchComments = useMatch("/comments/:userId");
  const userId =
    matchUser?.params.userId ||
    matchPhoto?.params.userId ||
    matchComments?.params.userId;
  const viewType = matchUser
    ? "users"
    : matchPhoto
    ? "photos"
    : matchComments
    ? "comments"
    : null;

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
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <div className="topbar_info">
          <Typography variant="h5" color="inherit" className="topbar_left">
            Nguyễn Tiến Thực - B22DCCN847
          </Typography>
          <div className="topbar_right">
            {user &&
              (viewType === "users" ? (
                <p>{user.last_name}</p>
              ) : viewType === "photos" ? (
                <p>Ảnh của: {user.first_name}</p>
              ) : viewType === "comments" ? (
                <p>
                  Bình luận của: {user.first_name} {user.last_name}
                </p>
              ) : null)}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
