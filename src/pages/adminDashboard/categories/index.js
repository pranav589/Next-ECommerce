import React, { useContext, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { imageUpload } from "@/utils/imageUpload";
import { apiCall } from "@/utils/apiCall";
import { DataContext } from "@/store/GlobalState";
import Wrapper from "@/components/Wrapper/Wrapper";
import CustomTabs from "@/components/CustomTabs/CustomTabs";
import BoxShadowWrapper from "@/components/BoxShadowWrapper";
import CustomInputBox from "@/components/CustomInputBox/CustomInputBox";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import PaginationComponent from "@/components/PaginationComponent/PaginationComponent";
import Image from "next/image";

function Categories() {
  const [triggerCategoryCall, setTriggerCategoryCall] = useState(false);
  const [page, setPage] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [images, setImages] = useState(null);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryListLoading, setIsCategoryListLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsCategoryListLoading(true);
        const res = await apiCall(
          "GET",
          `category?page=${page}&limit=${productLimit}`
        );
        if (res?.data?.status === "success") {
          setCategories(res?.data?.Data?.categories);
          setTotalCount(res?.data?.Data?.totalCount);
        }
        setIsCategoryListLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsCategoryListLoading(false);
      }
    };
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerCategoryCall, page]);

  const handleUploadInput = (e) => {
    let err = "";
    const file = e.target.files[0];
    if (file.length === 0) {
      return toast.error("File does not exist.");
    }

    if (file?.size > 1024 * 1024) {
      return (err = "Maximum file size can be 1mb.");
    }
    if (err) {
      return toast.error(err);
    }
    setImages(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (auth?.user?.role !== "admin" || auth?.user?.root === false) {
      return toast.error("Unauthorized access.");
    }
    let media = [];
    const imageNewURL = images && [images]?.filter((img) => !img.url);
    try {
      if (imageNewURL.length > 0) media = await imageUpload(imageNewURL);
      if (media?.length > 0 || images) {
        const data = {
          name: name,
          image: media?.length > 0 ? media : [images],
        };
        if (isEdit) {
          const res = await apiCall(
            "PATCH",
            `category/${selectedCategory?._id}`,
            token,
            data
          );
          if (res?.data?.status === "success") {
            setName("");
            setImages("");
            toast.success("Category updated.");
            setIsLoading(false);
            setIsEdit(false);
            setTriggerCategoryCall(!triggerCategoryCall);
          }
        } else {
          const res = await apiCall("POST", "category", token, data);
          if (res?.data?.status === "success") {
            setName("");
            setImages(null);
            toast.success(res?.data?.msg);
            setIsLoading(false);
            setTriggerCategoryCall(!triggerCategoryCall);
          }
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.err || "Something went wrong.");
      setIsLoading(false);
      setIsEdit(false);
    }
  };

  const handleDelete = async (category) => {
    try {
      const res = await apiCall("DELETE", `category/${category?._id}`, token);
      if (res?.data?.status === "success") {
        toast.success("Category deleted.");
        setTriggerCategoryCall(!triggerCategoryCall);
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEdit(true);
    setName(category?.name);
    setImages(category?.image?.[0]);
  };

  return (
    <Wrapper>
      <Box
        sx={{
          padding: "0px 10px",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <CustomTabs isAdminTabs={true} active={"Categories"}>
          <Grid container columnSpacing={3}>
            <Grid item xs={12} sm={12} md={4}>
              <BoxShadowWrapper
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ fontSize: "18px" }}>
                  {" "}
                  Enter Category Details
                </Typography>
                <CustomInputBox
                  id={"name"}
                  label={"Category Name"}
                  name={"name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  errorValue={error?.name}
                  inputStyle={{
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  required={true}
                />
                <Box sx={{ marginBottom: "10px" }}>
                  <input
                    accept="image/*"
                    value={""}
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleUploadInput}
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      component="span"
                      variant="outlined"
                      sx={{
                        width: "fit-content",
                        mt: 1,
                        mb: 1,
                        borderRadius: "30px",
                      }}
                    >
                      Add image
                    </Button>
                  </label>
                  {images && <Typography>({`${images?.name}`})</Typography>}
                </Box>
                {images && <hr />}
                {images && (
                  <Box sx={{ marginTop: "5px" }}>
                    <Typography sx={{ fontSize: "18px" }}>Preview</Typography>
                    <Box
                      sx={{
                        width: "100px",
                        height: "80px",
                        position: "relative",
                      }}
                    >
                      <Image
                        fill
                        src={
                          images?.url
                            ? images?.url
                            : images
                            ? URL.createObjectURL(images)
                            : ""
                        }
                        style={{
                          borderRadius: "8px",
                        }}
                        alt={"Preview Image"}
                      />
                    </Box>
                  </Box>
                )}
                {isLoading ? (
                  <CircularProgress
                    sx={{
                      color: "#539165",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    size={25}
                  />
                ) : (
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                      width: "100%",
                      mt: 2,
                      mb: 2,
                      background: "#539165",
                      "&:hover": { background: "#539165" },
                      borderRadius: "30px",
                      height: "40px",
                    }}
                    disabled={!images || !name}
                  >
                    {isEdit ? "Edit" : "Add"}
                  </Button>
                )}
              </BoxShadowWrapper>
            </Grid>

            <Grid item xs={12} sm={12} md={8}>
              <BoxShadowWrapper
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "18px" }}>Category List</Typography>
                {categories?.length === 0 && (
                  <Typography sx={{ fontSize: "18px", marginTop: "10px" }}>
                    No Categories Found. May be create one?
                  </Typography>
                )}

                {isCategoryListLoading ? (
                  <CircularProgress
                    sx={{
                      color: "#539165",
                      mt: 3,
                      mb: 2,
                    }}
                    size={25}
                  />
                ) : (
                  categories?.map((category) => (
                    <CategoryCard
                      key={category?._id}
                      card={category}
                      setName={setName}
                      setImages={setImages}
                      setIsEdit={setIsEdit}
                      setSelectedValue={setSelectedCategory}
                      setTriggerValueCall={setTriggerCategoryCall}
                      triggerValueCall={triggerCategoryCall}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      modalMessage={
                        "Are you sure that you want to delete this category?"
                      }
                    />
                  ))
                )}
                {totalCount > 10 && (
                  <PaginationComponent
                    page={page}
                    setPage={setPage}
                    count={Math.ceil(totalCount / productLimit)}
                  />
                )}
              </BoxShadowWrapper>
            </Grid>
          </Grid>
        </CustomTabs>
      </Box>
    </Wrapper>
  );
}

export default Categories;
