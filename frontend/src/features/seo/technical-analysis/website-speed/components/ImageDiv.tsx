import img from '../../../../../assets/images/image 2.png'

function ImageDiv() {
  return (
    <div className='flex max-h-[300px] items-center justify-center overflow-hidden rounded-lg bg-white'>
      {/* Image container */}
      <img
        src={img}
        alt='Website Speed Analysis'
        className='h-full w-full object-cover object-center'
      />
    </div>
  )
}

export default ImageDiv
