import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';
import "../../styles/productCard.css"; 
import { Buffer } from 'buffer';
import { useState, useEffect } from "react";


export const ImportImagesProfile = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const cloudName = "dmo7oubln";
      const apiKey = "525655867213797";
      const apiSecret = "vs0x8sROaO_77RaoO2L8sZm4BQM";
      const folderName = "products";

      // Convertir credenciales a Base64 (sin Buffer)
      const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dmo7oubln/resources/image/upload?/products`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${auth}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al cargar imágenes");
        }

        const data = await response.json();
        setImages(data.resources || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando imágenes...</p>
      ) : images.length > 0 ? (
        <div>
          {images.map((image) => (
            <AdvancedImage
              key={image.public_id}
              cldImg={new Cloudinary({ cloudName: "dmo7oubln" }).image(image.public_id)}
            />
          ))}
        </div>
      ) : (
        <p>No se encontraron imágenes</p>
      )}
    </div>
  );
};






















export const ProductCards = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dmo7oubln' } });

  // Array dummy con 5 productos (cada uno incluye un imageId)
  const products = [
    { id: 1, title: 'Product Title 1', description: 'Descripción 1', price: '$10', imageId: 'cld-sample-5' },
    { id: 2, title: 'Product Title 2', description: 'Descripción 2', price: '$20', imageId: 'cld-sample-5' },
    { id: 3, title: 'Product Title 3', description: 'Descripción 3', price: '$30', imageId: 'cld-sample-5' },
    { id: 4, title: 'Product Title 4', description: 'Descripción 4', price: '$40', imageId: 'cld-sample-5' },
    { id: 5, title: 'Product Title 5', description: 'Descripción 5', price: '$50', imageId: 'cld-sample-5' }
  ];

  return (
    <div className="product-card-list">
      {products.map(product => {
        // Para cada producto, genera la imagen usando su imageId
        const img = cld.image(product.imageId)
          .format('auto')
          .quality('auto')
          .resize(auto().gravity(autoGravity()).width(500).height(500));

        return (
          <div className="product" key={product.id}>
            <div className="product-image-container">
              <AdvancedImage cldImg={img} className="product-image" />
            </div>
            <div className="product-card-body">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{product.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};















// este codigo fue el primero
// import React from 'react';
// import '../../styles/productCard.css'; // Importamos el archivo CSS para darle estilo a esto (revisar importación)
// import { AdvancedImage } from '@cloudinary/react';
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';


// export const ProductCard = () => {
//   const cld = new Cloudinary({ cloud: { cloudName: 'dmo7oubln' } });

//   const img = cld
//     .image('cld-sample-5')
//     .format('auto')
//     .quality('auto')
//     .resize(auto().gravity(autoGravity()).width(500).height(500));

//   // Se espera que el objeto product tenga: id, name, price, description, image_url
//   return (
//     <div className="product-card">
//       <div className='product'>
//         <AdvancedImage cldImg={img} />
//         <div className="product-card-body">
//           <h3 className="product-title">product title</h3>
//           <p className="product-description">descripcion</p>
//           <p className="product-price">precio</p>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// };
