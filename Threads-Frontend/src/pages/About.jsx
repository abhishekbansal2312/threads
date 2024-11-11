import React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  Stack,
  Button,
  SimpleGrid,
  Image,
  useColorMode, // Import useColorMode
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const About = () => {
  const { colorMode } = useColorMode(); // Get color mode

  const faqData = [
    {
      question:
        "What is the Leaf Disease Prediction module, and how does it help farmers?",
      answer:
        "The Leaf Disease Prediction module identifies potential diseases in plant leaves based on uploaded images. This helps farmers take preventive measures early to protect their crops.",
    },
    {
      question: "How do I upload an image to check for leaf diseases?",
      answer:
        "You can upload an image of the affected leaf in the Leaf Disease Prediction module, and the system will analyze it to identify any potential diseases.",
    },
    {
      question:
        "Can the Leaf Disease Prediction module detect multiple diseases in a single leaf?",
      answer:
        "Yes, the module is trained to recognize multiple diseases if present on the leaf and will provide relevant details for each detected disease.",
    },
    {
      question:
        "What type of images should I use for accurate disease prediction?",
      answer:
        "Clear, close-up images of the leaf with good lighting will yield the most accurate predictions. Ensure the affected area is visible.",
    },
    {
      question:
        "What actions should I take if a disease is detected on my crop leaves?",
      answer:
        "If a disease is detected, the module will suggest possible treatments and preventive measures that can help manage the disease.",
    },
    {
      question:
        "How does the Fertilizer Prediction System assist with crop growth?",
      answer:
        "The Fertilizer Prediction System recommends the best type of fertilizer based on your crop type and soil conditions, helping to enhance crop growth and yield.",
    },
    {
      question:
        "What data do I need to input for the Fertilizer Prediction System?",
      answer:
        "You need to provide information like crop type, soil quality parameters (pH, moisture), and the current growth stage of the plant to get accurate fertilizer recommendations.",
    },
    {
      question:
        "How often should I use the Fertilizer Prediction System during the crop lifecycle?",
      answer:
        "Using the system at key growth stages, such as seeding, flowering, and fruiting, can provide optimal fertilizer recommendations tailored to each stage.",
    },
    {
      question:
        "Will the Fertilizer Prediction System suggest organic options?",
      answer:
        "Yes, based on your preferences, the system can provide organic fertilizer options along with conventional recommendations.",
    },
    {
      question: "How do I know which fertilizer is best suited for my soil?",
      answer:
        "The system analyzes your soil’s characteristics and recommends a fertilizer that complements it, ensuring balanced nutrient levels for healthy crops.",
    },
    {
      question:
        "What is the Crop Prediction System, and how does it benefit farmers?",
      answer:
        "The Crop Prediction System suggests the most suitable crops for your land based on climate, soil quality, and other environmental factors, helping farmers make informed planting decisions.",
    },
    {
      question: "How do I input data into the Crop Prediction System?",
      answer:
        "Enter details about your region, soil type, pH level, temperature, and average rainfall to receive crop suggestions tailored to your conditions.",
    },
    {
      question:
        "Can the Crop Prediction System handle different types of soil?",
      answer:
        "Yes, the system is designed to provide crop suggestions based on various soil types, including clay, loam, and sandy soils.",
    },
    {
      question: "Does the Crop Prediction System recommend seasonal crops?",
      answer:
        "Yes, it considers the season and climate conditions to recommend crops best suited to your area for optimal yield.",
    },
    {
      question:
        "Will the Crop Prediction System help me decide on crop rotation options?",
      answer:
        "Yes, based on past inputs, the system can suggest crop rotation options to improve soil health and reduce pest issues.",
    },
    {
      question:
        "How reliable are the disease predictions provided by the Leaf Disease Prediction module?",
      answer:
        "The system is trained with a large dataset of leaf images, making it highly reliable. However, it’s always good to cross-reference with an expert for severe cases.",
    },
    {
      question:
        "Can the Fertilizer Prediction System help reduce fertilizer costs?",
      answer:
        "Yes, by recommending the correct type and quantity of fertilizer, the system helps optimize usage, reducing waste and saving costs.",
    },
    {
      question:
        "What if my crops are experiencing unusual weather? Can the Crop Prediction System account for this?",
      answer:
        "The system considers average weather conditions, but it's best to monitor real-time weather changes and adjust farming practices as needed.",
    },
    {
      question:
        "How does the Leaf Disease Prediction module handle early signs of disease?",
      answer:
        "The module is trained to detect both early and advanced stages of disease, enabling farmers to take preventive action as soon as symptoms appear.",
    },
    {
      question:
        "Will the system recommend treatment options for identified diseases?",
      answer:
        "Yes, once a disease is identified, the module provides treatment suggestions and preventive steps to help you manage the issue effectively.",
    },
    {
      question: "Can I use the modules without extensive technical knowledge?",
      answer:
        "Absolutely! The modules are designed with user-friendly interfaces to ensure that anyone can use them, regardless of technical experience.",
    },
    {
      question:
        "Is internet connectivity required to use these prediction modules?",
      answer:
        "Yes, a stable internet connection is needed for data processing and to provide real-time predictions and recommendations.",
    },
    {
      question: "Can I access these modules on a mobile device?",
      answer:
        "Yes, the modules are mobile-friendly, allowing you to access them via smartphones or tablets for on-the-go usage.",
    },
    {
      question:
        "How frequently should I update my data in the Fertilizer Prediction System?",
      answer:
        "For the best results, update data whenever there is a significant change in soil conditions, crop growth stage, or weather patterns.",
    },
    {
      question:
        "What if the Crop Prediction System suggests crops not typically grown in my area?",
      answer:
        "The system bases its suggestions on your soil and climate data. Consult with local agricultural experts to see if these crops could be a viable option.",
    },
  ];
  return (
    <Box>
      {/* Hero Section */}
      <Box
        w="full"
        h="700px"
        bgImage="url('titlepic.png')" // Ensure the image path is correct
        bgSize="cover"
        bgPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        color="white"
      >
        {/* Hero text or content can go here if needed */}
      </Box>

      <VStack spacing={10} align="start" mt={10} px={5}>
        {/* About Us Content */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full" mt={10}>
          {/* Left content */}
          <Box>
            <Image
              src="pexels-enginakyurt-1435904.jpg"
              alt="Agricultural Technology"
              borderRadius="md"
              boxSize="100%"
              objectFit="cover"
            />
          </Box>
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              What We're Doing
            </Heading>
            <Text fontSize="lg" mb={6}>
              Our platform is dedicated to revolutionizing the agricultural
              industry. We aim to provide farmers with the tools they need to
              identify and solve common challenges. From recognizing crop
              diseases using advanced machine learning to offering tailored
              fertilizer recommendations, we strive to empower farmers with
              actionable insights. In addition to that, we offer real-time
              advice from agricultural experts and a knowledge base of farming
              best practices to help farmers maximize their yields and minimize
              risks. Our mission is to bridge the gap between technology and
              traditional farming, providing solutions that are accessible, easy
              to use, and reliable.
            </Text>
          </Box>

          {/* Right image */}
        </SimpleGrid>

        {/* Technology Stack Content */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full" mt={10}>
          {/* Left content */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              Our Vision
            </Heading>
            <Text fontSize="lg" mb={6}>
              At the heart of our platform is a vision to transform agriculture
              by seamlessly integrating technology with traditional farming
              practices. We aim to create a future where farmers, regardless of
              location or scale, have access to innovative solutions that
              enhance productivity, sustainability, and profitability. By
              leveraging cutting-edge machine learning, real-time expert advice,
              and data-driven insights, we envision a world where every farmer
              can make informed decisions to optimize their crops, protect their
              land, and increase yields. Our mission is to empower farmers with
              the tools they need to face challenges, adapt to change, and
              thrive in an ever-evolving agricultural landscape.
            </Text>
          </Box>

          {/* Right image */}
          <Box>
            <Image
              src="image.png"
              alt="Agricultural Technology"
              borderRadius="md"
              boxSize="100%"
              objectFit="cover"
            />
          </Box>
        </SimpleGrid>
      </VStack>

      {/* Services Section */}
      <Heading
        as="h2"
        size="xl"
        mt={16}
        textAlign="center"
        mb={10}
        fontSize="5xl"
      >
        Our Services
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mt={5}>
        {/* Disease Identification */}
        <Box
          p={5}
          boxShadow="md"
          borderRadius="lg"
          bg={colorMode === "dark" ? "gray.900" : "gray.50"}
          border={colorMode === "dark" ? "1px solid #fff" : "1px solid #000"}
        >
          <Heading
            as="h3"
            size="md"
            mb={3}
            color={colorMode === "dark" ? "white" : "black"}
          >
            Disease Identification
          </Heading>
          <Image src="/services/disease.png" alt="disease icon" mb={3} />
          <Text color={colorMode === "dark" ? "gray.300" : "gray.600"}>
            Our platform can help identify various crop diseases using machine
            learning and expert knowledge, giving farmers the insights they need
            to act quickly.
          </Text>
        </Box>

        {/* Fertilizer Recommendations */}
        <Box
          p={5}
          boxShadow="md"
          borderRadius="lg"
          bg={colorMode === "dark" ? "gray.900" : "gray.50"}
          border={colorMode === "dark" ? "1px solid #fff" : "1px solid #000"}
        >
          <Heading
            as="h3"
            size="md"
            mb={3}
            color={colorMode === "dark" ? "white" : "black"}
          >
            Fertilizer Recommendations
          </Heading>
          <Image src="/services/fertilizer.png" alt="fertilizer icon" mb={3} />
          <Text color={colorMode === "dark" ? "gray.300" : "gray.600"}>
            Based on the specific crop and soil condition, our platform provides
            tailored fertilizer recommendations to ensure healthy and productive
            crops.
          </Text>
        </Box>

        {/* In-app Communication */}
        <Box
          p={5}
          boxShadow="md"
          borderRadius="lg"
          bg={colorMode === "dark" ? "gray.900" : "gray.50"}
          border={colorMode === "dark" ? "1px solid #fff" : "1px solid #000"}
        >
          <Heading
            as="h3"
            size="md"
            mb={3}
            color={colorMode === "dark" ? "white" : "black"}
          >
            In-app Communication
          </Heading>
          <Image
            src="/services/communication.png"
            alt="communication icon"
            mb={3}
          />
          <Text color={colorMode === "dark" ? "gray.300" : "gray.600"}>
            Our platform allows seamless in-app communication between farmers,
            agronomists, and experts, enabling real-time advice and
            collaborative solutions.
          </Text>
        </Box>

        {/* Crop Recommendations */}
        <Box
          p={5}
          boxShadow="md"
          borderRadius="lg"
          bg={colorMode === "dark" ? "gray.900" : "gray.50"}
          border={colorMode === "dark" ? "1px solid #fff" : "1px solid #000"}
        >
          <Heading
            as="h3"
            size="md"
            mb={3}
            color={colorMode === "dark" ? "white" : "black"}
          >
            Crop Recommendations
          </Heading>
          <Image src="/services/crop.png" alt="crop icon" mb={3} />
          <Text color={colorMode === "dark" ? "gray.300" : "gray.600"}>
            Receive personalized crop recommendations based on your region,
            climate, and soil type to maximize yield and minimize risk.
          </Text>
        </Box>

        {/* Farming Guides */}
        <Box
          p={5}
          boxShadow="md"
          borderRadius="lg"
          bg={colorMode === "dark" ? "gray.900" : "gray.50"}
          border={colorMode === "dark" ? "1px solid #fff" : "1px solid #000"}
        >
          <Heading
            as="h3"
            size="md"
            mb={3}
            color={colorMode === "dark" ? "white" : "black"}
          >
            Farming Guides
          </Heading>
          <Image src="/services/guidance.png" alt="guide icon" mb={3} />
          <Text color={colorMode === "dark" ? "gray.300" : "gray.600"}>
            Access comprehensive farming guides covering topics like sustainable
            practices, pest management, and crop care to improve farm
            productivity.
          </Text>
        </Box>

        {/* Weather Forecasts */}
        <Box
          p={5}
          boxShadow="md"
          borderRadius="lg"
          bg={colorMode === "dark" ? "gray.900" : "gray.50"}
          border={colorMode === "dark" ? "1px solid #fff" : "1px solid #000"}
        >
          <Heading
            as="h3"
            size="md"
            mb={3}
            color={colorMode === "dark" ? "white" : "black"}
          >
            Weather Forecasts
          </Heading>
          <Image src="/services/weather.png" alt="weather icon" mb={3} />
          <Text color={colorMode === "dark" ? "gray.300" : "gray.600"}>
            Stay up to date with the latest weather forecasts, helping farmers
            plan their operations and anticipate potential weather-related
            challenges.
          </Text>
        </Box>
      </SimpleGrid>

      <Box mt={10} maxW="full" px={5}>
        <Heading as="h2" size="lg" mb={4}>
          Frequently Asked Questions
        </Heading>

        <Accordion allowToggle>
          {faqData.map((item, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {index + 1}. {item.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Ans. {item.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
      {/* Contact Form Section */}
      <Box mt={10}>
        <Heading as="h2" ml={10} size="xl" mb={6}>
          Contact Us
        </Heading>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
          maxW="6xl"
          mx="auto"
        >
          {/* Contact Form */}
          <Box
            as="form"
            display="flex"
            flexDirection="column"
            gap={5}
            width="100%"
            maxWidth="500px"
            mx="auto"
            p={8}
            borderRadius="md"
            boxShadow="lg"
            bg="white"
          >
            <FormControl>
              <FormLabel htmlFor="name" fontWeight="bold" color="gray.700">
                Your Name
              </FormLabel>
              <Input
                id="name"
                type="text"
                border="2px solid"
                borderColor="gray.300"
                _focus={{ borderColor: "teal.400" }}
                borderRadius="md"
                px={4}
                py={2}
                fontSize="md"
                _placeholder={{ color: "gray.400" }}
                _hover={{ borderColor: "teal.300" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email" fontWeight="bold" color="gray.700">
                Your Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                border="2px solid"
                borderColor="gray.300"
                _focus={{ borderColor: "teal.400" }}
                borderRadius="md"
                px={4}
                py={2}
                fontSize="md"
                _placeholder={{ color: "gray.400" }}
                _hover={{ borderColor: "teal.300" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="message" fontWeight="bold" color="gray.700">
                Your Message
              </FormLabel>
              <Textarea
                id="message"
                rows={5}
                border="2px solid"
                borderColor="gray.300"
                _focus={{ borderColor: "teal.400" }}
                borderRadius="md"
                px={4}
                py={2}
                fontSize="md"
                _placeholder={{ color: "gray.400" }}
                _hover={{ borderColor: "teal.300" }}
              />
            </FormControl>
            <Button
              colorScheme="teal"
              type="submit"
              mt={4}
              fontWeight="bold"
              py={2}
            >
              Send Message
            </Button>
          </Box>

          {/* Map */}
          <Box
            width="100%"
            height="400px"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5257.711964254303!2d78.7539482285824!3d28.870228261200275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390af97cbfee0b99%3A0x964d3efb1d5bab5!2sMoradabad%20Institute%20of%20Technology%2C%20moradabad!5e0!3m2!1sen!2sin!4v1731236373547!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default About;
