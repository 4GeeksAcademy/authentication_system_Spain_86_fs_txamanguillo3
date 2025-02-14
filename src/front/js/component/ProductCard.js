// js/components/ProductCards.jsx
import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';
import "../../styles/productCard.css"; 

export const ProductCards = () => {
  // Configura Cloudinary (ajustar el cloudinary)
  const cld = new Cloudinary({ cloud: { cloudName: 'dmo7oubln' } });
  
  // Genera la imagen optimizada
  const img = cld.image('cld-sample-5')
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500).height(500));
  
  // Array dummy con 5 productos(esta forma de crear varias cards me gustó)
  const products = [
    { id: 1, title: 'Product Title 1', description: 'Descripción 1', price: '$10' },
    { id: 2, title: 'Product Title 2', description: 'Descripción 2', price: '$20' },
    { id: 3, title: 'Product Title 3', description: 'Descripción 3', price: '$30' },
    { id: 4, title: 'Product Title 4', description: 'Descripción 4', price: '$40' },
  ];

  return (
    <div className="product-card">
      {products.map(product => (
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
      ))}
    </div>
  );
};






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
