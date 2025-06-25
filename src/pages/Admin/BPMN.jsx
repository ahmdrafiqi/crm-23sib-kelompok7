import React from "react";
import { ArrowRight } from "lucide-react";

const DataManagementBPMN = () => {
  const flow = [
    { actor: "Admin", action: "Login ke dashboard CRM" },
    { actor: "Sistem CRM", action: "Menampilkan dashboard dan data summary" },
    { actor: "Admin", action: "Melihat histori pelanggan" },
    { actor: "Sistem CRM", action: "Menampilkan data histori interaksi pelanggan" },
    { actor: "Admin", action: "Melihat segmentasi pelanggan" },
    { actor: "Sistem CRM", action: "Menampilkan data segmentasi berdasarkan kategori (MA)" },
    { actor: "Admin", action: "Melihat laporan penjualan" },
    { actor: "Sistem CRM", action: "Menampilkan data penjualan dan performa produk" },
    { actor: "Admin", action: "Membaca feedback dan ulasan" },
    { actor: "Sistem CRM", action: "Menyimpan dan menampilkan data feedback" },
    { actor: "Admin", action: "Membaca form komplain dari pelanggan" },
    { actor: "Sistem CRM", action: "Mendistribusikan komplain ke admin terkait" },
    { actor: "Admin", action: "Menanggapi komplain dan memberikan solusi" },
    { actor: "Sistem CRM", action: "Menyimpan riwayat penyelesaian komplain" }
  ];

  const Step = ({ actor, action }) => (
    <div className="flex items-center space-x-3">
      <div className="text-sm font-semibold w-32 text-right text-pink-700">{actor}</div>
      <ArrowRight className="text-gray-400 w-4 h-4" />
      <div className="bg-white border border-gray-300 rounded-xl shadow p-3 text-sm text-gray-700 flex-1">
        {action}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-700">
        BPMN - Proses Pengelolaan Data CRM (Admin & Sistem)
      </h1>
      <div className="space-y-4">
        {flow.map((step, index) => (
          <Step key={index} actor={step.actor} action={step.action} />
        ))}
      </div>
    </div>
  );
};

export default DataManagementBPMN;
