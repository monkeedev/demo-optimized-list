import { Dimensions, StyleSheet, Text, View } from "react-native";
import type { OptimizedProductItemDto, ProductItemProps } from "../utils/types";
import { CustomButton } from "./CustomButton";
import { memo } from "react";
import { Image } from "expo-image";

const ITEM_WIDTH = Dimensions.get("window").width / 2 - 16 * 2;
const ITEM_HEIGHT = ITEM_WIDTH;

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const OptimizedProductItem = memo(
  (props: ProductItemProps<OptimizedProductItemDto>) => {
    return (
      <View style={styles.cardContainer}>
        <Text
          style={[
            styles.availabilityText,
            {
              backgroundColor:
                props.availabilityStatus === "In Stock"
                  ? "#8BC34A99"
                  : props.availabilityStatus === "Low Stock"
                    ? "#FBC02D99"
                    : "#F4433699",
            },
          ]}
        >
          {props.availabilityStatus}
        </Text>
        <Image
          source={props.thumbnail}
          style={styles.cardImageContainer}
          placeholder={{ blurhash }}
          contentFit={"contain"}
          transition={200}
          cachePolicy={"memory-disk"}
        />
        <View style={styles.cardInfoContainer}>
          <Text style={styles.titleText} numberOfLines={1}>
            {props.title}
          </Text>
          <View style={styles.rowContainer}>
            <Text
              style={[
                styles.ratingText,
                {
                  backgroundColor:
                    props.rating >= 4
                      ? "#8BC34A99"
                      : props.rating > 3 && props.rating < 4
                        ? "#FBC02D99"
                        : "#F4433699",
                },
              ]}
            >
              {props.rating} / 5
            </Text>
            <Text style={styles.priceText}>{props.price}$</Text>
          </View>

          <CustomButton
            title={props.isInCart ? "Added!" : "Add to cart"}
            onPress={() => props.onAddToCart(props.id)}
            backgroundColor={props.isInCart ? "green" : "#000"}
          />
        </View>
      </View>
    );
  },
  (p, n) => p.isInCart === n.isInCart && p.onAddToCart === n.onAddToCart,
);

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get("window").width / 2 - 12,
    borderRadius: 4,
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#cecece",
    padding: 8,
    backgroundColor: "#fefefe",
  },
  cardImageContainer: {
    borderWidth: 1,
    borderColor: "#cecece",
    borderRadius: 4,
    backgroundColor: "#f6f6f6",
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  cardInfoContainer: {
    width: "100%",
    position: "relative",
    paddingTop: 16,
    gap: 8,
    backgroundColor: "#FFF",
  },
  ratingText: {
    padding: 4,
    borderRadius: 4,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  availabilityText: {
    position: "absolute",
    top: 8,
    left: 8,
    padding: 4,
    borderRadius: 4,
    zIndex: 9,
  },
  priceText: {
    textAlign: "right",
    fontWeight: "700",
    fontSize: 18,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
