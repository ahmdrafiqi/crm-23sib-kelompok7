import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Star,
  User,
  Mail,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Heart,
  ThumbsUp,
  MessageSquare,
  Award
} from 'lucide-react';

const FeedbackPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rating: 0,
    category: 'general',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(0);

  const feedbackCategories = [
    { value: 'general', label: 'Umum', icon: MessageCircle },
    { value: 'product', label: 'Produk', icon: Award },
    { value: 'service', label: 'Layanan', icon: Heart },
    { value: 'website', label: 'Website', icon: ThumbsUp },
    { value: 'complaint', label: 'Keluhan', icon: AlertCircle },
    { value: 'suggestion', label: 'Saran', icon: MessageSquare }
  ];

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      setFormData(prevData => ({
        ...prevData,
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || ''
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prevData => ({
      ...prevData,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi pengiriman feedback
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simpan feedback ke localStorage (simulasi)
      const existingFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
      const newFeedback = {
        id: Date.now(),
        ...formData,
        userId: currentUser?.id || null,
        timestamp: new Date().toISOString(),
        status: 'submitted'
      };
      
      existingFeedbacks.push(newFeedback);
      localStorage.setItem('feedbacks', JSON.stringify(existingFeedbacks));
      
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        rating: 0,
        category: 'general',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return formData.name.trim() && 
           formData.email.trim() && 
           formData.subject.trim() && 
           formData.message.trim() && 
           formData.rating > 0;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Berikan Feedback Anda</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Pendapat Anda sangat berharga bagi kami. Bantu kami meningkatkan layanan dengan memberikan feedback yang jujur.
        </p>
      </div>

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">Terima Kasih!</h3>
              <p className="text-green-700">Feedback Anda telah berhasil dikirim. Kami akan meninjau dan merespons dalam 1-2 hari kerja.</p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">Terjadi Kesalahan</h3>
              <p className="text-red-700">Maaf, feedback Anda gagal dikirim. Silakan coba lagi nanti.</p>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Form */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Form Feedback</h2>
            <p className="text-pink-100 mt-2">Lengkapi form di bawah ini untuk mengirim feedback Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="Masukkan nama lengkap Anda"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="contoh@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Rating Kepuasan Anda *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredStar || formData.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-3 text-sm text-gray-600">
                  {formData.rating > 0 && (
                    <>
                      {formData.rating} dari 5 bintang
                      {formData.rating >= 4 && ' - Sangat Puas! 😊'}
                      {formData.rating === 3 && ' - Cukup Puas 😐'}
                      {formData.rating <= 2 && ' - Perlu Perbaikan 😔'}
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Kategori Feedback
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {feedbackCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.category === category.value
                          ? 'bg-pink-100 border-pink-500 text-pink-700'
                          : 'border-gray-200 text-gray-700 hover:border-pink-300 hover:bg-pink-50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subjek *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                placeholder="Ringkasan singkat feedback Anda"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesan Feedback *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none"
                placeholder="Ceritakan pengalaman Anda dengan detail. Semakin spesifik, semakin membantu kami untuk meningkatkan layanan."
                required
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.message.length}/500 karakter
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  isFormValid() && !isSubmitting
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Kirim Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Butuh Bantuan Lebih Lanjut?</h3>
          <p className="text-gray-600 mb-6">
            Jika Anda memiliki pertanyaan mendesak atau memerlukan bantuan langsung, jangan ragu untuk menghubungi kami melalui:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">support@beautifystore.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-600">+62 812-3456-7890</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Live Chat</p>
                <p className="text-sm text-gray-600">24/7 Customer Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;