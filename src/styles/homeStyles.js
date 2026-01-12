import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  // ===== TOP SEARCH BAR =====
  topSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#388E3C",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#333",
  },
  searchIconText: {
    fontSize: 16,
    marginLeft: 8,
  },
  headerIcon: {
    padding: 4,
    position: "relative",
  },
  headerIconText: {
    fontSize: 22,
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FFA500",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  // ===== HERO SECTION =====
  heroSection: {
    width: "100%",
    marginBottom: 16,
  },
  heroImage: {
    width: "100%",
    height: 200,
  },

  // ===== SECTION =====
  section: {
    marginBottom: 24,
    paddingHorizontal: 0,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  boldGreen: {
    color: '#2E7D32',
    fontWeight: '700',
  },

  // ===== PRODUCT =====
  productBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  addButtonText: {
    color: "#FFA500",
    fontWeight: "600",
  },

  productBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowRadius: 6,
  },
  productImageContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  productImageLarge: {
    width: 100,
    height: 100,
  },
  heartIcon: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  heartIconText: {
    fontSize: 20,
  },

  ratingBox: {
    bottom: 6,
    left: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  ratingText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
  },

  productInfo: {
    width: "100%",
    alignItems: "flex-start",
  },

  productNameLarge: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },

  productWeight: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 2,
  },

  productPriceLarge: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2E7D32",
  },

  cartButtonProduct: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 3,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  cartIconProduct: {
    width: 10,
    height: 10,
    tintColor: "#FFA726",
  },

  cartButtonText: {
    color: "#FFA726",
    fontSize: 10,
    fontWeight: "200",
  },

  // ===== PROMO BANNER =====

  promoRow: {
    flexDirection: "row",
    gap: 12,
  },

  // ===== BANNER 1 (LEBAR) =====
  promoBanner: {
    flex: 1.7,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  promoLeftContent: {
    width: "65%",
    justifyContent: 'flex-start', 
  },

  promoTag: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
    alignSelf: "flex-start",
  },

  promoTagText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },

  promoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 20,
    marginBottom: 6,
  },

  promoSubtitle: {
    fontSize: 11,
    color: "#6B7280",
    lineHeight: 15,
    marginBottom: 12,
  },
  promoBtn: {
    backgroundColor: "#FFA500",
    paddingHorizontal: 6,
    paddingVertical: 7,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 0,   
  },

  promoBtnText: {
    fontSize: 9,
    fontWeight: "500",
    color: "#FFFFFF",
  },

  promoRightImage: {
    position: "absolute",
    right: -20,
    bottom: -10,
    top: "50%",
    transform: [{ translateY: -55 }],
    width: 95,
    height: 110,
    resizeMode: "contain",
  },

  // ===== BANNER 2 (KECIL) =====
  promoBannerYellow: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFE9C7",
    borderRadius: 20,
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  promoImageTop: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginTop: -20,
    marginBottom: -10,
  },

  promoTitleYellow: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 20,
    marginBottom: 5,
  },

  promoSubtitleYellow: {
    fontSize: 11,
    lineHeight: 15,
    color: "#388E3C",
    marginBottom: 5,
  },

  promoBtnYellow: {
    backgroundColor: "#FFA500",
    paddingHorizontal: 5,
    paddingVertical: 6,
    borderRadius: 7,
    alignSelf: "flex-start",
    marginTop: 0,
  },

  promoBtnTextYellow: {
    fontSize: 9,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // ===== HEADER =====
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  greeting: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#2E7D32" 
  },
  subtitle: { 
    color: "#555", 
    fontSize: 14 
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25 
  },
  brandWrapper: { 
    flexDirection: "row", 
    alignItems: "flex-end", 
    marginBottom: 6 
  },
  brandContainer: { 
    marginLeft: 20, 
    marginTop: 8, 
    marginBottom: 4 
  },
  brandSayur: { 
    fontSize: 20, 
    fontWeight: "800", 
    color: "#fff" 
  },
  brandSayurSmall: { 
    fontSize: 18 
  },
  brandGo: { 
    fontSize: 20, 
    fontWeight: "800", 
    color: "#FBC02D", 
    marginLeft: 6 
  },
  brandGoSmall: { 
    fontSize: 18 
  },

  // ===== TOP BAR =====
  topBar: { 
    backgroundColor: "#2E7D32", 
    paddingHorizontal: 20, 
    paddingVertical: 16, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between" 
  },
  topBarLeft: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  topIcons: {
    flexDirection: "row",
    gap: 12,
  },
  icon: {
    fontSize: 20,
    color: "#1B5E20",
  },

  // ===== SEARCH =====
  searchBox: { 
    paddingHorizontal: 20, 
    marginBottom: 10 
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 30,
  },
  searchHeaderInput: {
    flex: 1,
    fontSize: 12,
    color: "#333",
  },
  searchInputSmall: { 
    fontSize: 13, 
    paddingVertical: 8 
  },
  
  // centered search bar under top bar
  searchBoxCenter: { 
    alignSelf: "center", 
    width: "70%", 
    marginTop: 12, 
    marginBottom: 18 
  },
  searchBoxCenterSmall: { 
    width: "90%", 
    marginTop: 10, 
    marginBottom: 12 
  },

  // ===== HERO =====
  hero: { 
    marginHorizontal: 0, 
    marginBottom: 20 
  },
  heroImageWrap: { 
    paddingHorizontal: 0, 
    alignItems: "center", 
    width: "100%" 
  },
  heroCaption: { 
    fontSize: 18, 
    fontWeight: "800", 
    color: "#333", 
    backgroundColor: "transparent", 
    marginBottom: 8, 
    textAlign: "center" 
  },
  heroCaptionSmall: { 
    fontSize: 16, 
    fontWeight: "700", 
    color: "#333", 
    backgroundColor: "transparent", 
    marginBottom: 6, 
    textAlign: "center" 
  },
  heroCaptionHighlight: { 
    color: "#2E7D32", 
    fontWeight: "800" 
  },
  heroImageFull: { 
    width: "100%", 
    height: 260, 
    borderRadius: 8, 
    marginTop: 20 
  },
  heroImageFullSmall: { 
    width: "100%", 
    height: 200, 
    borderRadius: 6, 
    marginTop: 24 
  },
  heroColumn: { 
    flexDirection: "column", 
    alignItems: "center" 
  },
  heroText: { 
    flex: 1, 
    paddingRight: 10, 
    justifyContent: "flex-start" 
  },
  heroTextCenter: { 
    alignItems: "center", 
    paddingRight: 0, 
    justifyContent: "center" 
  },
  heroTitle: { 
    fontSize: 22, 
    fontWeight: "800", 
    color: "#1e3a2a", 
    lineHeight: 26 
  },
  heroTitleSmall: { 
    fontSize: 16, 
    lineHeight: 20, 
    textAlign: "left" 
  },
  heroTitleHighlight: { 
    color: "#2E7D32" 
  },
  heroSubtitle: { 
    color: "#555", 
    fontSize: 14, 
    marginTop: 12, 
    marginBottom: 16 
  },
  heroSubtitleSmall: { 
    fontSize: 13, 
    textAlign: "center" 
  },
  ctaButton: { 
    backgroundColor: "#FBC02D", 
    paddingVertical: 12, 
    paddingHorizontal: 18, 
    borderRadius: 10, 
    alignSelf: "flex-start" 
  },
  ctaButtonSmall: { 
    alignSelf: "center" 
  },
  ctaButtonText: { 
    color: "#fff", 
    fontWeight: "700" 
  },
  ctaButtonTextSmall: { 
    fontSize: 14 
  },

  // ===== OJEK ADVERTISEMENT =====
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

  // ===== BANNER =====
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
  bannerText: { 
    flex: 1, 
    marginLeft: 15 
  },
  bannerTitle: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    color: '#2E7D32' 
  },
  bannerSubtitle: { 
    color: '#388E3C', 
    fontSize: 13 
  },

  // ===== PROMO (Buah Pot) =====
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
  promoSmall: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12, 
    flexWrap: 'nowrap' 
  },
  promoTextWrap: { 
    flex: 1, 
    paddingRight: 12, 
    paddingTop: 40 
  },
  promoTextWrapSmall: { 
    width: '55%', 
    paddingRight: 8, 
    alignItems: 'flex-start', 
    paddingTop: 34 
  },
  promoTitleBase: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#111', 
    marginBottom: 6, 
    lineHeight: 24, 
    textAlign: 'left' 
  },
  promoTitleSmall: { 
    fontSize: 16, 
    textAlign: 'left' 
  },
  promoDesc: { 
    color: '#666', 
    fontSize: 13, 
    marginBottom: 10, 
    textAlign: 'left' 
  },
  promoDescSmall: { 
    fontSize: 13, 
    textAlign: 'left' 
  },
  promoBadge: { 
    position: 'absolute', 
    left: 16, 
    top: 12, 
    backgroundColor: '#16a34a', 
    paddingHorizontal: 14, 
    paddingVertical: 6, 
    borderRadius: 20, 
    zIndex: 99 
  },
  promoBadgeText: { 
    color: '#fff', 
    fontWeight: '700' 
  },
  promoButton: { 
    backgroundColor: 'transparent', 
    paddingVertical: 10, 
    paddingHorizontal: 14, 
    borderRadius: 8, 
    alignSelf: 'flex-start', 
    borderWidth: 0 
  },
  promoButtonSmall: { 
    alignSelf: 'center' 
  },
  promoButtonText: { 
    color: '#fff', 
    fontWeight: '700' 
  },
  promoButtonTextGreen: { 
    color: '#16a34a', 
    fontWeight: '700' 
  },
  promoImageContainer: { 
    marginLeft: 'auto', 
    width: 200, 
    alignItems: 'flex-end', 
    justifyContent: 'center' 
  },
  promoImageContainerSmall: { 
    width: '45%', 
    marginLeft: 0, 
    alignItems: 'flex-end', 
    justifyContent: 'center' 
  },
  promoImage: { 
    width: 220, 
    height: 200, 
    marginLeft: 8, 
    marginRight: -22, 
    alignSelf: 'center' 
  },
  promoImageSmall: { 
    width: 200, 
    height: 180, 
    marginLeft: 8, 
    marginRight: -18, 
    alignSelf: 'center' 
  },

  // ===== CATEGORY =====
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 20,
    marginBottom: 10,
  },
  boldGreen: {
    color: '#2E7D32',
    fontWeight: '700',
  },
  categoryBoxSquare: {
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 12,
    width: 90,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    width: 80,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  categoryIcon: { 
    width: 40, 
    height: 40, 
    marginBottom: 6 
  },
  categoryLabel: {
    fontSize: 12,
    color: '#388E3C',
    fontWeight: '600',
    textAlign: 'center',
  },
  categoryText: { 
    fontSize: 12, 
    color: '#388E3C', 
    fontWeight: '500' 
  },

  // ===== PRODUCT CATEGORY =====
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginRight: 15,
    width: 130,
  },
  productImage: { 
    width: 60, 
    height: 60, 
    marginBottom: 10 
  },
  productName: { 
    fontSize: 13, 
    color: '#333', 
    fontWeight: '500', 
    textAlign: 'center' 
  },
  productPrice: { 
    fontSize: 12, 
    color: '#2E7D32', 
    marginTop: 5, 
    fontWeight: 'bold' 
  },
});

export default styles;
