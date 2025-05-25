import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import models from "../../modelData/models";

import "./styles.css";
import { useParams } from "react-router-dom";
import PhotoItem from "./PhotoItem";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import fetchModel from "../../lib/fetchModelData";
import { URL } from "../../utils/url";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const params = useParams();
  const userId = params.userId;
  const [user, setUser] = useState();
  const [photos, setPhotos] = useState([]);
  const [viewer, setViewser] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleChange = () => {
    setViewser(!viewer);
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resPhotos = await fetchModel(
          `${URL}/photo/photosOfUser/${userId}`
        );
        const resUser = await fetchModel(`${URL}/user/${userId}`);
        console.log(resPhotos);
        console.log(resUser);
        if (resPhotos.code == 200) {
          setPhotos(resPhotos.data);
        }
        if (resUser.code == 200) {
          setUser(resUser.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [userId]);
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <Typography variant="body1">
      {viewer ? (
        <>
          <FormControlLabel
            control={<Checkbox onChange={handleChange} />}
            label="Xem ảnh trượt"
          />
          <div className="list_photo-slider">
            {currentIndex > 1 && (
              <div className="button-slider" onClick={handlePrev}>
                &lt;
              </div>
            )}

            <PhotoItem
              item={photos[currentIndex]}
              key={photos[currentIndex]._id}
              user={user}
            />

            {currentIndex < photos.length - 1 && (
              <div className="button-slider" onClick={handleNext}>
                &gt;
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <FormControlLabel
            control={<Checkbox onChange={handleChange} />}
            label="Xem ảnh thông thường"
          />
          <div className="list_photo">
            {photos?.map((item, index) => (
              <PhotoItem item={item} key={index} user={user} />
            ))}
          </div>
        </>
      )}
    </Typography>
  );
}

export default UserPhotos;
