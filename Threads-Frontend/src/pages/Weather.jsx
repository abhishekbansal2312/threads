import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Input,
  Text,
  Heading,
  VStack,
  HStack,
  Spinner,
  Button,
  Icon,
  useColorMode,
  useColorModeValue,
  Grid,
  GridItem,
  Flex,
  SimpleGrid,
  Center,
  flexbox,
} from "@chakra-ui/react";
import { MdLocationSearching } from "react-icons/md";
import {
  WiSunrise,
  WiSunset,
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiDayCloudy,
} from "react-icons/wi";
import { FaTint, FaWind, FaTemperatureHigh, FaArrowUp } from "react-icons/fa";

// Helper function to get the appropriate weather icon
const getWeatherIcon = (condition) => {
  switch (condition) {
    case "Clear":
      return WiDaySunny;
    case "Clouds":
      return WiCloudy;
    case "Rain":
      return WiRain;
    case "Thunderstorm":
      return WiThunderstorm;
    case "Snow":
      return WiSnow;
    case "Fog":
    case "Mist":
    case "Haze":
      return WiFog;
    default:
      return WiDayCloudy;
  }
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [hourlyData, setHourlyData] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [localTime, setLocalTime] = useState(new Date());
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const apiforecast = {
    key: "38563a45e910840c283837a6959d2880",
    base: "https://api.openweathermap.org/data/2.5/forecast",
  };

  useEffect(() => {
    getLocationWeather();
    const interval = setInterval(() => setLocalTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getLocationWeather = () => {
    setLoading(true);
    setError("");
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Fetch forecast data (for hourly data)
          const forecastResponse = await axios.get(
            `${apiforecast.base}?lat=${latitude}&lon=${longitude}&appid=${apiforecast.key}&units=metric`
          );
          setHourlyData(forecastResponse.data.list.slice(0, 8)); // First 8 intervals (next 24 hours)
          console.log(hourlyData);

          // Fetch current weather data
          const weatherResponse = await axios.get(
            `${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`
          );
          setWeather(weatherResponse.data);
        } catch (err) {
          setError("Unable to fetch weather data.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLocationError("Location access denied. Please search manually.");
        setLoading(false);
      }
    );
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      setError("");
      setWeather(null);
      setHourlyData([]);

      try {
        // Fetch current weather data for the searched location
        const weatherResponse = await axios.get(
          `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
        );
        setWeather(weatherResponse.data);

        // Fetch hourly forecast data for the searched location
        const forecastResponse = await axios.get(
          `${apiforecast.base}?lat=${weatherResponse.data.coord.lat}&lon=${weatherResponse.data.coord.lon}&appid=${apiforecast.key}&units=metric`
        );
        setHourlyData(forecastResponse.data.list.slice(0, 8)); // Get the next 8 intervals (next 24 hours)

        setQuery("");
      } catch (err) {
        setError("City not found");
        setWeather(null);
        setHourlyData([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return `${days[d.getDay()]}, ${d.getDate()} ${
      months[d.getMonth()]
    } ${d.getFullYear()}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Box
      maxW="90%"
      mx="auto"
      mt="8"
      p="8"
      bg={bgColor}
      color={textColor}
      borderRadius="lg"
      boxShadow="xl"
    >
      <VStack spacing="4">
        <HStack w="100%">
          <Input
            variant="outline"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleSearch}
            bg={useColorModeValue("white", "gray.700")}
            color={textColor}
            borderRadius="md"
          />
          <Button
            leftIcon={<MdLocationSearching />}
            onClick={getLocationWeather}
            size="md"
            colorScheme="blue"
            variant="solid"
            borderRadius="md"
          >
            My Location
          </Button>
        </HStack>

        {loading && <Spinner color="blue.500" size="lg" />}
        {locationError && <Text color="yellow.400">{locationError}</Text>}
        {error && <Text color="red.400">{error}</Text>}

        {weather && (
          <Grid templateColumns="40% 60%" gap={8} w="100%" mt={10}>
            <GridItem>
              <VStack align="start" spacing="2">
                <Heading fontSize="20px">{dateBuilder(new Date())}</Heading>
                <Text fontSize="80px" fontFamily={"monospace"}>
                  {localTime.toLocaleTimeString()}
                </Text>
                <Heading fontSize="40px">{`${weather.name}, ${weather.sys.country}`}</Heading>
              </VStack>
            </GridItem>

            <GridItem>
              <Flex
                direction="row"
                justify="space-between"
                align="center"
                p="6"
                borderRadius="lg"
                gap="4"
              >
                <VStack align="flex-start" w="35%">
                  <Text fontSize="6xl" fontWeight="bold">
                    {Math.round(weather.main.temp)}°C
                  </Text>
                  <Text fontSize="lg" color="gray.500">
                    Feels Like: {Math.round(weather.main.feels_like)}°C
                  </Text>
                  <HStack spacing="2" align="center">
                    <Icon as={WiSunrise} boxSize="8" color="orange.400" />
                    <Text fontSize="sm" color="gray.400">
                      Sunrise: {formatTime(weather.sys.sunrise)}
                    </Text>
                  </HStack>
                  <HStack spacing="2" align="center">
                    <Icon as={WiSunset} boxSize="8" color="orange.400" />
                    <Text fontSize="sm" color="gray.400">
                      Sunset: {formatTime(weather.sys.sunset)}
                    </Text>
                  </HStack>
                </VStack>

                <VStack justify="center" w="30%" textAlign="center">
                  <Icon
                    as={getWeatherIcon(weather.weather[0].main)}
                    boxSize="32"
                    color="yellow.300"
                  />
                  <Text
                    fontSize="2xl"
                    textTransform="capitalize"
                    fontWeight="bold"
                  >
                    {weather.weather[0].description}
                  </Text>
                </VStack>

                <VStack align="flex-start">
                  <SimpleGrid columns={2} spacing="4">
                    <VStack align="center">
                      <FaTint size="1.5rem" />
                      <Text fontSize="lg">{weather.main.humidity}%</Text>
                      <Text fontSize="sm" color="gray.500">
                        Humidity
                      </Text>
                    </VStack>
                    <VStack align="center">
                      <FaWind size="1.5rem" />
                      <Text fontSize="lg">{weather.wind.speed} m/s</Text>
                      <Text fontSize="sm" color="gray.500">
                        Wind Speed
                      </Text>
                    </VStack>
                    <VStack align="center">
                      <FaTemperatureHigh size="1.5rem" />
                      <Text fontSize="lg">
                        {Math.round(weather.main.temp_max)}°C
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Max Temp
                      </Text>
                    </VStack>
                    <VStack align="center">
                      <FaArrowUp size="1.5rem" />
                      <Text fontSize="lg">
                        {Math.round(weather.main.temp_min)}°C
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Min Temp
                      </Text>
                    </VStack>
                  </SimpleGrid>
                </VStack>
              </Flex>
            </GridItem>
          </Grid>
        )}
      </VStack>
      <Center>
        <HStack spacing={5} width="full" justify="center" align="center">
          {hourlyData.map((hour, index) => (
            <VStack
              key={index}
              align="center"
              display="flex"
              justifyContent="center"
              p={4}
              borderRadius="md"
              bg={useColorModeValue("gray.100", "gray.700")} // Light and dark mode background color
              minWidth="115px" // Adjust width to control size
              flexShrink={0} // Prevents the item from shrinking in the row
            >
              {/* Time */}
              <Box>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color={useColorModeValue("gray.800", "white")}
                >
                  {new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Box>

              {/* Weather Icon */}
              <Box>
                <Icon
                  as={getWeatherIcon(hour.weather[0].main)}
                  boxSize={6}
                  color={useColorModeValue("gray.800", "white")}
                />
              </Box>

              {/* Temperature */}
              <Box>
                <Text
                  fontSize="md"
                  color={useColorModeValue("gray.800", "white")}
                >
                  {Math.round(hour.main.temp)}°C
                </Text>
              </Box>

              {/* Condition Description */}
              <Box>
                <Text
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.300")}
                >
                  {hour.weather[0].description}
                </Text>
              </Box>
            </VStack>
          ))}
        </HStack>
      </Center>
    </Box>
  );
};

export default Weather;
