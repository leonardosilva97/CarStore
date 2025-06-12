import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Screen } from "~/components/screen/Screen";
import { Feather } from "@expo/vector-icons";
import { useBrandsGet } from "~/domain/Cars/useCases/useBrandsGet";
import { Brand } from "~/domain/Cars/carsTypes";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "~/routes/App.routes";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const {
    brands,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useBrandsGet();

  const handleBrandPress = (brand: Brand) => {
    navigation.navigate('Model', { brandCode: brand.codigo, brandName: brand.nome });
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderBrandItem = ({ item }: { item: Brand }) => (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-3 mx-4 shadow-sm border border-gray-100"
      onPress={() => handleBrandPress(item)}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            {item.nome}
          </Text>
          <Text className="text-sm text-gray-500">
            Código: {item.codigo}
          </Text>
        </View>
        <Feather name="chevron-right" size={20} color="#6B7280" />
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#EA580C" />
      </View>
    );
  };

  const renderHeader = () => (
    <View className="px-4 pb-4">
      <View className="items-center mb-6">
        <View className="w-20 h-20 bg-orange-500 rounded-full items-center justify-center mb-4">
          <Feather name="home" size={32} color="white" />
        </View>
        <Text className="text-3xl font-bold text-gray-900 mb-2">CarStore</Text>
        <Text className="text-lg text-gray-600 text-center">
          Escolha uma marca para ver os modelos
        </Text>
      </View>
    </View>
  );

  if (isError) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center px-4">
          <Feather name="alert-circle" size={48} color="#EF4444" />
          <Text className="text-xl font-bold text-gray-900 mt-4 mb-2">
            Erro ao carregar marcas
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            {error?.message || 'Ocorreu um erro inesperado'}
          </Text>
          <TouchableOpacity
            className="bg-orange-500 px-6 py-3 rounded-xl"
            onPress={() => refetch()}
          >
            <Text className="text-white font-semibold">Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={brands}
        keyExtractor={(item) => item.codigo}
        renderItem={renderBrandItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </Screen>
  );
}
