import React from 'react'

const ImageModal = ({ image, onClick }) => {
  return (
    <div onClick={onClick} className="fixed top-0 right-0 bg-black bg-opacity-75 z-50">
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="bg-white border-8 border-blue-500 h-4/5">
          <img src={image} alt="product_image" title="Уменьшить" className="h-full object-contain" />
        </div>
        
        <button
          type="button"
          className="transition duration-300 ease-in-out bg-red-600 hover:bg-red-800 text-white font-semibold py-1 mt-3 px-4 rounded"
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default ImageModal
