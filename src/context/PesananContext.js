import { createContext, useState } from "react";

export const PesananContext = createContext();

export function PesananProvider({ children }) {
  const rawOrders = [
    {
      id: "1",
      tanggal: "10 Desember 2025 - 09.15 WIB",
      status: "Selesai",
      contact: "0812-3456-7890",
      items: [
        {
          id: "p1",
          nama: "Daging Sapi Segar",
          gambar: require("../../assets/images/Daging Halal.png"),
          harga: 15000,
          qty: 1,
        },
        {
          id: "p2",
          nama: "Mangga Harum Manis",
          gambar: require("../../assets/images/Mangga.png"),
          harga: 20000,
          qty: 1,
        },
      ],
    },
    {
      id: "2",
      tanggal: "11 Desember 2025 - 14.40 WIB",
      status: "Dibatalkan",
      contact: "0813-9999-2222",
      items: [
        {
          id: "p3",
          nama: "Anggur Merah Import",
          gambar: require("../../assets/images/anggur.jpg"),
          harga: 20000,
          qty: 1,
        },
      ],
    },
  ];

  const [orders, setOrders] = useState(
    rawOrders.map((order) => {
      const subtotal = (order.items || []).reduce((s, it) => s + (it.harga || it.price || 0) * (it.qty || 1), 0);
      const ongkir = order.ongkir ?? 5000;
      const voucherValue = order.voucherValue ?? 0;
      const coin = order.coin ?? 0;
      const totalBelanja = subtotal + ongkir - voucherValue - coin;

      return { ...order, subtotal, ongkir, voucherValue, coin, totalBelanja };
    })
  );

  const [lastAdded, setLastAdded] = useState(null);

  const tambahPesanan = (pesananBaru) => {
    setOrders((prev) => [pesananBaru, ...prev]);
    setLastAdded(pesananBaru);
  };

  const clearLastAdded = () => setLastAdded(null);

  // ⛔️ ubah jadi dibatalkan (bukan dihapus)
  const removeOrder = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Dibatalkan" } : order
      )
    );
  };

  return (
    <PesananContext.Provider
      value={{
        orders,
        tambahPesanan,
        lastAdded,
        clearLastAdded,
        removeOrder,
      }}
    >
      {children}
    </PesananContext.Provider>
  );
}
