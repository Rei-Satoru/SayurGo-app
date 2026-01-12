import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },

  imageWrapper: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    alignItems: "center",
  },

  productImage: {
    width: 220,
    height: 220,
  },

  contentCard: {
    backgroundColor: "#fff",
    marginTop: 8,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  productName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  productWeight: {
    fontSize: 13,
    color: "#6B7280",
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F97316",
    marginVertical: 12,
  },

  description: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
  },

bottomBar: {
  flexDirection: "row",
  gap: 12,
  padding: 16,
  backgroundColor: "#fff",
  borderTopWidth: 1,
  borderColor: "#E5E7EB",
},

addCartButton: {
  flex: 1,
  backgroundColor: "#FFA500",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
},

buyNowButton: {
  flex: 1,
  backgroundColor: "#2E7D32",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
},

buttonText: {
  color: "#fff",
  fontSize: 12,
  fontWeight: "600",
},

});
