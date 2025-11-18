import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 0,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  greeting: { fontSize: 18, fontWeight: 'bold', color: '#2E7D32' },
  subtitle: { color: '#555', fontSize: 14 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  brandWrapper: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 6 },
  brandContainer: { marginLeft: 20, marginTop: 8, marginBottom: 4 },
  brandSayur: { fontSize: 20, fontWeight: '800', color: '#fff' },
  brandSayurSmall: { fontSize: 18 },
  brandGo: { fontSize: 20, fontWeight: '800', color: '#FBC02D', marginLeft: 6 },
  brandGoSmall: { fontSize: 18 },

  // TOP BAR
  topBar: { backgroundColor: '#2E7D32', paddingHorizontal: 20, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topBarLeft: { flexDirection: 'row', alignItems: 'center' },
  cartButton: { padding: 6 },
  cartIcon: { fontSize: 22, color: '#fff' },

  // centered search bar under top bar
  searchBoxCenter: { alignSelf: 'center', width: '70%', marginTop: 12, marginBottom: 18 },
  searchBoxCenterSmall: { width: '90%', marginTop: 10, marginBottom: 12 },

  // HERO: centered full-width image
  hero: { marginHorizontal: 0, marginBottom: 20 },
  heroImageWrap: { paddingHorizontal: 0, alignItems: 'center', width: '100%' },
  heroCaption: { fontSize: 18, fontWeight: '800', color: '#333', backgroundColor: 'transparent', marginBottom: 8, textAlign: 'center' },
  heroCaptionSmall: { fontSize: 16, fontWeight: '700', color: '#333', backgroundColor: 'transparent', marginBottom: 6, textAlign: 'center' },
  heroCaptionHighlight: { color: '#2E7D32', fontWeight: '800' },
  heroImageFull: { width: '100%', height: 260, borderRadius: 8, marginTop: 20 },
  heroImageFullSmall: { width: '100%', height: 200, borderRadius: 6, marginTop: 24 },
  // kept previous text styles (not used) for potential future use
  heroColumn: { flexDirection: 'column', alignItems: 'center' },
  heroText: { flex: 1, paddingRight: 10, justifyContent: 'flex-start' },
  heroTextCenter: { alignItems: 'center', paddingRight: 0, justifyContent: 'center' },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#1e3a2a', lineHeight: 26 },
  heroTitleSmall: { fontSize: 16, lineHeight: 20, textAlign: 'left' },
  heroTitleHighlight: { color: '#2E7D32' },
  heroSubtitle: { color: '#555', fontSize: 14, marginTop: 12, marginBottom: 16 },
  heroSubtitleSmall: { fontSize: 13, textAlign: 'center' },
  ctaButton: { backgroundColor: '#FBC02D', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10, alignSelf: 'flex-start' },
  ctaButtonSmall: { alignSelf: 'center' },
  ctaButtonText: { color: '#fff', fontWeight: '700' },
  ctaButtonTextSmall: { fontSize: 14 },
  searchInputSmall: { fontSize: 13, paddingVertical: 8 },

  // SEARCH
  searchBox: { paddingHorizontal: 20, marginBottom: 10 },
  searchInput: {
    backgroundColor: '#E8F5E9',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
  },

  // OJEK ADVERTISEMENT
  ojekAdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF3E0',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  ojekAdContent: {
    flex: 1,
    marginRight: 12,
  },

  ojekAdTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },

  ojekAdButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  ojekAdButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },

  ojekAdImage: {
    width: 120,
    height: 100,
  },

  // BANNER
  banner: {
    backgroundColor: '#E8F5E9',
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  bannerImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  bannerText: { flex: 1, marginLeft: 15 },
  bannerTitle: { fontWeight: 'bold', fontSize: 16, color: '#2E7D32' },
  bannerSubtitle: { color: '#388E3C', fontSize: 13 },

  // PROMO (Buah Pot)
  promo: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
    marginTop: 18,
    position: 'relative',
  },
  // Keep row layout on small screens so image stays to the right
  promoSmall: { flexDirection: 'row', alignItems: 'center', padding: 12, flexWrap: 'nowrap' },
  promoTextWrap: { flex: 1, paddingRight: 12, paddingTop: 40 },
  promoTextWrapSmall: { width: '55%', paddingRight: 8, alignItems: 'flex-start', paddingTop: 34 },
  promoTitle: { fontSize: 18, fontWeight: '800', color: '#111', marginBottom: 6, lineHeight: 24, textAlign: 'left' },
  promoTitleSmall: { fontSize: 16, textAlign: 'left' },
  promoDesc: { color: '#666', fontSize: 13, marginBottom: 10, textAlign: 'left' },
  promoDescSmall: { fontSize: 13, textAlign: 'left' },
  promoBadge: { position: 'absolute', left: 16, top: 12, backgroundColor: '#16a34a', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, zIndex: 99 },
  promoBadgeText: { color: '#fff', fontWeight: '700' },
  promoButton: { backgroundColor: 'transparent', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, alignSelf: 'flex-start', borderWidth: 0 },
  promoButtonSmall: { alignSelf: 'center' },
  promoButtonText: { color: '#fff', fontWeight: '700' },
  promoButtonTextGreen: { color: '#16a34a', fontWeight: '700' },
  promoImageContainer: { marginLeft: 'auto', width: 200, alignItems: 'flex-end', justifyContent: 'center' },
  // On small screens keep the image in a right column so text sits on left
  promoImageContainerSmall: { width: '45%', marginLeft: 0, alignItems: 'flex-end', justifyContent: 'center' },
  // Let image slightly overflow to the right to 'stick' to card edge
  promoImage: { width: 220, height: 200, marginLeft: 8, marginRight: -22, alignSelf: 'center' },
  promoImageSmall: { width: 200, height: 180, marginLeft: 8, marginRight: -18, alignSelf: 'center' },

  // CATEGORY
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 20,
    marginBottom: 10,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    width: 80,
  },
  categoryIcon: { width: 40, height: 40, marginBottom: 6 },
  categoryText: { fontSize: 12, color: '#388E3C', fontWeight: '500' },

  // PRODUCT
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginRight: 15,
    width: 130,
  },
  productImage: { width: 60, height: 60, marginBottom: 10 },
  productName: { fontSize: 13, color: '#333', fontWeight: '500', textAlign: 'center' },
  productPrice: { fontSize: 12, color: '#2E7D32', marginTop: 5, fontWeight: 'bold' },
  
});

export default styles;
