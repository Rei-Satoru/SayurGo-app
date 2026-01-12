import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  header: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 20,
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 12,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 2,
    marginBottom: 2,
    fontWeight: "700",
  },

  // Card Styles
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 14,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  scooterIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  orderId: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
  },

  orderDate: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: "auto",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },

  cardBody: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },

  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginRight: 12,
  },

  productInfo: {
    flex: 1,
  },

  productName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },

  productQty: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
  },

  moreItems: {
    fontSize: 10,
    color: "#2E7D32",
    fontWeight: "500",
    marginTop: 2,
  },

  priceContainer: {
    alignItems: "flex-end",
  },

  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2E7D32",
  },

  cardFooter: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    gap: 10,
  },

  actionButton: {
    flex: 1,
    backgroundColor: "#2E7D32",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },

  actionButtonAlt: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },

  actionButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  actionButtonTextAlt: {
    color: "#666",
    fontSize: 12,
    fontWeight: "600",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },

  emptyIcon: {
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 14,
    color: "#999",
  },

  // Floating Button
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  // Filtering/Sorting
  filterHeader: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    gap: 8,
  },

  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#E8F5E9",
    borderRadius: 16,
  },

  filterButtonActive: {
    backgroundColor: "#2E7D32",
  },

  filterButtonText: {
    fontSize: 11,
    color: "#333",
    fontWeight: "500",
  },

  filterButtonTextActive: {
    color: "#fff",
  },

  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
