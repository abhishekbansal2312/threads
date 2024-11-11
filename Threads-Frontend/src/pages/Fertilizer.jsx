import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";

const Fertilizer = () => {
  const [formData, setFormData] = useState({
    temp: "",
    humid: "",
    mois: "",
    soil: "",
    crop: "",
    nitro: "",
    pota: "",
    phos: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    try {
      // Send POST request to Flask backend
      const response = await axios.post(
        "http://127.0.0.1:8002/predict",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResult(response.data.result);
    } catch (err) {
      setError(
        err.response ? err.response.data.error : "Error submitting form"
      );
    }
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      p="6"
      bg="gray.100"
      borderRadius="md"
      boxShadow="lg"
      mt="8"
    >
      <Heading color="teal.500" textAlign="center" mb="8" fontSize="2xl">
        Fertilizer Recommendation
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Temperature</FormLabel>
          <Input
            type="number"
            name="temp"
            placeholder="Enter temperature (°C)"
            value={formData.temp}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Humidity</FormLabel>
          <Input
            type="number"
            name="humid"
            placeholder="Enter humidity (%)"
            value={formData.humid}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Moisture</FormLabel>
          <Input
            type="number"
            name="mois"
            placeholder="Enter moisture level (%)"
            value={formData.mois}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Soil Type</FormLabel>
          <Select
            name="soil"
            placeholder="Select soil type"
            value={formData.soil}
            onChange={handleChange}
          >
            <option value="0">Black</option>
            <option value="1">Clayey</option>
            <option value="2">Loamy</option>
            <option value="3">Red</option>
            <option value="4">Sandy</option>
          </Select>
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Crop Type</FormLabel>
          <Select
            name="crop"
            placeholder="Select crop type"
            value={formData.crop}
            onChange={handleChange}
          >
            <option value="0">Barley</option>
            <option value="1">Cotton</option>
            <option value="2">Ground Nuts</option>
            <option value="3">Maize</option>
            <option value="4">Millets</option>
            <option value="5">Oil Seeds</option>
            <option value="6">Paddy</option>
            <option value="7">Pulses</option>
            <option value="8">Sugarcane</option>
            <option value="9">Tobacco</option>
            <option value="10">Wheat</option>
            <option value="11">Coffee</option>
            <option value="12">Kidney Beans</option>
            <option value="13">Orange</option>
            <option value="14">Pomegranate</option>
            <option value="15">Rice</option>
            <option value="16">Watermelon</option>
          </Select>
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Nitrogen</FormLabel>
          <Input
            type="number"
            name="nitro"
            placeholder="Enter nitrogen content"
            value={formData.nitro}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Potassium</FormLabel>
          <Input
            type="number"
            name="pota"
            placeholder="Enter potassium content"
            value={formData.pota}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Phosphorus</FormLabel>
          <Input
            type="number"
            name="phos"
            placeholder="Enter phosphorus content"
            value={formData.phos}
            onChange={handleChange}
          />
        </FormControl>

        <Button colorScheme="teal" type="submit" mt="4" width="full">
          Predict
        </Button>
      </form>

      {result && (
        <Box mt="8" p="4" bg="green.100" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" color="green.700">
            Recommended Fertilizer: {result}
          </Text>
        </Box>
      )}
      {error && (
        <Text color="red.500" mt="4">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default Fertilizer;
