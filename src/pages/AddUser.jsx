import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  CreditCard,
  Upload,
  Shield,
  Edit3,
} from "lucide-react";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobileMain: "",
    mobileAlt: "",
    email: "",
    password: "",
    confirmPassword: "",
    emergency1Name: "",
    emergency1Relation: "",
    emergency1Mobile: "",
    emergency2Name: "",
    emergency2Relation: "",
    emergency2Mobile: "",
    holderName: "",
    accNo: "",
    ifsc: "",
    bankName: "",
    adhaar: null,
    pan: null,
    residenceProof: null,
    cheque: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.mobileMain || formData.mobileMain.length < 10) {
      newErrors.mobileMain = "Enter valid mobile number";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

  const handleFileChange = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setTimeout(() => {
        alert("Registration submitted successfully!");
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
        {Icon && <Icon className="w-4 h-4 text-black" />}
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
    <div className="min-h-screen bg-gray-100 py-5 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-black bg-clip-text text-transparent mb-2">
            Registration Form
          </h1>
          <p className="text-gray-600">
            Create your account with secure information
          </p>
        </div>

        <div className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                icon={User}
                error={errors.name}
                required
              >
                <input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                  placeholder="Enter your full name"
                />
              </InputField>

              <InputField
                label="Address"
                icon={MapPin}
                error={errors.address}
                required
              >
                <input
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                  placeholder="Enter your address"
                />
              </InputField>

              <InputField
                label="Primary Mobile"
                icon={Phone}
                error={errors.mobileMain}
                required
              >
                <input
                  value={formData.mobileMain}
                  onChange={(e) =>
                    handleInputChange("mobileMain", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                  placeholder="Enter mobile number"
                />
              </InputField>

              <InputField label="Alternate Mobile" icon={Phone}>
                <input
                  value={formData.mobileAlt}
                  onChange={(e) =>
                    handleInputChange("mobileAlt", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                  placeholder="Enter alternate mobile (optional)"
                />
              </InputField>

              <InputField
                label="Email ID (User ID)"
                icon={Mail}
                error={errors.email}
                required
              >
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                  placeholder="Enter your email"
                />
              </InputField>

              <InputField
                label="Password"
                icon={Lock}
                error={errors.password}
                required
              >
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                  placeholder="Create a password"
                />
              </InputField>

              <InputField
                label="Confirm Password"
                icon={Lock}
                error={errors.confirmPassword}
                required
              >
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                  placeholder="Confirm your password"
                />
              </InputField>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Emergency Contacts
              </h2>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl p-6">
                <h3 className="font-semibold text-gray-700 mb-4">
                  Emergency Contact 1
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
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

              <div className="rounded-xl p-6">
                <h3 className="font-semibold text-gray-700 mb-4">
                  Emergency Contact 2
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
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

          {/* Bank Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Bank Account Details
              </h2>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                Optional
              </span>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={formData.holderName}
                  onChange={(e) =>
                    handleInputChange("holderName", e.target.value)
                  }
                  placeholder="Account Holder Name"
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 bg-white shadow-sm"
                />
                <input
                  value={formData.accNo}
                  onChange={(e) => handleInputChange("accNo", e.target.value)}
                  placeholder="Account Number"
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 bg-white shadow-sm"
                />
                <input
                  value={formData.ifsc}
                  onChange={(e) => handleInputChange("ifsc", e.target.value)}
                  placeholder="IFSC Code"
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 bg-white shadow-sm"
                />
                <input
                  value={formData.bankName}
                  onChange={(e) =>
                    handleInputChange("bankName", e.target.value)
                  }
                  placeholder="Bank Name"
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 bg-white shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* File Uploads */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Document Uploads
              </h2>
              <div className="flex items-center gap-1 text-xs bg-purple-100 text-gray-600 px-2 py-1 rounded-full">
                <Shield className="w-3 h-3" />
                Encrypted
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "adhaar", label: "Aadhaar Card", required: true },
                { name: "pan", label: "PAN Card", required: true },
                {
                  name: "residenceProof",
                  label: "Residence Proof",
                  required: true,
                },
                {
                  name: "cheque",
                  label: "Bank Statement/Cheque",
                  required: true,
                },
              ].map((doc) => (
                <div key={doc.name} className="p-4">
                  <label className="block text-sm font-semibold text-black mb-2">
                    {doc.label}{" "}
                    {doc.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange(doc.name, e.target.files[0])
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-white shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 hover:file:bg-purple-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button className="group relative inline-flex items-center gap-3 bg-green-600 text-white px-5 py-4 rounded-2xl font-semibold text-sm shadow-xl">
              <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Reset Form
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group relative inline-flex items-center gap-3 bg-blue-600 text-white px-5 py-4 rounded-2xl font-semibold text-sm shadow-xl"
            >
              <User className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
