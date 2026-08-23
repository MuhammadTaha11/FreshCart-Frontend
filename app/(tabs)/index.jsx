import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemedText } from "@/components/themed-text";
import { useRouter } from "expo-router";

import fruits from "../../assets/images/fruits.png";
import vegcat from "../../assets/images/vegcat.png";
import dairycat from "../../assets/images/dairycat.png";
import fruitcat from "../../assets/images/fruitcat.png";
import bakerycat from "../../assets/images/bakerycat.png";

import api from "../../api/api.js";
import Product from "../../components/ui/Product.tsx";

const Index = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  // Products
  const [products, setProducts] = React.useState([]);

  // Search
  const [search, setSearch] = React.useState("");

  // Filter modal
  const [filterVisible, setFilterVisible] = React.useState(false);

  // Filters
  const [selectedCategory, setSelectedCategory] =
    React.useState("All");

  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  // --------------------------------------------------
  // FETCH PRODUCTS
  // --------------------------------------------------

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      // console.log("Products:", res.data);

      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  // --------------------------------------------------
  // FILTER PRODUCTS
  // --------------------------------------------------

  const filteredProducts = products.filter((product) => {
    // Search by name
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Category
    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.toLowerCase() ===
      selectedCategory.toLowerCase();

    // Minimum price
    const matchesMinPrice =
      minPrice === "" ||
      product.price >= Number(minPrice);

    // Maximum price
    const matchesMaxPrice =
      maxPrice === "" ||
      product.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  // Check whether any filter/search is active
  const isFiltering =
    search.trim() !== "" ||
    selectedCategory !== "All" ||
    minPrice !== "" ||
    maxPrice !== "";

  // --------------------------------------------------
  // CLEAR FILTERS
  // --------------------------------------------------

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView
          className="flex w-[90%] mt-4 mx-auto h-full"
          showsVerticalScrollIndicator={false}
        >

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2 mb-4">
              <Ionicons
                name="location-outline"
                size={24}
                color={
                  colorScheme === "dark"
                    ? "white"
                    : "black"
                }
              />

              <View>
                <ThemedText
                  style={{ fontSize: 12 }}
                  className="opacity-75"
                >
                  Deliver To
                </ThemedText>

                <ThemedText
                  style={{ fontSize: 14 }}
                  className="font-medium"
                >
                  2218 Baker Street, London
                </ThemedText>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/cart")}
            >
              <Ionicons
                name="cart-outline"
                size={26}
                color={
                  colorScheme === "dark"
                    ? "white"
                    : "black"
                }
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="w-[83%] bg-gray-200 rounded-xl h-14 flex-row px-3 items-center gap-3">
              <Ionicons
                name="search"
                size={20}
                color="black"
              />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search for products..."
                placeholderTextColor="gray"
                style={{
                  color: "black",
                  fontSize: 16,
                  flex: 1,
                  height: "100%",
                }}
              />

              {search.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearch("")}
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              onPress={() => setFilterVisible(true)}
              className="w-[14%] bg-gray-200 rounded-xl h-14 items-center justify-center"
            >
              <Ionicons
                name="filter"
                size={20}
                color="black"
              />

              {isFiltering && (
                <View className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" />
              )}
            </TouchableOpacity>
          </View>


          {isFiltering && (
            <View className="mt-6">
              <View className="flex-row justify-between items-center mb-4">
                <ThemedText className="text-xl font-bold">
                  Search Results
                </ThemedText>

                <ThemedText className="text-gray-500">
                  {filteredProducts.length} products
                </ThemedText>
              </View>

              {filteredProducts.length > 0 ? (
                <View className="flex-row flex-wrap justify-start gap-3">
                  {filteredProducts.map((product) => (
                    <Product
                      key={product._id}
                      id={product._id}
                      name={product.name}
                      image={product.image}
                      quantity={product.quantity}
                      price={product.price}
                    />
                  ))}
                </View>
              ) : (
                <View className="items-center py-12">
                  <Ionicons
                    name="search-outline"
                    size={55}
                    color="gray"
                  />

                  <ThemedText className="text-lg font-bold mt-3">
                    No products found
                  </ThemedText>

                  <ThemedText className="text-gray-500 mt-1 text-center">
                    Try changing your search or filters.
                  </ThemedText>

                  <TouchableOpacity
                    onPress={clearFilters}
                    className="bg-green-500 px-6 py-3 rounded-xl mt-5"
                  >
                    <Text className="text-white font-bold">
                      Clear Filters
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}


          {!isFiltering && (
            <>


              <View className="pt-4 mt-6 bg-gray-200 rounded-xl h-48 relative">
                <Text
                  style={{ fontSize: 28 }}
                  className="font-bold text-[#064606] ml-4"
                >
                  Fresh Groceries,
                </Text>

                <Text
                  style={{ fontSize: 28 }}
                  className="font-bold text-[#1a941a] ml-4"
                >
                  Better Living
                </Text>

                <Text
                  style={{ fontSize: 15 }}
                  className="text-[#064606] ml-4 mt-2 w-[50%] opacity-85"
                >
                  Get your groceries delivered to your
                  doorstep
                </Text>

                <Image
                  source={fruits}
                  resizeMode="contain"
                  className="absolute right-0 bottom-0 w-[47%] h-full"
                />
              </View>

              <View>
                <View className="flex-row items-center justify-between mt-6 mb-4">
                  <ThemedText
                    style={{ fontSize: 18 }}
                    className="font-bold"
                  >
                    Categories
                  </ThemedText>

                  <TouchableOpacity
                    onPress={() => router.push("/category")}
                  >
                    <Text
                      style={{ fontSize: 14 }}
                      className="font-medium text-[#1a941a]"
                    >
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row items-center justify-around">
                  {/* Fruits */}
                  <TouchableOpacity
                    className="items-center"
                    onPress={() => {
                      setSelectedCategory("Fruits");
                      setSearch("");
                    }}
                  >
                    <View className="w-[65px] bg-gray-200 rounded-full h-[65px] items-center justify-center">
                      <Image
                        source={fruitcat}
                        resizeMode="contain"
                        className="w-full h-full p-2"
                      />
                    </View>

                    <ThemedText
                      style={{
                        fontSize: 14,
                        marginTop: 4,
                      }}
                      className="font-medium"
                    >
                      Fruits
                    </ThemedText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="items-center"
                    onPress={() => {
                      setSelectedCategory("Vegetables");
                      setSearch("");
                    }}
                  >
                    <View className="w-[65px] bg-gray-200 rounded-full h-[65px] items-center justify-center">
                      <Image
                        source={vegcat}
                        resizeMode="contain"
                        className="w-full h-full p-2"
                      />
                    </View>

                    <ThemedText
                      style={{
                        fontSize: 14,
                        marginTop: 4,
                      }}
                      className="font-medium"
                    >
                      Vegetables
                    </ThemedText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="items-center"
                    onPress={() => {
                      setSelectedCategory("Dairy");
                      setSearch("");
                    }}
                  >
                    <View className="w-[65px] bg-gray-200 rounded-full h-[65px] items-center justify-center">
                      <Image
                        source={dairycat}
                        resizeMode="contain"
                        className="w-full h-full p-2"
                      />
                    </View>

                    <ThemedText
                      style={{
                        fontSize: 14,
                        marginTop: 4,
                      }}
                      className="font-medium"
                    >
                      Dairy
                    </ThemedText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="items-center"
                    onPress={() => {
                      setSelectedCategory("Bakery");
                      setSearch("");
                    }}
                  >
                    <View className="w-[65px] bg-gray-200 rounded-full h-[65px] items-center justify-center">
                      <Image
                        source={bakerycat}
                        resizeMode="contain"
                        className="w-full h-full p-2"
                      />
                    </View>

                    <ThemedText
                      style={{
                        fontSize: 14,
                        marginTop: 4,
                      }}
                      className="font-medium"
                    >
                      Bakery
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <View className="flex-row items-center justify-between mt-9 mb-4">
                  <ThemedText
                    style={{ fontSize: 18 }}
                    className="font-bold"
                  >
                    Best Selling
                  </ThemedText>

                  <TouchableOpacity
                    onPress={() => router.push("/category")}
                  >
                    <Text
                      style={{ fontSize: 14 }}
                      className="font-medium text-[#1a941a]"
                    >
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row flex-wrap items-center justify-start gap-3">
                  {products.map(
                    (product, index) =>
                      index < 3 && (
                        <Product
                          key={product._id}
                          id={product._id}
                          name={product.name}
                          image={product.image}
                          quantity={product.quantity}
                          price={product.price}
                        />
                      )
                  )}
                </View>
              </View>

              <View>
                <View className="flex-row items-center justify-between mt-9 mb-4">
                  <ThemedText
                    style={{ fontSize: 18 }}
                    className="font-bold"
                  >
                    Popular Products
                  </ThemedText>

                  <TouchableOpacity
                    onPress={() => router.push("/category")}
                  >
                    <Text
                      style={{ fontSize: 14 }}
                      className="font-medium text-[#1a941a]"
                    >
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row flex-wrap items-center justify-start gap-3 mb-8">
                  {products.map(
                    (product, index) =>
                      (index >= 3 && index < 6) && (
                        <Product
                          key={product._id}
                          id={product._id}
                          name={product.name}
                          image={product.image}
                          quantity={product.quantity}
                          price={product.price}
                        />
                      )
                  )}
                </View>
              </View>
            </>
          )}


          <Modal
            visible={filterVisible}
            transparent
            animationType="slide"
            onRequestClose={() =>
              setFilterVisible(false)
            }
          >
            <Pressable
              className="flex-1 bg-black/40 justify-end"
              onPress={() =>
                setFilterVisible(false)
              }
            >
              <Pressable
                className="bg-white rounded-t-3xl p-6"
                onPress={(e) =>
                  e.stopPropagation()
                }
              >
                <View className="flex-row justify-between items-center mb-6">
                  <Text className="text-2xl font-bold text-black">
                    Filters
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      setFilterVisible(false)
                    }
                  >
                    <Ionicons
                      name="close"
                      size={28}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>

                <Text className="text-lg font-bold text-black mb-3">
                  Category
                </Text>

                <View className="flex-row flex-wrap gap-2 mb-6">
                  {[
                    "All",
                    "Fruit",
                    "Vegetable",
                    "Dairy",
                    "Bakery",
                  ].map((category) => (
                    <TouchableOpacity
                      key={category}
                      onPress={() =>
                        setSelectedCategory(
                          category
                        )
                      }
                      className={`px-4 py-3 rounded-full border ${selectedCategory ===
                        category
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                        }`}
                    >
                      <Text
                        className={
                          selectedCategory ===
                            category
                            ? "text-white font-semibold"
                            : "text-gray-600"
                        }
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text className="text-lg font-bold text-black mb-3">
                  Price Range
                </Text>

                <View className="flex-row gap-3 mb-6">
                  <TextInput
                    value={minPrice}
                    onChangeText={setMinPrice}
                    placeholder="Min price"
                    placeholderTextColor="gray"
                    keyboardType="numeric"
                    className="flex-1 border border-gray-300 rounded-xl px-4 h-12 text-black"
                  />

                  <TextInput
                    value={maxPrice}
                    onChangeText={setMaxPrice}
                    placeholder="Max price"
                    placeholderTextColor="gray"
                    keyboardType="numeric"
                    className="flex-1 border border-gray-300 rounded-xl px-4 h-12 text-black"
                  />
                </View>

                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={clearFilters}
                    className="flex-1 border border-green-500 rounded-xl h-14 items-center justify-center"
                  >
                    <Text className="text-green-600 font-bold">
                      Clear
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setFilterVisible(false)
                    }
                    className="flex-1 bg-green-500 rounded-xl h-14 items-center justify-center"
                  >
                    <Text className="text-white font-bold">
                      Apply Filters
                    </Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Pressable>
          </Modal>


          <View className="mt-6 mb-8 border border-gray-700 rounded-2xl p-5">
            <View className="">
              <ThemedText className="text-lg font-bold mb-3">
                Need Help?
              </ThemedText>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  className="flex-1 bg-white rounded-xl p-4 border border-gray-200"
                  onPress={() => {
                    // Navigate to support page later
                    console.log("Contact Support");
                  }}
                >
                  <Ionicons
                    name="headset-outline"
                    size={24}
                    color="#22c55e"
                  />

                  <Text className="font-bold mt-2">
                    Support
                  </Text>

                  <Text
                    className="text-gray-500"
                    style={{ fontSize: 14 }}
                  >
                    Contact us
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 bg-white rounded-xl p-4 border border-gray-200"
                  onPress={() => router.push("/orders")}
                >
                  <Ionicons
                    name="receipt-outline"
                    size={24}
                    color="#22c55e"
                  />

                  <Text className="font-bold mt-2">
                    My Orders
                  </Text>

                  <Text
                    className="text-gray-500"
                    style={{ fontSize: 14 }}
                  >
                    Track orders
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="items-center mt-4">
              <ThemedText
                className="font-bold"
                style={{ fontSize: 16 }}
              >
                FreshCart
              </ThemedText>

              <ThemedText
                className="text-gray-500 text-center mt-1"
                style={{ fontSize: 14 }}
              >
                Fresh groceries. Better living.
              </ThemedText>

              <Text
                className="text-gray-400 mt-2"
                style={{ fontSize: 12 }}
              >
                © 2026 FreshCart. All rights reserved.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Index;

