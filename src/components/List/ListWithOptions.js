import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors, font, position } from '../../core/theme';
import { Ionicons } from '@expo/vector-icons';
import { MarkerIcon } from '../Icons';

export function ListWithOptions({
  itineraries,
  isFavoriteSelected,
  style,
  handlePress,
  handleDelete,
  ...props
}) {
  const filteredItineraries = itineraries.filter(itinerary => itinerary.type === (isFavoriteSelected ? 'favorite' : 'recent'));

  return (
    <View style={[style, styles.listContainer]}>
      {filteredItineraries.length > 0 ? filteredItineraries.map((itinerary, index, array) => {
        const isLast = index === array.length - 1;

        return (
          <TouchableOpacity
            onPress={() => handlePress(itinerary.id)}
            activeOpacity={0.8}
            key={itinerary.id}
            style={[position.rowSpace, styles.listItem, { borderBottomWidth: isLast ? 0 : 1 }]}
          >
            {itinerary.type === 'recent'
              ? <MarkerIcon color='rgba(255, 255, 255, 0.9)' />
              : <Ionicons name='star' size={17} color='rgba(255, 255, 255, 0.9)' />
            }
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Text style={font.desc} numberOfLines={1}>{isFavoriteSelected ? (itinerary.name || 'Favori') : `Le ${itinerary.date}`}</Text>
              <Text style={{ fontSize: 13, color: '#fff' }} numberOfLines={1}>
                {itinerary.points[0].lat}, {itinerary.points[0].lng} → {itinerary.points[itinerary.points.length - 1].lat}, {itinerary.points[itinerary.points.length - 1].lng}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDelete(itinerary.id)}
              style={styles.deleteWrapper}
            >
              <Ionicons name='close-outline' size={14} color={colors.dark} />
            </TouchableOpacity>
          </TouchableOpacity>
        )
      }) : (
        <View style={[styles.emptyTextWrapper, position.rowCenter]}>
          <Text style={styles.emptyText}>Pas encore d'itinéraire {isFavoriteSelected ? "favori" : "récent"}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)'
  },
  deleteWrapper: {
    padding: 4,
    backgroundColor: '#eee',
    borderRadius: 50
  },
  emptyTextWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 14
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ccc'
  }
});
