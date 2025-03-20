/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // For navigation
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Alert,
  Flex,
  AlertIcon,
  SimpleGrid,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";

const PredictForm = () => {
  const [formData, setFormData] = useState({
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    pH: "",
    Rainfall: "",
    id: 3,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Navigate to the result page
  const { colorMode, toggleColorMode } = useColorMode(); // Hook for dark mode

  const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear previous error when user starts typing
    if (error) setError(null);
  };

  const handleFetchWeather = async () => {
    try {
      const response = await axios.get(
        `${api.base}weather?q=London&appid=${api.key}&units=metric`
      );
      const { temp, humidity, temp_min, temp_max } = response.data.main;
      const averageTemp = (temp + temp_min + temp_max) / 3;

      setFormData((prevState) => ({
        ...prevState,
        Temperature: Math.floor(averageTemp),
        Humidity: humidity,
      }));
    } catch (err) {
      setError("Error fetching weather data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (
      !formData.Nitrogen ||
      !formData.Phosphorus ||
      !formData.Potassium ||
      !formData.Temperature ||
      !formData.Humidity ||
      !formData.pH ||
      !formData.Rainfall
    ) {
      setError("All fields are required!");
      return;
    }

    setFormData;

    // Range validation
    if (formData.Nitrogen < 0 || formData.Nitrogen > 100) {
      setError("Nitrogen must be between 0 and 100!");
      return;
    }
    if (formData.Phosphorus < 0 || formData.Phosphorus > 100) {
      setError("Phosphorus must be between 0 and 100!");
      return;
    }
    if (formData.Potassium < 0 || formData.Potassium > 100) {
      setError("Potassium must be between 0 and 100!");
      return;
    }
    if (formData.Temperature < -30 || formData.Temperature > 50) {
      setError("Temperature must be between -30°C and 50°C!");
      return;
    }
    if (formData.Humidity < 0 || formData.Humidity > 100) {
      setError("Humidity must be between 0% and 100%!");
      return;
    }
    if (formData.pH < 0 || formData.pH > 14) {
      setError("pH level must be between 0 and 14!");
      return;
    }
    if (formData.Rainfall < 0 || formData.Rainfall > 500) {
      setError("Rainfall must be between 0 and 500 mm!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5002/predict",
        formData
      );
      const result = response.data;
      setError(null);

      // Store result in localStorage and navigate to the result page
      localStorage.setItem("predictionResult", JSON.stringify(result));
      navigate("/result");
    } catch (err) {
      setError("Error while fetching prediction");
    }
  };

  const handleReset = () => {
    setFormData({
      Nitrogen: "",
      Phosphorus: "",
      Potassium: "",
      Temperature: "",
      Humidity: "",
      pH: "",
      Rainfall: "",
      id: Cookies.get("token"),
    });
    setError(null);
  };

  return (
    <Box
      maxW="900px"
      mx="auto"
      mt={5}
      p={6}
      bg={colorMode === "light" ? "gray.50" : "gray.700"}
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading
        as="h1"
        size="xl"
        textAlign="center"
        mb={6}
        color={colorMode === "light" ? "teal.500" : "teal.300"}
      >
        Crop Prediction
      </Heading>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <SimpleGrid columns={[1, 2]} spacing={4} width="full">
          <FormControl isRequired>
            <FormLabel htmlFor="Nitrogen">Nitrogen</FormLabel>
            <Tooltip
              label="Enter the nitrogen level of the soil"
              aria-label="Nitrogen tooltip"
            >
              <Input
                type="number"
                name="Nitrogen"
                value={formData.Nitrogen}
                onChange={handleChange}
                id="Nitrogen"
                placeholder="Enter Nitrogen level"
              />
            </Tooltip>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="Phosphorus">Phosphorus</FormLabel>
            <Tooltip
              label="Enter the phosphorus level of the soil"
              aria-label="Phosphorus tooltip"
            >
              <Input
                type="number"
                name="Phosphorus"
                value={formData.Phosphorus}
                onChange={handleChange}
                id="Phosphorus"
                placeholder="Enter Phosphorus level"
              />
            </Tooltip>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="Potassium">Potassium</FormLabel>
            <Tooltip
              label="Enter the potassium level of the soil"
              aria-label="Potassium tooltip"
            >
              <Input
                type="number"
                name="Potassium"
                value={formData.Potassium}
                onChange={handleChange}
                id="Potassium"
                placeholder="Enter Potassium level"
              />
            </Tooltip>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="Temperature">Temperature (°C)</FormLabel>
            <Tooltip
              label="Enter the temperature of the region"
              aria-label="Temperature tooltip"
            >
              <Input
                type="number"
                name="Temperature"
                value={formData.Temperature}
                onChange={handleChange}
                id="Temperature"
                placeholder="Enter Temperature"
              />
            </Tooltip>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="Humidity">Humidity (%)</FormLabel>
            <Tooltip
              label="Enter the humidity percentage"
              aria-label="Humidity tooltip"
            >
              <Input
                type="number"
                name="Humidity"
                value={formData.Humidity}
                onChange={handleChange}
                id="Humidity"
                placeholder="Enter Humidity level"
              />
            </Tooltip>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="pH">Soil pH</FormLabel>
            <Tooltip
              label="Enter the pH level of the soil"
              aria-label="pH tooltip"
            >
              <Input
                type="number"
                name="pH"
                value={formData.pH}
                onChange={handleChange}
                id="pH"
                placeholder="Enter pH level"
              />
            </Tooltip>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="Rainfall">Rainfall (mm)</FormLabel>
            <Tooltip
              label="Enter the rainfall measurement in mm"
              aria-label="Rainfall tooltip"
            >
              <Input
                type="number"
                name="Rainfall"
                value={formData.Rainfall}
                onChange={handleChange}
                id="Rainfall"
                placeholder="Enter Rainfall level"
              />
            </Tooltip>
          </FormControl>
        </SimpleGrid>

        <Flex direction="row" justify="space-between" width="full" mt={4}>
          <Button
            type="button"
            colorScheme="blue"
            width="30%"
            onClick={handleFetchWeather}
          >
            Fetch Weather
          </Button>

          <Button type="submit" colorScheme="teal" width="30%">
            Submit
          </Button>

          <Button
            type="button"
            colorScheme="gray"
            width="30%"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Flex>

        {error && (
          <Alert status="error" width="full">
            <AlertIcon />
            {error}
          </Alert>
        )}
      </VStack>
    </Box>
  );
};

export default PredictForm;
