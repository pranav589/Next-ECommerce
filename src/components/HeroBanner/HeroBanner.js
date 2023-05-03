import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import shortid from "shortid";

function HeroBanner({ items }) {
  const router = useRouter();
  return (
    <Box
      sx={{
        position: "relative",
        color: "white",
        fontSize: "20px",
        width: "100%",
        maxWidth: "1400px",
        margin: "0px auto",
        height: {
          xs: "",
          sm: "",
          md: "60vh",
        },
      }}
    >
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <Box
            onClick={clickHandler}
            sx={{
              position: "absolute",
              right: {
                xs: "50px",
                md: "51px",
              },
              bottom: "10%",
              width: "30px",
              background: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30px",
              zIndex: 10,
              cursor: "pointer",
            }}
            className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <ChevronLeftIcon />
          </Box>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <Box
            sx={{
              position: "absolute",
              right: "20px",
              bottom: "10%",
              width: "30px",
              background: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30px",
              zIndex: 10,
              cursor: "pointer",
            }}
            onClick={clickHandler}
            className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <ChevronRightIcon />
          </Box>
        )}
      >
        {items?.map((item) => (
          <Box
            sx={{
              height: { xs: "30vh", md: "100%" },
              width: "100%",
              objectFit: "cover",
              position: "relative",
            }}
            key={shortid.generate()}
          >
            <img
              src={item?.images?.[0]?.url}
              alt={item?.title}
              className="aspect-[16/10] md:aspect-auto object-cover"
            />
            <Box
              sx={{
                position: "absolute",
                color: "black",
                bottom: "12%",
                left: 0,
                fontSize: {
                  xs: "20px",
                  md: "25px",
                },
                zIndex: "20",
                background: "white",
                textTransform: "uppercase",
                padding: "10px",
                boxShadow: "1px 5px 5px grey",
                cursor: "pointer",
              }}
              onClick={() => router.push(`/product/${item?._id}`)}
            >
              Shop now
            </Box>
            <Typography
              sx={{
                position: "absolute",
                top: "15px",
                left: "2%",
                fontSize: "20px",
                textTransform: "uppercase",
              }}
            >
              {item?.title}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default HeroBanner;
