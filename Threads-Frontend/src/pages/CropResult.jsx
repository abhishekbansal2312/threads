import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Button,
  useColorMode,
  Image,
  Flex,
  flexbox,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("predictionResult"));
    if (result) {
      setPredictionResult(result);
    } else {
      navigate("/"); // Redirect to home if no result found
    }
  }, [navigate]);

  const getCropDetails = (cropName) => {
    const cropDetails = {
      Rice: {
        name: "Rice",
        image:
          "https://images.unsplash.com/photo-1592997571659-0b21ff64313b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Rice is a staple food for more than half the global population. It is cultivated in waterlogged fields,      requiring consistent irrigation and warm temperatures for optimal growth. Originating in Asia, rice is highly adaptable and comes in numerous varieties, including basmati, jasmine, and wild rice. Rich in carbohydrates, it is a key source of energy and an essential part of many cuisines worldwide. Its by-products, such as bran and husk, are also valuable in industries like animal feed and cosmetics. With cultural and economic significance, rice cultivation sustains millions of livelihoods globally.",
      },
      Maize: {
        name: "Maize",
        image:
          "https://plus.unsplash.com/premium_photo-1667047164703-15ffa198f8d4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Maize, or corn, is one of the world's most versatile and widely grown crops. Native to Central America, it thrives in diverse climates and is used in numerous ways, including as a staple food, livestock feed, and industrial ingredient. Maize kernels can be processed into cornmeal, oil, or syrup and used in products like tortillas, popcorn, and sweeteners. It is a significant source of dietary fiber and vitamins. Maize also has applications in biofuel production and biodegradable plastics, showcasing its importance beyond food. With high adaptability and productivity, maize is integral to global agriculture and industry.",
      },
      Jute: {
        name: "Jute",
        image:
          "https://plus.unsplash.com/premium_photo-1674624789813-aee3aaa976cb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Jute is a natural fiber crop grown primarily in tropical and subtropical regions, such as India and Bangladesh. Known as the golden fiber, it is renowned for its eco-friendly qualities and biodegradability. The long, shiny fibers are extracted from the plant's stalk and are used to make ropes, sacks, rugs, and textiles. Jute grows quickly in fertile, water-retentive soils and requires minimal chemical inputs, making it a sustainable crop. Its cultivation supports rural economies and aligns with global efforts to reduce plastic use. Beyond its industrial uses, jute also enhances soil health and serves as organic mulch.",
      },
      Cotton: {
        name: "Cotton",
        image:
          "https://images.unsplash.com/photo-1616431084308-0c125e65ad0d?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Cotton is a soft, fluffy fiber that grows around the seeds of the cotton plant. It is primarily used in the textile industry to produce clothing, bed linens, and various household items. Cultivated in warm climates, cotton requires moderate rainfall and well-drained soil for optimal growth. The crop also has by-products, such as cottonseed oil used in cooking and cottonseed meal for livestock feed. Cotton is valued for its comfort, durability, and breathability. However, its cultivation can be resource-intensive, necessitating sustainable practices to minimize water usage and pesticide reliance while supporting global textile demands.",
      },
      Coconut: {
        name: "Coconut",
        image:
          "https://images.unsplash.com/photo-1581453883350-288b2c19bea8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Coconut is a tropical fruit known for its versatility and nutritional value. The fruit's water is refreshing and hydrating, while its meat is used in cooking, desserts, and snacks. Coconut oil is a popular product for culinary, cosmetic, and medicinal purposes. Additionally, the fibrous husk and hard shell are utilized in making ropes, mats, and activated charcoal. Coconut trees thrive in coastal regions with sandy soil and high humidity. They are a vital part of many tropical economies, providing food, materials, and livelihood. The fruit symbolizes resilience, thriving in challenging conditions, and offering immense benefits.",
      },
      Papaya: {
        name: "Papaya",
        image:
          "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwYXlhfGVufDB8fDB8fHww",
        description:
          "Papaya is a tropical fruit known for its sweet, orange flesh and numerous health benefits. Rich in vitamins A, C, and E, it supports immune health, digestion, and skin vitality. Papayas are grown in warm climates, requiring well-drained soil and moderate rainfall. The fruit is eaten fresh, juiced, or added to salads and desserts. Its seeds are edible with a peppery taste, while its leaves are used in traditional remedies. Papaya contains papain, an enzyme that aids in digestion and tenderizes meat. Easy to cultivate, the fruit is a popular choice for home gardens and commercial farming.",
      },
      Orange: {
        name: "Orange",
        image:
          "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Oranges are juicy citrus fruits known for their vibrant flavor and high vitamin C content. They grow on evergreen trees in warm climates with balanced rainfall and moderate humidity. Oranges are consumed fresh, juiced, or used in desserts, marmalades, and sauces. They require nitrogen, phosphorus, and potassium for healthy growth and fruit development. The fruit’s peel is used for zest, essential oils, and composting. Oranges support immunity, skin health, and hydration. They are a staple in global agriculture, with significant cultural and economic importance, especially in regions like Spain, Florida, and Brazil.",
      },
      Apple: {
        name: "Apple",
        image:
          "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Apples are crisp, sweet fruits cultivated in temperate regions worldwide. Available in various colors and flavors, apples are enjoyed fresh, baked, or juiced. They are rich in dietary fiber, antioxidants, and vitamins, promoting digestive and cardiovascular health. Apple trees require cold winters for dormancy and thrive in well-drained, fertile soil. The fruit is highly versatile, used in cider, pies, and sauces. With a long shelf life and storability, apples are a commercial and culinary staple. They are a symbol of health and tradition, celebrated in cuisines and cultures globally.",
      },
      Muskmelon: {
        name: "Muskmelon",
        image:
          "https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/05/18150019/shutterstock_1376235665-1.jpg",
        description:
          "Muskmelon is a sweet, aromatic fruit with orange flesh, enjoyed as a refreshing treat in hot weather. It is cultivated in warm climates with sandy, well-drained soil and requires moderate irrigation. Rich in vitamins A and C, muskmelon supports vision, immunity, and hydration. The fruit is often eaten fresh or added to salads and smoothies. Its seeds are edible and used in snacks or health products. Easy to grow, muskmelon has a short cultivation period, making it a favorite for farmers and gardeners. Its refreshing taste and nutritional value make it a summer favorite.",
      },
      Watermelon: {
        name: "Watermelon",
        image:
          "https://images.unsplash.com/photo-1563114773-84221bd62daa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Watermelon is a large, juicy fruit with sweet red flesh and black seeds, ideal for summer. It thrives in warm climates with sandy soil and requires ample sunlight. The fruit is rich in water, vitamins A and C, and antioxidants, promoting hydration and overall health. Watermelon is eaten fresh, in salads, or blended into juices. Its rind is also used in pickles or compost. Easy to cultivate, watermelon has a short growing season, making it popular among farmers. The fruit’s refreshing nature and health benefits make it a staple in many cuisines.",
      },
      Grapes: {
        name: "Grapes",
        image:
          "https://images.unsplash.com/photo-1625499940894-8796928bf9c4?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Grapes are small, sweet fruits grown in clusters on vines, used for eating, winemaking, and drying into raisins. They thrive in warm, dry climates with well-drained soil. Rich in antioxidants, grapes support heart health and immunity. Table grapes are eaten fresh, while wine grapes are processed into red, white, or sparkling wines. Grapes are also used in juices, jams, and jellies. Their cultivation requires careful pruning and pest management to ensure quality. With cultural and economic importance, grapes are a cornerstone of global agriculture and cuisine.",
      },
      Mango: {
        name: "Mango",
        image:
          "https://images.unsplash.com/photo-1582655299221-2b6bff351df0?q=80&w=1781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Mango is a tropical fruit celebrated for its sweet, juicy flesh and distinct aroma. Originating in South Asia, it thrives in warm climates with moderate rainfall and well-drained soil. Mangos come in various sizes and flavors, consumed fresh or used in juices, desserts, and pickles. Rich in vitamins A and C, they support immunity, skin health, and vision. The fruit’s peel and seed are used in traditional medicine. Mango trees are culturally significant, symbolizing prosperity and love in many traditions. They are a vital crop in countries like India, Thailand, and the Philippines.",
      },
      Banana: {
        name: "Banana",
        image:
          "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Banana is a tropical fruit with yellow skin and soft, sweet flesh. Rich in potassium, fiber, and vitamins B6 and C, bananas support heart health, digestion, and energy. They grow on herbaceous plants in clusters called bunches and thrive in warm, humid climates with well-drained soil. Bananas are consumed fresh, blended into smoothies, or used in baking and cooking. The fruit's peel can be composted or used for skincare. A staple in many countries, bananas play a crucial role in global food security and trade. Their versatility and nutrition make them one of the most popular fruits worldwide.",
      },
      Pomegranate: {
        name: "Pomegranate",
        image:
          "https://images.unsplash.com/photo-1667885098658-7e34d751fded?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Pomegranate is a fruit with a tough outer skin and jewel-like red seeds known as arils. It thrives in warm climates with well-drained soil and tolerates drought conditions. Rich in antioxidants, vitamins C and K, and fiber, pomegranates support heart health, digestion, and immunity. The seeds are eaten fresh, juiced, or used in salads, desserts, and sauces. The fruit also holds cultural and symbolic significance in many traditions, representing fertility and abundance. Pomegranate trees are hardy and low-maintenance, making them suitable for various regions. Their vibrant taste and health benefits make them a sought-after fruit.",
      },
      Lentil: {
        name: "Lentil",
        image:
          "https://plus.unsplash.com/premium_photo-1671130295987-13d3b3b4e9dc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Lentils are small, lens-shaped legumes rich in protein, fiber, and essential nutrients like iron and folate. They are a staple in vegetarian diets and are used in soups, stews, curries, and salads. Lentils grow in well-drained soil and thrive in semi-arid climates. They are a short-duration crop and an excellent choice for crop rotation due to their nitrogen-fixing properties, which enrich the soil. Lentils come in various types, such as red, green, and black, each offering unique flavors and cooking characteristics. Their affordability, ease of preparation, and nutritional value make them an essential part of diets worldwide.",
      },
      Blackgram: {
        name: "Blackgram",
        image:
          "https://www.stylecraze.com/wp-content/uploads/2022/02/7-Benefits-Of-Including-Black-Gram-In-Your-Diet-Banner.jpg",
        description:
          "Blackgram, also known as urad dal, is a small black legume widely used in Indian cuisine. It is a rich source of protein, fiber, and essential minerals like magnesium and potassium. Blackgram thrives in warm climates with well-drained soil and is often grown as a rotational crop. It is used to make traditional dishes like dal, dosa, and idli. The crop improves soil fertility through nitrogen fixation, benefiting subsequent crops. Blackgram is drought-resistant and requires minimal inputs, making it an economical choice for farmers. Its versatility in cooking and nutritional benefits make it a dietary staple.",
      },
      Mungbean: {
        name: "Mungbean",
        image:
          "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/324156_2200-800x1200.jpg",
        description:
          "Mungbean is a small, green legume widely used in Asian cuisines and valued for its nutritional content. It is rich in protein, fiber, vitamins, and minerals, making it a staple in vegetarian diets. Mungbeans are commonly sprouted and consumed in salads or cooked in soups and curries. The plant thrives in warm climates with well-drained soil and has a short growing cycle. It is also a nitrogen-fixing crop, enhancing soil fertility. Mungbeans are easy to digest and have a mild flavor, making them a popular choice for health-conscious individuals and traditional culinary preparations.",
      },
      Mothbeans: {
        name: "Mothbeans",
        image: "https://nishamadhulika.com/imgpst/featured/moth-beans.jpg",
        description:
          "Mothbeans are a drought-resistant legume grown in arid and semi-arid regions. They are a vital source of protein, fiber, and essential nutrients, often used in traditional dishes like dals and snacks. The crop thrives in sandy soil with minimal rainfall and is highly resilient to harsh conditions. Mothbeans are also used as fodder for livestock, making them valuable for mixed farming systems. Their ability to fix nitrogen improves soil fertility, supporting sustainable agriculture. With a nutty flavor and versatile usage, mothbeans are an essential food source in regions prone to water scarcity.",
      },
      Pigeonpeas: {
        name: "Pigeonpeas",
        image:
          "https://5.imimg.com/data5/SELLER/Default/2021/11/HW/CP/XB/10888193/pigeon-pea-seeds.jpg",
        description:
          "Pigeonpeas are protein-rich legumes widely grown in tropical and subtropical regions. They are a staple in many cuisines, used in soups, stews, and dals. The crop thrives in warm climates with well-drained soil and tolerates drought conditions, making it suitable for marginal lands. Pigeonpeas are also valuable as a nitrogen-fixing crop, enhancing soil health. Their long growing season and ability to intercrop with other plants make them an important agricultural resource. With high nutritional value and versatility, pigeonpeas play a crucial role in food security, especially in regions with limited agricultural resources.",
      },
      Kidneybeans: {
        name: "Kidneybeans",
        image:
          "https://5.imimg.com/data5/SELLER/Default/2022/10/LK/FW/QH/71853916/image-a17ffd00-73ea-495a-bd90-f3b09829eabc-1024x1024-2x.webp",
        description:
          "Kidneybeans are large, kidney-shaped legumes widely used in dishes like chili, soups, and salads. They are rich in protein, fiber, iron, and vitamins, promoting heart health and digestion. The crop thrives in warm climates with well-drained, fertile soil and requires consistent irrigation. Kidneybeans come in various types, including red, white, and speckled, each with unique culinary applications. They are typically dried and require soaking before cooking. Easy to store and prepare, kidneybeans are a staple in global diets, valued for their affordability, nutrition, and versatility in both vegetarian and meat-based recipes.",
      },
      Chickpea: {
        name: "Chickpea",
        image:
          "https://itsavegworldafterall.com/wp-content/uploads/2023/03/How-to-Cook-Chickpeas-FI.jpg",
        description:
          "Chickpea, also known as garbanzo bean, is a versatile legume used in dishes like hummus, curries, and salads. It is a rich source of protein, fiber, and essential nutrients like iron and folate. Chickpeas thrive in well-drained soil and moderate climates, requiring minimal water compared to other crops. They improve soil fertility through nitrogen fixation, making them a sustainable agricultural choice. Chickpeas are available in two types: desi (small, dark) and kabuli (large, light-colored). With their nutty flavor and adaptability, they are a dietary staple and an important crop for global food security.",
      },
      Coffee: {
        name: "Coffee",
        image:
          "https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Coffee is a globally beloved beverage made from roasted seeds of the Coffea plant. The crop thrives in tropical regions with high altitudes, moderate rainfall, and well-drained soil. Coffee plants produce berries, from which seeds (coffee beans) are extracted and processed. Rich in caffeine, coffee boosts energy and focus, making it a cultural and social staple worldwide. The industry supports millions of livelihoods, especially in countries like Brazil, Vietnam, and Colombia. Coffee cultivation requires careful management to ensure quality, with varieties like Arabica and Robusta dominating the market. Its aroma and flavor make it a universally cherished drink.",
      },
    };
    return cropDetails[cropName] || null;
  };

  return (
    <Box
      maxW="900px"
      mx="auto"
      p={6}
      bg={colorMode === "light" ? "gray.50" : "gray.800"}
      borderRadius="lg"
      boxShadow="md"
    >
      {predictionResult ? (
        <>
          <Heading
            as="h1"
            size="xl"
            mb={4}
            color={colorMode === "light" ? "green.600" : "green.400"}
            textAlign="center"
          >
            Prediction Result
          </Heading>
          <List spacing={5}>
            {Object.keys(predictionResult).map((key) => {
              const crop = getCropDetails(predictionResult[key]);
              if (crop) {
                return (
                  <ListItem key={key}>
                    <Box
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      bg={colorMode === "light" ? "white" : "gray.700"}
                      boxShadow="sm"
                      display="flex"
                      gap={10}
                    >
                      <Box>
                        <Image
                          src={crop.image}
                          alt={crop.name}
                          borderRadius="md"
                          mb={2}
                          minH={100}
                          minW={100}
                        />
                      </Box>
                      <Box>
                        <Heading as="h3" size="md" mb={2} color="teal.500">
                          {crop.name}
                        </Heading>
                        <Text
                          color={
                            colorMode === "light" ? "gray.700" : "gray.300"
                          }
                        >
                          {crop.description}
                        </Text>
                      </Box>
                    </Box>
                  </ListItem>
                );
              }
            })}
          </List>
        </>
      ) : (
        <Text color={colorMode === "light" ? "black" : "white"}>
          No prediction result found. Please try again.
        </Text>
      )}
      <Button
        colorScheme="teal"
        mt={4}
        onClick={() => navigate("/")}
        bg={colorMode === "light" ? "teal.500" : "teal.300"}
      >
        Go Back to Form
      </Button>
    </Box>
  );
};

export default ResultPage;
