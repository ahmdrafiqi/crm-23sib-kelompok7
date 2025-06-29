import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { ArrowLeft, User, MapPin, Calendar, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_user: "",
    ulang_tahun: "",
    gender: "",
    kota_asal: "",
    kode_pos: "",
  });

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id_user, username");

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id_user) newErrors.id_user = "User wajib dipilih";
    if (!formData.gender) newErrors.gender = "Pilih gender terlebih dahulu";
    if (!formData.ulang_tahun)
      newErrors.ulang_tahun = "Tanggal lahir wajib diisi";
    if (!formData.kota_asal) newErrors.kota_asal = "Kota asal wajib diisi";
    if (!formData.kode_pos) newErrors.kode_pos = "Kode pos wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Submitting data:", formData);

      const { data, error } = await supabase.from("pelanggan").insert([
        {
          id_user: formData.id_user,
          gender: formData.gender,
          ulang_tahun: formData.ulang_tahun,
          kota_asal: formData.kota_asal,
          kode_pos: formData.kode_pos,
        },
      ]);

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        console.error("Error inserting customer:", error);
        alert("Gagal menambahkan pelanggan.");
      } else {
        alert("Pelanggan berhasil ditambahkan!");
        navigate("/admin/customers");
      }
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/customers")}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Customers
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Add New Customer</h1>
        <p className="text-gray-600">Create a new customer profile</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-pink-500" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Id User */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Id User
              </label>
              <select
                name="id_user"
                value={formData.id_user}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">-- Pilih User --</option>
                {users.map((user) => (
                  <option key={user.id_user} value={user.id_user}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Choose gender</option>
                <option value="Woman">Woman</option>
                <option value="Man">Man</option>
              </select>
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Lahir
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  name="ulang_tahun"
                  value={formData.ulang_tahun}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-pink-500" />
            Address Information
          </h2>

          <div className="space-y-4">
            {/* Address */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="kota_asal"
                  value={formData.kota_asal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="City"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="kode_pos"
                  value={formData.kode_pos}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="12345"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Customer
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/customers")}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddCustomer;
