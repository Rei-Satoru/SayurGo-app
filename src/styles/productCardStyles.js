import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // DEFAULT CARD (Grid View)
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: 'relative',
  },

  // COMPACT CARD (Horizontal/Scroll View)
  cardCompact: {
    width: 160,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginRight: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // IMAGE STYLING
  image: {
    width: '100%',
    height: 115,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  cardCompactImage: {
    height: 90,
    marginBottom: 8,
  },

  // HEART/FAVORITE ICON
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    padding: 4,
  },

  // RATING BOX
  ratingBox: {
    position: 'absolute',
    bottom: 50,
    left: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  ratingBoxCompact: {
    position: 'absolute',
    bottom: 35,
    left: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
    elevation: 2,
  },

  ratingText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
  },

  // TEXT STYLING
  category: {
    color: '#2E7D32',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },

  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },

  weight: {
    fontSize: 12,
    color: '#AAA',
    marginBottom: 8,
    fontWeight: '400',
  },

  // PRICE + BUTTON ROW
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },

  price: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2E7D32',
    flex: 1,
  },

  // CART BUTTON
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 3,
    elevation: 2,
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#FFE0CC',
  },

  cartIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFA500',
  },

  cartButtonText: {
    fontSize: 11,
    color: '#FFA500',
    fontWeight: '700',
  },

  // ADD TO CART BUTTON (GRID VIEW)
  button: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#2E7D32',
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
  },

  btnText: {
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 12,
  },
});
