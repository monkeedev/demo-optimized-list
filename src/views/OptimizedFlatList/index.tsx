import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OptimizedProductItemDto, ProductItemProps } from "../../utils/types";
import { OptimizedProductItem } from "../../components";
import { FlatList, StyleSheet, Text, View } from "react-native";

const ITEM_HEIGHT = 278 + 16 + 2; // initialHeight + padding + borderWidth
const LIMIT = 8;
// const keyExtractor = (item: OptimizedProductItemDto, index: number) =>
//   `ProductItem-${index}`;
const keyExtractor = (item: OptimizedProductItemDto) => `ProductItem-${item.id}`

const getItemLayout = (_, index: number) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        });

export const OptimizedFlatListView: FC = () => {
  const [data, setData] = useState<OptimizedProductItemDto[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);
  const [count, setCount] = useState(-1);
  const [cart, setCart] = useState<Set<number>>(new Set());

  const cartSet = useMemo(() => new Set(cart), [cart]);

  const isFetchingRef = useRef(false);

  useEffect(() => {
    async function prepare() {
      const res = await fetch(`https://dummyjson.com/products?limit=${LIMIT}`);

      const _data = await res.json();

      const { total } = _data;
      setCount(total);
    }

    prepare();
  }, []);

  useEffect(() => {
    setCurrentCount(data.length);
  }, [data.length]);

  const handleAddToCart = useCallback((id: number) => {
    setCart((prev) => {
      const p = new Set(prev);

      if (!p.has(id)) {
        p.add(id);
      } else {
        p.delete(id);
      }

      return p;
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ProductItemProps<OptimizedProductItemDto> }) => {
      return (
        <OptimizedProductItem
          id={item.id}
          thumbnail={item.thumbnail}
          title={item.title}
          rating={item.rating}
          price={item.price}
          availabilityStatus={item.availabilityStatus}
          isInCart={cartSet.has(item.id)}
          onAddToCart={handleAddToCart}
        />
      );
    },
    [cartSet, handleAddToCart],
  );

  const renderHeaderComponent = useCallback(() => {
    return (
      <View style={styles.listHeaderContainer}>
        {count > 0 && currentCount > 0 && (
          <Text>
            Loaded {currentCount} of {count} items
          </Text>
        )}
      </View>
    );
  }, [count, currentCount]);

  const renderFooterComponent = useCallback(() => {
    return (
      isLoading && (
        <View style={{ alignItems: "center" }}>
          <Text>Loading</Text>
        </View>
      )
    );
  }, [isLoading]);

  const handleOnEndReach = useCallback(async () => {
    if (isFetchingRef.current || currentCount === count) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${data.length}`,
      );

      const _data = await res.json();
      const { products } = _data;

      setData((prev) => prev.concat(products));
    } catch (error) {
      setData([]);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, [currentCount, count]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.listColumnsContainer}
        numColumns={2}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={renderHeaderComponent}
        ListFooterComponent={renderFooterComponent}
        onEndReached={handleOnEndReach}
        initialNumToRender={6}
        maxToRenderPerBatch={4}
        
        updateCellsBatchingPeriod={100}
        windowSize={8}
        getItemLayout={getItemLayout}
        onEndReachedThreshold={0.3}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
  },
  listHeaderContainer: {
    alignItems: "center",
    padding: 8,
    backgroundColor: "#eee",
  },
  listContainer: {
    rowGap: 8,
    columnGap: 8,
    padding: 8,
    backgroundColor: '#eee'
  },
  listColumnsContainer: {
    columnGap: 8
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  titleText: {
    fontWeight: "700",
    fontSize: 16,
  },
});
