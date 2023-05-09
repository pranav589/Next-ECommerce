import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Ratings from "../Ratings/Ratings";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataContext } from "@/store/GlobalState";
import CustomInputBox from "../CustomInputBox/CustomInputBox";
import { toast } from "react-toastify";
import { apiCall } from "@/utils/apiCall";
import { useRouter } from "next/router";

function UserReviews({
  data,
  setTriggerGetReviewsCall,
  triggerGetReviewsCall,
  reviewsLoading = false,
  isProductBuyed = false,
}) {
  const router = useRouter();
  const { id } = router.query;
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [isEdit, setIsEdit] = useState({
    id: "",
    show: false,
    value: "",
    star: 0,
  });

  const [newCommentValue, setNewCommentValue] = useState("");
  const [ratingsValue, setRatingsValue] = useState("");
  const { state } = useContext(DataContext);
  const [editRating, setEditRating] = useState("");
  const { auth } = state;

  const handleReviewEdit = (review) => {
    setIsEdit({
      ...isEdit,
      id: review?._id,
      show: true,
      value: review?.comment,
    });
    setEditRating(review?.star);
  };

  const handleUpdateReview = async (review) => {
    const data = {
      star: editRating,
      productId: id,
      comment: isEdit?.value,
      ratingId: review?._id,
    };

    try {
      const res = await apiCall("PUT", "ratings", token, data);
      if (res?.data?.status === "success") {
        setTriggerGetReviewsCall(!triggerGetReviewsCall);
        setIsEdit({ ...isEdit, id: "", show: false, value: "", star: 0 });
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  const handleDeleteReview = async (review) => {
    const data = {
      ratingId: review?._id,
      productId: id,
      postedBy: review?.postedBy?._id,
    };
    try {
      const res = await apiCall("DELETE", "ratings", token, data);
      if (res?.data?.status === "success") {
        setTriggerGetReviewsCall(!triggerGetReviewsCall);
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  const handleCreateReview = async (review) => {
    const data = {
      star: ratingsValue,
      productId: id,
      comment: newCommentValue,
    };

    try {
      const res = await apiCall("POST", "ratings", token, data);
      if (res?.data?.status === "success") {
        setTriggerGetReviewsCall(!triggerGetReviewsCall);
        setNewCommentValue("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          textTransform: "uppercase",

          fontSize: "24px",
        }}
      >
        User Reviews
      </Typography>
      <Divider />
      {!isProductBuyed && (
        <Typography sx={{ fontSize: "18px", marginTop: "10px" }}>
          Please buy this amazing product and let us know your valuable reviews.
        </Typography>
      )}

      {isProductBuyed && (
        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ marginRight: "10px" }}>Please rate- </Typography>
            <Ratings value={ratingsValue} setValue={setRatingsValue} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomInputBox
              containerStyle={{ width: "100%" }}
              id={"newCommentValue"}
              // label={"Codupon Code"}
              name={"newCommentValue"}
              inputStyle={{
                width: { xs: "100%", sm: "100%", md: "100% !important" },
              }}
              value={newCommentValue}
              onChange={(e) => setNewCommentValue(e.target.value)}
              errorValue={""}
              placeholder={"Please give your valuable reviews"}
            />
            <Button
              sx={{ fontSize: "16px", marginLeft: "10px" }}
              onClick={() => handleCreateReview()}
            >
              Post
            </Button>
          </Box>
        </Box>
      )}

      {reviewsLoading ? (
        <CircularProgress
          sx={{
            color: "#539165",
            marginLeft: "50%",
            mt: 3,
            mb: 2,
          }}
          size={32}
        />
      ) : (
        <Box sx={{ marginTop: "15px" }}>
          {data?.map((review) => {
            return (
              <Box key={review?._id} sx={{ margin: "20px 5px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={review?.postedBy?.avatar}
                      alt={review?.postedBy?.name}
                    />
                    <Typography sx={{ fontSize: "20px" }}>
                      {review?.postedBy?.name}
                    </Typography>
                  </Box>
                  {review?.postedBy?._id === auth?.user?.id && (
                    <Box>
                      <IconButton onClick={() => handleReviewEdit(review)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteReview(review)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>

                <Box>
                  <Ratings
                    value={
                      isEdit?.id === review?._id ? editRating : review?.star
                    }
                    setValue={isEdit?.id === review?._id && setEditRating}
                    readOnly={isEdit?.id === review?._id ? false : true}
                  />
                </Box>
                {isEdit?.id === review?._id ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CustomInputBox
                      containerStyle={{ width: "80%" }}
                      id={"commentValue"}
                      // label={"Codupon Code"}
                      name={"commentValue"}
                      inputStyle={{
                        width: {
                          xs: "100%",
                          sm: "100%",
                          md: "100% !important",
                        },
                      }}
                      value={isEdit?.value}
                      onChange={(e) =>
                        setIsEdit({ ...isEdit, value: e.target.value })
                      }
                      errorValue={""}
                    />
                    <Button
                      sx={{ fontSize: "16px", marginLeft: "10px" }}
                      onClick={() => handleUpdateReview(review)}
                    >
                      Post
                    </Button>
                    <Button
                      sx={{ fontSize: "16px", marginLeft: "10px" }}
                      onClick={() =>
                        setIsEdit({ ...isEdit, id: "", value: "", show: false })
                      }
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Typography sx={{ fontSize: "20px" }}>
                    {review?.comment}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default UserReviews;
