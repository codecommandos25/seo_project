import img from '../../../../../assets/images/image 2.png'

function ImageDiv() {
  return (
    <div className="bg-white rounded-lg flex items-center justify-center max-h-[300px] overflow-hidden">
      {/* Image container */}
      <img src={img} alt="Website Speed Analysis" className="w-full h-full object-cover object-center" />
    </div>
  )
}

export default ImageDiv