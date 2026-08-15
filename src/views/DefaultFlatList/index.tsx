import { FlatList, StyleSheet, Text, View } from "react-native";
import { ProductItemDto } from "../../utils/types";
import { useEffect, useState } from "react";
import { ProductItem } from "../../components";

export const DefaultFlatListView: React.FC = () => {
  const [data, setData] = useState<ProductItemDto[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);
  const [count, setCount] = useState(-1);
  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    async function prepare() {
      const res = await fetch("https://dummyjson.com/products");

      const _data = await res.json();

      const { total } = _data;
      setCount(total);
    }

    prepare();
  }, []);

  useEffect(() => {
    setCurrentCount(data.length);
  }, [data.length]);

  const handleAddToCart = (id: number) => {
    setCart((prev) => {
      if (prev.includes(id)) {
        return prev.filter(p => p !== id);
      }

      return prev.concat(id);
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }: { item: ProductItemDto }) => (
          <ProductItem
            {...item}
            key={`Product-${item.id}-${item.brand}`}
            isInCart={cart.includes(item.id)}
            onAddToCart={() => handleAddToCart(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ columnGap: 8 }}
        numColumns={2}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <View
            style={{
              alignItems: "center",
              padding: 8,
              backgroundColor: "#eee",
            }}
          >
            {count > 0 && currentCount > 0 && (
              <Text>
                Loaded {currentCount} of {count} items
              </Text>
            )}
          </View>
        )}
        ListFooterComponent={() =>
          isLoading && (
            <View style={{ alignItems: "center" }}>
              <Text>Loading</Text>
            </View>
          )
        }
        onEndReached={async () => {
          if (isLoading || currentCount === count) return;

          setLoading(true);

          const res = await fetch(
            `https://dummyjson.com/products?skip=${data.length}`,
          );

          const _data = await res.json();
          const { products } = _data;

          setData((prev) => prev.concat(products));
          setLoading(false);
        }}
        onEndReachedThreshold={0.3}
        overScrollMode="never"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  listContainer: {
    rowGap: 8,
    padding: 8,
  },
  titleText: {
    fontWeight: "700",
    fontSize: 16,
  },
});
