import { styles } from '@/constants/homeStyle';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export interface Product {
  id: number;
  name: string;
  author: string;
  price: number;
  description: string;
  image: any;
}

export const ProductCard = ({ product, onPress }: { product: Product; onPress: () => void }) => (
  <TouchableOpacity
    style={styles.productCard}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={styles.imageContainer}>
      <Image
        source={product.image}
        style={styles.productImage}
        resizeMode="contain"
      />
    </View>

    <View style={styles.productInfo}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productAuthor}>
        Publicado por {product.author}
      </Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription} numberOfLines={3}>
        {product.description}
      </Text>
    </View>
  </TouchableOpacity>
);