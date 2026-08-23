import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import api from "../../api/api";
import Product from "../../components/ui/Product";
import { ThemedText } from "../../components/themed-text";

const Category = () => {
  // ------------------------------------------
  // CATEGORIES
  // ------------------------------------------

  const allCategories = [
    "All",
    "Fruit",
    "Vegetable",
    "Dairy",
    "Bakery",
  ];

  // ------------------------------------------
  // STATES
  // ------------------------------------------

  const [selectedCategory, setSelectedCategory] =
    React.useState("All");

  const [products, setProducts] = React.useState([]);

  const [minPrice, setMinPrice] =
    React.useState(0);

  const [maxPrice, setMaxPrice] =
    React.useState(0);

  const [showPriceFilter, setShowPriceFilter] =
    React.useState(false);

  // ------------------------------------------
  // FETCH PRODUCTS
  // ------------------------------------------

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      setProducts(res.data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error
      );
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  // ------------------------------------------
  // FIND MAXIMUM PRODUCT PRICE
  // ------------------------------------------

  const maxProductPrice =
    products.length > 0
      ? Math.max(
        ...products.map((product) =>
          Number(product.price)
        )
      )
      : 1000;

  // ------------------------------------------
  // SET DEFAULT MAX PRICE
  // ------------------------------------------

  React.useEffect(() => {
    if (products.length > 0) {
      setMaxPrice(maxProductPrice);
    }
  }, [products]);

  // ------------------------------------------
  // FILTER PRODUCTS
  // ------------------------------------------

  const filteredProducts = products.filter(
    (product) => {
      const productPrice = Number(
        product.price
      );

      // Category filter
      const categoryMatch =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      // Price filter
      const priceMatch =
        productPrice >= minPrice &&
        productPrice <= maxPrice;

      return (
        categoryMatch &&
        priceMatch
      );
    }
  );

  // ------------------------------------------
  // RESET FILTERS
  // ------------------------------------------

  const resetFilters = () => {
    setSelectedCategory("All");
    setMinPrice(0);
    setMaxPrice(maxProductPrice);
  };

  // ------------------------------------------
  // UI
  // ------------------------------------------

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 w-[90%] mx-auto">

        {/* ================================= */}
        {/* CATEGORY BUTTONS */}
        {/* ================================= */}

        <View className="mt-5 mb-5">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingRight: 10,
            }}
          >
            {allCategories.map((category) => {
              const isSelected =
                selectedCategory === category;

              return (
                <TouchableOpacity
                  key={category}
                  activeOpacity={0.7}
                  onPress={() => setSelectedCategory(category)}
                  className={`px-5 py-3 rounded-full border ${isSelected
                      ? "bg-green-500 border-green-500"
                      : "border-gray-400"
                    }`}
                >
                  <Text
                    className={`font-semibold ${isSelected
                        ? "text-white"
                        : "text-gray-500"
                      }`}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ================================= */}
        {/* PRODUCTS HEADER + FILTER BUTTON */}
        {/* ================================= */}

        <View className="flex-row justify-between items-center mb-4">

          <ThemedText className="text-xl font-bold">
            Products
          </ThemedText>

          <TouchableOpacity
            onPress={() =>
              setShowPriceFilter(
                !showPriceFilter
              )
            }
            className={`flex-row items-center gap-2 px-4 py-2 rounded-full border ${showPriceFilter
                ? "bg-green-500 border-green-500"
                : "border-gray-400"
              }`}
          >
            <Ionicons
              name="options-outline"
              size={19}
              color={
                showPriceFilter
                  ? "white"
                  : "#6b7280"
              }
            />

            <Text
              className={`font-semibold ${showPriceFilter
                  ? "text-white"
                  : "text-gray-500"
                }`}
            >
              Price
            </Text>
          </TouchableOpacity>

        </View>

        {/* ================================= */}
        {/* PRICE RANGE SLIDER */}
        {/* ================================= */}

        {showPriceFilter && (
          <View className="border border-gray-300 rounded-2xl p-5 mb-5">

            {/* Header */}

            <View className="flex-row justify-between items-center">

              <ThemedText className="text-lg font-bold">
                Price Range
              </ThemedText>

              <TouchableOpacity
                onPress={resetFilters}
              >
                <Text className="text-green-600 font-semibold">
                  Reset
                </Text>
              </TouchableOpacity>

            </View>

            {/* Selected Range */}

            <View className="flex-row justify-between mt-5">

              <View>
                <Text className="text-gray-500 text-xs">
                  Minimum
                </Text>

                <ThemedText className="text-lg font-bold">
                  PKR {minPrice}
                </ThemedText>
              </View>

              <View className="items-end">
                <Text className="text-gray-500 text-xs">
                  Maximum
                </Text>

                <ThemedText className="text-lg font-bold">
                  PKR {maxPrice}
                </ThemedText>
              </View>

            </View>

            {/* -------------------------------- */}
            {/* MINIMUM PRICE */}
            {/* -------------------------------- */}

            <Text className="text-gray-500 mt-5 mb-1">
              Minimum Price
            </Text>

            <Slider
              style={{
                width: "100%",
                height: 40,
              }}
              minimumValue={0}
              maximumValue={maxProductPrice}
              step={50}
              value={minPrice}
              minimumTrackTintColor="#22c55e"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#22c55e"
              onValueChange={(value) => {

                // Don't allow minimum
                // to exceed maximum

                if (value <= maxPrice) {
                  setMinPrice(value);
                }

              }}
            />

            {/* -------------------------------- */}
            {/* MAXIMUM PRICE */}
            {/* -------------------------------- */}

            <Text className="text-gray-500 mt-3 mb-1">
              Maximum Price
            </Text>

            <Slider
              style={{
                width: "100%",
                height: 40,
              }}
              minimumValue={0}
              maximumValue={maxProductPrice}
              step={50}
              value={maxPrice}
              minimumTrackTintColor="#22c55e"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#22c55e"
              onValueChange={(value) => {

                // Don't allow maximum
                // to go below minimum

                if (value >= minPrice) {
                  setMaxPrice(value);
                }

              }}
            />

            {/* Price range */}

            <Text className="text-center text-gray-500 text-xs mt-2">
              PKR {minPrice} - PKR {maxPrice}
            </Text>

          </View>
        )}

        {/* ================================= */}
        {/* ACTIVE FILTERS */}
        {/* ================================= */}

        {(selectedCategory !== "All" ||
          minPrice > 0 ||
          maxPrice < maxProductPrice) && (

            <View className="flex-row flex-wrap items-center mb-4 gap-2">

              {/* Category */}

              {selectedCategory !==
                "All" && (
                  <View className="flex-row items-center bg-green-100 px-3 py-2 rounded-full">

                    <Text className="text-green-600 font-semibold text-xs">
                      {selectedCategory}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        setSelectedCategory(
                          "All"
                        )
                      }
                      className="ml-2"
                    >
                      <Ionicons
                        name="close"
                        size={14}
                        color="#16a34a"
                      />
                    </TouchableOpacity>

                  </View>
                )}

              {/* Price */}

              {(minPrice > 0 ||
                maxPrice <
                maxProductPrice) && (

                  <View className="flex-row items-center bg-green-100 px-3 py-2 rounded-full">

                    <Text className="text-green-600 font-semibold text-xs">
                      PKR {minPrice} -{" "}
                      {maxPrice}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        setMinPrice(0);
                        setMaxPrice(
                          maxProductPrice
                        );
                      }}
                      className="ml-2"
                    >
                      <Ionicons
                        name="close"
                        size={14}
                        color="#16a34a"
                      />
                    </TouchableOpacity>

                  </View>
                )}

            </View>
          )}

        {/* ================================= */}
        {/* PRODUCTS */}
        {/* ================================= */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >

          <View className="flex-row flex-wrap gap-2">

            {filteredProducts.length >
              0 ? (

              filteredProducts.map(
                (product) => (
                  <Product
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    image={product.image}
                    quantity={
                      product.quantity
                    }
                    price={product.price}
                  />
                )
              )

            ) : (

              <View className="w-full items-center justify-center py-16">

                <Ionicons
                  name="search-outline"
                  size={50}
                  color="#9ca3af"
                />

                <Text className="text-gray-500 text-lg font-semibold mt-4">
                  No products found
                </Text>

                <Text className="text-gray-400 text-center mt-1">
                  Try adjusting your
                  filters
                </Text>

                <TouchableOpacity
                  onPress={
                    resetFilters
                  }
                  className="bg-green-500 px-5 py-3 rounded-full mt-5"
                >
                  <Text className="text-white font-bold">
                    Clear Filters
                  </Text>
                </TouchableOpacity>

              </View>

            )}

          </View>

        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Category;