import { useState } from 'react';
import { Upload, Camera, User} from 'lucide-react';
import {useNavigate} from 'react-router-dom'

export default function HomeScreen({userInfo}) {
  const [productName, setProductName] = useState("")
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate()

    function handleImageUpload(event){
      console.log({state: {productName: productName, file: event.target.files[0]}})
        navigate('/scan', {state: {productName: productName, file: event.target.files[0]}})
    }

  const clearImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="../public/nutriLeaf.png" width="50px" />
              <div>
                {userInfo.username ? <h1 className="text-green-700">Welcome back, {userInfo.username}!</h1> :
                <h1 className="text-green-700">Welcome back!</h1>}
                <p className="text-gray-500 text-sm">Ready to scan your meal?</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/auth/login">{userInfo.username ? "Log Out" : "Log In"}</a>
              <a href="/auth/login"><User size={46}/></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Upload Plate Section */}
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border relative overflow-hidden bg-white shadow-lg">
          <div className="p-8">
            <div className="text-center mb-8 ">
              <h2 className="text-gray-800 mb-2">Scan Your Meal</h2>
              <p className="text-gray-500">
                Upload a photo to analyze nutrition and ingredients
              </p>
            </div>

            <input 
            type="text"
            name="product-name"
            onChange={(e=>setProductName(e.target.value))}
            placeholder="Enter Product Name"
            style={{
              width: "60%",
              marginLeft: "20%",
              marginBottom: "14px",
              alignSelf: "center",
              boxSizing: "border-box",
              border: "2px solid oklch(84.5% 0.143 164.978)",
              borderRadius: "4px",
              textAlign: "center"
            }}
            />

            {/* Plate Design */}
            <div className="relative max-w-md mx-auto">
              {/* Plate Circle */}
              <div className="relative aspect-square">
                {/* Outer plate rim */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl"></div>
                
                {/* Inner plate */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-inner"></div>
                
                {/* Plate center with upload area */}
                <div className="absolute inset-8 rounded-full border-4 border-dashed border-green-300 bg-green-50/50 flex items-center justify-center">
                  {selectedImage ? (
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <img
                        src={selectedImage}
                        alt="Uploaded meal"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={clearImage}
                          variant="secondary"
                          size="sm"
                          className="gap-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center justify-center text-center p-8"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <Camera className="w-10 h-10 text-green-600" />
                      </div>
                      <p className="text-green-700 mb-2">Click to upload</p>
                      <p className="text-gray-500 text-sm">or drag and drop</p>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Decorative utensils */}
                <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-gray-300">
                  <svg width="50" height="180" viewBox="0 0 50 180" fill="none">
                    {/* Fork */}
                    {/* Handle */}
                    <rect x="21" y="60" width="8" height="110" rx="4" fill="currentColor" />
                    {/* Prongs */}
                    <rect x="17" y="10" width="4" height="55" rx="2" fill="currentColor" />
                    <rect x="23" y="10" width="4" height="60" rx="2" fill="currentColor" />
                    <rect x="29" y="10" width="4" height="55" rx="2" fill="currentColor" />
                    {/* Connection piece */}
                    <ellipse cx="25" cy="57" rx="8" ry="5" fill="currentColor" />
                  </svg>
                </div>

                <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-gray-300">
                  <svg width="50" height="180" viewBox="0 0 50 180" fill="none">
                    {/* Spoon */}
                    {/* Handle */}
                    <rect x="21" y="60" width="8" height="110" rx="4" fill="currentColor" />
                    {/* Bowl of spoon */}
                    <ellipse cx="25" cy="30" rx="12" ry="18" fill="currentColor" />
                    {/* Inner bowl highlight */}
                    <ellipse cx="25" cy="30" rx="9" ry="14" fill="white" opacity="0.2" />
                    {/* Connection */}
                    <rect x="23" y="45" width="4" height="18" rx="2" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {selectedImage && (
              <div className="text-center mt-8">
                <button className="gap-2 bg-green-600 hover:bg-green-700 px-8">
                  <Upload className="w-4 h-4" />
                  Analyze Nutrition
                </button>
              </div>
            )}
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30 -z-10"></div>
        </div>
      </div>
    </div>
  );
}