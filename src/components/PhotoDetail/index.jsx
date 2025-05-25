import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { URL } from "../../utils/url";
import PhotoItem from "../UserPhotos/PhotoItem";
function PhotoDetail() {
  const params = useParams();
  const photoId = params.photoId;
  const [photo, setPhoto] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetchModel(`${URL}/photo/${photoId}`);
        if (res.code == 200) {
          setPhoto(res.data);
          const userId = res.data.user_id;
          const resUser = await fetchModel(`${URL}/user/${userId}`);
          if (resUser.code == 200) {
            setUser(resUser.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [photoId]);
  return <>{photo && user && <PhotoItem item={photo} user={user} />}</>;
}
export default PhotoDetail;
