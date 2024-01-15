'use client'
import { IProductImage } from "@/types/product";
import Image from "next/image";
import { useState } from "react";

interface IProductImagesProps {
  images?: IProductImage[]
}

const ProductImages: React.FunctionComponent<IProductImagesProps> = (props) => {

  const [mainImage, setMainImage] = useState(0)

  const { images } = props

  const handleOnClick = (index: any) => {
    setMainImage(index)
  }

  return (
    <div className="images w-full">
      <div className='thumbs'><Image src={images ? images[mainImage].src : ""} width={500} height={500} alt="image" className='w-full rounded-md border'></Image></div>
      <div className="grid grid-cols-4 gap-4 mt-5">
        {images && images.map((image, i) => <Image key={i} src={image.src} width={100} height={100} alt="image" className={`w-full w-[100%] h-[120px] object-cover bg-gray-100 rounded-md border ${i === mainImage ? 'hidden' : ''}`} onClick={() => handleOnClick(i)}></Image>)}
      </div>
    </div>
  )
};

export default ProductImages;
