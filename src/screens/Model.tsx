
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Screen } from "~/components/screen/Screen";
import { Feather } from "@expo/vector-icons";
import { useModelsGet } from "~/domain/Cars/useCases/useModelsGet";
import { Model as ModelType } from "~/domain/Cars/carsTypes";
import { useRoute, RouteProp } from "@react-navigation/native";
import { AppRoutes } from "~/routes/App.routes";

type ModelScreenRouteProp = RouteProp<AppRoutes, 'Model'>;

export function Model() {
  const route = useRoute<ModelScreenRouteProp>();
  const { brandCode, brandName } = route.params;

  const {
    models,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useModelsGet(brandCode);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderModelItem = ({ item }: { item: ModelType }) => (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-3 mx-4 shadow-sm border border-gray-100"
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
        <Feather name="truck" size={20} color="#6B7280" />
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
          <Feather name="truck" size={32} color="white" />
        </View>
        <Text className="text-2xl font-bold text-gray-900 mb-2">{brandName}</Text>
        <Text className="text-lg text-gray-600 text-center">
          Modelos disponíveis
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-4">
      <Feather name="search" size={48} color="#9CA3AF" />
      <Text className="text-xl font-bold text-gray-900 mt-4 mb-2">
        Nenhum modelo encontrado
      </Text>
      <Text className="text-gray-600 text-center">
        Não foram encontrados modelos para esta marca.
      </Text>
    </View>
  );

  if (isError) {
    return (
      <Screen canGoBack title="Modelos">
        <View className="flex-1 justify-center items-center px-4">
          <Feather name="alert-circle" size={48} color="#EF4444" />
          <Text className="text-xl font-bold text-gray-900 mt-4 mb-2">
            Erro ao carregar modelos
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
    <Screen canGoBack title="Modelos">
      <FlatList
        data={models}
        keyExtractor={(item) => item.codigo.toString()}
        renderItem={renderModelItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </Screen>
  );
}
