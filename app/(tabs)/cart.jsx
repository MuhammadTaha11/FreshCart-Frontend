import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import api from "../../api/api.js";
import { ThemedText } from "../../components/themed-text";

const Cart = () => {
  const [cartItems, setCartItems] = React.useState([]);
  // productsMap stores fetched product details keyed by productId to avoid
  // repeatedly fetching the same product during render.
  const [productsMap, setProductsMap] = React.useState({});
  const colorScheme = useColorScheme();
  const router = useRouter();

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0,
  );

  const fetchCartItems = async () => {
    try {
      const response = await api.get("/cart");
      // console.log("Cart items fetched successfully:", response.data);
      // defensively read items array
      setCartItems(response?.data?.items ?? []);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDecrease = async (item, product) => {
    try {
      const willBeDeleted = item.quantity === 1;

      await api.delete("/cart", {
        data: {
          productId: item.productId,
        },
      });

      await fetchCartItems();

      if (willBeDeleted) {
        Alert.alert(
          "Product Removed",
          `${product?.name || "Product"} has been removed from your cart.`,
        );
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleIncrease = async (item, product) => {
    try {
      await api.post("/cart", {
        productId: item.productId,
        quantity: 1,
        totalPrice: product.price,
      });

      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.productId === item.productId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                totalPrice: cartItem.totalPrice + product.price,
              }
            : cartItem,
        ),
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchProductById = async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      setProductsMap((prev) => ({ ...prev, [productId]: response.data }));
      // console.log("Fetched product", response.data);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCartItems();
    }, []),
  );

  React.useEffect(() => {
    if (!cartItems || cartItems.length === 0) return;

    const ids = [
      ...new Set(cartItems.map((i) => i?.productId).filter(Boolean)),
    ];
    ids.forEach((id) => {
      if (!productsMap[id]) {
        fetchProductById(id);
      }
    });
  }, [cartItems]);

  const clearCart = async () => {
    try {
      await api.delete("/cart/all");
      setCartItems([]);
      Alert.alert(
        "Cart Cleared",
        "All items have been removed from your cart.",
      );
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="flex-row items-center w-full h-[50px] justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={28}
              color={colorScheme === "dark" ? "white" : "black"}
              className="mx-4"
            />
          </TouchableOpacity>
          <ThemedText className="text-3xl font-bold">My Cart</ThemedText>
          <TouchableOpacity onPress={clearCart}>
            <Ionicons
              name="trash-outline"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
              className="mx-4"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex w-[90%] mt-4 mx-auto mb-12"
        >
          <View>
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const product = productsMap[item?.productId];
                return (
                  <View
                    key={item?._id}
                    className="flex-row items-center justify-between mb-4 p-5 rounded-xl border border-solid border-gray-500"
                  >
                    <View className="flex-row gap-3">
                      <Image
                        source={{ uri: product?.image }}
                        resizeMode="contain"
                        className="w-24 h-24 rounded-lg bg-white"
                      />
                      <View className="gap-2">
                        <ThemedText className="text-lg font-medium">
                          {product?.name ?? item.name}
                        </ThemedText>
                        <ThemedText className="text-xs font-thin">
                          {product?.quantity}
                        </ThemedText>
                        <ThemedText>PKR. {product?.price}</ThemedText>
                      </View>
                    </View>
                    <View className="flex items-end justify-end mt-8">
                      <View className="flex-row justify-center items-end">
                        <TouchableOpacity
                          onPress={() => handleDecrease(item, product)}
                          className="w-8 rounded-lg flex justify-center items-center h-8 border border-gray-800"
                        >
                          <Text
                            style={{
                              color: "#22c55e",
                              fontWeight: "bold",
                              fontSize: 18,
                            }}
                          >
                            -
                          </Text>
                        </TouchableOpacity>
                        <View className="w-12 h-8 flex items-center justify-center border border-t-gray-800 border-b-gray-800">
                          <ThemedText>{item?.quantity}</ThemedText>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleIncrease(item, product)}
                          className="w-8 rounded-lg flex justify-center items-center h-8 border border-gray-800"
                        >
                          <Text
                            style={{
                              color: "#22c55e",
                              fontWeight: "bold",
                              fontSize: 16,
                            }}
                          >
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <ThemedText className="mt-1">
                        PKR. {item?.totalPrice}
                      </ThemedText>
                    </View>
                  </View>
                );
              })
            ) : (
              <ThemedText className="text-lg font-medium">
                Your cart is empty.
              </ThemedText>
            )}
          </View>
          {cartItems.length > 0 && (
            <>
              <View className="border border-gray-500 p-4 rounded-lg flex gap-2">
                <View className="flex justify-between items-center flex-row">
                  <ThemedText>Subtotal</ThemedText>
                  <ThemedText>PKR. {cartTotal}</ThemedText>
                </View>
                <View className="flex justify-between items-center flex-row">
                  <ThemedText>Delivery Fee</ThemedText>
                  <ThemedText>PKR. 100</ThemedText>
                </View>
                <View className="flex justify-between items-center flex-row py-3 border-t border-t-gray-600 mt-2">
                  <ThemedText className="font-bold" style={{ fontSize: 19 }}>
                    Total
                  </ThemedText>
                  <Text
                    style={{
                      color: "#22c55e",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    PKR. {cartTotal + 100}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/checkout",
                    params: { cart: JSON.stringify(cartItems) },
                  })
                }
                className="bg-[#158f41] h-14 flex justify-center items-center rounded-lg mt-4 mb-5"
              >
                <Text className="font-bold text-white text-lg">
                  Proceed To Checkout
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Cart;
