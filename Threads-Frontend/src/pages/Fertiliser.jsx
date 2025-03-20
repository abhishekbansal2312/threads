import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Spinner,
  Text,
  VStack,
  Heading,
  List,
  ListItem,
  ListIcon,
  Divider,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Fertiliser() {
  const [crop, setCrop] = useState("");
  const [soil, setSoil] = useState("");
  const [phLevel, setPhLevel] = useState("");
  const [climate, setClimate] = useState("");
  const [region, setRegion] = useState("");
  const [farmingMethod, setFarmingMethod] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyD8tzA0tcYIRx6KaAlIUAmIL9aVYzk7ekk"
  ); // Replace with a valid API key
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const getFertilizerSuggestion = async () => {
    setLoading(true);
    setSuggestion(null);

    const prompt = `
      Suggest the best fertilizers for a ${crop} crop in ${soil} soil 
      with a pH level of ${phLevel}. The region is ${region}, 
      and the climate condition is ${climate}. The farmer follows a 
      ${farmingMethod} farming method.
      
      Provide results in a structured JSON format with:
      - soil_type
      - ph_level
      - region
      - climate
      - farming_method
      - fertilizers object with organic and chemical arrays
      - soil_health_tips array
      - warnings array
    `;

    try {
      const result = await model.generateContent(prompt);
      console.log(result);
      console.log(result.response, " candidates");

      if (!result.response || !result.response.candidates) {
        throw new Error("No valid response from AI model.");
      }

      let responseText = result.response.candidates[0].content.parts[0].text;
      console.log("Raw AI Response:", responseText);

      // Extract valid JSON from Markdown block
      responseText = responseText.replace(/```json\n|\n```/g, "").trim();

      try {
        const formattedResponse = JSON.parse(responseText);
        console.log(formattedResponse, "formattedResponse");

        setSuggestion(formattedResponse);
      } catch (jsonError) {
        console.error("Invalid JSON response after cleaning:", responseText);
        setSuggestion({ error: "AI response format issue. Try again." });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSuggestion({
        error: "Failed to fetch recommendations. Try again later.",
      });
    }

    setLoading(false);
  };

  const renderSuggestionDetails = () => {
    if (!suggestion) return null;

    if (suggestion.error) {
      return (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{suggestion.error}</AlertDescription>
        </Alert>
      );
    }

    // Check if the response has the expected structure
    if (!suggestion.fertilizers) {
      return (
        <Alert status="warning">
          <AlertIcon />
          <AlertDescription>
            Unexpected response format. Please try again.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <Box>
        {/* Organic Fertilizers */}
        <Box mb={4}>
          <Heading size="md" mb={2}>
            Recommended Organic Fertilizers
            <Badge ml={2} colorScheme="green">
              Organic
            </Badge>
          </Heading>
          <List spacing={2}>
            {suggestion.fertilizers.organic.map((fert, index) => (
              <ListItem key={index} p={2} bg="green.50" borderRadius="md">
                <Text fontWeight="bold">
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  {fert.name}
                </Text>
                <Text ml={6}>{fert.benefits}</Text>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Chemical Fertilizers */}
        <Box mb={4}>
          <Heading size="md" mb={2}>
            Chemical Fertilizers
            <Badge ml={2} colorScheme="purple">
              Chemical
            </Badge>
          </Heading>
          <List spacing={2}>
            {suggestion.fertilizers.chemical.map((fert, index) => (
              <ListItem key={index} p={2} bg="purple.50" borderRadius="md">
                <Text fontWeight="bold">
                  <ListIcon as={CheckCircleIcon} color="purple.500" />
                  {fert.name}
                </Text>
                <Text ml={6}>{fert.usage}</Text>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Additional Tips */}
        <Box mb={4}>
          <Heading size="md" mb={2}>
            Soil Health Tips
            <Badge ml={2} colorScheme="blue">
              Tips
            </Badge>
          </Heading>
          <List spacing={2}>
            {suggestion.soil_health_tips.map((tip, index) => (
              <ListItem key={index} p={2} bg="blue.50" borderRadius="md">
                <ListIcon as={CheckCircleIcon} color="blue.500" />
                {tip}
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Warnings */}
        {suggestion.warnings && suggestion.warnings.length > 0 && (
          <Box mb={4}>
            <Heading size="md" mb={2}>
              Warnings
              <Badge ml={2} colorScheme="red">
                Important
              </Badge>
            </Heading>
            <Alert status="warning" variant="left-accent">
              <Box>
                <List spacing={2} mt={2}>
                  {suggestion.warnings.map((warning, index) => (
                    <ListItem key={index}>
                      <ListIcon as={WarningIcon} color="orange.500" />
                      {warning}
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Alert>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box p={6} maxW="4xl" mx="auto" mt={4} bg="white" shadow="md" rounded="lg">
      <Heading size="lg" mb={4} color="blue.600">
        Fertilizer Suggestion System
      </Heading>

      <VStack spacing={3} align="stretch">
        <Input
          placeholder="Crop Type (e.g., Wheat, Rice)"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
        />
        <Select
          placeholder="Select Soil Type"
          value={soil}
          onChange={(e) => setSoil(e.target.value)}
        >
          <option value="Sandy">Sandy</option>
          <option value="Clay">Clay</option>
          <option value="Loamy">Loamy</option>
          <option value="Silty">Silty</option>
          <option value="Peaty">Peaty</option>
          <option value="Chalky">Chalky</option>
          <option value="Black">Black</option>
          <option value="Red">Red</option>
          <option value="Alluvial">Alluvial</option>
          <option value="Laterite">Laterite</option>
          <option value="Sandy Loam">Sandy Loam</option>
          <option value="Clay Loam">Clay Loam</option>
          <option value="Silt Loam">Silt Loam</option>
          <option value="Sandy Clay">Sandy Clay</option>
          <option value="Sandy Clay Loam">Sandy Clay Loam</option>
          <option value="Silty Clay">Silty Clay</option>
          <option value="Silty Clay Loam">Silty Clay Loam</option>
        </Select>
        <Select
          placeholder="Select pH Level"
          value={phLevel}
          onChange={(e) => setPhLevel(e.target.value)}
        >
          <option value="4.0">4.0 (Very Acidic)</option>
          <option value="4.5">4.5</option>
          <option value="5.0">5.0 (Acidic)</option>
          <option value="5.5">5.5</option>
          <option value="6.0">6.0 (Slightly Acidic)</option>
          <option value="6.5">6.5 (Ideal for Most Crops)</option>
          <option value="7.0">7.0 (Neutral)</option>
          <option value="7.5">7.5</option>
          <option value="8.0">8.0 (Alkaline)</option>
          <option value="8.5">8.5</option>
          <option value="9.0">9.0 (Very Alkaline)</option>
        </Select>
        <Select
          placeholder="Select Climate Condition"
          value={climate}
          onChange={(e) => setClimate(e.target.value)}
        >
          <option value="Arid">Arid</option>
          <option value="Semi-Arid">Semi-Arid</option>
          <option value="Humid">Humid</option>
          <option value="Sub-Humid">Sub-Humid</option>
          <option value="Tropical">Tropical</option>
          <option value="Subtropical">Subtropical</option>
          <option value="Temperate">Temperate</option>
          <option value="Continental">Continental</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Monsoon">Monsoon</option>
          <option value="Alpine">Alpine</option>
        </Select>
        <Select
          placeholder="Select Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          {/* India Regions */}
          <option value="North India">North India</option>
          <option value="South India">South India</option>
          <option value="East India">East India</option>
          <option value="West India">West India</option>
          <option value="Central India">Central India</option>
          <option value="Northeast India">Northeast India</option>
          <option value="Indo-Gangetic Plain">Indo-Gangetic Plain</option>
          <option value="Deccan Plateau">Deccan Plateau</option>
          <option value="Coastal India">Coastal India</option>

          {/* Indian States */}
          <option value="Punjab">Punjab</option>
          <option value="Haryana">Haryana</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Bihar">Bihar</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Telangana">Telangana</option>
          <option value="Kerala">Kerala</option>
          <option value="Odisha">Odisha</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Assam">Assam</option>

          {/* Global Regions */}
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="East Asia">East Asia</option>
          <option value="Southeast Asia">Southeast Asia</option>
          <option value="Middle East">Middle East</option>
          <option value="Central Asia">Central Asia</option>
          <option value="Australia">Australia</option>
          <option value="Pacific Islands">Pacific Islands</option>
        </Select>
        <Select
          placeholder="Farming Method"
          value={farmingMethod}
          onChange={(e) => setFarmingMethod(e.target.value)}
        >
          <option value="Organic">Organic</option>
          <option value="Conventional">Conventional</option>
          <option value="Mixed">Mixed</option>
          <option value="Sustainable">Sustainable</option>
          <option value="Biodynamic">Biodynamic</option>
          <option value="Precision">Precision</option>
          <option value="Conservation">Conservation</option>
        </Select>

        <Button
          colorScheme="blue"
          onClick={getFertilizerSuggestion}
          isDisabled={loading}
          size="lg"
          mt={2}
        >
          {loading ? <Spinner size="sm" mr={2} /> : null}
          {loading ? "Getting Suggestions..." : "Get Suggestion"}
        </Button>
      </VStack>

      {suggestion && (
        <Box mt={6} p={4} bg="gray.50" rounded="md" shadow="sm">
          <Divider mb={4} />
          {renderSuggestionDetails()}
        </Box>
      )}
    </Box>
  );
}
