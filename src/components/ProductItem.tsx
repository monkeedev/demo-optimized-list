import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import type { ProductItemDto, ProductItemProps } from "../utils/types";
import { CustomButton } from "./CustomButton";

const ITEM_WIDTH = Dimensions.get("window").width / 2 - 16 * 2;
const ITEM_HEIGHT = ITEM_WIDTH;

export const ProductItem = (props: ProductItemProps<ProductItemDto>) => {
  return (
    <View style={styles.cardOuter}>
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
          source={{
            uri: props.thumbnail,
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
          }}
          style={styles.cardImageContainer}
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
    </View>
  );
};

const styles = StyleSheet.create({
  cardOuter: {
    width: Dimensions.get("window").width / 2 - 12,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 4,
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#cecece",
    padding: 8,
  },
  cardImageContainer: {
    borderWidth: 1,
    borderColor: "#cecece",
    borderRadius: 4,
    backgroundColor: "#f6f6f6",
  },
  cardInfoContainer: {
    width: "100%",
    position: "relative",
    paddingTop: 16,
    gap: 8,
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
