import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import shortid from "shortid";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";

function HeroBanner({ items }) {
  const router = useRouter();
  const { width } = useWindowSize();
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
              background:
                "linear-gradient(121deg, rgba(83,145,101,0.9948354341736695) 0%, rgba(32,54,34,0.6) 100%)",
              backgroundImage:
                "url(https://img.freepik.com/free-photo/woman-holding-various-shopping-bags-copy-space_23-2148674122.jpg?w=1380&t=st=1683706072~exp=1683706672~hmac=a2b76c3b84930bac29f103df746a80ba512925cc07161019b2c8397f998b89ed)",
            }}
            key={shortid.generate()}
          >
            <Box
              sx={{
                height: { xs: "100%", sm: "100%", md: "300px" },
                width: { xs: "100%", sm: "100%", md: "300px" },
                position: { xs: "static", sm: "static", md: "absolute" },
                right: "10%",
                top: "10%",
              }}
            >
              <Image
                fill
                src={item?.images?.[0]?.url}
                alt={item?.title}
                className="heroBannerImg"
              />
            </Box>

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
            <Box
              sx={{
                position: "absolute",
                top: { xs: "5%", sm: "5%", md: "30%" },
                left: { xs: "2%", sm: "2%", md: "10%" },
                background: "rgba(32,54,34,0.6)",
                boxShadow: "1px 5px 5px 2px rgba(32,54,34,0.6)",
                padding: {
                  xs: "5px",
                  sm: "5px",
                  md: "10px",
                },
              }}
            >
              {width > 1000 && (
                <Typography
                  sx={{
                    fontSize: "40px",
                    fontWeight: 700,
                    marginBottom: "20px",
                  }}
                >
                  Hurry Up!!! Only few are remaining!!!
                </Typography>
              )}
              <Typography
                sx={{
                  fontSize: "20px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {item?.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default HeroBanner;
