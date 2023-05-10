import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { apiCall } from "@/utils/apiCall";
import { imageUpload } from "@/utils/imageUpload";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import shortid from "shortid";
import Wrapper from "../Wrapper/Wrapper";
import BoxShadowWrapper from "../BoxShadowWrapper";
import CustomInputBox from "../CustomInputBox/CustomInputBox";
import Dropdown from "../Dropdown/Dropdown";
import Image from "next/image";

function CreateProduct() {
  const router = useRouter();
  const initialData = {
    title: "",
    price: "",
    inStock: "",
    description: "",
    discount: "",
    type: "",
  };
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [productData, setProductData] = useState(initialData);
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const { id } = router.query;
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const res = await apiCall("GET", `product/${id}`);
          if (res?.data?.status === "success") {
            const {
              title,
              inStock,
              price,
              description,
              images,
              discount,
              type,
            } = res?.data?.Data;
            setProductData({
              title,
              inStock,
              price,
              description,
              discount,
              type,
            });
            setImages(images);
            setSelectedCategory(res?.data?.category);
            setIsEdit(true);
          }
        } catch (error) {
          toast.error(error?.response?.data?.err);
          setIsEdit(false);
        }
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiCall("GET", "category");
        if (res?.data?.status === "success") {
          setCategories(res?.data?.Data?.categories);
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
      }
    };
    fetchCategories();
  }, []);

  const handleUploadInput = (e) => {
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];
    if (files.length === 0) {
      return toast.error("File does not exist.");
    }
    files.forEach((file) => {
      if (file.size > 1024 * 1024) {
        return (err = "Image size should be lesser than 1 mb.");
      }
      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });
    if (err) {
      return toast.error(err);
    }
    const imageCount = images?.length;
    if (imageCount + newImages?.length > 5) {
      return toast.error("Upto 5 images can be selected");
    }
    setImages([...images, ...newImages]);
  };

  const validate = () => {
    let errors = {};
    let valid = true;
    if (
      !productData?.title ||
      !productData?.price ||
      !productData?.description ||
      !productData?.inStock
    ) {
      errors["all"] = "Please enter all required fields";
      valid = false;
    }
    if (productData?.title?.length < 5) {
      errors["title"] = "Title should be atleast 5 letters long";
      valid = false;
    }

    if (productData?.description?.length < 15) {
      errors["description"] =
        "Description should be atleast 15 characters long";
      valid = false;
    }

    if (Number(productData?.inStock) <= 0) {
      errors["inStock"] = "Stock should be greater than zero.";
      valid = false;
    }

    if (selectedCategory?.name?.length === 0) {
      errors["category"] = "Please select appropriate category";
      valid = false;
    }

    if (images.length === 0) {
      errors["image"] = "Image is a required field";
      valid = false;
    }
    setError(errors);
    return valid;
  };
  // Create or update product
  const handleProduct = async (e) => {
    e.preventDefault();
    const { title, price, description, inStock, discount, type } = productData;
    const data = {
      title: title,
      price: price,
      description: description,
      inStock: inStock,
      category: selectedCategory?._id,
      discount: discount,
      type: type,
    };
    const isValid = validate();
    if (isValid) {
      try {
        setIsSubmitLoading(true);
        let media = [];

        const imageNewURL = images?.filter((img) => !img?.url);
        const imageOldURL = images?.filter((img) => img?.url);

        if (imageNewURL?.length > 0) media = await imageUpload(imageNewURL);
        if (media?.length > 0 || images?.length > 0) {
          if (id) {
            const res = await apiCall("PATCH", `product/${id}`, token, {
              ...data,
              images: [...imageOldURL, ...media],
            });
            if (res?.data?.status === "success") {
              toast.success("Product updated!");
              setProductData(initialData);
              setImages([]);
              setSelectedCategory(null);
              router.push("/adminDashboard/products");
            }
          } else {
            const res = await apiCall("POST", "product", token, {
              ...data,
              images: [...imageOldURL, ...media],
            });
            if (res?.data?.status === "success") {
              toast.success("Product created!");
              setProductData(initialData);
              setImages([]);
              setSelectedCategory(null);
              router.push("/adminDashboard/products");
            }
          }
        }
        setIsSubmitLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsSubmitLoading(false);
      }
    }
  };
  const handleDelete = (index) => {
    const newArr = [...images];
    newArr.splice(index);
    setSelectedImg(null);
    setImages(newArr);
  };
  const [checked, setChecked] = React.useState(
    productData?.type === "banner" ? true : false
  );

  useEffect(() => {
    setChecked(productData?.type === "banner" ? true : false);
  }, [productData?.type]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setProductData({
      ...productData,
      type: event.target.checked ? "banner" : "regular",
    });
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
        <Button
          startIcon={<ArrowBackIosIcon />}
          onClick={() => router.push("/adminDashboard/products")}
        >
          Back
        </Button>
        <Grid container columnSpacing={5}>
          <Grid item xs={12} sm={12} md={8}>
            <BoxShadowWrapper>
              <Typography sx={{ fontSize: "18px" }}>
                Enter Product Details
              </Typography>
              <CustomInputBox
                id={"productTitle"}
                label={"Product Title"}
                name={"productTitle"}
                value={productData?.title}
                onChange={(e) =>
                  setProductData({ ...productData, title: e.target.value })
                }
                inputStyle={{
                  width: { xs: "100%", sm: "100%", md: "100%" },
                }}
                required={true}
              />
              <CustomInputBox
                type={"number"}
                id={"price"}
                label={"Price"}
                name={"price"}
                value={productData?.price}
                onChange={(e) =>
                  setProductData({ ...productData, price: e.target.value })
                }
                inputStyle={{
                  width: { xs: "100%", sm: "100%", md: "100%" },
                }}
                required={true}
              />
              <CustomInputBox
                id={"description"}
                label={"Description"}
                name={"description"}
                value={productData?.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
                // errorValue={error?.name}
                inputStyle={{
                  width: { xs: "100%", sm: "100%", md: "100%" },
                }}
                required={true}
              />
              <Box sx={{ marginBottom: "10px", marginTop: "10px" }}>
                <input
                  accept="image/*"
                  value={""}
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
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
                    Add Image
                  </Button>
                </label>
                {/* {<Typography>({`${images?.name}`})</Typography>} */}
              </Box>
              <CustomInputBox
                id={"inStock"}
                label={"Stock Available"}
                name={"inStock"}
                value={productData?.inStock}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    inStock: e.target.value,
                  })
                }
                // errorValue={error?.name}
                inputStyle={{
                  width: { xs: "100%", sm: "100%", md: "100%" },
                }}
                required={true}
                type="number"
              />
              <CustomInputBox
                type="number"
                id={"discount"}
                label={"% Discount"}
                name={"discount"}
                value={productData?.discount}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    discount: e.target.value,
                  })
                }
                // errorValue={error?.name}
                inputStyle={{
                  width: { xs: "100%", sm: "100%", md: "100%" },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    value={"banner"}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Show in top banner"
              />

              {isEdit && selectedCategory?.name && (
                <Dropdown
                  data={categories}
                  defaultValue={
                    selectedCategory === null
                      ? "Select Category"
                      : selectedCategory?.name
                  }
                  title={"Category"}
                  setSelectedValue={setSelectedCategory}
                />
              )}
              {isEdit === false && (
                <Dropdown
                  data={categories}
                  defaultValue={"Select Category"}
                  title={"Category"}
                  setSelectedValue={setSelectedCategory}
                />
              )}

              {isSubmitLoading ? (
                <CircularProgress
                  sx={{
                    color: "#539165",
                    marginLeft: "50%",
                    mt: 3,
                    mb: 2,
                  }}
                  size={20}
                />
              ) : (
                <Button
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
                  onClick={handleProduct}
                >
                  {isEdit ? "Edit" : "Create"}
                </Button>
              )}
            </BoxShadowWrapper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <BoxShadowWrapper>
              <Typography sx={{ fontSize: "18px" }}>Preview Images</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginBottom: "10px",
                }}
              >
                {images?.map((img, index) => (
                  <Paper
                    sx={{
                      width: "100px",
                      height: "80px",
                      borderRadius: "8px",
                      padding: "3px",
                      margin: "7px",
                      border:
                        img?.name === selectedImg?.name ? "1px solid red" : "",
                      position: "relative",
                    }}
                    key={shortid.generate()}
                  >
                    <Image
                      fill
                      src={img.url ? img.url : URL.createObjectURL(img)}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedImg(img)}
                      alt={"Preview Image"}
                    />
                    <span
                      style={{
                        background: "crimson",
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                        padding: "0px 6px",
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 0,
                        fontSize: "15px",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(index)}
                    >
                      x
                    </span>
                  </Paper>
                ))}
              </Box>
              {selectedImg && (
                <Paper>
                  <Typography sx={{ fontSize: "18px" }}>
                    Selected Image
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: "285px",
                      position: "relative",
                    }}
                  >
                    <Image
                      fill
                      src={
                        selectedImg?.url
                          ? selectedImg?.url
                          : URL.createObjectURL(selectedImg)
                      }
                      alt={"Preview Image"}
                    />
                  </Box>
                </Paper>
              )}
            </BoxShadowWrapper>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  );
}

export default CreateProduct;
