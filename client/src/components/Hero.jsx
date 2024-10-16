import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  FaBus,
  FaMapMarkedAlt,
  FaRegHandshake,
  FaPhoneAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { ScrollContext } from "../context/ScrollContext";
import ScrollToTop from "./ScrollToTop";
import bus1 from "../images/bus1.jpg";
import bus2 from "../images/bus2.jpg";
import home from "../images/home.jpeg";
import razorpay from "../images/razorpay-logo.png"
const Hero = () => {
  const images = [bus1, bus2];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const { isScroll, jumpToDown, jumpToTop } = useContext(ScrollContext);
  return (
    <section className=" text-black  py-8">
      <Box>
        <Box
          sx={{
            position: "relative",
            height: { xs: "50vh", sm: "60vh", md: "70vh" },
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              backgroundImage: `url(${home})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(2px)",
              transform: "scale(1.1)",
            }}
          />
        
        
          <Container
            className="p-16 px-12 w-full flex justify-center text-white"
            sx={{
              zIndex: 2,
              px: { xs: 2, sm: 4, md: 8 },
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                color: "#FF5733",
                width: { xs: "90%", sm: "80%", md: "70%" },
                borderRadius: "16px",
                py: { xs: 4, sm: 6, md: 8 },
                px: { xs: 2, sm: 4, md: 6 },
                // opacity: 50,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Typography
                  variant="h3"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                  }}
                >
                  Welcome to Trusted Journeys
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  gutterBottom
                  sx={{
                    mb: 4,
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Your Reliable, Safe, and Convenient Travel Partner
                </Typography>
                <Link to="/booking">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition duration-300 animate-bounce">
                    Book Now
                  </button>
                </Link>
              </motion.div>
            </Box>
          </Container>
          
        </Box>

        <Container sx={{ py: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: "center", mb: 6, fontWeight: "bold" }}
          >
            Our Services
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <FaBus />,
                title: "Comfortable Buses",
                description: "comfortable & smooth journey.",
              },
              {
                icon: <FaMapMarkedAlt />,
                title: "Widespread Routes",
                description:
                  "We cover numerous routes to connect you to your destination.",
              },
              {
                icon: <FaRegHandshake />,
                img: razorpay,
                title: "Secured Payments",
                description:
                  "Experience safe and reliable transactions with our secure payment options.",
              },

              {
                icon: <FaPhoneAlt />,
                title: "24/7 Support",
                description:
                  "We’re here to help you anytime with our round-the-clock support.",
              },
            ].map((service, index) => (
              <Grid item xs={12} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className=" h-64 bg-white p-4 text-center transition-shadow duration-300 ease-in-out"
                    style={{
                      boxShadow: "inset 0px 5px 12px 5px rgba(0, 0, 0, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 6px rgba(0, 0, 0, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "inset  0px 5px 10px 5px  rgba(0, 0, 0, 0.3)";
                    }}
                  >
                    <CardMedia>
                      <div className={`w-full mt-4 flex items-center justify-between`}>
                      <Box
                        sx={{ fontSize: "4rem", color: "primary.main", mb: 2 }}
                      >
                        {service.icon}
                      </Box>
                    { service?.img && <img className="h-8 mb-4 mr-4" src={service?.img} width="100px"  alt="" />}

                      </div>
                    </CardMedia>
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box sx={{ backgroundColor: "primary.main", color: "white", py: 6 }}>
          <Container>
            <section className="w-full overflow-hidden">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  {/* Left Content Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <Typography
                      variant="h4"
                      component="h2"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      Why Choose Us?
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ mb: 4 }}>
                      We’re dedicated to providing top-notch service that you
                      can rely on. From our fleet of modern buses to our
                      professional staff, we strive to deliver an exceptional
                      travel experience every time.
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to="/contact"
                    >
                      Get in Touch
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="order-1 lg:order-2"
                  >
                    <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] overflow-hidden rounded-lg shadow-xl">
                      <div
                        className="flex h-full transition-transform duration-1000 ease-in-out"
                        style={{
                          transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                      >
                        {images.map((src, index) => (
                          <div
                            key={index}
                            className="flex-shrink-0 w-full h-full transition-opacity duration-1000"
                          >
                            <img
                              src={src}
                              alt={`Slide ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Navigation dots */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                              currentIndex === index
                                ? "bg-white scale-125 shadow-lg"
                                : "bg-white/50 hover:bg-white/75"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </Container>
        </Box>

        <Box
          sx={{
            backgroundImage: "url(/path-to-cta-background.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            py: 8,
            color: "black",
            textAlign: "center",
          }}
        >
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Ready to Travel?
              </Typography>
              <Typography variant="body1" component="p" sx={{ mb: 4 }}>
                Book your journey with us today and experience the difference.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => jumpToTop()}
                component={Link}
                to="/routes"
              >
                View Routes
              </Button>
            </motion.div>
          </Container>
        </Box>
      </Box>
      <ScrollToTop />
    </section>
  );
};

export default Hero;
