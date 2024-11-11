import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Text,
  useToast,
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone"; // For drag-and-drop functionality
import { IoIosCloudUpload } from "react-icons/io"; // Icon for the upload button

const Disease = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { colorMode, toggleColorMode } = useColorMode(); // Hook for color mode
  const bg = useColorModeValue("white", "gray.800"); // Conditional background color
  const textColor = useColorModeValue("blue.900", "white"); // Conditional text color
  const inputBorderColor = useColorModeValue("gray.300", "gray.600"); // Border color for input
  const boxShadowColor = useColorModeValue("lg", "dark-lg"); // Box shadow for dark and light mode

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPrediction(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  // Drag-and-drop functionality
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    },
    accept: "image/*",
  });

  return (
    <Flex minHeight="100vh" justify="center" align="center" py={12}>
      <Box
        maxW="80%" // Set max width to 800px for a more compact layout
        w="full"
        p={8}
        spacing={8}
      >
        <Heading as="h1" size="2xl" color={textColor} textAlign="center" mb={6}>
          Leaf Disease Detection
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl mb={6}>
            <FormLabel htmlFor="image" fontWeight="medium" color={textColor}>
              Upload Leaf Image
            </FormLabel>
            <Box
              {...getRootProps()}
              border="2px dashed"
              borderColor={inputBorderColor}
              rounded="md"
              p={6}
              textAlign="center"
              cursor="pointer"
              _hover={{ borderColor: "blue.500" }}
              transition="border-color 0.3s ease-in-out"
              position="relative"
            >
              <input {...getInputProps()} id="image" />
              {image ? (
                <Text color="gray.600">Image Uploaded</Text>
              ) : (
                <>
                  <IconButton
                    icon={<IoIosCloudUpload />}
                    aria-label="Upload Image"
                    colorScheme="blue"
                    variant="ghost"
                    fontSize="2xl"
                    mb={4}
                  />
                  <Text fontSize="lg" color="gray.500">
                    Drag & Drop your image here
                  </Text>
                  <Text color="gray.600" mt={2}>
                    or click to browse
                  </Text>
                </>
              )}
            </Box>
          </FormControl>

          {imagePreview && (
            <Box mb={6} rounded="lg">
              <Image
                src={imagePreview}
                alt="Image Preview"
                width="200px" // Make it responsive, fit the container
                height="200px" // Maintain aspect ratio
                rounded="md"
                transition="transform 0.3s ease-in-out"
                boxShadow="lg"
              />
            </Box>
          )}

          <Button
            type="submit"
            isFullWidth
            isDisabled={!image || loading}
            colorScheme="green"
            isLoading={loading}
            loadingText="Detecting..."
            size="lg"
            mb={6}
            _hover={{ bg: "green.500" }}
          >
            {loading ? "Detecting..." : "Detect Disease"}
          </Button>
        </form>

        {prediction && (
          <Box
            p={6}
            rounded="lg"
            bg={bg} // Background changes based on color mode
            boxShadow={boxShadowColor}
            borderLeft="4px solid"
            borderColor="green.500"
          >
            <Heading size="md" color="green" mb={4}>
              Prediction: {prediction.prediction}
            </Heading>
            <Text fontSize="lg">
              <strong>Description:</strong> {prediction.description}
            </Text>
            <Text fontSize="lg" mt={2}>
              <strong>Possible Steps:</strong> {prediction.possible_steps}
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Disease;
