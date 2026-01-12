import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  // ===== TOP SEARCH BAR =====
  topSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E7D32",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },

  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },

  headerIcon: {
    padding: 8,
    position: "relative",
  },

  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FFA500",
    borderRadius: 10,
    minWidth: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#FFA500",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  // ===== HEADER SECTION =====
  headerSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  boldGreen: {
    color: "#2E7D32",
    fontWeight: "900",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#888",
    marginTop: 6,
    fontWeight: "400",
  },

  // ===== FLATLIST CONTAINER =====
  listContainer: {
    flex: 1,
  },

  contentContainerStyle: {
    padding: 14,
    paddingBottom: 90,
  },

  columnWrapperStyle: {
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },

  // ===== EMPTY STATE =====
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },

  emptyText: {
    fontSize: 15,
    color: "#AAA",
    marginTop: 14,
    fontWeight: "500",
  },

  // ===== LOADING =====
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
