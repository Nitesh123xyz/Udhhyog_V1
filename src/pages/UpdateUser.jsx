import { useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Lock,
  Shield,
  CreditCard,
  Edit3,
  Save,
} from "lucide-react";

export default function UpdateUser() {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    address: "",
    password: "",
    emergency1Name: "",
    emergency1Relation: "",
    emergency1Mobile: "",
    emergency2Name: "",
    emergency2Relation: "",
    emergency2Mobile: "",
    holderName: "",
    accName: "",
    ifsc: "",
    bankName: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
      newErrors.mobileNumber = "Enter valid mobile number";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.emergency1Name.trim()) newErrors.emergency1Name = "Required";
    if (!formData.emergency1Relation.trim())
      newErrors.emergency1Relation = "Required";
    if (!formData.emergency1Mobile || formData.emergency1Mobile.length < 10) {
      newErrors.emergency1Mobile = "Required";
    }
    if (!formData.emergency2Name.trim()) newErrors.emergency2Name = "Required";
    if (!formData.emergency2Relation.trim())
      newErrors.emergency2Relation = "Required";
    if (!formData.emergency2Mobile || formData.emergency2Mobile.length < 10) {
      newErrors.emergency2Mobile = "Required";
    }

    return newErrors;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setTimeout(() => {
        alert("Profile updated successfully!");
        setIsSubmitting(false);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  const InputField = ({
    label,
    icon: Icon,
    error,
    children,
    required = false,
  }) => (
    <div className="group">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
        {Icon && <Icon className="w-4 h-4 text-indigo-600" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {children}
        {error && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {error}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-4 shadow-lg">
            <Edit3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Update Profile
          </h1>
          <p className="text-gray-600">Modify your account information</p>
        </div>

        <div className="space-y-8">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Mobile Number"
                icon={Phone}
                error={errors.mobileNumber}
                required
              >
                <input
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    handleInputChange("mobileNumber", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                  placeholder="Enter your mobile number"
                />
              </InputField>

              <InputField
                label="New Password"
                icon={Lock}
                error={errors.password}
              >
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                  placeholder="Leave blank to keep current password"
                />
              </InputField>

              <InputField
                label="Address"
                icon={MapPin}
                error={errors.address}
                required
              >
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm resize-none"
                  placeholder="Enter your address"
                />
              </InputField>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Emergency Contacts
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  Emergency Contact 1
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Name *
                    </label>
                    <input
                      value={formData.emergency1Name}
                      onChange={(e) =>
                        handleInputChange("emergency1Name", e.target.value)
                      }
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200 bg-white shadow-sm"
                    />
                    {errors.emergency1Name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.emergency1Name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Relation *
                    </label>
                    <input
                      value={formData.emergency1Relation}
                      onChange={(e) =>
                        handleInputChange("emergency1Relation", e.target.value)
                      }
                      placeholder="Relationship"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200 bg-white shadow-sm"
                    />
                    {errors.emergency1Relation && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.emergency1Relation}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Mobile No *
                    </label>
                    <input
                      value={formData.emergency1Mobile}
                      onChange={(e) =>
                        handleInputChange("emergency1Mobile", e.target.value)
                      }
                      placeholder="Mobile Number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200 bg-white shadow-sm"
                    />
                    {errors.emergency1Mobile && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.emergency1Mobile}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  Emergency Contact 2
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Name *
                    </label>
                    <input
                      value={formData.emergency2Name}
                      onChange={(e) =>
                        handleInputChange("emergency2Name", e.target.value)
                      }
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-white shadow-sm"
                    />
                    {errors.emergency2Name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.emergency2Name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Relation *
                    </label>
                    <input
                      value={formData.emergency2Relation}
                      onChange={(e) =>
                        handleInputChange("emergency2Relation", e.target.value)
                      }
                      placeholder="Relationship"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-white shadow-sm"
                    />
                    {errors.emergency2Relation && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.emergency2Relation}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Mobile No *
                    </label>
                    <input
                      value={formData.emergency2Mobile}
                      onChange={(e) =>
                        handleInputChange("emergency2Mobile", e.target.value)
                      }
                      placeholder="Mobile Number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-white shadow-sm"
                    />
                    {errors.emergency2Mobile && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.emergency2Mobile}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Account Details */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Bank Account Details
              </h2>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                Optional
              </span>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Holder Name
                  </label>
                  <input
                    value={formData.holderName}
                    onChange={(e) =>
                      handleInputChange("holderName", e.target.value)
                    }
                    placeholder="Enter account holder name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 bg-white shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Name
                  </label>
                  <input
                    value={formData.accName}
                    onChange={(e) =>
                      handleInputChange("accName", e.target.value)
                    }
                    placeholder="Enter account name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 bg-white shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code
                  </label>
                  <input
                    value={formData.ifsc}
                    onChange={(e) => handleInputChange("ifsc", e.target.value)}
                    placeholder="Enter IFSC code"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 bg-white shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <input
                    value={formData.bankName}
                    onChange={(e) =>
                      handleInputChange("bankName", e.target.value)
                    }
                    placeholder="Enter bank name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 bg-white shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setFormData({
                  mobileNumber: "",
                  address: "",
                  password: "",
                  emergency1Name: "",
                  emergency1Relation: "",
                  emergency1Mobile: "",
                  emergency2Name: "",
                  emergency2Relation: "",
                  emergency2Mobile: "",
                  holderName: "",
                  accName: "",
                  ifsc: "",
                  bankName: "",
                });
                setErrors({});
              }}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:from-gray-600 hover:to-gray-700"
            >
              <Edit3 className="w-4 h-4" />
              Reset Form
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Save className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              {isSubmitting ? "Updating..." : "Update Profile"}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
