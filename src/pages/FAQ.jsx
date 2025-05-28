import React, { useState } from "react";

export default function FAQ() {
    const [faqs, setFaqs] = useState([
        {
            question: "Berapa lama waktu pengiriman?",
            answer: "Waktu pengiriman standar adalah 2-5 hari kerja tergantung lokasi Anda.",
        },
        {
            question: "Bagaimana cara melakukan return produk?",
            answer: "Anda bisa mengajukan permintaan return dalam 7 hari setelah produk diterima melalui menu Return di akun Anda.",
        },
    ]);

    const [form, setForm] = useState({ question: "", answer: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            const updated = [...faqs];
            updated[editIndex] = { ...form };
            setFaqs(updated);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setFaqs([...faqs, form]);
        }
        setForm({ question: "", answer: "" });
    };

    const handleEdit = (index) => {
        setForm(faqs[index]);
        setIsEditing(true);
        setEditIndex(index);
    };

    return (
        <div className="p-6 bg-white-50 max-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-pink-700">Pertanyaan Umum (FAQ)</h1>

            {/* Form Tambah/Edit */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-screen mb-8"
            >
                <input
                    type="text"
                    name="question"
                    placeholder="Pertanyaan"
                    value={form.question}
                    onChange={handleChange}
                    className="border border-pink-300 px-4 py-2 rounded w-full"
                    required
                />
                <textarea
                    name="answer"
                    placeholder="Jawaban"
                    value={form.answer}
                    onChange={handleChange}
                    rows={3}
                    className="border border-pink-300 px-4 py-2 rounded w-full"
                    required
                />
                <button
                    type="submit"
                    className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                >
                    {isEditing ? "Simpan Perubahan" : "Tambah FAQ"}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                            setForm({ question: "", answer: "" });
                        }}
                        className="ml-4 text-sm text-gray-500 underline"
                    >
                        Batal Edit
                    </button>
                )}
            </form>

            {/* Daftar FAQ */}
            <div className="space-y-4 max-screen">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start"
                    >
                        <div>
                            <h2 className="font-semibold text-pink-600">{faq.question}</h2>
                            <p className="text-gray-700 mt-2">{faq.answer}</p>
                        </div>
                        <button
                            onClick={() => handleEdit(index)}
                            className="text-sm text-pink-600 hover:underline ml-4"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
