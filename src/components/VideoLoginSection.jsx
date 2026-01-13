import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import axios from 'axios'; // Axios import kiya
import { toast } from 'sonner'; // Notification ke liye
import LoginModal from './LoginModal';
import DonationVideo from '../assets/blood-donation.mp4';

export default function VideoLoginSection() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowLoginModal(true);
  };

  // --- UPDATED: Backend Connection Logic ---
  const handleLoginSubmit = async (credentials) => {
    try {
      // Backend URL change karein agar aapka port different hai
      const API_URL = 'http://localhost:5000/api/auth/login'; 
      
      const response = await axios.post(API_URL, {
        email: credentials.email,
        password: credentials.password,
        role: selectedRole // Hum role bhi bhej rahe hain
      });

      if (response.data.token) {
        // Token aur User info local storage mein save karein
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', selectedRole);
        
        setShowLoginModal(false);
        toast.success(`Welcome back! Logged in as ${selectedRole}`);

        // Navigation Logic
        if (selectedRole === 'donor') {
          setShowContactForm(true);
        } else if (selectedRole === 'seeker') {
          navigate('/seeker-dashboard');
        } else if (selectedRole === 'admin') {
          navigate('/admin-dashboard');
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      const message = error.response?.data?.message || "Invalid credentials. Please try again.";
      toast.error(message);
    }
  };

  const handleContactFormSubmit = async (formData) => {
    try {
      // Donor ki extra details update karne ke liye backend call
      await axios.put('http://localhost:5000/api/users/update-profile', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      setShowContactForm(false);
      navigate('/donor-dashboard');
    } catch (error) {
      toast.error("Profile update failed.");
    }
  };

  return (
    <>
      <section id="login" className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* 1. Video Section */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }} 
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden group cursor-pointer shadow-2xl">
                <video 
                  className="w-full h-auto block object-contain" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src={DonationVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-16 h-16 text-white" />
                </div>
              </div>
            </motion.div>

            {/* 2. Text Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Join Our Life-Saving Community
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Choose your role to get started with the blood donation system.
              </p>

              <div className="space-y-4">
                {[
                  { id: 'donor', label: 'Login as Blood Donor', color: 'bg-red-600 hover:bg-red-700' },
                  { id: 'seeker', label: 'Login as Blood Seeker', color: 'bg-gray-800 hover:bg-gray-900' },
                  { id: 'admin', label: 'Login as Admin', color: 'bg-blue-600 hover:bg-blue-700' }
                ].map((btn, index) => (
                  <motion.button
                    key={btn.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                    onClick={() => handleRoleSelect(btn.id)}
                    className={`w-full ${btn.color} text-white px-8 py-4 rounded-xl text-lg transition-all shadow-md font-semibold`}
                  >
                    {btn.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showLoginModal && (
          <LoginModal
            role={selectedRole}
            onClose={() => setShowLoginModal(false)}
            onSubmit={handleLoginSubmit}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContactForm && (
          <ContactInfoModal
            onClose={() => setShowContactForm(false)}
            onSubmit={handleContactFormSubmit}
          />
        )}
      </AnimatePresence>
    </>
  );
}