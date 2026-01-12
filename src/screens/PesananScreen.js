import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

// Import Hook dan Styles
import { useAddToCart } from "../hooks/useAddToCart";
import { useOrders } from "../hooks/useOrders";
import styles from "../styles/pesananStyles";

export default function PesananScreen() {
  const router = useRouter();
  
  // Fetch pesanan data
  const { orders, loading, refetch } = useOrders();
  const { addToCart } = useAddToCart();

  // Format tanggal
  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + " WIB";
  };

  // Warna status
  const getColorForStatus = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("selesai")) return "#22C55E";
    if (s.includes("batal")) return "#F7D274";
    return "#FACC15";
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pesanan Saya</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 12 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            colors={['#2E7D32']}
          />
        }
      >
        {loading && orders.length === 0 ? (
          <ActivityIndicator
            size="large"
            color="#2E7D32"
            style={{ marginTop: 50 }}
          />
        ) : orders.length > 0 ? (
          orders.map((order) => {
            // Data mapping
            const listItems = order._transaksi_items_of_transaksii ||
              order.transaksi_items ||
              order.items ||
              [];

            const firstItem = listItems.length > 0 ? listItems[0] : null;

            const productDetail = firstItem
              ? (firstItem._produk || firstItem.produk || firstItem.produk_data || {})
              : {};

            let imgUri = "https://placehold.co/100x100/png?text=IMG";
            const rawImg = productDetail.foto_produk || productDetail.image || productDetail.gambar;

            if (rawImg) {
              if (typeof rawImg === 'string') imgUri = rawImg;
              else if (rawImg.url) imgUri = rawImg.url;
            }

            const namaProduk = productDetail.nama_produk || productDetail.nama || "Produk Tanpa Nama";

            return (
              <TouchableOpacity
                key={order.id}
                style={styles.card}
                activeOpacity={0.9}
                onPress={() =>
                  router.push({
                    pathname: "/detailpesanan",
                    params: { orderId: order.id }
                  })
                }
              >
                {/* Card Header */}
                <View style={styles.cardHeader}>
                  <View style={styles.scooterIconContainer}>
                    <Ionicons name="bicycle-outline" size={20} color="#2E7D32" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.orderId}>Order #{order.id?.slice(0, 8)}</Text>
                    <Text style={styles.orderDate}>{formatDate(order.created_on)}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getColorForStatus(order.status) }
                    ]}
                  >
                    <Text style={styles.statusText}>{order.status || "Pending"}</Text>
                  </View>
                </View>

                {/* Card Body - Produk Preview */}
                {firstItem && (
                  <View style={styles.cardBody}>
                    <Image
                      source={{ uri: imgUri }}
                      style={styles.productImage}
                      defaultSource={require("../../assets/images/vegetables.png")}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {namaProduk}
                      </Text>
                      <Text style={styles.productQty}>
                        Qty: {firstItem.jumlah || firstItem.quantity || 1}
                      </Text>
                      {listItems.length > 1 && (
                        <Text style={styles.moreItems}>
                          +{listItems.length - 1} item lainnya
                        </Text>
                      )}
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>
                        Rp {(order.total_price || order.total || 0).toLocaleString("id-ID")}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Card Footer */}
                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => router.push({
                      pathname: "/detailpesanan",
                      params: { orderId: order.id }
                    })}
                  >
                    <Text style={styles.actionButtonText}>Lihat Detail</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada pesanan</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

